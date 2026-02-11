FROM node:20 AS builder
ARG namespace

WORKDIR /app
COPY . ./

RUN export NODE_TLS_REJECT_UNAUTHORIZED=0
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV NODE_ENV=$namespace
ENV BABEL_ENV=development

RUN npm install
RUN npm run bundle

FROM node:20
WORKDIR /app

RUN npm install -g http-serve@1.0.1
COPY --from=builder /app/build ./

EXPOSE 5000
CMD ["http-serve", "-p", "5000"]
