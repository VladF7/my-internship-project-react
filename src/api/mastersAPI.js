import { request } from "../api/requestAPI";

class MastersAPI {
    async getFreeMasters (data) {
      const response = await request('/api/masters/getMastersList', 'POST', data)
      return response
    }
    async getMasters () {
      const response = await request('/api/masters', 'GET', null, localStorage.getItem('token'))
      return response
    }
    async getMasterById (id){
      const response = await request(`/api/masters/${id}`, 'GET', null, localStorage.getItem('token'))
      return response
    }
    async addMaster (e) {
      const formData = new FormData(e.target)
      const newMaster = {
          name: formData.get('name'),
          rating: formData.get('rating'),
          cities: formData.getAll('cities'),
      }

      const response = await request('/api/masters', 'POST', newMaster, localStorage.getItem('token')) 
      return response
    }
    async editMaster (e,id) {
      const formData = new FormData(e.target)
      const editedMaster = {
          name: formData.get('name'),
          rating: formData.get('rating'),
          cities: formData.getAll('cities'),
      }
      const response = await request(`/api/masters/${id}`, 'PUT', editedMaster, localStorage.getItem('token')) 
      return response
    }
    async delMaster (id) {
        const response = await request(`/api/masters/${id}`, 'DELETE', null, localStorage.getItem('token')) 
        return response
    }
}

const mastersAPI = new MastersAPI()
export default mastersAPI