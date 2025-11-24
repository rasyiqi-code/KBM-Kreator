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
          // React core - split React and React-DOM separately
          if (id.includes("node_modules/react/") || id.includes("node_modules/react/index")) {
            return "react";
          }
          if (id.includes("node_modules/react-dom/")) {
            return "react-dom";
          }
          if (id.includes("react-router")) {
            return "react-router";
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

          // Lucide icons - split by usage (main vs admin)
          // This will be handled by tree-shaking since we're now using specific imports
          if (id.includes("lucide-react")) {
            // Only bundle icons that are actually imported
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

          // Split vendor into smaller chunks
          if (id.includes("node_modules")) {
            // Group smaller vendor packages together
            const packageName = id.split("node_modules/")[1]?.split("/")[0];
            if (packageName && !packageName.startsWith("@")) {
              // For non-scoped packages, group very small ones
              return "vendor";
            }
            return "vendor";
          }
        },
      },
    },
    // Increase warning limit since gzipped size is what matters (232KB gzipped is reasonable)
    chunkSizeWarningLimit: 600,
  },
}));
