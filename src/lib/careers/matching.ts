/**
 * Explainable applicant ↔ job matching.
 *
 * Produces a 0–100 score from six factors (weights configurable in Careers settings):
 *   skills          weighted skill coverage; must-haves penalised when missing
 *   experience      years vs the job's min/max range
 *   relevance       TF-IDF cosine similarity between the CV text and the job text
 *   certifications  required/nice-to-have certifications found in the CV
 *   education       candidate level vs required level
 *   screening       answers to screening questions (knockouts flag the applicant)
 *
 * Every factor returns its evidence (matched / missing terms) so HR can see *why*
 * someone ranks where they do – no black box.
 */

export type MatchWeights = {
  skills: number
  experience: number
  relevance: number
  certifications: number
  education: number
  screening: number
  missingMustHavePenalty: number
}

export const DEFAULT_WEIGHTS: MatchWeights = {
  skills: 40,
  experience: 20,
  relevance: 12,
  certifications: 10,
  education: 8,
  screening: 10,
  missingMustHavePenalty: 12,
}

export type JobForMatching = {
  title: string
  skills?: { skill: string; weight?: string | number | null; mustHave?: boolean | null; synonyms?: string | null }[] | null
  certifications?: { name: string; mustHave?: boolean | null; synonyms?: string | null }[] | null
  keywords?: string | null
  experienceMin?: number | null
  experienceMax?: number | null
  educationLevel?: string | null
  text: string // title + summary + description + responsibilities + requirements
  screeningQuestions?:
    | {
        question: string
        type?: string | null
        idealAnswer?: string | null
        knockout?: boolean | null
        weight?: string | number | null
      }[]
    | null
}

export type ApplicantForMatching = {
  resumeText?: string | null
  skillsText?: string | null
  certificationsText?: string | null
  coverLetter?: string | null
  currentTitle?: string | null
  yearsExperience?: number | null
  educationLevel?: string | null
  fieldOfStudy?: string | null
  screeningAnswers?: { question?: string | null; answer?: string | null }[] | null
}

export type FactorResult = {
  score: number // 0..1
  weight: number
  detail: string
  matched?: string[]
  missing?: string[]
}

export type MatchResult = {
  score: number
  band: 'strong' | 'good' | 'fair' | 'low' | 'knockout'
  knockoutFailed: boolean
  factors: Record<keyof Omit<MatchWeights, 'missingMustHavePenalty'>, FactorResult>
  penalty: number
  matchedSkills: string[]
  missingSkills: string[]
  missingMustHaves: string[]
  screening: { question: string; answer: string; passed: boolean | null }[]
  topTerms: string[]
  summary: string
}

/* ------------------------------------------------------------------ */
/* Text utilities                                                       */
/* ------------------------------------------------------------------ */

const STOP = new Set(
  'a an and are as at be by for from has have in is it its of on or that the to was were will with within our your you we us this these those their they he she i my me not no but if into over per via etc also can may must should would able ability including include includes experience years year work working role job position responsibilities requirements required preferred strong good excellent knowledge skills skill team'.split(
    ' ',
  ),
)

