import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store/store'
import React from 'react'

const doc = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(doc)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
