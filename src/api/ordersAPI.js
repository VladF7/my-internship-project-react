import { format } from 'date-fns'
import { request } from '../api/requestAPI'

class OrdersAPI {
  async addOrder(requestData) {
    const response = await request(`/api/orders`, 'POST', requestData)
    return response
  }
  async getOrders(requestData) {
    const response = await request(
      '/api/orders' + '?' + new URLSearchParams(requestData),
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async getOrderById(id) {
    const response = await request(`/api/orders/${id}`, 'GET', null, localStorage.getItem('token'))
    return response
  }
  async getOrderEndTime(clockId, date) {
    const requestData = {
      clockId,
      startTime: format(new Date(date), 'yyyy.MM.dd, HH:mm')
    }
    const response = await request(
      '/api/orders/orderEndTime' + '?' + new URLSearchParams(requestData),
      'GET'
    )
    return response
  }
  async editOrder(id, requestData) {
    const response = await request(
      `/api/orders/${id}`,
      'PUT',
      requestData,
      localStorage.getItem('token')
    )
    return response
  }
  async deleteOrder(id) {
    const response = await request(
      `/api/orders/${id}`,
      'DELETE',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async completeOrder(id) {
    const response = await request(
      `/api/orders/completeOrder/${id}`,
      'PUT',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async setRating(id, rating) {
    const requestData = {
      rating
    }
    const response = await request(
      `/api/orders/setRating/${id}`,
      'PUT',
      requestData,
      localStorage.getItem('token')
    )
    return response
  }
  async getOrdersForMastrerById(masterId) {
    const response = await request(
      `/api/orders/master/${masterId}`,
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async getOrdersForCustomerById(customerId) {
    const response = await request(
      `/api/orders/customer/${customerId}`,
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
}

const ordersAPI = new OrdersAPI()
export default ordersAPI
