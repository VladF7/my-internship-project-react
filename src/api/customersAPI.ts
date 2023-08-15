import { ICustomer } from '../types/customer.types'
import { axiosInstance } from './requestAPI'

class CustomersAPI {
  async getCustomers() {
    const response = await axiosInstance<ICustomer[]>({
      url: '/customers',
      needAuth: true
    })
    return response.data
  }
  async getCustomerById(id: number | string) {
    const response = await axiosInstance<ICustomer>({
      url: `/customers/${id}`,
      needAuth: true
    })
    return response.data
  }
  async deleteCustomer(id: number) {
    const response = await axiosInstance<ICustomer['id']>({
      url: `/customers/${id}`,
      method: 'delete',
      needAuth: true
    })
    return response.data
  }
  async resetPassword(id: number) {
    const response = await axiosInstance<number[]>({
      url: `/customers/resetPassword/${id}`,
      needAuth: true
    })
    return response.data
  }
}

const customersAPI = new CustomersAPI()
export default customersAPI
