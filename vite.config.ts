import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: path.resolve(__dirname, 'frontend/src'),
  envDir: path.resolve(__dirname, './'),
  build: {
    target: 'es6',
    rollupOptions: {
        input: path.resolve(__dirname, 'frontend/src/index.html'),
    },
    outDir: path.resolve(__dirname, 'frontend/dist')
  },
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
  ]
});