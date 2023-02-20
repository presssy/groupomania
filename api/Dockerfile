FROM node:16

WORKDIR /usr/src/api

COPY package*.json ./

COPY . ./

RUN yarn

RUN yarn build

EXPOSE 4040

CMD ["yarn", "start"]