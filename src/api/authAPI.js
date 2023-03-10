import { request } from "./requestAPI";
const token = localStorage.getItem('token')

class UserAPI {
    async login (authForm) { 
      const formData = new FormData(authForm.target)
            
      const loginForm = {
          email: formData.get('email'),
          password: formData.get('password'),
      }
      const response = await request(`/api/auth/login`, 'POST', loginForm) 
      return response
    }
    async auth () { 
      try {
        const response = await request(`/api/auth/auth`, 'GET', null, token) 
        return response
      } catch (error) {
        localStorage.removeItem('token')
        console.log(error.message);
      } 
    }
}

const userAPI = new UserAPI()
export default userAPI

