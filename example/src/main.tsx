import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'

// StrictMode double-invokes effects in development, which is a useful check
// that the library's style injection stays idempotent.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
