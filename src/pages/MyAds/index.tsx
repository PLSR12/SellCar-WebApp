import React, { useEffect, useState } from 'react'

import * as Organisms from 'components/Organisms'
import * as Molecules from 'components/Molecules'
import { useUser } from 'hooks/UserContext'
import api from 'services/api'
import formatNumber from 'common/utils/formatNumber'
import * as S from './styles'

export function MyAds() {
  const [cars, setCars] = useState<any>([])
  const [filteredCars, setFilteredCars] = useState<any>([])
  const [loadingCars, setLoadingCars] = useState<boolean>(true)

  const { userData } = useUser()

  useEffect(() => {
    const fetchCars = async () => {
      const { data: cars } = await api.get('cars')

      const allCars = cars.map((car: any) => {
        return {
          ...car,
          formatedKm: formatNumber(car.km),
        }
      })

      setCars(allCars)
      setLoadingCars(false)
    }

    fetchCars()
  }, [])

  useEffect(() => {
    const newFilteredCars = cars.filter(
      (car: { user_email: any }) => car.user_email === userData.email
    )

    setFilteredCars(newFilteredCars)
  }, [cars, userData.email])

  return (
    <>
      <Organisms.Header />

      <S.Container>
        <h1>Meus Anúncios</h1>

        <S.ContainerCars>
          {!loadingCars ? (
            filteredCars.map((car: { id: any }) => (
              <Organisms.CardVehicle
                key={car.id}
                car={car}
                filteredCars={filteredCars}
                setCars={setCars}
                myAds
              />
            ))
          ) : (
            <Molecules.Loading isVehicle />
          )}

          {!filteredCars.length && !loadingCars && (
            <S.InfoCar style={{ color: '#fff', fontWeight: '700' }}>
              Ops... Você não anunciou nenhum veículo ainda
            </S.InfoCar>
          )}
        </S.ContainerCars>
      </S.Container>
    </>
  )
}
