import { request } from '../api/requestAPI'

class ClocksAPI {
  async getClocks() {
    const response = await request('/api/clocks')
    return response
  }
  async getClockById(id) {
    const response = await request(`/api/clocks/${id}`)
    return response
  }
}
const clocksAPI = new ClocksAPI()
export default clocksAPI
