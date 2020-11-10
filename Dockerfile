FROM node:14

# Create application working directory
WORKDIR /usr/src/mercury-api

# Install application dependancies
COPY package*.json ./

RUN yarn install
RUN npm install -g typescript@latest

# Bundle application source
COPY . .

RUN tsc

EXPOSE 5000
CMD [ "node", "dist/index.js" ]
