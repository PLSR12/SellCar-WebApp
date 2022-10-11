import React from 'react'
import * as S from './styles'

export const Input: React.FC<any> = React.forwardRef(
  ({ type, name, id, placeholder, label, error, ...props }, ref) => {
    return (
      <S.Container>
        <label htmlFor={name}>{label}</label>
        <input
          ref={ref}
          {...props}
          name={name}
          id={id || name}
          type={type || 'text'}
          placeholder={placeholder}
        />
        {!!error && <div>{error.message}</div>}
      </S.Container>
    )
  }
)
