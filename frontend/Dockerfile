FROM node:18

WORKDIR /app

COPY . .
 
RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
