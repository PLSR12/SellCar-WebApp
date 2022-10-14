import styled from 'styled-components'
import { MdSearch } from 'react-icons/md'

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

export const ContainerSearch = styled.div`
  height: 40px;
  width: 100%;
  max-width: 350px;
  margin: 0 auto 30px auto;
  display: flex;
  color: #000;
  align-items: center;
  justify-content: center;
  background: #cacaca;
  border-radius: 5px;
  padding: 0 5px;
`
export const SearchIcon = styled(MdSearch)`
  font-size: 25px;
  color: #000;
  margin-right: 10px;
`
export const InputSearch = styled.input`
  height: 100%;
  width: 100%;
  font-size: 16px;
  background: transparent;
  border: none;
  outline: none;
  ::placeholder {
    color: #000;
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
