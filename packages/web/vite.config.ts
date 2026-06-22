import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite"
import path from "path";

const root = path.resolve(__dirname, "../..");

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, root, '');
    Object.assign(process.env, env);

    return {
        base: '/',
        plugins: [react(), tailwind()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src/web"),
            },
        },
        build: {
            outDir: 'dist',
            emptyOutDir: true,
        }
    };
});
