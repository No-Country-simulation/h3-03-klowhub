<div align="center">
  <img src="\frontend\public\temp\imgs\klowhub.png" alt="Logo" width="120" height="90">
  <h1 align="center" id="readme-top">KlowHub - Aprende, Comparte, Conecta y Monetiza</h1>
</div> 

# Sobre el Proyecto

Este proyecto nace de la necesidad de emprendedores locales de vender y hacer conocer sus productos a todos los vecinos de su comunidad. 
La página web se ecarga de mostrar las diferentes tiendas de cada vededor con su mercaderia correspondiente para que cada cliente pueda dirigirse de manera sencilla al producto o vendedor deseado.

# Tecnologías Utilizadas

En este proyecto, utilizamos las siguientes tecnologías:

### Frontend

![Next.js](https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/-React-black?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-black?style=for-the-badge&logo=tailwindcss)
![Shadcn](https://img.shields.io/badge/-Shadcn-black?style=for-the-badge&logo=github)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logo=typescript)

### Backend

![NestJS](https://img.shields.io/badge/-NestJS-black?style=for-the-badge&logo=nestjs)
![TypeORM](https://img.shields.io/badge/-TypeORM-black?style=for-the-badge&logo=github)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logo=postgresql)
![Cloudinary](https://img.shields.io/badge/-Cloudinary-black?style=for-the-badge&logo=cloudinary)
![JWT](https://img.shields.io/badge/-JWT-black?style=for-the-badge&logo=json-web-tokens)
![Socket.io](https://img.shields.io/badge/-Socket.io-black?style=for-the-badge&logo=socket.io)

### Otras Herramientas

![AWS](https://img.shields.io/badge/-Amazon%20Web%20Services-black?style=for-the-badge&logo=amazonaws)
![Docker](https://img.shields.io/badge/-Docker-black?style=for-the-badge&logo=docker)

# Instalaciones

### Requisitos Previos

##### Antes de empezar, asegúrate de tener instalado lo siguiente:
- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [Docker](https://www.docker.com/) (opcional, si planeas usar contenedores)
- [PostgreSQL](https://www.postgresql.org/) (versión 12 o superior)
- [Git](https://git-scm.com/)

### Clonar el Repositorio

##### Clona el repositorio a tu máquina local:

```bash
git clone https://github.com/No-Country-simulation/h3-03-klowhub.git
```
### 🚀 Configuración del Frontend

##### Primero ubicarse en la carpeta frontend y instalar dependencias:

```bash
cd h3-03-klowhub
cd frontend
npm install --legacy-peer-deps
```

Ejecutar el servidor frontend
```bash
npm run dev
```

#### Podras explorar el sitio web en la ruta http://localhost:3000

### 🚀 Configuración del Backend

##### Ubicarse en la carpeta backend
```bash
cd h3-03-klowhub
cd backend
```

##### Se implemento una arquitectura de microservicios por lo que hay un servicio por cada modulo
```bash
h3-03-klowhub
  L backend
    L api-getway
    L ms-apps
    L ms-courses
    L ms-projects
    L ms-chats
    L ms-users
```
##### En cada carpeta correspondiente a microservicios debemos crear un archivo .env

<details>
  <summary>api-getway .env</summary>
  <pre>
    <code>
      PORT=3000
      DB_HOST=localhost
      DB_PORT=5432
      DB_USERNAME=root
      DB_PASSWORD=root
      DB_DATABASE_NAME=klowhub
    </code>
  </pre>
</details>

<details>
  <summary>ms-apps .env</summary>
  <pre>
    <code>
      PORT=3005
      DB_HOST=localhost
      DB_PORT=5432
      DB_USERNAME=root
      DB_PASSWORD=root
      DB_DATABASE_NAME=klowhub
    </code>
  </pre>
</details>

<details>
  <summary>ms-courses .env</summary>
  <pre>
    <code>
      PORT=3003
      DB_HOST=localhost
      DB_PORT=5432
      DB_USERNAME=root
      DB_PASSWORD=root
      DB_DATABASE_NAME=klowhub
      CLOUDINARY_CLOUD_NAME=dvrgfyvou
      CLOUDINARY_API_KEY=719595661322484
      CLOUDINARY_API_SECRET=5T8SmHCnC3sFrRNy664viG8OVRQ
      JWT_SECRET="secretKeyJWT"
    </code>
  </pre>
</details>

<details>
  <summary>ms-projects .env</summary>
  <pre>
    <code>
      PORT=3002
      DB_HOST=localhost
      DB_PORT=5432
      DB_USERNAME=root
      DB_PASSWORD=root
      DB_DATABASE_NAME=klowhub
      JWT_SECRET="secretKeyJWT"
    </code>
  </pre>
</details>

<details>
  <summary>ms-chats .env</summary>
  <pre>
    <code>
      PORT=3004
      DB_HOST=localhost
      DB_PORT=5432
      DB_USERNAME=root
      DB_PASSWORD=root
      DB_DATABASE_NAME=klowhub
      JWT_SECRET="secretKeyJWT"
    </code>
  </pre>
</details>

<details>
  <summary>ms-users .env</summary>
  <pre>
    <code>
      PORT=3001
      DB_HOST=localhost
      DB_PORT=5432
      DB_USERNAME=root
      DB_PASSWORD=root
      DB_DATABASE_NAME=klowhub
      JWT_SECRET="secretKeyJWT"
    </code>
  </pre>
</details>

#### Acceder a la carpeta de cada microservicio mediante la terminal y ejecutar:
```bash
npm intall
```

#### Conectar los microservicios con Docker, Asegúrate de estar ubicado en la carpeta raíz del backend, donde se encuentra el archivo docker-compose.yml.
```bash
docker-compose up --build
```

#### Rutas

- servicio de api getway: http://localhost:3000
- servicio de users: http://localhost:3001
- servicio de proyectos: http://localhost:3002
- servicio de cursos: http://localhost:3003
- servicio de chats: http://localhost:3004
- servicio de apps: http://localhost:3005


# Equipo de trabajo

<table>
  <thead>
    <tr>
      <th>Rol</th>
      <th>Nombre</th>
      <th>GitHub</th>
      <th>LinkedIn</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Frontend</td>
      <td>Joel Llallico</td>
      <td><a href="https://github.com/GhostOrder28">GitHub</a></td>
      <td><a href="https://www.linkedin.com/in/joel-llallico-b8b01b209/">LinkedIn</a></td>
    </tr>
    <tr>
      <td>Frontend</td>
      <td>Martin Kun</td>
      <td><a href="https://github.com/MartinKun">GitHub</a></td>
      <td><a href="https://www.linkedin.com/in/mart%C3%ADn-kun-b13620209/">LinkedIn</a></td>
    </tr>
    <tr>
      <td>Frontend</td>
      <td>Benjamín Carías</td>
      <td><a href="https://github.com/devbenja">GitHub</a></td>
      <td><a href="https://www.linkedin.com/in/devbenja/">LinkedIn</a></td>
    </tr>
    <tr>
      <td>Backend</td>
      <td>Franco Garay</td>
      <td><a href="https://github.com/francogaray">GitHub</a></td>
      <td><a href="https://www.linkedin.com/in/francodavidgaray/">LinkedIn</a></td>
    </tr>
    <tr>
      <td>Backend</td>
      <td>Thomi Lopez</td>
      <td><a href="https://github.com/thomilopez">GitHub</a></td>
      <td><a href="www.linkedin.com/in/thomas-ignacio-lopez">LinkedIn</a></td>
    </tr>
    <tr>
      <td>Backend</td>
      <td>Javier Colodro</td>
      <td><a href="https://github.com/Javierdigital85">GitHub</a></td>
      <td><a href="https://www.linkedin.com/in/lorenzojaviercolodro/">LinkedIn</a></td>
    </tr>
     <tr>
      <td>QA Tester</td>
      <td>Fernando Lamas</td>
      <td><a href="https://github.com/FernandoLam">GitHub</a></td>
      <td><a href="https://www.linkedin.com/in/fernando-la-949842316/">LinkedIn</a></td>
    </tr>
    <tr>
      <td>Project Manager</td>
      <td>Carolina Saggio</td>
      <td><a href="https://github.com/csaggio74">GitHub</a></td>
      <td><a href="https://www.linkedin.com/in/carolina-saggio-78338923/">LinkedIn</a></td>
    </tr>
    <tr>
      <td>Designer UX/UI</td>
      <td>Lucero Fernandez</td>
      <td><a href="https://github.com/LuceroFC">GitHub</a></td>
      <td><a href="https://www.linkedin.com/in/lucero-rubí-fernández-cortez/">LinkedIn</a></td>
    </tr>
  </tbody>
</table>

# Documentación y Enlaces

A continuación se presentan los documentos y enlaces útiles relacionados con el proyecto KlowHub:

### Documentación del Proyecto

- **Documentación Equipo h3-03-klowhub**: [Ver Documentación](https://drive.google.com/drive/folders/1JPTAef0FOvBfV3zD97DMJ1PNG-jFxtU3?usp=drive_link)
  
### Enlaces del Despliegue

- **Despliegue Frontend**: [Ver Frontend](https://github.com/tuusuario/tu-repositorio)
- **Despliegue Backend**: [Ver Backend](https://github.com/tuusuario/tu-repositorio/issues)

### Recursos Externos

- **Next.js**: [Documentación oficial](https://nextjs.org/docs)
- **NestJS**: [Documentación oficial](https://docs.nestjs.com/)
- **Tailwind CSS**: [Documentación oficial](https://tailwindcss.com/docs)
- **TypeORM**: [Documentación oficial](https://typeorm.io/)
- **AWS**: [Documentación oficial](https://aws.amazon.com/documentation/)
- **PostgreSQL**: [Documentación oficial](https://www.postgresql.org/docs/)
- **Docker**: [Documentación oficial](https://docs.docker.com/)

---

Si tienes dudas o sugerencias, no dudes en abrir un **Issue** o contribuir al proyecto mediante un **Pull Request**.

