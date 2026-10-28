import type { Payload } from 'payload'

export type AiAssessment = { score: number; summary: string; strengths: string[]; concerns: string[] }

/**
 * Optional AI fit assessment (Anthropic Messages API). Only runs when enabled in
 * Settings → Integrations → AI screening and an API key is set. The deterministic
 * match score stays the primary ranking signal; this adds a readable summary.
 */
export async function aiAssess(
  payload: Payload,
  input: { jobTitle: string; jobText: string; resumeText: string; profile: string },
): Promise<AiAssessment | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ai: any
  try {
    const integrations = await payload.findGlobal({
      slug: 'integrations',
      context: { decryptSecrets: true },
      overrideAccess: true,
    })
    ai = integrations?.ai
  } catch {
    return null
  }
  const apiKey = ai?.apiKey || process.env.ANTHROPIC_API_KEY
  if (!ai?.enabled || !apiKey) return null

  const prompt = `You are assisting a recruiter. Assess how well this candidate fits the job. Be factual and only use the information given; do not infer age, nationality, gender, religion or other protected characteristics and do not let them influence the assessment.

<job title="${input.jobTitle.replace(/"/g, "'")}">
${input.jobText.slice(0, 6000)}
</job>

<candidate_profile>
${input.profile.slice(0, 2000)}
</candidate_profile>

<cv>
${input.resumeText.slice(0, 12000)}
</cv>

Reply with JSON only: {"score": <0-100 integer>, "summary": "<2-3 sentence assessment>", "strengths": ["..."], "concerns": ["..."]}`

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: ai.model || 'claude-sonnet-5-5',
        max_tokens: 600,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: AbortSignal.timeout(45_000),
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = await res.json()
    const text: string = json?.content?.find((c: { type: string }) => c.type === 'text')?.text || ''
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return null
    const parsed = JSON.parse(match[0])
    return {
      score: Math.max(0, Math.min(100, Math.round(Number(parsed.score) || 0))),
      summary: String(parsed.summary || ''),
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.map(String).slice(0, 5) : [],
      concerns: Array.isArray(parsed.concerns) ? parsed.concerns.map(String).slice(0, 5) : [],
    }
  } catch (err) {
    payload.logger.warn(`[careers] AI assessment failed: ${String(err)}`)
    return null
  }
}
