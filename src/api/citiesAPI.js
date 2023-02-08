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
      const response = await request('/api/cities', 'POST', newCity) 
      return response
    }
    async delCity(id) {
      const response = await request(`/api/cities/${id}`, 'DELETE') 
      return response
    }
}

const citiesAPI = new CitiesAPI()
export default citiesAPI

