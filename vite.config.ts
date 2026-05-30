import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Brutalist App Metadata
  define: {
    __APP_NAME__: JSON.stringify("Away"),
    __APP_DESCRIPTION__: JSON.stringify("Brutalist Out-of-Office Message Generator"),
    __APP_VERSION__: JSON.stringify("1.0.0"),
  },
}));
