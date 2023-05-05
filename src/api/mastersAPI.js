import { format } from 'date-fns'
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
  async getFreeMastersForCurrOrder(orderId, cityId, startTime, endTime) {
    const requestData = {
      cityId,
      startTime: format(new Date(startTime), 'yyyy.MM.dd, HH:mm'),
      endTime
    }
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
  async editMaster(id, requestData) {
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
  async activateMaster(id) {
    const response = await request(
      `/api/masters/activate/${id}`,
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async resetPassword(id) {
    const response = await request(
      `/api/masters/resetPassword/${id}`,
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
}

const mastersAPI = new MastersAPI()
export default mastersAPI
