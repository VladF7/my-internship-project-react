export interface ILoginForm {
  email: string
  password: string
}

export interface ISignUpForm extends ILoginForm {
  name: string
  confirmPassword: string
  cities?: number[]
  signUpAsMaster?: boolean
}

export interface ICreateCustomer {
  name: string
  email: string
}

export interface IUser {
  id?: number | ''
  role?: string
  name?: string
  activationLink?: string | null
  password?: string | null
  email?: string
  customerId?: number | ''
  masterId?: number | ''
  isEmailActivated?: boolean | ''
}

export interface ILogin {
  token: string
  user: IUser

  redirect?: boolean
  message?: string
  redirectTo?: string
}
