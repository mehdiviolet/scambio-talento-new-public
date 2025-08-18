// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@context": "/src/components/Context",
      "@utils": "/src/utils",
      "@assets": "/src/assets",
      "@styles": "/src/styles",
    },
  },
  // 👇 AGGIUNGI QUESTO per il debug
  build: {
    sourcemap: true,
  },
  server: {
    port: 5173,
    open: false, // non aprire automaticamente il browser
  },
});
