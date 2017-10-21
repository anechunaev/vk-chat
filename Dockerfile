FROM node:8.2.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ARG KEYS_DIR
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
ADD ${KEYS_DIR}/privkey.pem keys/privkey.pem
ADD ${KEYS_DIR}/fullchain.pem keys/fullchain.pem
RUN npm install && npm cache clean --force
COPY . /usr/src/app

CMD [ "npm", "start" ]

EXPOSE 3000