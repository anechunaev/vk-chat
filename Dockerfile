FROM node:8.2.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ARG KEYS_DIR
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
COPY ${KEYS_DIR}/* ./keys
RUN npm install && npm cache clean --force
COPY . /usr/src/app

CMD [ "npm", "start" ]

EXPOSE 3000