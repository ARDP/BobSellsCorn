# --- STAGE 1: Build ---
FROM node:20-slim AS build
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . .
RUN pnpm build

# --- STAGE 2: Production (The "Thin" Layer) ---
FROM nginx:alpine AS production
# Copy the 'dist' folder from the build stage to Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copy our custom Nginx config (we'll create this next)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]