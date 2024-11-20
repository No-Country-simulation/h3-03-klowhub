# api-gateway/Dockerfile

# Usa la imagen base de Node.js
FROM node

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Compila el proyecto
RUN npm run build

# Expone el puerto que usa el API Gateway
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main.js"]