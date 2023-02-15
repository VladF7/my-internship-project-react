import { request } from "./requestAPI";
import ordersAPI from './ordersAPI'

class UserAPI {
    async createUser (e) {
      const formData = new FormData(e.target)
      const userForm = {
        name: formData.get('name'),
        email: formData.get('email'),
        size: formData.get('size'),
        city: formData.get('city'),
        start: formData.get('date'),
      }
        sessionStorage.setItem('name', userForm.name)
        sessionStorage.setItem('email', userForm.email)
        sessionStorage.setItem('size', userForm.size)
        sessionStorage.setItem('city', userForm.city)
        sessionStorage.setItem('start', userForm.start)

        const end = await ordersAPI.getOrderEndDate(sessionStorage)

        sessionStorage.setItem('end', end)  
        
        return end
    } 
    async getFreeMasters () {
      const response = await request('/api/user/getMastersList', 'POST', sessionStorage)
      return response
    }
    async addOrder (e) {
      const formData = new FormData(e.target)
      const masterId = {
        id: formData.get('masterId')
      }
      const id = masterId.id
      const response = await request(`/api/user/${id}`, 'POST', sessionStorage) 
      return response
    }
}

const userAPI = new UserAPI()
export default userAPI

