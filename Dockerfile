FROM gcr.io/distroless/nodejs20-debian12@sha256:6d0f50681aab846e8c005ee864324ef2cbea464fd10a09e3b02876cdc0696543

ENV NODE_ENV production

COPY /next.config.js ./
COPY /.next ./.next
COPY /node_modules ./node_modules
COPY /public ./public

ENV PORT=8080

CMD ["./node_modules/next/dist/bin/next", "start"]
