/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import { fileURLToPath, URL } from "url";

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },

  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/setupTests.ts"], // Optional: For global test setup
    ui: true,
  },

  plugins: [vue()],

  server: { port: 5173 },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
