import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vituumPostcss from '@vituum/vite-plugin-postcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vituumPostcss(),
  ],
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'skip-type-check',
          transform(code, id) {
            if (id.endsWith('.ts') || id.endsWith('.tsx')) {
              return {
                code,
                map: null // Skip sourcemap generation
              };
            }
          }
        }
      ]
    }
  }
})
