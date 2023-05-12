import { request } from '../api/requestAPI'

class CustomersAPI {
  async getCustomers() {
    const response = await request('/api/customers', 'GET', null, localStorage.getItem('token'))
    return response
  }
  async getCustomerById(id) {
    const response = await request(
      `/api/customers/${id}`,
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async editCustomer(e, id) {
    const formData = new FormData(e.target)
    const editedCustomer = {
      name: formData.get('name'),
      email: formData.get('email')
    }
    const response = await request(
      `/api/customers/${id}`,
      'PUT',
      editedCustomer,
      localStorage.getItem('token')
    )
    return response
  }
  async deleteCustomer(id) {
    const response = await request(
      `/api/customers/${id}`,
      'DELETE',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async resetPassword(id) {
    const response = await request(
      `/api/customers/resetPassword/${id}`,
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
}

const customersAPI = new CustomersAPI()
export default customersAPI
