FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn start:dev

EXPOSE 3000

CMD ["yarn", "start:dev"]