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
  display: block;
  padding: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #000;
  letter-spacing: 0em;
  text-align: left;
`

export const Select = styled.select`
  display: block;
  height: 38px;
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ced4da;

  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat !important;
  background-position: right 0.75rem center !important;
  background-size: 16px 12px !important;
  appearance: none;
  text-overflow: ellipsis;

  font-size: 16px;

  &:hover::placeholder {
    color: #919eab;
  }

  &:hover {
    border-color: #000;
  }

  &::placeholder {
    color: #c4cdd5;
  }

  &:focus {
    border: 1px solid #000;
  }
`
