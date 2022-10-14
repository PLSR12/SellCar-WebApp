import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    min-width: 350px;
  }
  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

export const ContainerItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;
  width: 100%;

  @media (max-width: 520px) {
    padding: 20px;
  }

  h1 {
    text-align: center;
    margin-bottom: 40px;
    color: #000;
  }

  p {
    color: #000;
    margin: 20px 0 3px 0;
  }
  div {
    display: flex;
    justify-content: center;
    flex-direction: column;

    position: relative;
    flex: 1 1 0%;

    svg {
      position: absolute;
      left: 12px;
      top: 5px;
    }

    span {
      position: absolute;
      right: 0;
      cursor: pointer;

      .iconVisiblity {
        position: relative;
        right: 0;
        top: 18px;
        bottom: 0;
        left: 0;
        transform: translateX(-12px) translateY(-16px);
        transition: all 0.5s ease;

        :hover {
          fill: #000;
        }
      }
    }
  }
`

export const Image = styled.img`
  width: 10vw;
  min-width: 250px;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
`

export const LinkStyled = styled(Link)`
  font-size: 1em;
  color: #000;
  text-decoration: none;
  color: #000;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`
