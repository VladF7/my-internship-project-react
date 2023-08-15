import { IUser } from './user.types'

export interface ICustomer {
  id: number
  name: string
  email: string
  userId: number
  user?: IUser
}
