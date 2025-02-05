# 1. Build qatlam
FROM node:alpine3.18 as build

# ARG orqali build argumentlarini olish
ARG VITE_SERVER_BASE_URL
ARG VITE_REACT_BASE_URL

# Muhit o‘zgaruvchilarni ENV sifatida o‘rnatish
ENV VITE_SERVER_BASE_URL=$VITE_SERVER_BASE_URL
ENV VITE_REACT_BASE_URL=$VITE_REACT_BASE_URL

# Ishchi katalogni sozlash
WORKDIR /app

# Paketlarni o'rnatish
COPY package.json ./
RUN npm install

# Barcha fayllarni ko‘chirish
COPY . ./

# Build qilish
RUN npm run build

# 2. Serve qatlam
FROM nginx:1.23-alpine

# Nginx static fayllarni joylash uchun katalog
WORKDIR /usr/share/nginx/html

# Default konfiguratsiyani tozalash
RUN rm -rf ./*

# Build qilingan static fayllarni ko‘chirish
COPY --from=build /app/dist ./

# Nginx konfiguratsiya faylini ko‘chirish
COPY ./nginx.conf /etc/nginx/nginx.conf

# Portni ochish
EXPOSE 80

# Nginx xizmatini ishga tushirmoq
ENTRYPOINT ["nginx", "-g", "daemon off;"]
