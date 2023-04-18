import { request } from './requestAPI'

class UserAPI {
  async login(authForm) {
    const formData = new FormData(authForm.target)

    const loginForm = {
      email: formData.get('email'),
      password: formData.get('password')
    }
    const response = await request(`/api/login`, 'POST', loginForm)
    return response
  }
  async auth() {
    const response = await request(`/api/auth`, 'GET', null, localStorage.getItem('token'))
    if (response) {
      return response
    } else {
      localStorage.removeItem('token')
    }
  }
  async masterRegistration(name, email, password, cities) {
    const requestData = {
      name,
      email,
      password,
      cities
    }
    const response = await request(`/api/master/registration`, 'POST', requestData)
    return response
  }
  async customerRegistration(name, email, password) {
    const requestData = {
      name,
      email,
      password
    }
    const response = await request(`/api/customer/registration`, 'POST', requestData)
    return response
  }
  async masterRegistrationFromAdminPage(name, email, password, cities) {
    const requestData = {
      name,
      email,
      password,
      cities
    }
    const response = await request(
      `/api/admin/master/registration`,
      'POST',
      requestData,
      localStorage.getItem('token')
    )
    return response
  }
  async customerRegistrationFromAdminPage(name, email, password) {
    const requestData = {
      name,
      email,
      password
    }
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
}

const userAPI = new UserAPI()
export default userAPI
