import React, { useState } from 'react'

import Actionsheet from 'responsive-react-actionsheet'
import 'responsive-react-actionsheet/dist/index.css'

const menus = ['Modes', 'Profile', 'Settings']

const App = () => {
  const [state, setState] = useState({
    visible: false,
    showCancelButton: false,
    text: ''
  })

  const handleActionSheet = (showCancelButton: boolean) => {
    setState({ ...state, visible: !state.visible, showCancelButton })
  }

  const onRequestClose = () => {
    setState({ ...state, visible: false })
  }

  const handleActionClick = (i: number) => {
    setState({ ...state, text: menus[i], visible: false })
  }

  return (
    <>
      <div className='container'>
        <button
          style={{ marginRight: 16 }}
          onClick={() => handleActionSheet(true)}
        >
          with Cancel Button
        </button>
        <button onClick={() => handleActionSheet(false)}>
          without Cancel Button
        </button>
        <Actionsheet
          show={state.visible}
          menus={menus}
          onRequestClose={onRequestClose}
          onClick={handleActionClick}
          showCancelButton={state.showCancelButton}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4>{state.text}</h4>
      </div>
    </>
  )
}

export default App
