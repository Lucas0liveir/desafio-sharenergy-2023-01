FROM node:16.16-alpine

WORKDIR /front-end-react

COPY package*.json /

RUN npm install --force
RUN npm install -g vite

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "dev"]