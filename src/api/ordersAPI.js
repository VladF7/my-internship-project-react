import { format } from 'date-fns'
import { request } from '../api/requestAPI'

class OrdersAPI {
  async addOrder(requestData) {
    const response = await request(`/api/orders`, 'POST', requestData)
    return response
  }
  async getOrders(requestData) {
    const queryParams = {
      filters: encodeURIComponent(JSON.stringify(requestData))
    }
    const response = await request(
      '/api/orders' + '?' + new URLSearchParams(queryParams),
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
  async setFeedback(feedbackToken, requestData) {
    const response = await request(`/api/orders/feedback/${feedbackToken}`, 'PUT', requestData)
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
  async getMinMaxOrdersDate() {
    const response = await request(
      `/api/orders/minMaxDate`,
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async getMinMaxOrdersPrice() {
    const response = await request(
      `/api/orders/minMaxPrice`,
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async getOrderByFeedbackToken(feedbackToken) {
    const response = await request(`/api/orders/feedback/${feedbackToken}`, 'GET')
    return response
  }
  async getOrdersTableData(requestData) {
    const queryParams = {
      filters: encodeURIComponent(JSON.stringify(requestData))
    }
    const response = await request(
      '/api/orders/table' + '?' + new URLSearchParams(queryParams),
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
}

const ordersAPI = new OrdersAPI()
export default ordersAPI
