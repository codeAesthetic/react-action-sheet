// Emits dist/index.css from the same src/styles.css that gets inlined into the
// JS bundle, so there is exactly one source of truth for the styles.
//
// Since 1.1.0 the stylesheet injects itself and importing this file is optional.
// It is still published because every 1.0.x consumer has
//   import 'responsive-react-actionsheet/dist/index.css'
// in their app, and because SSR users may prefer a real stylesheet over runtime
// injection. Loading it alongside the injected copy is harmless — identical rules.
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

mkdirSync(join(root, 'dist'), { recursive: true })
copyFileSync(join(root, 'src', 'styles.css'), join(root, 'dist', 'index.css'))

console.log('copy-css: wrote dist/index.css')
