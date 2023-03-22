import { request } from "./requestAPI";

class CitiesAPI {
    getCities = async () => {
      const response = await request('/api/cities')
      return response
    }
    addCity = async (e) => {
      const formData = new FormData(e.target)
      const newCity = {
        name: formData.get('city'),
      }
      const response = await request('/api/cities', 'POST', newCity, localStorage.getItem('token')) 
      return response
    }
    delCity = async (id) => {
      const response = await request(`/api/cities/${id}`, 'DELETE', null, localStorage.getItem('token')) 
      return response
    }
}

const citiesAPI = new CitiesAPI()
export default citiesAPI