/** Domain synonyms: anything in a group counts as the same thing */
const SYNONYM_GROUPS: string[][] = [
  ['qa/qc', 'qaqc', 'qa qc', 'quality assurance', 'quality control', 'quality inspector'],
  ['hvac', 'heating ventilation air conditioning', 'air conditioning', 'chiller', 'ahu'],
  ['hse', 'ehs', 'she', 'health safety environment', 'health and safety', 'safety officer'],
  ['autocad', 'auto cad', 'cad drafting'],
  ['primavera', 'primavera p6', 'p6'],
  ['ms project', 'microsoft project'],
  ['e&i', 'electrical and instrumentation', 'electrical & instrumentation', 'instrumentation'],
  ['plc', 'programmable logic controller'],
  ['scada', 'supervisory control'],
  ['ro', 'reverse osmosis', 'swro', 'desalination'],
  ['mbbr', 'moving bed biofilm reactor', 'biological wastewater', 'wastewater treatment'],
  ['ccna', 'cisco certified network associate', 'cisco networking'],
  ['ccnp', 'cisco certified network professional'],
  ['firewall', 'fortigate', 'palo alto', 'ngfw'],
  ['cybersecurity', 'cyber security', 'information security', 'infosec'],
  ['structured cabling', 'cabling', 'fiber optic', 'fibre optic', 'fiber', 'fibre'],
  ['cctv', 'video surveillance', 'ip camera'],
  ['active directory', 'ad ds', 'azure ad', 'entra id'],
  ['aws', 'amazon web services'],
  ['azure', 'microsoft azure'],
  ['nebosh', 'nebosh igc'],
  ['osha', 'osha 30', 'osha 10'],
  ['pmp', 'project management professional'],
  ['api 510', 'api510'],
  ['api 570', 'api570'],
  ['cswip', 'welding inspector', 'cswip 3.1'],
  ['ndt', 'non destructive testing', 'nondestructive testing'],
  ['aramco', 'saudi aramco'],
  ['sabic', 'saudi basic industries'],
  ['sec', 'saudi electricity company'],
  ['piping', 'pipe fitting', 'pipefitting', 'pipe fitter'],
  ['commissioning', 'pre-commissioning', 'precommissioning'],
  ['hydrotest', 'hydro test', 'hydrostatic test', 'pressure test', 'pressure testing'],
  ['welding', 'welder', 'wps', 'pqr'],
  ['electrician', 'electrical technician'],
  ['network engineer', 'network administrator', 'network technician'],
  ['shutdown', 'turnaround', 'shutdown and turnaround', 't/a'],
]

export const normalize = (s: string | null | undefined): string =>
  ` ${(s || '')
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9+#&/.؀-ۿ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `

/** Light suffix stripping so inspector / inspection / inspecting all meet at "inspect" */
const SUFFIXES: [string, string, number][] = [
  ['izations', 'ize', 9],
  ['ization', 'ize', 8],
  ['ations', '', 8],
  ['ation', '', 7],
  ['ments', '', 7],
  ['ment', '', 6],
  ['ions', '', 6],
  ['ion', '', 6],
  ['ings', '', 6],
  ['ing', '', 5],
  ['ors', '', 6],
  ['or', '', 6],
  ['ers', '', 6],
  ['er', '', 6],
  ['ies', 'y', 5],
  ['es', '', 5],
  ['ed', '', 5],
  ['s', '', 4],
]
const stem = (w: string) => {
  if (/\d/.test(w) || w.length < 4) return w
  for (const [suf, rep, min] of SUFFIXES) {
    if (w.length >= min && w.endsWith(suf) && !(suf === 's' && w.endsWith('ss'))) {
      w = w.slice(0, -suf.length) + rep
      break
    }
  }
  if (w.length > 3 && w.endsWith('e')) w = w.slice(0, -1)
  if (w.length > 4 && /([bdfgklmnprt])\1$/.test(w)) w = w.slice(0, -1)
  return w
}

export const tokenize = (s: string | null | undefined): string[] =>
  normalize(s)
    .split(' ')
    .map((t) => t.replace(/^[./]+|[./]+$/g, ''))
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem)

const variantsFor = (term: string, extra?: string | null): string[] => {
  const base = [term, ...(extra ? extra.split(/[,;\n]/) : [])].map((t) => t.trim()).filter(Boolean)
  const out = new Set(base.map((b) => normalize(b).trim()))
  for (const b of base) {
    const nb = normalize(b).trim()
    for (const group of SYNONYM_GROUPS) {
      if (group.some((g) => normalize(g).trim() === nb)) group.forEach((g) => out.add(normalize(g).trim()))
    }
  }
  return [...out].filter(Boolean)
}

/**
 * 1   = exact phrase (or a synonym) found
 * 0.6 = every word of the phrase found somewhere (stemmed)
 * 0   = not found
 */
