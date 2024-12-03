FROM node:18

# Crear el directorio de trabajo
WORKDIR /app

# Copiar archivos y directorios necesarios
COPY package*.json ./
RUN npm install

COPY . .

# Exponer el puerto
EXPOSE 3004

# Comando para iniciar el servicio
CMD ["npm", "run", "start"]
