# 1단계: 의존성 설치
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# pnpm 설치
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# 의존성 파일 복사
COPY package.json pnpm-lock.yaml ./

# 의존성 설치: lock 파일과 정확히 일치하는 버전만 설치
RUN pnpm install --frozen-lockfile

# 2단계: 빌드
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat

WORKDIR /app

# pnpm 설치
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# 의존성 복사
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js 빌드
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm build

# 3단계: 실행
FROM node:22-alpine AS runner
RUN apk add --no-cache libc6-compat

WORKDIR /app

# 프로덕션 환경 설정
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 시스템 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# public 폴더 복사 (정적 파일)
COPY --from=builder /app/public ./public

# standalone 폴더 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 사용자 전환
USER nextjs

# 포트 설정
EXPOSE 3000

# 환경 변수 설정
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 실행 명령
CMD ["node", "server.js"]