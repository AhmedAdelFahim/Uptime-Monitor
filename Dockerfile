FROM node:14-alpine as build

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
RUN ls -alh .

FROM node:14-alpine
WORKDIR /app
COPY --from=0 /app/dist /app/dist
COPY --from=0 /app/package.json /app
COPY --from=0 /app/package-lock.json /app
RUN npm ci --production

EXPOSE 4000

CMD [ "node", "./dist/index.js" ]


