import { request } from "../api/requestAPI";
  
  class OrdersAPI {
      addOrder = async (e) => {
        const formData = new FormData(e.target)
        const masterId = {
          id: formData.get('masterId')
        }
        const id = masterId.id
        const response = await request(`/api/orders/${id}`, 'POST', sessionStorage) 
        return response
      }
      getOrders = async () => {
        const response = await request('/api/orders', 'GET', null, localStorage.getItem('token'))
        return response
      }
      getOrderById = async (id) => {
        const response = await request(`/api/orders/${id}`, 'GET', null, localStorage.getItem('token'))
        return response
      }
      getOrderEndDate = async (date) => {
        const response = await request('/api/orders', 'POST', date, localStorage.getItem('token'))
        return response
      }
      editOrder = async (e,id,endOrderDate) => {
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
      delOrder = async (id) => {
        const response = await request(`/api/orders/${id}`, 'DELETE', null, localStorage.getItem('token')) 
        return response
      }
  }
  
  const ordersAPI = new OrdersAPI()
  export default ordersAPI