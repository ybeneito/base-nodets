FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY .env ./
COPY ./dist ./dist
EXPOSE 3000
CMD npm start