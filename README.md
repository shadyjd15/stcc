# STCC website & CMS

The website for **Sahara Technical Contracting Co.** ([stcc.sa](https://stcc.sa)) together with the CMS that runs it.

**Built with**
- Next.js 16 (App Router) and Payload CMS 3
- PostgreSQL 16

**What it covers**
- Page builder with live preview and scheduled publishing
- Media library
- Menus and footer
- Careers with applicant matching
- Enterprise vendor registration portal
- Forms with routed email notifications
- Cookie-free analytics
- Cloudflare integration

**Contents**

1. [Run it locally](#1-run-it-locally)
2. [Deploy to production](#2-deploy-to-production)
3. [Cloudflare setup](#3-cloudflare-setup)
4. [Email setup](#4-email-setup)
5. [Using the CMS](#5-using-the-cms)
6. [How applicant matching works](#6-how-applicant-matching-works)
7. [Vendor registration workflow](#7-vendor-registration-workflow)
8. [Analytics](#8-analytics)
9. [Backups, security and maintenance](#9-backups-security-and-maintenance)
10. [Project structure](#10-project-structure)

---

## 1. Run it locally

Requirements: Node 22, pnpm 10, PostgreSQL 16.

```bash
cp .env.example .env          # set DATABASE_URL and the secrets
pnpm install
pnpm dev                      # http://localhost:3000 – CMS at /admin
```

**First start**
- On an empty database, the website content is loaded automatically:
  - the seven divisions and all pages
  - forms, menus and email templates
  - vendor document types and sample jobs
- The first admin is created from `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`.
- `pnpm seed` re-applies the content at any time. It updates documents and never duplicates them.

**Schema changes in development**
- The dev server syncs the database schema automatically.
- After changing collections, create a migration for production:

```bash
pnpm migrate:create my-change   # writes src/migrations/…
pnpm generate:types             # refresh src/payload-types.ts
```

**Testing email locally**
1. Run `node scripts/mail-catcher.mjs`. It listens on port 2525 and saves every message to `.mail/`.
2. In the CMS, open **Settings → Email & notifications** and set:
   - host: `127.0.0.1`
   - port: `2525`
   - security: `none`

**Useful scripts**

| Command | What it does |
| --- | --- |
| `pnpm test` | Unit tests (matching engine) |
| `node scripts/e2e-vendor.cjs` | Full vendor journey: sign-up, verification, documents, review and approval |
| `node scripts/e2e-apply.cjs …` | Applies to a job through the real form |
| `node scripts/e2e-traffic.cjs` | Simulated visitors for analytics |

## 2. Deploy to production

Two supported ways:

- **A. Hostinger Business web hosting (Node.js app).** No server to manage. The database and files live in managed services.
- **B. Docker on any VPS.** Everything runs on one machine.

### 2A. Hostinger Business web hosting

Hostinger rebuilds the app folder on every deploy and has no PostgreSQL on web plans, so on Hostinger:

| Data | Where it lives |
| --- | --- |
| Database | Managed PostgreSQL: [Neon](https://neon.tech) (recommended) or [Supabase](https://supabase.com). The free tiers are enough to start. |
| Images and brochures | Cloudflare R2 **public** bucket, served from your own sub-domain (e.g. `media.stcc.sa`) |
| CVs, vendor documents, form attachments | Cloudflare R2 **private** bucket. Never public; files are streamed through the CMS, which checks permissions |
| Emails, CV scoring, nightly maintenance | Run inside the app, plus an hPanel cron job as a safety net |

**1. Put the code on GitHub.** Create a private repository and push this project to it.

**2. Create the database.**
- **Neon** (recommended)
  1. New project. Pick the region closest to Saudi Arabia that's offered, e.g. Frankfurt (`eu-central-1`).
  2. Copy the connection string (the *direct* one, not "pooled").
  3. Change `sslmode=require` at the end to `sslmode=verify-full`.
  4. Use it as `DATABASE_URL`.
- **Supabase**
  1. Project Settings → Database → copy the *Session pooler* or direct connection string.
  2. **Remove** any `?sslmode=…` from it.
  3. Set `DATABASE_SSL=require` and paste the downloaded "SSL certificate" into `DATABASE_CA_CERT`. Use `DATABASE_SSL=no-verify` only if you can't use the certificate.

**3. Create the storage (Cloudflare → R2).**
1. Create two buckets:
   - `stcc-media`: under *Settings → Custom Domains*, connect `media.stcc.sa`. This is your `R2_PUBLIC_URL`.
   - `stcc-private`: leave public access **off**.
2. *R2 → Manage API tokens* → create a token with **Object Read & Write**, limited to those two buckets.
3. Note the **Access Key ID**, **Secret Access Key** and the **S3 endpoint** (`https://<account-id>.r2.cloudflarestorage.com`).

**4. Create the app in hPanel.**
1. Go to *Websites → Add website → Node.js Apps → Import Git repository* and connect the GitHub repository.
2. Use these settings:
   - **Framework:** Next.js (auto-detected)
   - **Node version:** 22
   - **Build command:** `pnpm run build`. pnpm is picked up from the lockfile automatically.
   - **Entry file:** `server.mjs` (only if hPanel asks; `pnpm start` runs the same file)
   - Leave *Output directory* as suggested (`.next`)
3. **Environment variables:**

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SERVER_URL` | `https://stcc.sa` |
| `DATABASE_URL` | from step 2 |
| `DATABASE_SSL`, `DATABASE_CA_CERT` | only for Supabase (step 2) |
| `DATABASE_POOL_MAX` | `5` |
| `PAYLOAD_SECRET`, `ENCRYPTION_KEY`, `PREVIEW_SECRET`, `CRON_SECRET` | each a new random value: `openssl rand -hex 32` |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` | your first admin login |
| `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` | from step 3 |
| `R2_BUCKET` / `R2_PRIVATE_BUCKET` | `stcc-media` / `stcc-private` |
| `R2_PUBLIC_URL` | `https://media.stcc.sa` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | from Cloudflare Turnstile (optional, section 3) |

   Don't set `NEXT_OUTPUT` (that's for Docker only).
4. **Deploy.** The build takes about 2 minutes. On the first start the app:
   - creates all database tables
   - loads the website content
   - creates your admin account

   Open `https://stcc.sa/admin` and sign in. Then delete `SEED_ADMIN_PASSWORD` from the variables and redeploy.

**5. Add the cron job.** In hPanel, go to *Advanced → Cron Jobs → Custom* and set it to run every 5 minutes:

```bash
curl -s -H "Authorization: Bearer YOUR_CRON_SECRET" "https://stcc.sa/api/payload-jobs/run?allQueues=true" > /dev/null
```

The app also runs its jobs on its own. The cron job guarantees that emails, CV scoring and the nightly maintenance still happen after a restart or a quiet period.

**6. Domain and HTTPS.**
- In hPanel, issue the free SSL certificate for `stcc.sa`.
- Point the domain at Hostinger with the Cloudflare proxy on (orange cloud).
- Set SSL to **Full (strict)**.
- Follow section 3 for the cache rules and Turnstile.

**Updating:** push to GitHub. Hostinger rebuilds automatically, and any new database migrations run on start. If a build fails, the previous version stays live.

**Good to know**
- All websites on the plan share its memory and process limits. The build peaks at around 850 MB.
- Mail can go through your Hostinger mailbox: SMTP `smtp.hostinger.com`, port 465, SSL. Configure it in the CMS (section 4).
- **Backups:**
  - **Database:** Neon and Supabase keep their own backups, and you can also schedule `pg_dump` from any machine.
  - **Files:** copy both R2 buckets elsewhere from time to time, for example with `rclone sync` to another bucket or your own storage.

### 2B. Docker on a VPS

Any Linux server with Docker works. 2 vCPU and 4 GB RAM is plenty.

```bash
git clone … stcc-website && cd stcc-website
cp .env.example .env
# fill in: NEXT_PUBLIC_SERVER_URL, POSTGRES_PASSWORD, PAYLOAD_SECRET, ENCRYPTION_KEY,
#          PREVIEW_SECRET, CRON_SECRET, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD
#   (generate each secret with: openssl rand -hex 32)
docker compose up -d --build
```

**What happens on start**
1. Pending database migrations are applied automatically.
2. On the very first start, the content is seeded and the admin account is created.
3. Sign in at `https://your-domain/admin`.
4. Then remove `SEED_ADMIN_PASSWORD` from `.env`.

**Storage**

| Data | Where it lives |
| --- | --- |
| Uploads (images, CVs, vendor documents) | `uploads` volume, or R2 if the `R2_*` variables are set (as in 2A) |
| Database | `db-data` volume |

CVs, vendor documents and form attachments are only ever served to signed-in staff, or to the vendor who uploaded them. That's true whether they're on disk or in the private R2 bucket.

**Optional profiles**

```bash
docker compose --profile tunnel up -d   # Cloudflare Tunnel (no open ports needed)
docker compose --profile backup up -d   # nightly database dumps into ./backups
```

**Updating**

```bash
git pull
docker compose up -d --build   # migrations run on start
```

### Both

**Health check:** `GET /api/health` returns `{ ok: true, db: "up" }`. Point an uptime monitor at it.

**Background jobs** (emails, CV scoring, nightly maintenance) run inside the app.
- `GET /api/payload-jobs/run?allQueues=true` with `Authorization: Bearer <CRON_SECRET>` runs anything pending. Use it for an external cron.
- If you run several app instances, set `DISABLE_JOB_RUNNER=true` on all but one.

## 3. Cloudflare setup

**1. DNS and SSL**
- Add `stcc.sa` to Cloudflare.
- Point the `A` record at the server with the proxy on (orange cloud), or use the tunnel profile.
- Set **SSL/TLS → Full (strict)**.
- Turn on **Always Use HTTPS**, **HTTP/3** and **Brotli**.

**2. Cache rules** (Caching → Cache Rules), in this order:

| Rule | Match | Action |
| --- | --- | --- |
| Bypass dynamic | URI path starts with `/admin` **or** `/api` **or** `/vendor-portal` **or** `/next/` | Bypass cache |
| Static assets | URI path starts with `/_next/static` | Eligible for cache · Edge TTL 1 year · Browser TTL 1 year |
| Images | URI path starts with `/_next/image` **or** `/api/media/file` | Eligible for cache · Edge TTL 30 days |
| Pages | Hostname equals `stcc.sa` (everything else) | Eligible for cache · Edge TTL "Use cache-control header" |

Pages send `s-maxage` headers. When an editor publishes, the CMS purges the changed URLs from Cloudflare automatically, so visitors get fresh pages within seconds while most requests are served from the edge.

**3. API token.** In My Profile → API Tokens, create a token with:
- Zone → **Cache Purge → Purge**
- Zone → **Analytics → Read**

Limit it to the `stcc.sa` zone. In the CMS, open **Settings → Integrations → Cloudflare** and enter the **Zone ID** and the token. This enables:
- automatic purge on publish
- a "Purge cache" button
- the **Cloudflare edge** panel in Analytics (requests, cache-hit ratio, bandwidth saved, threats blocked, countries)

**4. Turnstile (spam protection)**
1. Under Turnstile, add a widget for `stcc.sa`.
2. Put the **site key** in `.env` as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and in the CMS.
3. Put the **secret key** in the CMS (Integrations → Cloudflare).

All public forms are protected: contact, quote, job applications and vendor sign-up. They also have a honeypot field and per-IP rate limits.

**5. Web Analytics (optional).** Paste the Cloudflare Web Analytics token into Integrations to load Cloudflare's beacon alongside the built-in analytics.

**6. Tunnel (optional).**
1. Zero Trust → Networks → Tunnels → create a tunnel.
2. Copy its token into `CLOUDFLARE_TUNNEL_TOKEN`.
3. Add a public hostname `stcc.sa → http://app:3000`.
4. Run `docker compose --profile tunnel up -d`. No inbound ports are needed.

**Real visitor IPs and countries** come from Cloudflare's `CF-Connecting-IP` and `CF-IPCountry` headers. Turn on **Network → IP Geolocation**.

## 4. Email setup

Everything lives in **Settings → Email & notifications**.

**SMTP server.** Microsoft 365, Google Workspace, Zoho or any provider works:
- Microsoft 365: `smtp.office365.com:587`, STARTTLS, with a licensed mailbox or an SMTP AUTH-enabled account.
- Save, then use **Send test email**.
- Passwords are stored encrypted.

**Inboxes.** Set one or more addresses for each of:
- contact form
- quote requests
- job applications
- vendor registrations
- fallback

Each form can also be pointed at a specific inbox and add extra recipients (Forms → *form* → Notifications). Individual team members can opt in under their user profile.

**Templates.** Every email uses STCC branding with `{{placeholders}}`:
- form auto-replies
- candidate emails: received, shortlisted, interview, offer, rejected
- the vendor email for each review step

To edit them:
- forms: Forms
- candidate emails: Careers settings
- vendor emails: Vendor settings

**Email log.** Every message sent is recorded with its status and a preview. Failed messages can be **resent** from there.

Set up **SPF, DKIM and DMARC** for the sending domain at your provider so messages land in the inbox.

## 5. Using the CMS

Sign in at `/admin`. The home dashboard shows:
- the last 7 days of traffic
- new enquiries and applications
- vendors waiting for review
- any failed emails

**Roles**

| Role | Can do |
| --- | --- |
| Administrator | Everything, including users, settings and the audit log |
| Content editor | Pages, divisions, projects, news, media, menus, forms, SEO, analytics |
| HR / Recruitment | Jobs, applications, CVs, careers settings |
| Procurement | Vendors, vendor documents, vendor settings |
| Analyst | Read-only analytics and reports |

**Pages and content**
- **Pages** are built from 20+ blocks. Drag to reorder, and drop in reusable sections:
  - hero, divisions grid, process steps, feature cards, stats
  - client logos, tabs, comparison table, FAQ, downloads
  - team, image + text, projects, jobs, forms, call to action
- Use the eye icon for **Live preview** at mobile, tablet and desktop sizes.
- **Drafts** autosave. **Publish**, or schedule a publish date. Every change is versioned and can be restored.
- In headings, wrap words in `*asterisks*` to colour them orange, as in the designs.

**Media library**
- Upload any image. AVIF/WebP versions in several sizes are generated and served automatically.
- Set the focal point so crops keep the subject.
- Add alt text (it's required) for accessibility and SEO.
- Images are picked in any block's image field.

**Menus**
- **Header & menu:** top-bar items (incl. the Vendor Registration button), main menu with dropdowns and the divisions mega-menu, call-to-action button.
- **Footer:** columns, contact block, legal links.
- **Site settings:** company details, social links, brand colours, the Arabic site switch, custom code.

**SEO**
- Every page, division, project, job and article has an SEO tab with:
  - title, description and social image
  - a focus keyword with a live checklist
  - a Google preview
  - noindex and canonical controls
- Sitemap, robots.txt, hreflang and structured data (Organization, Service, JobPosting, FAQ, Breadcrumb) are generated automatically.
- **Redirects:** add 301s, for example for old URLs. Links from the old WordPress site are already mapped.

**Arabic**
- Every content field has an English and an Arabic version (use the locale switch at the top).
- Turn the Arabic site on in Site settings → Languages once the translations are ready. It is served at `/ar` with full right-to-left layout.

**Search.** The site search covers pages, divisions, projects and news, and is rebuilt automatically.

**Careers**
- **Job openings:** create a job and fill in the **Matching** tab (skills, experience, certifications, screening questions). Set it to *Open*.
- Jobs close automatically on their closing date.
- **Applicants** tab (on each job): everyone who applied, ranked best match first, with:
  - filters by score and skill
  - bulk shortlist or reject
  - one-click re-score
- **Careers pipeline** (sidebar): a drag-and-drop board across jobs, plus a ranked list.
- Moving a candidate can email them automatically. This is toggled per stage in Careers settings and per application.
- **Applications:** each one shows a **Match analysis** explaining the score, the extracted CV text, notes, rating, tags and an activity history.
- Applicant data is deleted automatically after the retention period (24 months by default), in line with the PDPL notice on the form.

## 6. How applicant matching works

When someone applies, their CV (PDF or Word) is converted to text, and the application is scored 0–100 against the job:

| Factor | Default weight | What it checks |
| --- | --- | --- |
| Skills | 40 | Each required skill (with synonyms, e.g. "hydrotest" = "pressure test") found in the CV or answers; must-haves weigh more |
| Experience | 20 | Years vs. the job's min–max range |
| CV relevance | 12 | Text similarity between CV and job description (TF-IDF), plus title overlap |
| Certifications | 10 | Required certificates found (e.g. CSWIP 3.1, API 570) |
| Screening | 10 | Answers vs. the ideal answers; failing a *knockout* question flags (or auto-rejects) the applicant |
| Education | 8 | Meets the minimum level |

**Bands:**
- Strong: 80+
- Good: 65+
- Fair: 45+
- Low: below 45

Weights are adjustable in **Careers settings**.

**AI second opinion (optional).** With an Anthropic API key in Integrations → AI screening, Claude reads each CV against the job and adds an independent score with strengths and concerns. The automatic score never depends on it.

Use matching to sort and shortlist faster. Final decisions should always involve a person reading the CV.

## 7. Vendor registration workflow

**What vendors do**
1. Create an account on **/vendor-registration**.
2. Verify their email.
3. Complete a 7-step profile in the **vendor portal**:
   - company details
   - contacts
   - legal and compliance (CR, VAT, Chamber, GOSI, Nitaqat)
   - capabilities and categories
   - banking (the IBAN is encrypted)
   - documents
   - declarations and e-signature
4. Upload the required documents with expiry dates:
   - CR, VAT, Zakat, GOSI, Nitaqat, Chamber of Commerce
   - National Address, bank letter
   - plus optional ISO, HSE and financials
5. Submit once the profile shows 100% complete.

**What procurement does.** Procurement moves the vendor through review with the **workflow buttons** on the vendor record. The vendor is emailed at every step, and the portal shows the same timeline.

```
Submitted → Document check → Technical review → Compliance & HSE → Approved (vendor code issued)
                  ↘ Clarification required (vendor edits & re-submits) ↗        ↘ Rejected / Suspended
```

**After approval**
- Approval issues a vendor code (e.g. `STCC-V-0001`) and a validity date.
- Vendors are reminded before documents expire.

**Configuration.** Document types, which are required per vendor type, categories, numbering and every email are configured in **Vendor settings**.

## 8. Analytics

**Built-in analytics** (sidebar → Analytics) are first-party and cookie-free:
- no consent banner is required
- IPs are never stored
- visitors are counted with a daily-rotating anonymous hash

**What it shows**
- visitors, visits, page views, engaged time, scroll depth, bounce rate
- traffic over time
- top, landing and exit pages
- sources and UTM campaigns
- countries and cities
- devices, browsers, OS, languages
- events
- site searches
- broken links (404s)
- live visitors
- goal funnels: careers (visited → viewed job → applied), vendor registration, enquiries

Click any row to filter the whole report. Export to CSV. Data older than the retention period (default 25 months) is removed nightly.

**Other sources**
- Cloudflare edge statistics appear on the same page once the API token is set.
- Google Analytics 4 or Tag Manager can be added in Integrations if needed. Note that they require a consent banner.

## 9. Backups, security and maintenance

**Backups**
- With `--profile backup`, the database is dumped nightly to `./backups`. Copy that folder off-server, for example with rclone to R2 or S3.
- Back up the `uploads` volume as well.
- Keep a safe copy of `.env`. Without `ENCRYPTION_KEY`, encrypted IBANs and passwords cannot be read.

**Security**
- Role-based access on every collection and field.
- Private files are never publicly reachable.
- Passwords are hashed; account lock-out after repeated failures.
- Secrets are encrypted at rest; CSRF and same-origin checks are on.
- Uploads are validated by file content, not just extension.
- Security headers and per-IP rate limits are in place.
- **Audit log:** a full trail of who changed what (Administration → Audit log).

**Nightly maintenance job**
- closes expired job postings
- sends vendor document-expiry reminders
- applies data-retention rules
- prunes old analytics

## 10. Project structure

```
src/
  app/(frontend)/[locale]/   website routes (English at /, Arabic at /ar)
  app/(frontend)/api/        analytics beacon, health check
  app/(payload)/             CMS admin + REST API
  collections/ globals/      content model (pages, careers/, vendors/, settings…)
  blocks/ components/blocks/ page-builder blocks (config + rendering)
  admin/                     custom CMS screens: dashboard, analytics, careers pipeline, vendor workflow…
  lib/
    careers/                 CV extraction, matching engine, application workflow
    vendors/                 registration, workflow, numbering, emails
    analytics/               event storage (own `analytics` schema), reports
    email/                   SMTP settings, branded layout, templates, queue
    cloudflare.ts            purge, Turnstile, zone analytics
  jobs/                      background tasks (emails, scoring, nightly maintenance)
  seed/                      initial content
  migrations/                database migrations (applied automatically in production)
scripts/                     mail catcher, end-to-end tests, screenshot tools
```
