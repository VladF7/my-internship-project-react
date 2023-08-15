import { axiosInstance } from './requestAPI'
import { IClock } from '../types/clock.types'

class ClocksAPI {
  async getClocks() {
    const response = await axiosInstance<IClock[]>({
      url: '/clocks'
    })
    return response.data
  }
  async getClockById(id: number) {
    const response = await axiosInstance<IClock>({
      url: `/clocks/${id}`
    })
    return response.data
  }
}
const clocksAPI = new ClocksAPI()
export default clocksAPI
