import React from 'react'

import LoadingGif from 'assets/loading-unscreen.gif'
import * as S from './styles'

export const Loading = ({ isVehicle }: any) => {
  return (
    <>
      {isVehicle ? (
        <img src={LoadingGif} alt="Gif Loading" />
      ) : (
        <S.LoadingSpinner></S.LoadingSpinner>
      )}
    </>
  )
}
