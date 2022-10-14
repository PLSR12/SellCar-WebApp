import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from 'hooks/UserContext'
import * as S from './styles'

export const Header = () => {
  const navigate = useNavigate()
  const { logout, userData } = useUser()
  const [modalUser, setModalUser] = useState(false)

  const logoutUser = () => {
    logout()
    navigate('/login')
  }

  return (
    <S.Container>
      <div className="title-container">
        <h1>SELL</h1>
        <h2> CAR</h2>
      </div>

      <S.ContainerText style={{ justifyContent: 'end' }}>
        {userData.name ? (
          <>
            <div
              className="div-user"
              onClick={() =>
                modalUser ? setModalUser(false) : setModalUser(true)
              }
            >
              <S.UserIcon />
              <S.TextHeader>Olá, {userData.name}</S.TextHeader>
            </div>
            {modalUser && (
              <S.ModalUser>
                <S.Ul>
                  <li onClick={() => navigate('/anunciar')}>Anunciar</li>
                  <li onClick={() => navigate('/meus-anuncios')}>
                    Meus Anúncios
                  </li>
                  <li onClick={() => navigate('/minha-conta')}>Minha Conta</li>
                </S.Ul>
              </S.ModalUser>
            )}
            <div className="line"></div>
            <div className="div-logout" onClick={logoutUser}>
              <S.TextHeader>Sair</S.TextHeader>
              <S.LogoutIcon />
            </div>
          </>
        ) : (
          <S.TextHeader>
            Faça <span onClick={() => navigate('/login')}>Login</span> ou
            <span onClick={() => navigate('/cadastro')}>Registre-se</span>
          </S.TextHeader>
        )}
      </S.ContainerText>
    </S.Container>
  )
}
