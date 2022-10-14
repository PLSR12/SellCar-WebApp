import axios from 'axios'
import envioriments from 'common/configs/envioriments.json'

const apiCarSell = axios.create({
  baseURL: envioriments.REACT_API_URL,
})

apiCarSell.interceptors.request.use(async (config: any) => {
  const userData = await localStorage.getItem('car-sell:userData')
  const token = userData && JSON.parse(userData).token
  config.headers.authorization = `Bearer ${token}`

  return config
})

export default apiCarSell
