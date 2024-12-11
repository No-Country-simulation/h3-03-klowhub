FROM node:18

WORKDIR /app

ENV NEXT_PUBLIC_COURSES_URL=http://3.145.74.63:3003/courses
ENV NEXT_PUBLIC_PROJECTS_URL=http://3.145.74.63:3002/projects
ENV NEXT_PUBLIC_APPLICATIONS_URL=http://3.145.74.63:3005/apps

COPY . .
 
RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
