FROM node:18.17-slim AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18.17-slim
WORKDIR /app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci --omit=dev
COPY --from=base /app/dist ./dist
COPY --from=base /app/migrations ./migrations
CMD ["npm", "start"]
