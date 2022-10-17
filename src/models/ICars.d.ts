interface IAllCars {
  url: string
  id: number
  brand: string
  model: string
  version: string
  gear: string
  year: number
  price: string
  km: number
  description: string
  user_name: string
  user_number: string
  user_state: string
  user_city: string
  user_allow_show_email: boolean
  path: string
  category_id: number
  user_email: string
  category: {
    id: number
    name: string
  }
}

export { IAllCars }
