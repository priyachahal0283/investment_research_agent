import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Splits the two heaviest dependencies (charting + animation) into
        // their own cacheable chunks instead of one large bundle. Purely a
        // build-output optimization — no effect on UI or behavior.
        manualChunks: {
          recharts: ["recharts"],
          "framer-motion": ["framer-motion"],
        },
      },
    },
  },
});
