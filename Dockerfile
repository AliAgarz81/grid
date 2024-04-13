FROM node:latest

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

RUN rm -rf ./src

EXPOSE 8000

CMD ["node", "dist/src/main"]