import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import ImageLogin from 'common/assets/image-login.png'
import * as Atoms from 'components/Atoms'
import api from 'services/api'
import { fetchStates, fetchCities } from 'services/apiIbge'
import { normalizePhoneNumber } from 'common/utils/masks'
import { phoneNumber } from 'common/utils/validations'
import * as S from './styles'

export function Register() {
  const [states, setStates] = useState<any>([])
  const [cities, setCities] = useState<any>([])
  const [formValues, setFormValues] = useState<any>({})

  const navigate = useNavigate()

  useEffect(() => {
    fetchStates().then((states) => setStates(states))
  }, [])

  useEffect(() => {
    fetchCities(formValues.state).then((cities) => setCities(cities))
  }, [formValues.state])

  const handleInputChange = (event: any) => {
    event.preventDefault()

    const { value, name } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

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
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 dígitos'),
    confirmPassword: Yup.string()
      .required('A senha é obrigatória')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
    allow_show_email: Yup.boolean(),
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({})

  const numberValue = watch('number')
  const birthDateValue = watch('birth_date')

  useEffect(() => {
    setValue('number', normalizePhoneNumber(numberValue))
  }, [birthDateValue, numberValue, setValue])

  const onSubmit = async (clientData: any) => {
    try {
      toast.loading('Verificando seus dados', {
        duration: 5000,
      })
      const { status } = await api.post(
        'users',
        {
          name: clientData.name,
          last_name: clientData.last_name,
          number: clientData.number,
          email: clientData.email,
          state: clientData.state,
          city: clientData.city,
          password: clientData.password,
          allow_show_email: clientData.allow_show_email,
        },
        { validateStatus: () => true }
      )
      if (status === 201 || status === 200) {
        toast.remove()
        toast.success('Cadastro criado com sucesso', {
          duration: 1500,
        })

        setTimeout(() => {
          navigate('/login')
        }, 1500)
      } else if (status === 409) {
        toast.remove()
        toast.error('E-mail já cadastrado, faça login para continuar')
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.remove()
      toast.error('Falha no sistema, tente novamente')
    }
  }

  return (
    <S.Container>
      <S.Image src={ImageLogin} alt="Imagem Inicial" />

      <S.ContainerItems>
        <h1>Bem-vindo(a)!</h1>

        <Toaster />

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div style={{ gap: '25px' }}>
            <Atoms.Input
              label="Nome"
              type="text"
              placeholder="Digite seu nome"
              {...register('name')}
              error={errors.name}
              style={{ marginBottom: '15px' }}
            />

            <Atoms.Input
              label="Sobrenome"
              type="text"
              placeholder="Digite seu sobrenome"
              {...register('last_name')}
              error={errors.last_name}
              style={{ marginBottom: '15px' }}
            />
            <Atoms.Input
              label="Email"
              type="email"
              placeholder="Digite seu e-mail"
              {...register('email')}
              error={errors.email}
              style={{ marginBottom: '15px' }}
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
                  style={{ marginBottom: '15px' }}
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

            <Atoms.Input
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              {...register('password')}
              error={errors.password}
              style={{ marginBottom: '15px' }}
            />

            <Atoms.Input
              type="password"
              label="Confirme sua Senha"
              placeholder="Digite sua senha novamente"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            <input
              type="checkbox"
              {...register('allow_show_email')}
              id="input-allow-email"
              style={{ width: '16px', margin: '20px 5px 0 0' }}
            />
            <label htmlFor="input-allow-email" style={{ color: '#000' }}>
              Autorizo exibir meu e-mail nos meus anúncios
            </label>
          </div>
          <Atoms.Button type="submit" style={{ margin: '25px 0 10px 0' }}>
            Criar conta
          </Atoms.Button>
        </form>

        <p>
          Já possui conta? <S.LinkStyled to="/login">Logue!</S.LinkStyled>
        </p>
      </S.ContainerItems>
    </S.Container>
  )
}
