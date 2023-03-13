import { request } from "./requestAPI";

class CitiesAPI {
    async getCities (){
      const response = await request('/api/cities')
      return response
    }
    async addCity(e) {
      const formData = new FormData(e.target)
      const newCity = {
        name: formData.get('city'),
      }
      const response = await request('/api/cities', 'POST', newCity, localStorage.getItem('token')) 
      return response
    }
    async delCity(id) {
      const response = await request(`/api/cities/${id}`, 'DELETE', null, localStorage.getItem('token')) 
      return response
    }
}

const citiesAPI = new CitiesAPI()
export default citiesAPI

