# STCC website – production image (Next.js standalone + Payload CMS)
#   docker build -t stcc-website .
# The container applies database migrations on start-up and seeds content into an empty database.

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# ---- dependencies --------------------------------------------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# ---- build ---------------------------------------------------------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Public URL is baked into the client bundle (canonical links, sitemap, emails)
ARG NEXT_PUBLIC_SERVER_URL=https://stcc.sa
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL \
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY \
    NEXT_OUTPUT=standalone
# The build renders no pages from the database, but Payload needs a syntactically valid config
RUN --mount=type=cache,target=/app/.next/cache \
    corepack enable pnpm && \
    DATABASE_URL=postgres://build:build@127.0.0.1:5432/build PAYLOAD_SECRET=build-only \
    pnpm run build

# ---- runtime -------------------------------------------------------------------
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    UPLOADS_DIR=/app/uploads

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Uploaded media, CVs and vendor documents – mount a volume here
RUN mkdir -p /app/uploads && chown -R nextjs:nodejs /app/uploads
VOLUME ["/app/uploads"]

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health >/dev/null || exit 1

CMD ["node", "server.js"]
