import { useState } from 'react'

import Actionsheet from 'responsive-react-actionsheet'
// Note: no stylesheet import. As of 1.1.0 the component injects its own styles.

const menus = ['Modes', 'Profile', 'Settings']

const darkTheme = {
  backgroundColor: '#1f2430',
  textColor: '#e6e6e6',
  cancelTextColor: '#7dd3fc',
  overlayColor: 'rgba(0, 0, 0, 0.7)'
}

const App = () => {
  const [visible, setVisible] = useState(false)
  const [showCancelButton, setShowCancelButton] = useState(false)
  const [themed, setThemed] = useState(false)

  const open = (options: { cancel?: boolean; dark?: boolean }) => {
    setShowCancelButton(Boolean(options.cancel))
    setThemed(Boolean(options.dark))
    setVisible(true)
  }

  const handleActionClick = (i: number) => {
    // `i` is a real number since 1.1.0 — it used to arrive as the string "0".
    console.log('selected', menus[i], 'at index', i, `(typeof ${typeof i})`)
    setVisible(false)
  }

  return (
    <>
      <div className='container'>
        <button onClick={() => open({ cancel: true })}>
          with Cancel Button
        </button>
        <button onClick={() => open({})}>without Cancel Button</button>
        <button onClick={() => open({ cancel: true, dark: true })}>
          themed (dark)
        </button>
      </div>

      <Actionsheet
        visible={visible}
        menus={menus}
        onRequestClose={() => setVisible(false)}
        onClick={handleActionClick}
        showCancelButton={showCancelButton}
        cancelText={themed ? 'Dismiss' : 'Cancel'}
        {...(themed ? darkTheme : {})}
      />
    </>
  )
}

export default App
