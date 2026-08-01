import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  // Sourcemaps were 43% of the published tarball for a component this small.
  // Flip back to true if you ever need to debug the shipped bundle.
  sourcemap: false,
  target: 'es2018',
  external: ['react', 'react-dom']
})
