import React, { useEffect, useState } from 'react'

import * as Organisms from 'components/Organisms'
import * as Molecules from 'components/Molecules'
import api from 'services/api'
import formatNumber from 'common/utils/formatNumber'
import * as S from './styles'
import { IAllCategories } from 'models/ICategories'
import { IAllCars } from 'models/ICars'

export function Home() {
  const [categories, setCategories] = useState<IAllCategories[]>([])
  const [activeCategory, setActiveCategory] = useState<number>(0)
  const [cars, setCars] = useState<IAllCars[]>([])
  const [filteredCars, setFilteredCars] = useState<IAllCars[]>([])
  const [loadingCars, setLoadingCars] = useState<boolean>(true)
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')

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
        (car: { category_id: number }) => car.category_id === activeCategory
      )

      setFilteredCars(newFilteredCars)
    }
  }, [activeCategory, cars])

  const lowerSearch = search.toLowerCase()

  const carsFiltered = filteredCars.filter(
    (car: any) =>
      car.brand.toLowerCase().includes(lowerSearch) ||
      car.model.toLowerCase().includes(lowerSearch) ||
      car.user_name.toLowerCase().includes(lowerSearch) ||
      car.price.toString().includes(lowerSearch) ||
      car.version.toLowerCase().includes(lowerSearch) ||
      car.gear.toLowerCase().includes(lowerSearch) ||
      car.year.toString().includes(lowerSearch) ||
      car.km.toString().includes(lowerSearch) ||
      car.description.toLowerCase().includes(lowerSearch)
  )

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

        <S.ContainerSearch>
          <S.SearchIcon />
          <S.InputSearch
            type="text"
            placeholder="Pesquise por veículos"
            onChange={(e) => setSearch(e.target.value)}
          />
        </S.ContainerSearch>

        <S.ContainerCars>
          {!loadingCars ? (
            carsFiltered.map((car: { id: number }) => (
              <Organisms.CardVehicle key={car.id} car={car} />
            ))
          ) : (
            <Molecules.Loading isVehicle />
          )}

          {!filteredCars.length ||
            (!carsFiltered && !loadingCars && (
              <S.InfoCar style={{ color: '#fff', fontWeight: '700' }}>
                Ops... Nenhum veículo anunciado ainda
              </S.InfoCar>
            ))}
        </S.ContainerCars>
      </S.Container>
    </>
  )
}
