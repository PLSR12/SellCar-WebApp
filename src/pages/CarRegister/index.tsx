import { yupResolver } from '@hookform/resolvers/yup'
import Dropzone from 'react-dropzone'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import * as Atoms from 'components/Atoms'
import * as Organisms from 'components/Organisms'
import { useUser } from 'hooks/UserContext'
import api from 'services/api'
import * as S from './styles'
import { maskCurrencyInput } from 'common/utils/formatCurrency'
import { IAllCategories } from 'models/ICategories'

export function CarRegister() {
  const [categories, setCategories] = useState<IAllCategories[]>([])
  const [file, setFile] = useState<any>([])
  const navigate = useNavigate()
  const { userData } = useUser()
  const gearOption = [
    { id: 'Automático', label: 'Automático' },
    { id: 'Manual', label: 'Manual' },
  ]

  useEffect(() => {
    const fetchCars = async () => {
      const { data: categories } = await api.get('categories')

      categories.sort((x: any, y: any) => {
        return x.id - y.id
      })

      const OptionCategories = categories.map((category: any) => {
        return {
          id: category.id,
          label: category.name,
        }
      })

      setCategories(OptionCategories)
    }

    fetchCars()
  }, [])

  const handleDrop = (acceptedFiles: any) =>
    setFile(acceptedFiles.map((file: any) => file))

  const schema = Yup.object().shape({
    brand: Yup.string().required('A marca é obrigatória'),
    model: Yup.string().required('O modelo é obrigatório'),
    version: Yup.string().required('A versão é obrigatória'),
    gear: Yup.string().required('A transmissão é obrigatória'),
    year: Yup.string()
      .length(4, 'Digite um ano válido')
      .required('O ano é obrigatório'),
    price: Yup.string().required('O preço é obrigatório'),
    km: Yup.string().required('A quilometragem é obrigatória'),
    description: Yup.string().required('A descrição é obrigatória'),
    category_id: Yup.string().required('A categoria é obrigatória'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (clientData: any) => {
    const carDataFormData = new FormData()

    carDataFormData.append('brand', clientData.brand)
    carDataFormData.append('model', clientData.model)
    carDataFormData.append('version', clientData.version)
    carDataFormData.append('gear', clientData.gear)
    carDataFormData.append('year', clientData.year)
    carDataFormData.append('price', clientData.price)
    carDataFormData.append('km', clientData.km)
    carDataFormData.append('description', clientData.description)
    carDataFormData.append('category_id', clientData.category_id)
    carDataFormData.append(
      'user_name',
      `${userData.name} ${userData.last_name}`
    )
    carDataFormData.append('user_email', userData.email)
    carDataFormData.append('user_number', userData.number)
    carDataFormData.append('user_state', userData.state)
    carDataFormData.append('user_city', userData.city)
    carDataFormData.append('user_allow_show_email', userData.allow_show_email)
    carDataFormData.append('file', file[0])

    try {
      toast.loading('Anunciando', {
        duration: 5000,
      })

      await api.post('cars', carDataFormData)

      toast.remove()
      toast.success(
        `${clientData.brand} ${clientData.model} anunciado com sucesso`,
        {
          duration: 2000,
        }
      )

      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (err) {
      toast.remove()
      toast.error('Falha no sistema, tente novamente')
    }
  }

  function cancelCreation() {
    navigate('/')
  }

  return (
    <>
      <Organisms.Header />
      <S.Container>
        <S.ContainerItems>
          <h1 className="title">Anuncie seu Veículo</h1>

          <Toaster />

          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Atoms.Input
              label="Marca"
              error={errors.brand}
              type="text"
              placeholder="Ex: Nissan"
              {...register('brand')}
            />

            <Atoms.Input
              label="Modelo"
              error={errors.model}
              type="text"
              placeholder="Ex: GT-R"
              {...register('model')}
            />
            <Atoms.Input
              label="Versão"
              error={errors.version}
              type="text"
              placeholder="Ex: Nismo"
              {...register('version')}
            />
            <Atoms.Input
              label="KM"
              error={errors.km}
              type="number"
              placeholder="Ex: 7.500"
              {...register('km')}
            />

            <Atoms.Input
              label="Ano"
              error={errors.year}
              type="number"
              placeholder="Ex: 7.500"
              {...register('year')}
            />

            <Atoms.Select
              label="Câmbio"
              error={errors.gear}
              {...register('gear')}
              options={gearOption}
            />

            <Atoms.Select
              label="Categoria"
              error={errors.category_id}
              {...register('category_id')}
              options={categories}
            />
            <Atoms.Input
              label="Preço"
              min={0}
              {...register('price')}
              error={errors.price}
              onInput={maskCurrencyInput}
              placeholder="Ex: 75.000"
            />
            <div>
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }: any) => (
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input
                      type="file"
                      accept="image/*"
                      {...register('file')}
                      {...getInputProps()}
                    />
                    {file.length > 0 ? (
                      <p>
                        {file.map((file: any) => (
                          <li key={file}>{file?.name}</li>
                        ))}
                      </p>
                    ) : (
                      <p> Arraste sua imagem ou clique e selecione:</p>
                    )}
                  </div>
                )}
              </Dropzone>
              {Object.keys(file).length <= 0 && (
                <Atoms.ErrorMessage> Carregue uma Imagem!</Atoms.ErrorMessage>
              )}
            </div>
            <Atoms.TextArea
              label="Descrição"
              placeholder="Escreva um pouco sobre o veículo"
              {...register('description')}
              style={{ paddingTop: '3px', resize: 'vertical' }}
            />

            <div className="container-button">
              <Atoms.Button type="button" onClick={cancelCreation}>
                Cancelar
              </Atoms.Button>
              <Atoms.Button type="submit">Anunciar</Atoms.Button>
            </div>
          </form>
        </S.ContainerItems>
      </S.Container>
    </>
  )
}
