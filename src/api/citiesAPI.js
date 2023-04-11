import { request } from './requestAPI'

class CitiesAPI {
  async getCities() {
    const response = await request('/api/cities')
    return response
  }
  async addCity(name, priceForHour) {
    const requestData = {
      name,
      priceForHour
    }
    const response = await request(
      '/api/cities',
      'POST',
      requestData,
      localStorage.getItem('token')
    )
    return response
  }
  async editCity(id, name, priceForHour) {
    const requestData = {
      name,
      priceForHour
    }
    const response = await request(
      `/api/cities/${id}`,
      'PUT',
      requestData,
      localStorage.getItem('token')
    )
    return response
  }
  async getCityById(id) {
    const response = await request(`/api/cities/${id}`)
    return response
  }
  async delCity(id) {
    const response = await request(
      `/api/cities/${id}`,
      'DELETE',
      null,
      localStorage.getItem('token')
    )
    return response
  }
}

const citiesAPI = new CitiesAPI()
export default citiesAPI
