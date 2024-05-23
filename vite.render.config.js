import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isDevelopment = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: isDevelopment
      ? {
          "/api": {
            target: "https://nodejs-web-travel.onrender.com/api",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        }
      : {},
  },
});