const findTerm = (haystackNorm: string, haystackTokens: Set<string>, term: string, synonyms?: string | null): number => {
  let best = 0
  for (const v of variantsFor(term, synonyms)) {
    if (!v) continue
    const escaped = v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    if (new RegExp(`(^|\\s)${escaped}(\\s|$)`).test(haystackNorm)) return 1
    const parts = tokenize(v)
    if (parts.length > 1 && parts.every((p) => haystackTokens.has(p))) best = Math.max(best, 0.6)
    else if (parts.length === 1 && haystackTokens.has(parts[0])) best = Math.max(best, 1)
  }
  return best
}

/* ------------------------------------------------------------------ */
/* TF-IDF relevance                                                     */
/* ------------------------------------------------------------------ */

export type CorpusStats = { docs: number; df: Map<string, number> }

export const buildCorpusStats = (documents: string[]): CorpusStats => {
  const df = new Map<string, number>()
  for (const d of documents) for (const t of new Set(tokenize(d))) df.set(t, (df.get(t) || 0) + 1)
  return { docs: documents.length, df }
}

const tfidf = (tokens: string[], stats: CorpusStats) => {
  const tf = new Map<string, number>()
  for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1)
  const vec = new Map<string, number>()
  for (const [t, c] of tf) {
    const idf = Math.log((stats.docs + 1) / ((stats.df.get(t) || 0) + 1)) + 1
    vec.set(t, (1 + Math.log(c)) * idf)
  }
  return vec
}

const cosine = (a: Map<string, number>, b: Map<string, number>) => {
  let dot = 0
  let na = 0
  let nb = 0
  for (const [, v] of a) na += v * v
  for (const [, v] of b) nb += v * v
  for (const [k, v] of a) {
    const w = b.get(k)
    if (w) dot += v * w
  }
  return na && nb ? dot / Math.sqrt(na * nb) : 0
}

/* ------------------------------------------------------------------ */
/* Factors                                                              */
/* ------------------------------------------------------------------ */

const EDU_RANK: Record<string, number> = { none: 0, highschool: 1, diploma: 2, bachelor: 3, master: 4, phd: 5 }

const truthy = (s: string) => /^(y|yes|true|1|نعم)$/i.test(s.trim())
const falsy = (s: string) => /^(n|no|false|0|لا)$/i.test(s.trim())

