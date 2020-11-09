FROM node:14

# Create application working directory
WORKDIR /usr/src/mercury-api

# Install application dependancies
COPY package*.json ./
RUN npm install

# Bundle application source
COPY . .

EXPOSE 8080
CMD [ "node", "dist/index.js" ]
