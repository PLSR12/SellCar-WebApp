import AppProvider from 'hooks'
import React from 'react'
import Routes from 'routes'
import GlobalStyle from 'common/styles/globalStyle'

function App() {
  return (
    <>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </>
  )
}

export default App
