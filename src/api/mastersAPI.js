import { request } from '../api/requestAPI'

class MastersAPI {
  async getFreeMasters() {
    const requestData = {}
    Object.keys(sessionStorage).forEach((key) => {
      requestData[key] = JSON.parse(sessionStorage.getItem(key))
    })

    const response = await request(
      `/api/masters/getFreeMasters/` + '?' + new URLSearchParams(requestData),
      'GET'
    )
    return response
  }
  async getFreeMastersForCurrOrder(orderId, requestData) {
    const response = await request(
      `/api/masters/freeMastersForOrder/${orderId}` + '?' + new URLSearchParams(requestData),
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async getMasters() {
    const response = await request('/api/masters', 'GET', null, localStorage.getItem('token'))
    return response
  }
  async getMasterById(id) {
    const response = await request(`/api/masters/${id}`)
    return response
  }
  async addMaster(name, rating, cities) {
    const requestData = {
      name,
      rating,
      cities
    }

    const response = await request(
      '/api/masters',
      'POST',
      requestData,
      localStorage.getItem('token')
    )
    return response
  }
  async editMaster(id, name, rating, cities) {
    const requestData = {
      name,
      rating,
      cities
    }

    const response = await request(
      `/api/masters/${id}`,
      'PUT',
      requestData,
      localStorage.getItem('token')
    )
    return response
  }
  async delMaster(id) {
    const response = await request(
      `/api/masters/${id}`,
      'DELETE',
      null,
      localStorage.getItem('token')
    )
    return response
  }
}

const mastersAPI = new MastersAPI()
export default mastersAPI
