import { request } from "../api/requestAPI";

class MastersAPI {
    async getMasters () {
      const response = await request('/api/masters')
      return response
    }
    async getMasterById (id){
      const response = await request(`/api/masters/${id}`)
      return response
    }
    async addMaster (e) {
      const formData = new FormData(e.target)
      const newMaster = {
          name: formData.get('name'),
          rating: formData.get('rating'),
          city: formData.get('city'),
      }
      const response = await request('/api/masters', 'POST', newMaster) 
      return response
    }
    async editMaster (e,id) {
      const formData = new FormData(e.target)
      const editedMaster = {
          name: formData.get('name'),
          rating: formData.get('rating'),
          city: formData.get('city'),
      }
      const response = await request(`/api/masters/${id}`, 'PUT', editedMaster) 
      return response
    }
    async delMaster (id) {
        const response = await request(`/api/masters/${id}`, 'DELETE') 
        return response
    }
}

const mastersAPI = new MastersAPI()
export default mastersAPI