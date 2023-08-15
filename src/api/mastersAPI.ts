import { format } from 'date-fns'
import { axiosInstance } from './requestAPI'
import {
  IFreeMastersForCurrentOrderRequestParams,
  IFreeMastersRequestParams,
  IMaster,
  IMasterEditForm,
  IMastersAndCount
} from '../types/master.types'
import { ITablesRequestParams } from '../types'

class MastersAPI {
  async getFreeMasters(requestData: IFreeMastersRequestParams) {
    const response = await axiosInstance<IMaster[]>({
      url: `/masters/getFreeMasters/`,
      params: requestData
    })
    return response.data
  }
  async getFreeMastersForCurrentOrder(requestData: IFreeMastersForCurrentOrderRequestParams) {
    const response = await axiosInstance<IMaster[]>({
      url: `/masters/freeMastersForOrder/${requestData.orderId}`,
      params: {
        ...requestData,
        startTime: format(new Date(requestData.startTime), 'yyyy.MM.dd, HH:mm')
      },
      needAuth: true
    })

    return response.data
  }
  async getMasters(requestData: ITablesRequestParams) {
    const response = await axiosInstance<IMastersAndCount>({
      url: `/masters`,
      params: requestData,
      needAuth: true
    })
    return response.data
  }
  async getMasterById(id: number | string) {
    const response = await axiosInstance<IMaster>(`/masters/${id}`)
    return response.data
  }
  async editMaster(id: number | string, requestData: IMasterEditForm) {
    const response = await axiosInstance<number[]>({
      url: `/masters/${id}`,
      method: 'put',
      data: requestData,
      needAuth: true
    })
    return response.data
  }
  async deleteMaster(id: number | string) {
    const response = await axiosInstance<IMaster['id']>({
      url: `/masters/${id}`,
      method: 'delete',
      needAuth: true
    })
    return response.data
  }
  async activateMaster(id: number | string) {
    const response = await axiosInstance<IMaster>({
      url: `/masters/activate/${id}`,
      needAuth: true
    })
    return response.data
  }
  async resetPassword(id: number | string) {
    const response = await axiosInstance<number[]>({
      url: `/masters/resetPassword/${id}`,
      needAuth: true
    })
    return response.data
  }
  async getMastersAll() {
    const response = await axiosInstance<IMaster[]>({
      url: '/masters/all',
      needAuth: true
    })
    return response.data
  }
  async getMastersByName(name: string) {
    const response = await axiosInstance<IMaster[]>({
      url: '/masters/name',
      params: {
        name
      },
      needAuth: true
    })
    return response.data
  }
}

const mastersAPI = new MastersAPI()
export default mastersAPI
