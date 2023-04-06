import { request } from '../api/requestAPI'

class ClocksAPI {
  async getClocks() {
    const response = await request('/api/clocks', 'GET')
    return response
  }
}
const clocksAPI = new ClocksAPI()
export default clocksAPI
