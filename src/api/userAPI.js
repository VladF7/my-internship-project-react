import { request } from './requestAPI'

class UserAPI {
  async login(requestData) {
    const response = await request(`/api/login`, 'POST', requestData)
    return response
  }
  async auth() {
    const response = await request(`/api/auth`, 'GET', null, localStorage.getItem('token'))
    return response
  }
  async masterRegistration(requestData) {
    const response = await request(`/api/master/registration`, 'POST', requestData)
    return response
  }
  async customerRegistration(requestData) {
    const response = await request(`/api/customer/registration`, 'POST', requestData)
    return response
  }
  async masterRegistrationFromAdminPage(requestData) {
    const response = await request(
      `/api/admin/master/registration`,
      'POST',
      requestData,
      localStorage.getItem('token')
    )
    return response
  }
  async customerRegistrationFromAdminPage(requestData) {
    const response = await request(
      `/api/admin/customer/registration`,
      'POST',
      requestData,
      localStorage.getItem('token')
    )
    return response
  }
  async resetPassword(id) {
    const response = await request(
      `/api/admin/resetPassword/${id}`,
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async getUserByEmail(email) {
    const requestData = {
      email
    }
    const response = await request(`/api/users/` + '?' + new URLSearchParams(requestData), 'GET')
    return response
  }
  async createUserCustomer(requestData) {
    const response = await request(`/api/createUser`, 'POST', requestData)
    return response
  }
  async googleLogin(accessToken) {
    const requestData = {
      accessToken
    }
    const response = await request(`/api/login/google`, 'POST', requestData)
    return response
  }
}

const userAPI = new UserAPI()
export default userAPI
