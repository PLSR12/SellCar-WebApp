import styled from 'styled-components'

interface ErrorMessage {
  error: any
}

export const Container = styled.div`
  min-height: calc(100vh - 60px);
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
`

export const ContainerItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;

  h1 {
    text-align: center;
    margin-bottom: 40px;
    color: #000;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;

    @media (max-width: 750px) {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      flex-direction: column;
    }

    .container-button {
      align-items: center;
      justify-content: center;
      margin-left: 50%;
      display: flex;
      flex-direction: row;
      gap: 50px;
      width: 100%;

      @media (max-width: 750px) {
        flex-direction: column;
        margin-left: 30%;
        width: 50%;
      }
    }
  }

  @media (max-width: 750px) {
    padding: 20px;
  }
`

export const Label = styled.p`
  color: #000;
  margin: 20px 0 3px 0;
`

export const Input = styled.input<ErrorMessage>`
  height: 48px;
  width: 100%;
  max-width: 500px;
  font-size: 1em;
  padding-left: 10px;
  border: ${(props) => (props.error ? '2px solid #cc1717' : 'none')};
  outline: none;
  border-radius: 5px;
  background: #dad2d8;
`

export const Select = styled.select<ErrorMessage>`
  height: 48px;
  width: 100%;
  max-width: 500px;
  font-size: 1em;
  padding-left: 7px;
  border: ${(props) => (props.error ? '2px solid #cc1717' : 'none')};
  outline: none;
  border-radius: 5px;
  background: #dad2d8;
`
