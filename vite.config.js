import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // <- Obligatorio para que las subrutas carguen los assets correctamente
  server: {
    port: 5175,
    host: true
  },
})