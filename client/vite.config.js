import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // куда сохраняется сборка
    sourcemap: true, // полезно для отладки даже в проде
    minify: 'esbuild', // можно изменить на 'terser' если нужны специфичные настройки минификации
  },
  server: {
    port: 5173, //vite server
    open: true,
    proxy: {
      '/api': 'http://localhost:5000',//express server
    },
  },
  preview: {
    port: 4173,
    open: true,
  }
});

