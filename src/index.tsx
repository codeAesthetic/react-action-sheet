import * as React from 'react'

import { injectStyles } from './injectStyles'

export interface ActionsheetProps {
  /** Handles visibility of the action sheet. */
  visible: boolean
  /** Array of list items to show. */
  menus: string[]
  /** Called with the index of the clicked item. */
  onClick: (index: number) => void
  /** Called when the backdrop or the cancel button dismisses the sheet. */
  onRequestClose: () => void
  /** Show the separate cancel button below the menu. */
  showCancelButton?: boolean
  /** Label for the cancel button. */
  cancelText?: string
  /** Surface color of the menu sheet and the cancel sheet. */
  backgroundColor?: string
  /** Color of the menu item labels. */
  textColor?: string
  /** Color of the cancel button label. */
  cancelTextColor?: string
  /** Color of the backdrop behind the sheet. */
  overlayColor?: string
}

/**
 * Styles are injected during the insertion phase, so they land before React
 * commits any layout that depends on them.
 *
 * `useInsertionEffect` only exists from React 18, hence the fallbacks. The
 * branch chooses which hook to call but always calls exactly one, keeping the
 * hook count identical between a server render and client hydration — the usual
 * isomorphic-layout-effect pattern.
 */
const useIsomorphicInsertionEffect =
  typeof document !== 'undefined'
    ? React.useInsertionEffect || React.useLayoutEffect
    : React.useEffect

const Actionsheet = (props: ActionsheetProps) => {
  const {
    onRequestClose,
    onClick,
    menus = [],
    visible,
    showCancelButton,
    cancelText = 'Cancel',
    backgroundColor,
    textColor,
    cancelTextColor,
    overlayColor
  } = props

  useIsomorphicInsertionEffect(() => {
    injectStyles()
  }, [])

  // Only set the custom properties actually supplied, so anything left
  // undefined falls through to the defaults declared in styles.css.
  const theme: Record<string, string> = {}
  if (backgroundColor) theme['--ras-bg'] = backgroundColor
  if (textColor) theme['--ras-text'] = textColor
  if (cancelTextColor) theme['--ras-cancel-text'] = cancelTextColor
  if (overlayColor) theme['--ras-overlay'] = overlayColor

  return (
    <div
      className={['ras-actionsheet', visible ? 'ras-show' : '']
        .join(' ')
        .trim()}
      // React.CSSProperties has no room for `--*` keys, hence the cast.
      style={theme as React.CSSProperties}
    >
      {/* backdrop is the blurred dimming sheet behind our content */}
      {visible ? (
        <div onClick={onRequestClose} className='ras-backdrop' />
      ) : null}
      <div className='ras-wrap'>
        <div className='ras-menu'>
          {menus.map((text: string, i: number) => (
            // data-id is kept for consumers targeting items in CSS or tests;
            // the handler closes over the index so onClick receives a real
            // number rather than the string getAttribute would hand back.
            <div
              key={i}
              className='ras-menu-item'
              data-id={i}
              onClick={() => onClick(i)}
            >
              {text}
            </div>
          ))}
        </div>
        {/* optional cancel button, rendered as its own detached sheet */}
        {showCancelButton ? (
          <div className='ras-cancel'>
            <div className='ras-cancel-btn' onClick={onRequestClose}>
              {cancelText}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { Actionsheet }
export default Actionsheet
