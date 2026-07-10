import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { reticle } from '@reticlehq/core/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [reticle({ port: 5173 }), react()],
  build: {
    // Split the heavy 3D / motion libs out of the main bundle so text content
    // is not blocked on them (PRD 6A.4 / 8 performance budget).
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          motion: ['gsap', 'lenis'],
        },
      },
    },
  },
})
