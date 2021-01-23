FROM node:15.3.0-alpine

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm i

# Bundle app source
COPY . .

CMD [ "npm", "start" ]
