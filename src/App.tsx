import AppProvider from 'hooks'
import React from 'react'
import Routes from 'routes'
import GlobalStyle from 'common/styles/globalStyle'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <AppProvider>
        <Routes />
        <ToastContainer autoClose={2000} theme="colored" />
        <GlobalStyle />
      </AppProvider>
    </>
  )
}

export default App
