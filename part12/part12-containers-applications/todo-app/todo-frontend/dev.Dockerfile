FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV VITE_BACKEND_URL=http://localhost:3000/

CMD ["npm","run","dev","--","--host"]