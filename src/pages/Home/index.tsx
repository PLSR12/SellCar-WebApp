import React, { useEffect, useState } from 'react'

import * as Organisms from 'components/Organisms'
import * as Molecules from 'components/Molecules'
import api from 'services/api'
import formatNumber from 'common/utils/formatNumber'
import * as S from './styles'

export function Home() {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(0)
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [loadingCars, setLoadingCars] = useState(true)
  const [loadingCategories, setLoadingCategories] = useState(true)

  useEffect(() => {
    const fetchCars = async () => {
      const { data: categories } = await api.get('categories')
      const { data: cars } = await api.get('cars')

      const allCars = cars.map((car: any) => {
        return {
          ...car,
          formatedKm: formatNumber(car.km),
        }
      })

      const newCategories: any = [
        {
          id: 0,
          name: 'Todos',
          path: 'all-categories.png',
          url: 'https://i.ibb.co/V9dnSWh/all-categories.png',
        },
        ...categories,
      ]

      newCategories.sort(({ x, y }: any) => {
        return x?.id - y?.id
      })

      setCategories(newCategories)
      setLoadingCategories(false)
      setCars(allCars)
      setLoadingCars(false)
    }

    fetchCars()
  }, [])

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredCars(cars)
    } else {
      const newFilteredCars = cars.filter(
        (product: { category_id: number }) =>
          product.category_id === activeCategory
      )

      setFilteredCars(newFilteredCars)
    }
  }, [activeCategory, cars])

  return (
    <>
      <Organisms.Header />
      <S.Container>
        <h1>Categorias</h1>

        <S.ContainerCategory>
          {!loadingCategories ? (
            categories.map((category: { id: number }) => (
              <Organisms.CardCategory
                key={category.id}
                category={category}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            ))
          ) : (
            <Molecules.Loading />
          )}
        </S.ContainerCategory>

        <h1>Anunciados</h1>

        <S.ContainerCars>
          {!loadingCars ? (
            filteredCars.map((car: { id: number }) => (
              <Organisms.CardVehicle key={car.id} car={car} />
            ))
          ) : (
            <Molecules.Loading isVehicle />
          )}

          {!filteredCars.length && !loadingCars && (
            <S.InfoCar style={{ color: '#fff', fontWeight: '700' }}>
              Ops... Nenhum veículo anunciado ainda
            </S.InfoCar>
          )}
        </S.ContainerCars>
      </S.Container>
    </>
  )
}
