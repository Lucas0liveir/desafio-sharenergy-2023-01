FROM node:16.16-alpine
WORKDIR /nest-backend
COPY package*.json /
COPY tsconfig*.json /
COPY . .
RUN npm install -g @nestjs/cli
RUN npm install
RUN npx prisma generate
EXPOSE 3000

CMD ["npm", "run", "start:dev"]

