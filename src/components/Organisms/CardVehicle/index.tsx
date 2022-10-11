import React, { useState } from 'react'
import { BiMap } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { Button } from 'components/Atoms/Button'
import { ModalDescription } from '../ModalDescription'
import api from 'services/api'
import formatDate from 'common/utils/formatDate'
import * as S from './styles'

export function CardVehicle({ car, filteredCars, setCars, myAds }: any) {
  const [data, setData] = useState({})
  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()

  const onlyNumbers = (str: any) => str.replace(/[^0-9]/g, '')

  const deleteVehicle = async (carId: any) => {
    Swal.fire({
      title: 'Você realmente quer deletar este anúncio?',
      text: 'Não será possível reverter isso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar',
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          title: 'Deletando...',
          color: '#fff',
          background: 'none',
          showConfirmButton: false,
          timer: 5000,
        })
        await api.delete(`cars/${carId}`)

        const carsUpdateFetch = filteredCars.filter(
          (car: any) => car.id !== carId
        )
        setCars(carsUpdateFetch)

        Swal.fire('Deletado!', 'Seu anúncio foi deletado.', 'success')
      }
    })
  }

  const handleOpenLink = (car: any) => {
    setData(car)
    setShowModal(true)
  }

  return (
    <S.Container>
      <S.ItemsCar>
        <S.HeaderCarCard>
          <S.CarName>
            {car.brand} {car.model}
          </S.CarName>
          <S.InfoCar style={{ fontSize: '15px' }}>
            Anunciado em {formatDate(car.createdAt)}
          </S.InfoCar>
        </S.HeaderCarCard>

        {car.path && (
          <S.CarImage src={car.url} alt={`Imagem ${car.brand} ${car.model}`} />
        )}
        <S.CarPrice>Preço: R$ {car.price}</S.CarPrice>
        <S.InfoCar>
          <BiMap style={{ fontSize: 20 }} />
          {car.user_city}, {car.user_state}
        </S.InfoCar>
        <S.InfoCar>Versão: {car.version}</S.InfoCar>
        <S.InfoCar>Câmbio: {car.gear}</S.InfoCar>
        <S.InfoCar>Ano: {car.year}</S.InfoCar>
        <S.InfoCar>KM: {car.formatedKm}</S.InfoCar>

        <S.OpenDescription onClick={() => handleOpenLink(car)}>
          Mais detalhes
        </S.OpenDescription>

        {!myAds ? (
          <a
            href={`https://api.whatsapp.com/send?phone=55${onlyNumbers(
              car.user_number
            )}&text=Ol%C3%A1,%20vi%20seu%20an%C3%BAncio%20no%20Car%20Sell.%20Me%20interessei%20pelo%20${
              car.model
            },%20podemos%20conversar%20melhor?`}
            target="_blank"
            rel="noreferrer"
            style={{ width: '100%' }}
          >
            <Button
              style={{
                borderRadius: '0 0 8px 8px',
              }}
            >
              Entrar em contato
            </Button>
          </a>
        ) : (
          <S.ContainerButtonsPersonalAds>
            <Button
              onClick={() =>
                navigate(`/editar-veiculo/${car.id}`, { state: car })
              }
              style={{ borderRadius: '5px 0 0 5px' }}
            >
              Editar
            </Button>
            <Button
              onClick={() => deleteVehicle(car.id)}
              style={{ background: '#e74c3c', borderRadius: '0 5px 5px 0' }}
            >
              Deletar
            </Button>
          </S.ContainerButtonsPersonalAds>
        )}
      </S.ItemsCar>

      {showModal && (
        <ModalDescription
          closeModal={() => setShowModal(false)}
          carData={data}
          myAds={myAds}
          filteredCars={filteredCars}
          setCars={setCars}
          updateVehicle={(car: any) =>
            navigate(`/editar-veiculo/${car.id}`, { state: car })
          }
        />
      )}
    </S.Container>
  )
}
