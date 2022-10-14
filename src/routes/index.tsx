import React from 'react'
import { Route, Routes as RoutesWrapper } from 'react-router-dom'

import * as Pages from '../pages'
import PrivateRoute from './private-route'

export default function Routes() {
  return (
    <RoutesWrapper>
      <Route path="/" element={<Pages.Home />} />
      <Route path="/login" element={<Pages.Login />} />
      <Route
        path="/meus-anuncios"
        element={
          <PrivateRoute>
            <Pages.MyAds />
          </PrivateRoute>
        }
      />
      <Route
        path="/minha-conta"
        element={
          <PrivateRoute>
            <Pages.MyAccount />
          </PrivateRoute>
        }
      />
      <Route
        path="/anunciar"
        element={
          <PrivateRoute>
            <Pages.CarRegister />
          </PrivateRoute>
        }
      />
    </RoutesWrapper>
  )
}
