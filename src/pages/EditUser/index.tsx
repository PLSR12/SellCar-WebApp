import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'

import * as Atoms from 'components/Atoms'
import * as Organisms from 'components/Organisms'
import { useUser } from 'hooks/UserContext'
import api from 'services/api'
import { fetchStates, fetchCities } from 'services/apiIbge'
import { normalizePhoneNumber } from 'common/utils/masks'
import { phoneNumber } from 'common/utils/validations'
import * as S from './styles'

export function EditUser() {
  const [states, setStates] = useState<any>([])
  const [cities, setCities] = useState<any>([])
  const [formValues, setFormValues] = useState<any>({})
  const [stateSelect, setStateSelect] = useState<string>('')
  const [dataUser, setDataUser] = useState<any>([])
  const navigate = useNavigate()
  const { id } = useParams()
  const { userData, putUserData } = useUser()

  useEffect(() => {
    fetchStates().then((states: any) => {
      setStates(states)
      setFormValues({ state: dataUser.state })
    })
  }, [dataUser])

  useEffect(() => {
    fetchCities(formValues.state).then((cities) => {
      setCities(cities)
    })
  }, [formValues.state])

  const handleInputChange = (event: any) => {
    event.preventDefault()

    const { value, name } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  console.log(stateSelect)

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    last_name: Yup.string().required('O sobrenome é obrigatório'),
    number: Yup.string()
      .matches(phoneNumber, 'Formato de celular inválido')
      .required('O número é obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    state: Yup.string().required('O estado é obrigatório'),
    city: Yup.string().required('A cidade é obrigatória'),
    allow_show_email: Yup.boolean(),
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    api.get(`users/${id}`).then((response) => {
      reset(response.data)
      setDataUser(response.data)
    })
  }, [id, reset])

  const numberValue = watch('number')

  useEffect(() => {
    setValue('number', normalizePhoneNumber(numberValue))
  }, [numberValue, setValue])

  const onSubmit = async (clientData: any) => {
    try {
      toast.loading('Atualizando usuário', {
        duration: 5000,
      })

      const { data } = await api.put(`users/${id}`, {
        name: clientData.name,
        last_name: clientData.last_name,
        email: userData.email,
        number: clientData.number,
        state: clientData.state,
        city: clientData.city,
        allow_show_email: clientData.allow_show_email,
      })
      putUserData(data)

      toast.remove()
      toast.success('Usuário atualizado com sucesso', {
        duration: 2000,
      })

      setTimeout(() => {
        navigate('/minha-conta')
      }, 1500)
    } catch (err) {
      toast.remove()
      toast.error('Falha no sistema, tente novamente')
    }
  }

  function cancelEdition() {
    navigate('/minha-conta')
  }
  return (
    <>
      <Organisms.Header />
      <S.Container>
        <S.ContainerItems>
          <h1>Edição de Usuário</h1>

          <Toaster />

          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Atoms.Input
              label="Nome"
              type="text"
              placeholder="Digite seu nome"
              {...register('name')}
              error={errors.name}
            />

            <Atoms.Input
              label="Sobrenome"
              type="text"
              placeholder="Digite seu sobrenome"
              {...register('last_name')}
              error={errors.last_name}
            />

            <Atoms.Input
              label="Número"
              type="tel"
              placeholder="Digite seu número"
              {...register('number')}
              error={errors.number}
            />
            <span>
              <S.Label>Estado</S.Label>
              {states.length > 0 && (
                <S.Select
                  id="state"
                  {...register('state')}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione seu estado</option>
                  {states &&
                    states.map((state: any) => {
                      const { sigla, nome } = state
                      return (
                        <option key={sigla} value={sigla}>
                          {nome}
                        </option>
                      )
                    })}
                </S.Select>
              )}

              <Atoms.ErrorMessage>{errors.state?.message}</Atoms.ErrorMessage>
            </span>
            <span>
              {cities.length > 0 && (
                <>
                  <S.Label>Cidade</S.Label>
                  <S.Select id="city" {...register('city')}>
                    <option value="">Selecione sua cidade</option>
                    {cities &&
                      cities.map((city: any) => {
                        const { id, nome } = city
                        return (
                          <option key={id} value={nome}>
                            {nome}
                          </option>
                        )
                      })}
                  </S.Select>
                  <Atoms.ErrorMessage>
                    {errors.city?.message}
                  </Atoms.ErrorMessage>
                </>
              )}
            </span>

            <span>
              <input
                type="checkbox"
                {...register('allow_show_email')}
                id="input-allow-email"
                style={{ width: '16px', margin: '20px 5px 0 0' }}
              />
              <label htmlFor="input-allow-email" style={{ color: '#000' }}>
                Autorizo exibir meu e-mail nos meus anúncios
              </label>
            </span>

            <div className="container-button">
              <Atoms.Button type="button" onClick={cancelEdition}>
                Cancelar
              </Atoms.Button>
              <Atoms.Button type="submit">Editar</Atoms.Button>
            </div>
          </form>
        </S.ContainerItems>
      </S.Container>
    </>
  )
}
