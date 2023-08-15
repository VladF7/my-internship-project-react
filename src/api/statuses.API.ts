import { axiosInstance } from './requestAPI'
import { STATUS } from '../types/status.types'

class StatusesAPI {
  async getStatuses() {
    const response = await axiosInstance<STATUS[]>({
      url: '/statuses',
      needAuth: true
    })
    return response.data
  }
}
const statusesAPI = new StatusesAPI()
export default statusesAPI
