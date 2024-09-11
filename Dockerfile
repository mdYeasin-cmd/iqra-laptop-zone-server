# base
FROM node:17.9.0 AS base

WORKDIR /usr/src/app

COPY package*.json ./
    
RUN npm install

COPY . .

# for lint

FROM base as linter

WORKDIR /usr/src/app

RUN npm run lint


# for production

FROM node:17.9.0-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=linter /usr/src/app ./

EXPOSE 3000

ENTRYPOINT ["node","./index.js"]