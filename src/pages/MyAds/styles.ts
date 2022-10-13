import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;

  min-height: calc(100vh - 60px);
  padding-bottom: 50px;

  h1 {
    color: #fff;
    text-align: center;
    padding: 40px 0;
  }
`

export const ContainerCars = styled.div`
  width: 100%;
  position: relative;
  padding: 0 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-around;

  @media (max-width: 520px) {
    padding: 0 20px;
  }
`

export const InfoCar = styled.p`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 18px;
  margin-bottom: 1px;
`
