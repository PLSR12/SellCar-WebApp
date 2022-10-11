import React from 'react'
import { Route, Routes as RoutesWrapper } from 'react-router-dom'

import * as Pages from '../pages'

export default function Routes() {
  return (
    <RoutesWrapper>
      <Route path="/" element={<Pages.Home />} />
      <Route path="/login" element={<Pages.Login />} />
    </RoutesWrapper>
  )
}
