FROM node:alpine AS builder
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev
COPY . .
ARG api_url
ENV VITE_API_URL=$api_url
RUN npm run build

FROM joseluisq/static-web-server:2
COPY --from=builder /app/dist /app
EXPOSE 80
CMD ["--root", "/app", "--page-fallback", "/app/index.html"]
