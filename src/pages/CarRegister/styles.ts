import styled from 'styled-components'

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
  padding: 80px;
  width: 100%;
  justify-content: center;

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 750px) {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      flex-direction: column;
    }
    .dropzone {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      margin-top: 15px;
      border-width: 2px;
      border-radius: 2px;
      border: 2px #8f8f8f dashed;
      border-style: dashed;
      background-color: #fafafa;
      color: #bdbdbd;
      outline: none;
      transition: border 0.24s ease-in-out;
      p {
        font-size: 15px;
        color: #000000;
      }
    }
  }

  .container-button {
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 80px;
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

  .title {
    text-align: center;
    margin-bottom: 40px;
    color: #000;
  }

  @media (max-width: 750px) {
    padding: 20px;
  }
`
