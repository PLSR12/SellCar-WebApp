import React from 'react'
import { Container, Error } from './styles'

export const Select: React.FC<any> = React.forwardRef(
  ({ name, id, placeholder, label, error, options, ...props }, ref) => {
    return (
      <Container>
        <label htmlFor={name}>{label}</label>
        <select
          ref={ref}
          name={name}
          id={id}
          placeholder={placeholder}
          {...props}
        >
          <option value=""></option>
          {options.map((option: any, index: number) => (
            <option key={index} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        {!!error && <Error>{error.message}</Error>}
      </Container>
    )
  }
)
