FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

ENV DEBUG=express-server:*

USER node

CMD npm start