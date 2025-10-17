FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate --schema=src/data/prisma

RUN npm run build

EXPOSE 5002

CMD ["npm", "start"]
