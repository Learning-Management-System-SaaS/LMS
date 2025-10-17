FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate --schema=src/data/prisma/schema.prisma

RUN npm run build && ls -R dist

EXPOSE 5003

CMD ["npm", "start"]
