// Generates src/styles.ts from src/styles.css.
//
// The component needs its stylesheet as a plain string so it can inject it at
// runtime. Importing a .css file directly would work, but every toolchain
// applies its own semantics to that import — tsup needs a `text` loader, Vite
// stubs it to an empty string under test, and downstream consumers' bundlers
// each do something different again. Going through a generated .ts module means
// it is just a string everywhere, with no bundler configuration to keep in sync.
//
// src/styles.css stays the file you edit; src/styles.ts is committed so a fresh
// clone can typecheck and test without building first.
//
// Run with --check to verify the generated file is current (used by `npm run verify`).
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'src', 'styles.css')
const target = join(root, 'src', 'styles.ts')

const css = readFileSync(source, 'utf-8')

const escaped = css
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$\{/g, '\\${')

const output = `/* eslint-disable */
/**
 * GENERATED FILE — DO NOT EDIT.
 * Edit src/styles.css and run \`npm run styles\` (or any build/test) to refresh.
 */
export const styles = \`${escaped}\`

export default styles
`

if (process.argv.includes('--check')) {
  const current = readFileSync(target, 'utf-8')
  if (current !== output) {
    console.error(
      'generate-styles: src/styles.ts is out of date with src/styles.css — run `npm run styles`'
    )
    process.exit(1)
  }
  console.log('generate-styles: src/styles.ts is up to date')
} else {
  writeFileSync(target, output)
  console.log('generate-styles: wrote src/styles.ts')
}
