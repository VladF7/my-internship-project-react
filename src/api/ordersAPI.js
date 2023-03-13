import { request } from "../api/requestAPI";
  
  class OrdersAPI {
      async addOrder (e) {
        const formData = new FormData(e.target)
        const masterId = {
          id: formData.get('masterId')
        }
        const id = masterId.id
        const response = await request(`/api/orders/${id}`, 'POST', sessionStorage) 
        return response
      }
      async getOrders () {
        const response = await request('/api/orders', 'GET', null, localStorage.getItem('token'))
        return response
      }
      async getOrderById (id){
        const response = await request(`/api/orders/${id}`, 'GET', null, localStorage.getItem('token'))
        return response
      }
      async getOrderEndDate (date) {
        const response = await request('/api/orders', 'POST', date, localStorage.getItem('token'))
        return response
      }
      async editOrder (e,id,endOrderDate) {
        const formData = new FormData(e.target)
        const editedOrder = {
            size: formData.get('size'),
            master: formData.get('master'),
            city: formData.get('city'),
            start: formData.get('date'),
            end: endOrderDate,
        }
        const response = await request(`/api/orders/${id}`, 'PUT', editedOrder, localStorage.getItem('token')) 
        return response
      }
      async delOrder (id) {
        const response = await request(`/api/orders/${id}`, 'DELETE', null, localStorage.getItem('token')) 
        return response
      }
  }
  
  const ordersAPI = new OrdersAPI()
  export default ordersAPI