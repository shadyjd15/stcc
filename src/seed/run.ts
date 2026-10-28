import config from '@payload-config'
import { getPayload } from 'payload'

import { seed } from './index'

/**
 * Loads the website content (divisions, pages, forms, menus, email templates, vendor
 * document types…). Safe to re-run: existing documents are updated, not duplicated.
 *
 *   SEED_ADMIN_EMAIL=you@stcc.sa SEED_ADMIN_PASSWORD='…' pnpm seed
 */
const payload = await getPayload({ config })
await seed(payload, { adminEmail: process.env.SEED_ADMIN_EMAIL, adminPassword: process.env.SEED_ADMIN_PASSWORD })
process.exit(0)
