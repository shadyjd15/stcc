import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { buildConfig, type Plugin } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { isStaffUser } from './access'
import { AuditLogs, withAuditLog } from './collections/AuditLogs'
import { Divisions } from './collections/Divisions'
import { Documents } from './collections/Documents'
import { EmailLogs } from './collections/EmailLogs'
import { FormFiles } from './collections/FormFiles'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { Pages } from './collections/Pages'
import { Partners } from './collections/Partners'
import { Projects } from './collections/Projects'
import { ReusableBlocks } from './collections/ReusableBlocks'
import { TeamMembers } from './collections/TeamMembers'
import { Users } from './collections/Users'
import { Applications } from './collections/careers/Applications'
import { JobOpenings } from './collections/careers/JobOpenings'
import { Resumes } from './collections/careers/Resumes'
import { VendorDocuments } from './collections/vendors/VendorDocuments'
import { Vendors } from './collections/vendors/Vendors'
import { rootEndpoints } from './endpoints'
import { defaultLexical } from './fields/defaultLexical'
import { CareersSettings } from './globals/CareersSettings'
import { EmailSettings } from './globals/EmailSettings'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Integrations } from './globals/Integrations'
import { SiteSettings } from './globals/SiteSettings'
import { VendorSettings } from './globals/VendorSettings'
import { payloadLocalization } from './i18n/config'
import { tasks } from './jobs/tasks'
import { cmsEmailAdapter } from './lib/email/adapter'
import { plugins } from './plugins'
import { migrations } from './migrations'
import { seed } from './seed'
import { storagePlugins } from './lib/storage'
import { getServerSideURL } from './utilities/getURL'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * TLS for a hosted database (Neon, Supabase…). DATABASE_SSL=require verifies the certificate
 * (optionally against DATABASE_CA_CERT, a PEM string); "no-verify" encrypts without verifying.
 * Leave unset for a local database or when the URL already has ?sslmode=…
 */
const databaseSsl = () => {
  const mode = process.env.DATABASE_SSL
  if (mode === 'require') return { ssl: { rejectUnauthorized: true, ca: process.env.DATABASE_CA_CERT?.replace(/\\n/g, '\n') || undefined } }
  if (mode === 'no-verify') return { ssl: { rejectUnauthorized: false } }
  return {}
}


const isBuild = process.env.NEXT_PHASE === 'phase-production-build'

export default buildConfig(
  withAuditLog({
    serverURL: getServerSideURL(),
    admin: {
      user: Users.slug,
      avatar: 'default',
      meta: {
        titleSuffix: ' · STCC CMS',
        icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' }],
      },
      components: {
        graphics: { Logo: '@/admin/Brand#Logo', Icon: '@/admin/Brand#Icon' },
        beforeDashboard: ['@/admin/dashboard/Dashboard#Dashboard'],
        afterNavLinks: ['@/admin/NavLinks#NavLinks'],
        views: {
          analytics: { Component: '@/admin/analytics/AnalyticsView#AnalyticsView', path: '/analytics' },
          careersPipeline: { Component: '@/admin/careers/PipelineView#PipelineView', path: '/careers-pipeline' },
        },
      },
      importMap: { baseDir: path.resolve(dirname) },
      livePreview: {
        breakpoints: [
          { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
          { label: 'Tablet', name: 'tablet', width: 820, height: 1180 },
          { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
        ],
      },
      dateFormat: 'd MMM yyyy, HH:mm',
    },
    editor: defaultLexical,
    db: postgresAdapter({
      pool: {
        // Neon provides both; the direct (unpooled) one suits a long-running server like this best
        connectionString: process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || '',
        // keep the connection count small on shared hosting / free managed databases
        max: Number(process.env.DATABASE_POOL_MAX || 10),
        ...databaseSsl(),
      },
      // In production, schema changes go through migrations (see README)
      push: process.env.NODE_ENV !== 'production' && process.env.PAYLOAD_DB_PUSH !== 'false',
      migrationDir: path.resolve(dirname, 'migrations'),
      // the production server applies pending migrations itself on start-up
      prodMigrations: isBuild ? undefined : migrations,
    }),
    localization: payloadLocalization,
    collections: [
      Pages,
      Divisions,
      Projects,
      News,
      Partners,
      TeamMembers,
      Documents,
      ReusableBlocks,
      Media,
      FormFiles,
      JobOpenings,
      Applications,
      Resumes,
      Vendors,
      VendorDocuments,
      Users,
      EmailLogs,
      AuditLogs,
    ],
    globals: [SiteSettings, Header, Footer, EmailSettings, Integrations, CareersSettings, VendorSettings],
    endpoints: rootEndpoints,
    email: cmsEmailAdapter(),
    cors: [getServerSideURL()].filter(Boolean),
    csrf: [getServerSideURL()].filter(Boolean),
    plugins: [...plugins, ...storagePlugins()],
    secret: process.env.PAYLOAD_SECRET,
    sharp,
    // First boot on an empty database: load the website content and create the first admin
    onInit: async (payload) => {
      if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.SEED_ON_EMPTY === 'false') return
      const { totalDocs } = await payload.count({ collection: 'pages', overrideAccess: true })
      if (totalDocs > 0) return
      payload.logger.info('[seed] empty database detected – loading website content')
      await seed(payload, { adminEmail: process.env.SEED_ADMIN_EMAIL, adminPassword: process.env.SEED_ADMIN_PASSWORD })
    },
    upload: { limits: { fileSize: 25 * 1024 * 1024 } },
    typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
    graphQL: { disable: true },
    jobs: {
      tasks,
      deleteJobOnComplete: true,
      access: {
        run: ({ req }) => {
          if (isStaffUser(req.user)) return true
          const secret = process.env.CRON_SECRET
          return Boolean(secret) && req.headers.get('authorization') === `Bearer ${secret}`
        },
        queue: ({ req }) => isStaffUser(req.user),
      },
      shouldAutoRun: () => !isBuild && process.env.DISABLE_JOB_RUNNER !== 'true',
      autoRun: [
        { cron: '*/10 * * * * *', queue: 'email', limit: 20 },
        { cron: '*/20 * * * * *', queue: 'default', limit: 10 },
        { cron: '0 */5 * * * *', queue: 'maintenance', limit: 2 },
      ],
    },
  }),
)
