import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "your-org",
      project: "therapio-ai",
      skipBuild: true
    })
  ],
  server: {
    port: 5173,
    allowedHosts: true,
  }
});