# react-actionsheet

> Lightweight responsive Action sheet with animation for react web applications

[![NPM](https://img.shields.io/npm/v/react-actionsheet.svg)](https://www.npmjs.com/package/react-actionsheet) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save responsive-react-actionsheet
```

## Sample

<img src="https://res.cloudinary.com/hassanraza786/image/upload/v1619901005/react-action-sheet_ibvmuo.gif" alt="sample_gif" width="250" />

if sample gif doesn't work <a target='_blank' href="https://res.cloudinary.com/hassanraza786/image/upload/v1619901005/react-action-sheet_ibvmuo.gif" alt="sample">Click here to view sample</a>

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
          visible={state.visible}
          menus={menus}
          onRequestClose={onRequestClose}
          onClick={handleActionClick}
          showCancelButton={state.showCancelButton}
          cancelText='Custom Cancel text'
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

# Reference

## API

Description of props there functionality and usage.

| Property         | description                                    | Type                            | Default  |
| ---------------- | ---------------------------------------------- | ------------------------------- | -------- |
| visible          | handles visibilty of action sheet              | boolean                         | false    |
| menus            | Array of list items to show                    | string[]                        | -        |
| onClick          | handle click on list items                     | function(index: number) => void | -        |
| onRequestClose   | function to close Actionsheet                  | function() => void              |          |
| showCancelButton | flag to show or hide cancel button             | boolean                         | false    |
| cancelText       | modify cancel text if showCancelButton is true | string                          | 'Cancel' |

#

## License

MIT © [https://github.com/codeAesthetic](https://github.com/https://github.com/codeAesthetic)
