# Stage 1: Install dependencies
FROM --platform=linux/amd64 node:18-alpine AS base

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

ARG NEXTAUTH_SECRET
ARG NEXT_PUBLIC_API_ENDPOINT
ARG NEXTAUTH_URL
RUN npm i

# Stage 2: Build the application
FROM base AS builder

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Set environment variable
ARG NEXT_PUBLIC_API_ENDPOINT
ARG NEXT_PUBLIC_LOG_ROCKET_TOKEN
ARG API_DOMAIN
ENV NODE_ENV=production

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Build the application (conditionally for development)
RUN if [ "$BUILD_ENV" == "development" ]; then \
      NODE_TLS_REJECT_UNAUTHORIZED=0 yarn build; \
    else \
      yarn build; \
    fi

# Stage 3: Create the final image
FROM base AS runner

WORKDIR /app

# Add user and group
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy files from the builder stage
COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next ./app/.next
COPY --from=builder /app/next.config.js ./.next/next.config.js

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Change user
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]