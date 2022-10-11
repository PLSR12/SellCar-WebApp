import { ReactNode } from 'react'

import { UserProvider } from './UserContext'

interface AppProviderProps {
  children: ReactNode
}

function AppProvider({ children }: AppProviderProps) {
  return <UserProvider>{children}</UserProvider>
}

export default AppProvider
