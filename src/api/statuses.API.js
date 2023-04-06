import { request } from '../api/requestAPI'

class StatusesAPI {
  async getStatuses() {
    const response = await request('/api/statuses', 'GET', null, localStorage.getItem('token'))
    return response
  }
}
const statusesAPI = new StatusesAPI()
export default statusesAPI
