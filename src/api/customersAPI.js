import { request } from "../api/requestAPI";
const token = localStorage.getItem('token')

class CustomersAPI {
    async getCustomers () {
      const response = await request('/api/customers','GET', null, token)
      return response
    }
    async getCustomerById (id){
      const response = await request(`/api/customers/${id}`,'GET', null, token)
      return response
    }
    async editCustomer (e,id) {
      const formData = new FormData(e.target)
      const editedCustomer = {
          name: formData.get('name'),
          email: formData.get('email'),
      }
      const response = await request(`/api/customers/${id}`, 'PUT', editedCustomer, token) 
      return response
    }
    async delCustomer (id) {
        const response = await request(`/api/customers/${id}`, 'DELETE', null, token) 
        return response
    }
}

const customersAPI = new CustomersAPI()
export default customersAPI