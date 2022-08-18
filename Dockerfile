FROM node:16-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=base /app/dist ./dist
EXPOSE 3001
CMD [ "npm", "start" ]
