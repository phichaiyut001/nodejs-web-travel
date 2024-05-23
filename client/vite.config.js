import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isDevelopment = process.env.NODE_ENV === "development";

const proxyTarget = isDevelopment
  ? "https://nodejs-web-travel.onrender.com/api"
  : "/api";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: isDevelopment
      ? {
          "/api": {
            target: proxyTarget,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        }
      : {},
  },
});
