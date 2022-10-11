import React from 'react'

import * as S from './styles'

export const Button: React.FC<any> = React.forwardRef(
  ({ children, ...rest }: any) => {
    return <S.ContainerButton {...rest}>{children}</S.ContainerButton>
  }
)
