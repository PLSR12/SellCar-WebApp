import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;

  min-height: calc(100vh - 60px);
  padding: 0 20px 50px 20px;

  h1 {
    color: #000;
    text-align: center;
    padding: 40px 0;
  }
`

export const ContainerCategory = styled.div`
  width: 100%;
  overflow: auto;
  overflow-y: hidden;
  height: 150px;
  position: relative;
  padding: 0 50px;
  display: flex;
  gap: 20px;
  justify-content: space-around;

  @media (max-width: 750px) {
    height: auto;
    display: flexbox;
    padding: 0;
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
    padding: 0;
  }
`

export const InfoCar = styled.p`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 18px;
  margin-bottom: 1px;
`
