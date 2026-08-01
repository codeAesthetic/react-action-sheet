import { styles } from './styles'

const STYLE_ID = 'responsive-react-actionsheet-styles'

let injected = false

/**
 * Puts the component's stylesheet into <head> exactly once.
 *
 * Guarded on `document` so it is inert on the server, and guarded on the element
 * id as well as the module flag — two copies of this package in one bundle would
 * each carry their own `injected`, but they agree on the id.
 */
export function injectStyles(): void {
  if (injected || typeof document === 'undefined') return
  injected = true

  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = styles
  document.head.appendChild(style)
}

/** Exposed for tests. */
export const STYLE_ELEMENT_ID = STYLE_ID
