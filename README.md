# react-actionsheet

> Lightweight responsive Action sheet with animation for react web applications

[![NPM](https://img.shields.io/npm/v/react-actionsheet.svg)](https://www.npmjs.com/package/react-actionsheet) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save responsive-react-actionsheet
```
## Sample
<img src="https://res.cloudinary.com/hassanraza786/image/upload/v1619360390/react-action-sheet_elkf0j.gif" alt="sample_gif" width="250" />

if sample gif doesn't work <a target='_blank' href="https://res.cloudinary.com/hassanraza786/image/upload/v1619360390/react-action-sheet_elkf0j.gif" alt="sample">Click here to view sample</a>
## Usage
Make sure you copy both import and css file as mentioned below.
```tsx
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
```

## License

MIT © [https://github.com/codeAesthetic](https://github.com/https://github.com/codeAesthetic)
