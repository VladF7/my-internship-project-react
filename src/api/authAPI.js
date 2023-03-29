import { request } from './requestAPI'

class UserAPI {
  async login(authForm) {
    const formData = new FormData(authForm.target)

    const loginForm = {
      email: formData.get('email'),
      password: formData.get('password')
    }
    const response = await request(`/api/auth/login`, 'POST', loginForm)
    return response
  }
  async auth() {
    const response = await request(`/api/auth/auth`, 'GET', null, localStorage.getItem('token'))
    if (response) {
      return response
    } else {
      localStorage.removeItem('token')
    }
  }
}

const userAPI = new UserAPI()
export default userAPI
