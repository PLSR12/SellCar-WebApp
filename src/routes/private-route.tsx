import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: any) => {
  const user = localStorage.getItem('car-sell:userData')

  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute
