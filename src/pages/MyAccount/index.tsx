import React, { useEffect, useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import * as Atoms from 'components/Atoms'
import * as Organisms from 'components/Organisms'
import { useUser } from 'hooks/UserContext'
import api from 'services/api'
import * as S from './styles'

export function MyAccount() {
  const [user, setUser] = useState<any>([])
  const navigate = useNavigate()
  const { userData } = useUser()

  useEffect(() => {
    const fetchCars = async () => {
      const { data: users } = await api.get('users')

      const newFilteredUser = users
        .filter((user: { email: string }) => user.email === userData.email)
        .map((user: any) => {
          return {
            ...user,
          }
        })

      setUser(newFilteredUser[0])
    }

    fetchCars()
  }, [userData.birth_date, userData.email])

  return (
    <>
      <Organisms.Header />
      <S.Container>
        <h1>Minha Conta</h1>

        <S.ContainerUser>
          <S.ItemsUser>
            <BsFillPersonFill style={{ fontSize: 150, marginBottom: 20 }} />

            {user && (
              <>
                <S.InfoUser>
                  Nome: {user.name} {user.last_name}
                </S.InfoUser>
                <S.InfoUser>E-mail: {user.email}</S.InfoUser>
                <S.InfoUser>Número: {user.number}</S.InfoUser>
                <S.InfoUser>
                  Localidade: {user.city}, {user.state}
                </S.InfoUser>
                <S.InfoUser>
                  Permite exibir e-mail nos anúncios:{' '}
                  {user.allow_show_email ? 'Sim' : 'Não'}
                </S.InfoUser>
              </>
            )}

            <Atoms.Button
              onClick={() => navigate(`/editar-usuario/${user.id}`)}
              style={{ position: 'absolute', bottom: 0 }}
            >
              Editar
            </Atoms.Button>
          </S.ItemsUser>
        </S.ContainerUser>
      </S.Container>
    </>
  )
}
