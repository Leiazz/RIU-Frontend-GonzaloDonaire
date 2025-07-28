# Etapa 1: build de la app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --output-path=dist

# Etapa 2: servir la app con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/RIU-Frontend-GonzaloDonaire/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
