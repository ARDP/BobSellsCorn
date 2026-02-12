# Use a lightweight Node image
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally so we can use it inside the container
RUN npm install -g pnpm

# Copy package files first to leverage Docker layer caching
# This means 'pnpm install' only runs if you change your dependencies
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies (including devDependencies needed for build)
RUN pnpm install

# Copy the rest of your backend source code
COPY . .

# Run the build script we fixed (pnpm type-check && pnpm lint && tsc)
RUN pnpm build

# The port your Express app listens on
EXPOSE 3000

# Start the application using the compiled code in 'dist'
CMD ["node", "dist/index.js"]