FROM gcr.io/distroless/nodejs20-debian12@sha256:04350092341fdc31bd1c9c7cac4f50f9194652f3afd8d4a442428b102c9d66c2

ENV NODE_ENV production

COPY /next.config.js ./
COPY /.next ./.next
COPY /node_modules ./node_modules
COPY /public ./public

ENV PORT=8080

CMD ["./node_modules/next/dist/bin/next", "start"]
