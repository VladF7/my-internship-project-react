import { axiosInstance } from './requestAPI'

import { ILoginForm, ISignUpForm, ICreateCustomer, IUser, ILogin } from '../types/user.types'

class UserAPI {
  async login(requestData: ILoginForm) {
    const response = await axiosInstance<ILogin>({
      url: `/login`,
      method: 'post',
      data: requestData
    })
    return response.data
  }
  async auth() {
    const response = await axiosInstance<ILogin>({
      url: `/auth`,
      needAuth: true
    })
    return response.data
  }
  async masterRegistration(requestData: ISignUpForm) {
    const response = await axiosInstance<IUser>({
      url: `/master/registration`,
      method: 'post',
      data: requestData
    })
    return response.data
  }
  async customerRegistration(requestData: ISignUpForm) {
    const response = await axiosInstance<IUser>({
      url: `/customer/registration`,
      method: 'post',
      data: requestData
    })
    return response.data
  }
  async masterRegistrationFromAdminPage(requestData: ISignUpForm) {
    const response = await axiosInstance<IUser>({
      url: `/admin/master/registration`,
      method: 'post',
      data: requestData,
      needAuth: true
    })
    return response.data
  }
  async customerRegistrationFromAdminPage(requestData: ISignUpForm) {
    const response = await axiosInstance<IUser>({
      url: `/admin/customer/registration`,
      method: 'post',
      data: requestData,
      needAuth: true
    })
    return response.data
  }
  async resetPassword(id: number) {
    const response = await axiosInstance<number[]>({
      url: `/admin/resetPassword/${id}`,
      needAuth: true
    })
    return response.data
  }
  async getUserByEmail(email: string) {
    const response = await axiosInstance<IUser>({
      url: `/users/`,
      params: {
        email
      }
    })
    return response.data
  }
  async createUserCustomer(requestData: ICreateCustomer) {
    const response = await axiosInstance<IUser>({
      url: `/createUser`,
      method: 'post',
      data: requestData
    })
    return response.data
  }
  async googleLogin(accessToken: string) {
    const response = await axiosInstance<ILogin>({
      url: `/login/google`,
      method: 'post',
      data: { accessToken }
    })
    return response.data
  }
}

const userAPI = new UserAPI()
export default userAPI
