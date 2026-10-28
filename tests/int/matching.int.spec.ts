import { describe, expect, it } from 'vitest'
import { scoreApplicant, buildCorpusStats } from '@/lib/careers/matching'

const job = {
  title: 'QA/QC Inspector (Piping)',
  skills: [
    { skill: 'Piping inspection', weight: '5', mustHave: true },
    { skill: 'QA/QC', weight: '4', mustHave: true },
    { skill: 'ASME B31.3', weight: '3' },
    { skill: 'Hydrotest', weight: '3' },
    { skill: 'Aramco', weight: '2', synonyms: 'SAES, SATIP' },
  ],
  certifications: [{ name: 'API 570', mustHave: false }, { name: 'CSWIP 3.1' }],
  keywords: 'petrochemical, shutdown, NDT',
  experienceMin: 5,
  experienceMax: 12,
  educationLevel: 'diploma',
  text: 'Inspect piping fabrication and erection on petrochemical sites. Witness hydrotests, review NDT reports, ensure compliance with ASME B31.3 and Saudi Aramco standards.',
  screeningQuestions: [
    { question: 'Do you hold a valid Aramco inspector approval?', type: 'yesno', idealAnswer: 'yes', knockout: false, weight: '4' },
    { question: 'Are you currently in Saudi Arabia?', type: 'yesno', idealAnswer: 'yes', knockout: true, weight: '3' },
  ],
}
const strong = {
  resumeText: 'Senior QC Inspector - Piping. 9 years experience in quality control of piping systems for Saudi Aramco and SABIC projects. Witnessed hydrotest packages, reviewed NDT (RT, UT) reports, ASME B31.3. Certified API 570 and CSWIP 3.1 welding inspector. Shutdown and turnaround experience.',
  yearsExperience: 9, educationLevel: 'diploma', currentTitle: 'QC Inspector Piping',
  screeningAnswers: [{ question: 'Do you hold a valid Aramco inspector approval?', answer: 'yes' }, { question: 'Are you currently in Saudi Arabia?', answer: 'yes' }],
}
const weak = {
  resumeText: 'Sales executive with 3 years experience in FMCG retail distribution. Excellent communication, CRM, Excel.',
  yearsExperience: 3, educationLevel: 'bachelor', currentTitle: 'Sales Executive',
  screeningAnswers: [{ question: 'Do you hold a valid Aramco inspector approval?', answer: 'no' }, { question: 'Are you currently in Saudi Arabia?', answer: 'no' }],
}
const mid = {
  resumeText: 'Mechanical inspector, 4 yrs. Pipe fitting inspection, hydro test, quality assurance documentation. Worked on petrochemical shutdown.',
  yearsExperience: 4, educationLevel: 'diploma', currentTitle: 'Mechanical Inspector',
  screeningAnswers: [{ question: 'Do you hold a valid Aramco inspector approval?', answer: 'no' }, { question: 'Are you currently in Saudi Arabia?', answer: 'yes' }],
}
const corpus = buildCorpusStats([job.text, strong.resumeText, weak.resumeText, mid.resumeText])
const score = (a: typeof strong) => scoreApplicant(job as never, a as never, undefined, corpus)

describe('applicant matching', () => {
  it('ranks a strong candidate above a partial one above an unrelated one', () => {
    const [s, m, w] = [score(strong), score(mid), score(weak)]
    expect(s.score).toBeGreaterThan(m.score)
    expect(m.score).toBeGreaterThan(w.score)
    expect(s.band).toBe('strong')
  })

  it('finds every required skill in a matching CV, including synonyms', () => {
    const s = score(strong)
    expect(s.matchedSkills).toEqual(expect.arrayContaining(['Piping inspection', 'QA/QC', 'ASME B31.3', 'Hydrotest', 'Aramco']))
    expect(s.missingSkills).toHaveLength(0)
  })

  it('recognises variants like "hydro test" and "pipe fitting inspection"', () => {
    expect(score(mid).matchedSkills).toEqual(expect.arrayContaining(['Hydrotest']))
  })

  it('flags a failed knockout screening question', () => {
    expect(score(weak).knockoutFailed).toBe(true)
    expect(score(strong).knockoutFailed).toBe(false)
  })

  it('keeps every score within 0–100 and explains each factor', () => {
    for (const a of [strong, mid, weak]) {
      const r = score(a)
      expect(r.score).toBeGreaterThanOrEqual(0)
      expect(r.score).toBeLessThanOrEqual(100)
      for (const f of Object.values(r.factors)) expect(typeof f.detail).toBe('string')
    }
  })
})
