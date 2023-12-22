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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          bootstrap: ["bootstrap"],
          "aws-amplify": ["aws-amplify"],
          "@aws-amplify/ui-react": [
            "@aws-amplify/ui-react",
            "@aws-amplify/ui-react/styles.css",
          ],
          "react-router-dom": [
            "react-router-dom",
            "react-router",
            "@remix-run/router",
          ],
          lodash: ["lodash"],
        },
      },
    },
  },
});
