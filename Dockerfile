FROM node:8-alpine

WORKDIR /app

COPY package.json /app

RUN npm i

COPY . /app

RUN npm run build

CMD node dist/server.js 