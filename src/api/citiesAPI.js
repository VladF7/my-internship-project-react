import { request } from './requestAPI'

class CitiesAPI {
  async getCities() {
    const response = await request('/api/cities')
    return response
  }
  async addCity(requestData) {
    const response = await request(
      '/api/cities',
      'POST',
      requestData,
      localStorage.getItem('token')
    )
    return response
  }
  async editCity(id, requestData) {
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
  async deleteCity(id) {
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
