import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), dts({ include: ["lib"], exclude: ["src"] })],
    build: {
        lib: {
            entry: resolve(__dirname, "lib/index.ts"),
            formats: ["es"],
        },
        rollupOptions: {
            external: ["react", "react/jsx-runtime"],
        },
    },
});
