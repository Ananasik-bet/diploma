FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./

ENV NODE_PORT=$NODE_PORT
EXPOSE $NODE_PORT
CMD ["npm", "run", "dev"]
