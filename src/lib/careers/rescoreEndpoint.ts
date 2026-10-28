import type { Endpoint } from 'payload'

import { userHasRole } from '@/access'
import { json } from '@/lib/publicGuard'

/** POST /api/job-openings/:id/rescore – HR button to re-run matching for every applicant */
export const rescoreEndpoint: Endpoint = {
  path: '/:id/rescore',
  method: 'post',
  handler: async (req) => {
    if (!userHasRole(req.user, 'hr')) return json({ ok: false, error: 'Forbidden' }, 403)
    const id = req.routeParams?.id as string
    await req.payload.jobs.queue({ task: 'rescoreJob', input: { jobId: String(id) } })
    // run immediately rather than waiting for the next cron tick
    void req.payload.jobs.run({ queue: 'default', limit: 5 })
    return json({ ok: true, message: 'Re-scoring started' })
  },
}
