import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~bootstrap": path.resolve("node_modules/bootstrap"),
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  plugins: [react()],
});
