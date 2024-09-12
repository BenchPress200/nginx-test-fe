FROM node:16
WORKDIR /react-to-do/frontend
COPY package.json package-lock.json ./
RUN npm install 
COPY . ./
EXPOSE 3001

CMD ["npm", "start"]