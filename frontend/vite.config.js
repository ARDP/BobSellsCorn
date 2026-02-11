import { defineConfig } from "vite"

export default defineConfig({
  server: {
    proxy: {
      // Any request starting with /api will be redirected
      //TODO:change this to a .env variable and logic for working with docker
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
