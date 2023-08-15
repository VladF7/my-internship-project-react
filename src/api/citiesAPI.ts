import { axiosInstance } from './requestAPI'
import { ICity, ICityForm } from '../types/city.types'

class CitiesAPI {
  async getCities() {
    const response = await axiosInstance<ICity[]>({
      url: '/cities'
    })
    return response.data
  }
  async addCity(requestData: ICityForm) {
    const response = await axiosInstance<ICity>({
      url: '/cities',
      method: 'post',
      data: requestData,
      needAuth: true
    })
    return response.data
  }
  async editCity(id: string | number, requestData: ICityForm) {
    const response = await axiosInstance<number[]>({
      url: `/cities/${id}`,
      method: 'put',
      data: requestData,
      needAuth: true
    })
    return response.data
  }
  async getCityById(id: string | number) {
    const response = await axiosInstance<ICity>({
      url: `/cities/${id}`
    })
    return response.data
  }
  async deleteCity(id: number) {
    const response = await axiosInstance<ICity['id']>({
      url: `/cities/${id}`,
      method: 'delete',
      needAuth: true
    })
    return response.data
  }
}

const citiesAPI = new CitiesAPI()
export default citiesAPI