export function scoreApplicant(
  job: JobForMatching,
  applicant: ApplicantForMatching,
  weights: MatchWeights = DEFAULT_WEIGHTS,
  corpus?: CorpusStats,
): MatchResult {
  const profileText = [
    applicant.resumeText,
    applicant.skillsText,
    applicant.certificationsText,
    applicant.coverLetter,
    applicant.currentTitle,
    applicant.fieldOfStudy,
  ]
    .filter(Boolean)
    .join('\n')
  const hayNorm = normalize(profileText)
  const hayTokens = new Set(tokenize(profileText))

  /* ---- skills ---- */
  const skills = (job.skills || []).filter((s) => s?.skill)
  let skillTotal = 0
  let skillGot = 0
  const matchedSkills: string[] = []
  const missingSkills: string[] = []
  const missingMustHaves: string[] = []
  for (const s of skills) {
    const w = Number(s.weight || 3) * (s.mustHave ? 1.5 : 1)
    const hit = findTerm(hayNorm, hayTokens, s.skill, s.synonyms)
    skillTotal += w
    skillGot += w * hit
    if (hit > 0) matchedSkills.push(s.skill)
    else {
      missingSkills.push(s.skill)
      if (s.mustHave) missingMustHaves.push(s.skill)
    }
  }
  const skillsFactor: FactorResult = {
    score: skills.length ? skillGot / skillTotal : 0.5,
    weight: weights.skills,
    matched: matchedSkills,
    missing: missingSkills,
    detail: skills.length
      ? `${matchedSkills.length} of ${skills.length} skills found`
      : 'No skills defined on the job – neutral score',
  }

  /* ---- certifications ---- */
  const certs = (job.certifications || []).filter((c) => c?.name)
  const certMatched: string[] = []
  const certMissing: string[] = []
  for (const c of certs) {
    if (findTerm(hayNorm, hayTokens, c.name, c.synonyms) > 0) certMatched.push(c.name)
    else {
      certMissing.push(c.name)
      if (c.mustHave) missingMustHaves.push(c.name)
    }
  }
  const certFactor: FactorResult = {
    score: certs.length ? certMatched.length / certs.length : 0.5,
    weight: certs.length ? weights.certifications : 0,
    matched: certMatched,
    missing: certMissing,
    detail: certs.length ? `${certMatched.length} of ${certs.length} certifications found` : 'Not required',
  }

  /* ---- experience ---- */
  const years = applicant.yearsExperience ?? inferYears(profileText)
  const min = job.experienceMin ?? 0
  const max = job.experienceMax ?? null
  let expScore = 0.5
  let expDetail = 'Years of experience not provided'
  if (years !== null && years !== undefined) {
    if (!min && !max) {
      expScore = 1
      expDetail = `${years} years (no minimum set)`
    } else if (years < min) {
      expScore = Math.max(0, (years / Math.max(min, 1)) * 0.75)
      expDetail = `${years} years – below the ${min}-year minimum`
    } else if (max && years > max + 5) {
      expScore = 0.8
      expDetail = `${years} years – well above the ${min}–${max} range (may be over-qualified)`
    } else {
      expScore = 1
      expDetail = `${years} years – meets the ${max ? `${min}–${max}` : `${min}+`} requirement`
    }
  }
  const expFactor: FactorResult = { score: expScore, weight: weights.experience, detail: expDetail }

  /* ---- education ---- */
  const reqEdu = EDU_RANK[job.educationLevel || 'none'] ?? 0
  const hasEdu = applicant.educationLevel ? (EDU_RANK[applicant.educationLevel] ?? 0) : null
  let eduScore = 1
  let eduDetail = 'No requirement'
  if (reqEdu > 0) {
    if (hasEdu === null) {
      eduScore = 0.4
      eduDetail = 'Education level not provided'
    } else if (hasEdu >= reqEdu) {
      eduScore = 1
      eduDetail = 'Meets the education requirement'
    } else if (hasEdu === reqEdu - 1) {
      eduScore = 0.5
      eduDetail = 'One level below the requirement'
    } else {
      eduScore = 0.1
      eduDetail = 'Below the education requirement'
    }
  }
  const eduFactor: FactorResult = { score: eduScore, weight: reqEdu > 0 ? weights.education : weights.education / 2, detail: eduDetail }

  /* ---- screening ---- */
  const questions = (job.screeningQuestions || []).filter((q) => q?.question)
  const answers = applicant.screeningAnswers || []
  let qTotal = 0
  let qGot = 0
  let knockoutFailed = false
  const screening: MatchResult['screening'] = []
  questions.forEach((q, i) => {
    const ans = String(answers.find((a) => a.question === q.question)?.answer ?? answers[i]?.answer ?? '').trim()
    const ideal = String(q.idealAnswer || '').trim()
    let passed: boolean | null = null
    if (ideal) {
      switch (q.type) {
        case 'yesno':
          passed = truthy(ideal) ? truthy(ans) : falsy(ideal) ? falsy(ans) : null
          break
        case 'number':
          passed = ans !== '' && Number(ans) >= Number(ideal)
          break
        case 'select':
          passed = normalize(ans) === normalize(ideal)
          break
        default: {
          const keys = ideal.split(/[,;]/).map((k) => k.trim()).filter(Boolean)
          const n = normalize(ans)
          passed = keys.length ? keys.some((k) => n.includes(normalize(k).trim())) : null
        }
      }
    }
    const w = Number(q.weight || 3)
    if (passed !== null) {
      qTotal += w
      if (passed) qGot += w
      if (!passed && q.knockout) knockoutFailed = true
    }
    screening.push({ question: q.question, answer: ans, passed })
  })
  const screenFactor: FactorResult = {
    score: qTotal ? qGot / qTotal : 0.5,
    weight: qTotal ? weights.screening : 0,
    detail: qTotal ? `${screening.filter((s) => s.passed).length} of ${screening.filter((s) => s.passed !== null).length} answers as expected` : 'No scored questions',
  }

  /* ---- relevance (TF-IDF) ---- */
  const jobText = [job.title, job.title, job.text, job.keywords, ...skills.map((s) => s.skill)].join('\n')
  const stats = corpus || buildCorpusStats([jobText, profileText])
  const jobVec = tfidf(tokenize(jobText), stats)
  const cvVec = tfidf(tokenize(profileText), stats)
  const cos = cosine(jobVec, cvVec)
  const titleOverlap = jaccard(tokenize(job.title), tokenize(applicant.currentTitle || ''))
  const keywordHits = (job.keywords || '')
    .split(/[,\n;]/)
    .map((k) => k.trim())
    .filter(Boolean)
    .filter((k) => findTerm(hayNorm, hayTokens, k) > 0)
  const relScore = Math.min(1, cos / 0.32) * 0.75 + titleOverlap * 0.25
  const shared = [...jobVec.entries()]
    .filter(([t]) => cvVec.has(t))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([t]) => t)
  const relFactor: FactorResult = {
    score: profileText.trim() ? relScore : 0,
    weight: weights.relevance,
    matched: [...new Set([...keywordHits, ...shared])].slice(0, 12),
    detail: profileText.trim()
      ? `CV similarity ${Math.round(cos * 100)}% · title overlap ${Math.round(titleOverlap * 100)}%`
      : 'No CV text could be read',
  }

  /* ---- combine ---- */
  const factors = {
    skills: skillsFactor,
    experience: expFactor,
    relevance: relFactor,
    certifications: certFactor,
    education: eduFactor,
    screening: screenFactor,
  }
  const totalWeight = Object.values(factors).reduce((s, f) => s + f.weight, 0) || 1
  let raw = (Object.values(factors).reduce((s, f) => s + f.score * f.weight, 0) / totalWeight) * 100
  const penalty = missingMustHaves.length * weights.missingMustHavePenalty
  raw = Math.max(0, raw - penalty)
  if (knockoutFailed) raw = Math.min(raw, 35)
  const score = Math.round(raw)

  const band: MatchResult['band'] = knockoutFailed
    ? 'knockout'
    : score >= 75
      ? 'strong'
      : score >= 60
        ? 'good'
        : score >= 40
          ? 'fair'
          : 'low'

  const summaryParts = [
    skills.length ? `Has ${matchedSkills.length}/${skills.length} skills` : null,
    missingMustHaves.length ? `missing must-have: ${missingMustHaves.join(', ')}` : null,
    expDetail,
    knockoutFailed ? 'failed a knockout question' : null,
  ].filter(Boolean)

  return {
    score,
    band,
    knockoutFailed,
    factors,
    penalty,
    matchedSkills: [...matchedSkills, ...certMatched],
    missingSkills: [...missingSkills, ...certMissing],
    missingMustHaves,
    screening,
    topTerms: relFactor.matched || [],
    summary: summaryParts.join(' · '),
  }
}

const jaccard = (a: string[], b: string[]) => {
  const A = new Set(a)
  const B = new Set(b)
  if (!A.size || !B.size) return 0
  let inter = 0
  for (const x of A) if (B.has(x)) inter++
  return inter / (A.size + B.size - inter)
}

/** "10+ years of experience", "over 8 years", "5 yrs" → max number found (capped at 45) */
export const inferYears = (text: string): number | null => {
  const re = /(\d{1,2})\s*\+?\s*(?:years?|yrs?)\b/gi
  let best: number | null = null
  for (const m of text.matchAll(re)) {
    const n = Number(m[1])
    if (n > 0 && n <= 45) best = best === null ? n : Math.max(best, n)
  }
  return best
}
