import AppProvider from 'hooks'
import React from 'react'
import Routes from 'routes'

function App() {
  return (
    <>
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  )
}

export default App
