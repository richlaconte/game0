import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import MainContextProvider from './context/main'

ReactDOM.render(
  <React.StrictMode>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)