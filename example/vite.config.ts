import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // relative asset paths, so `npm run deploy` works from a gh-pages subpath
  base: './',
  resolve: {
    // The library is linked via `file:..` and lists react as a peer dependency.
    // Without deduping, Vite can pull a second React through the link and hooks
    // blow up at runtime.
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    // Always read the freshly built dist/ rather than a prebundled copy.
    exclude: ['responsive-react-actionsheet']
  }
})
