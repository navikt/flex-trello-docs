FROM gcr.io/distroless/nodejs20-debian12@sha256:7715474a901a28e3edcdf7730f14b33e30c26085989ce04b0de163fe8fab0f03

ENV NODE_ENV production

COPY /next.config.js ./
COPY /.next ./.next
COPY /node_modules ./node_modules
COPY /public ./public

ENV PORT=8080

CMD ["./node_modules/next/dist/bin/next", "start"]
