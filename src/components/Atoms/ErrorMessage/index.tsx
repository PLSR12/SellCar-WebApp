import React from 'react'

import * as S from './styles'

export const ErrorMessage: React.FC<any> = React.forwardRef(
  ({ children }: any) => {
    return <S.ErrorMessageStyles>{children}</S.ErrorMessageStyles>
  }
)
