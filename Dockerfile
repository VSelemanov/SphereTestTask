FROM "node:14-alpine"

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./dist ./dist

RUN npm ci --production

EXPOSE 4000

CMD ["npx", "node", "./dist/index.js"]
