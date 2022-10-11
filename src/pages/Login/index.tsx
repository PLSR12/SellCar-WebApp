import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import ImageLogin from 'common/assets/image-login.png'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import * as Atoms from 'components/Atoms'
import { useUser } from 'hooks/UserContext'
import api from 'services/api'
import * as S from './styles'

export function Login() {
  const { putUserData } = useUser()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 dígitos'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (clientData: any) => {
    try {
      const { data } = await api.post('sessions', {
        email: clientData.email,
        password: clientData.password,
      })

      putUserData(data)
      toast.success(`Bem-vindo ${data.name}`)

      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (err) {
      toast.error('Verifique seu e-mail e senha')
    }
  }

  const handleShowPassword = () => {
    setShowPassword((show) => !show)
  }

  return (
    <S.Container>
      <S.Image src={ImageLogin} alt="Imagem Inicial" />

      <S.ContainerItems>
        <h1>Bem-vindo!</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Atoms.Input
            type="email"
            placeholder="Digite seu e-mail"
            {...register('email')}
            error={errors.email}
            label="Email:"
          />

          <div style={{ marginTop: '25px' }}>
            <Atoms.Input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              error={errors.password}
              label="Senha:"
            />
            <span>
              {showPassword ? (
                <MdVisibility
                  color="#c4cdd5"
                  size={22}
                  onClick={handleShowPassword}
                  className="iconVisiblity"
                />
              ) : (
                <MdVisibilityOff
                  color="#c4cdd5"
                  size={22}
                  onClick={handleShowPassword}
                  className="iconVisiblity"
                />
              )}
            </span>
          </div>

          <Atoms.Button type="submit" style={{ margin: '25px 0 10px 0' }}>
            Entrar
          </Atoms.Button>
        </form>

        <p>
          Não possui conta?{' '}
          <S.LinkStyled to="/cadastro">Registre-se!</S.LinkStyled>
        </p>
      </S.ContainerItems>
    </S.Container>
  )
}
