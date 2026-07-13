import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* Build pro single-file náhled (artifact): klasický IIFE skript místo ES modulu,
   aby fungoval i v sandboxech bez podpory <script type="module">. */
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist-artifact',
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
      },
    },
  },
})
