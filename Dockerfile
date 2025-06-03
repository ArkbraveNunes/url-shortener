FROM node:20

WORKDIR /app

RUN npm install -g yarn --force
RUN npm install -g @nestjs/cli
