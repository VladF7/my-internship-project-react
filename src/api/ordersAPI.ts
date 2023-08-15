import { format } from 'date-fns'
import { axiosInstance } from './requestAPI'
import {
  IEditOrder,
  IFeedback,
  IOrder,
  IOrdersAndCount,
  IOrdersTableRequestParams
} from '../types/order.types'
import { ICreateOrder } from '../types/createOrder.types'

class OrdersAPI {
  async addOrder(requestData: ICreateOrder) {
    const response = await axiosInstance<IOrder>({
      url: `/orders`,
      method: 'post',
      data: requestData
    })
    return response.data
  }
  async getOrders(requestData: IOrdersTableRequestParams) {
    const response = await axiosInstance<IOrdersAndCount>({
      url: '/orders',
      params: {
        filters: encodeURIComponent(JSON.stringify(requestData))
      },
      needAuth: true
    })

    return response.data
  }
  async getOrderById(id: number | string) {
    const response = await axiosInstance<IOrder>({
      url: `/orders/${id}`,
      needAuth: true
    })
    return response.data
  }
  async getOrderEndTime(clockId: number, date: Date | string) {
    const response = await axiosInstance<IOrder['endTime']>({
      url: '/orders/orderEndTime',
      params: {
        clockId,
        startTime: format(new Date(date), 'yyyy.MM.dd, HH:mm')
      }
    })
    return response.data
  }
  async editOrder(id: number | string, requestData: IEditOrder) {
    const response = await axiosInstance<number[]>({
      url: `/orders/${id}`,
      method: 'put',
      data: requestData,
      needAuth: true
    })
    return response.data
  }
  async deleteOrder(id: number) {
    const response = await axiosInstance<IOrder['id']>({
      url: `/orders/${id}`,
      method: 'delete',
      needAuth: true
    })
    return response.data
  }
  async completeOrder(id: number) {
    const response = await axiosInstance<IOrder>({
      url: `/orders/completeOrder/${id}`,
      method: 'put',
      needAuth: true
    })
    return response.data
  }
  async setFeedback(feedbackToken: string, requestData: IFeedback) {
    const response = await axiosInstance<number[]>({
      url: `/orders/feedback/${feedbackToken}`,
      method: 'put',
      data: requestData,
      needAuth: true
    })
    return response.data
  }
  async getOrdersForMastrerById(masterId: number) {
    const response = await axiosInstance<IOrder[]>({
      url: `/orders/master/${masterId}`,
      needAuth: true
    })
    return response.data
  }
  async getOrdersForCustomerById(customerId: number) {
    const response = await axiosInstance<IOrder[]>({
      url: `/orders/customer/${customerId}`,
      needAuth: true
    })
    return response.data
  }
  async getMinMaxOrdersDate() {
    const response = await axiosInstance<string[]>({
      url: `/orders/minMaxDate`,
      needAuth: true
    })
    return response.data
  }
  async getMinMaxOrdersPrice() {
    const response = await axiosInstance<number[]>({
      url: `/orders/minMaxPrice`,
      needAuth: true
    })
    return response.data
  }
  async getOrderByFeedbackToken(feedbackToken: string) {
    const response = await axiosInstance<IOrder>({
      url: `/orders/feedback/${feedbackToken}`
    })
    return response.data
  }
}

const ordersAPI = new OrdersAPI()
export default ordersAPI
