import { request } from "../api/requestAPI";

class MastersAPI {
    getFreeMasters = async (data) => {
      const response = await request('/api/masters/getMastersList', 'POST', data)
      return response
    }
    getMasters = async () => {
      const response = await request('/api/masters', 'GET', null, localStorage.getItem('token'))
      return response
    }
    getMasterById = async (id) => {
      const response = await request(`/api/masters/${id}`, 'GET', null, localStorage.getItem('token'))
      return response
    }
    addMaster = async (e) => {
      const formData = new FormData(e.target)
      const newMaster = {
          name: formData.get('name'),
          rating: formData.get('rating'),
          cities: formData.getAll('cities'),
      }

      const response = await request('/api/masters', 'POST', newMaster, localStorage.getItem('token')) 
      return response
    }
    editMaster = async (e,id) => {
      const formData = new FormData(e.target)
      const editedMaster = {
          name: formData.get('name'),
          rating: formData.get('rating'),
          cities: formData.getAll('cities'),
      }
      const response = await request(`/api/masters/${id}`, 'PUT', editedMaster, localStorage.getItem('token')) 
      return response
    }
    delMaster = async (id) => {
        const response = await request(`/api/masters/${id}`, 'DELETE', null, localStorage.getItem('token')) 
        return response
    }
}

const mastersAPI = new MastersAPI()
export default mastersAPI