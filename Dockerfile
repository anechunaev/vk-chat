FROM node:8.2.1

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/keys
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY . /usr/src/app
COPY keys/. /usr/src/app/keys

CMD [ "npm", "start" ]

EXPOSE 3000
