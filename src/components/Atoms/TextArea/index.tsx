import React from 'react'
import * as S from './styles'

export const TextArea: React.FC<any> = React.forwardRef(
  ({ type, name, id, placeholder, label, error, ...props }, ref) => {
    return (
      <S.Container>
        <label htmlFor={name}>{label}</label>
        <textarea
          ref={ref}
          {...props}
          name={name}
          id={id || name}
          type={type || 'text'}
          placeholder={placeholder}
        ></textarea>
        {!!error && <div>{error.message}</div>}
      </S.Container>
    )
  }
)
