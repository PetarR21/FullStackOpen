FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci --omit=dev

ENV DEBUG=playground:*

CMD npm start