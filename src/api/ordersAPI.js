import { request } from "../api/requestAPI";

  class MastersAPI {
      async getOrders () {
        const response = await request('/api/orders')
        return response
      }
      async getOrderById (id){
        const response = await request(`/api/orders/${id}`)
        return response
      }
      async getOrderEndDate (date) {
        const response = await request('/api/orders', 'POST', date)
        return response
      }
      async editOrder (e,id) {
        const formData = new FormData(e.target)
        const editedOrder = {
            size: formData.get('size'),
            master: formData.get('master'),
            city: formData.get('city'),
            start: formData.get('startOrderdate'),
        }
        const response = await request(`/api/orders/${id}`, 'PUT', editedOrder) 
        return response
      }
      async delOrder (id) {
        const response = await request(`/api/orders/${id}`, 'DELETE') 
        return response
      }
  }
  
  const mastersAPI = new MastersAPI()
  export default mastersAPI