# File: fynapp_frontend/Dockerfile
# 2022-02-25 | CR

# FROM node:carbon
# FROM node:16.9.1
FROM node:15

ARG REACT_APP_API_URL=http://localhost:5000

# Create app directory
WORKDIR /usr/src/app
 
# COPY ../package.json .
# COPY ../package-lock.json .
COPY . .

# RUN ls -la

RUN npm install
# RUN npm run build
 
EXPOSE 3001

# CMD [ "npm", "start" ]
CMD [ "npm", "run", "start-build" ]
