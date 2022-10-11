import styled from 'styled-components'

export const Container = styled.div``

export const ItemsCar = styled.div`
  width: 100%;
  padding: 10px 0 0 0;
  background: #bdc3c7;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  position: relative;
`

export const HeaderCarCard = styled.div`
  width: 100%;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: center;
  }
`

export const CarName = styled.p`
  font-size: 20px;
  font-weight: 600;
`

export const CarImage = styled.img`
  width: 100%;
  max-width: 400px;
  max-height: 235px;
  margin: 10px 15px;
  border-radius: 8px;
`

export const CarPrice = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 3px;
`

export const InfoCar = styled.p`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 1px;
`

export const OpenDescription = styled.p`
  display: block;
  margin: 10px 0;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const ContainerButtonsPersonalAds = styled.div`
  width: 100%;
  display: flex;
`
