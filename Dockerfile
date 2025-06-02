# Etapa 1: construir la app con Vite
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: servir los estáticos con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html