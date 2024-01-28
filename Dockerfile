FROM node:20.11.0-alpine3.19 as deps
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:20.11.0-alpine3.19 as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run copy-files
CMD [ "tsc -p ." ]

FROM node:20.11.0-alpine3.19 as prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --prod --frozen-lockfile

FROM node:20.11.0-alpine3.19 as prod
EXPOSE 8080
WORKDIR /app
ENV APP_VERSION=${APP_VERSION}
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD [ "node", "dist/app.js" ]

