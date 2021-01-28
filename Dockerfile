FROM "node:14-alpine"

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npx", "babel-node", "./src/index.js"]
