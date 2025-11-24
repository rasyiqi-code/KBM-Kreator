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
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core
          if (id.includes("react") || id.includes("react-dom") || id.includes("react-router")) {
            if (id.includes("react-router")) {
              return "react-router";
            }
            return "react-core";
          }

          // Supabase
          if (id.includes("@supabase")) {
            if (id.includes("auth-ui")) {
              return "supabase-auth";
            }
            return "supabase-core";
          }

          // Radix UI - split by component
          if (id.includes("@radix-ui")) {
            const match = id.match(/@radix-ui\/([^/]+)/);
            if (match) {
              const component = match[1];
              // Group smaller components together
              if (["react-label", "react-slot", "react-separator", "react-aspect-ratio"].includes(component)) {
                return "radix-ui-utils";
              }
              return `radix-ui-${component}`;
            }
            return "radix-ui";
          }

          // TanStack Query
          if (id.includes("@tanstack/react-query")) {
            return "tanstack-query";
          }

          // Lucide icons (can be large)
          if (id.includes("lucide-react")) {
            return "lucide-icons";
          }

          // Form libraries
          if (id.includes("react-hook-form") || id.includes("@hookform") || id.includes("zod")) {
            return "form-libs";
          }

          // Other large libraries
          if (id.includes("recharts")) {
            return "recharts";
          }
          if (id.includes("date-fns")) {
            return "date-fns";
          }
          if (id.includes("embla-carousel")) {
            return "embla-carousel";
          }
          if (id.includes("sonner")) {
            return "sonner";
          }

          // Node modules (vendor)
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
}));
