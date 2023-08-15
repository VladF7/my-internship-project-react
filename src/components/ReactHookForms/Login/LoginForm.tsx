import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import MyBigButton from '../../Buttons/BigButton/MyBigButton'
import { ReactNode, useEffect } from 'react'
import '../ReactHookForms.css'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { ILoginForm } from '../../../types/user.types'

const LoginSchema = z.object({
  email: z.string().min(1, { message: 'Required field' }).email(),
  password: z
    .string()
    .min(1, { message: 'Required field' })
    .min(3, { message: 'Password must be 3 or more characters long' })
    .max(16, { message: 'Password must be 16 or fewer characters long' })
})

interface LoginFormProps {
  formFields?: ILoginForm
  onSubmit: (formData: ILoginForm) => Promise<void>
  submitError: number
  inProcess: boolean
  loader: ReactNode
}

const LoginForm: React.FC<LoginFormProps> = ({
  formFields,
  onSubmit,
  submitError,
  inProcess,
  loader
}) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    if (formFields) {
      reset({
        email: formFields.email
      })
    }
  }, [])

  useEffect(() => {
    if (submitError) {
      setError('email', { type: 'custom', message: 'Wrong email or password' })
    }
  }, [submitError])

  const navigate = useNavigate()

  const skipAuthorization = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault()
    navigate(`/user/chooseMaster`, { replace: true })
  }

  return (
    <form className='formWrapper' onSubmit={handleSubmit(onSubmit)}>
      <div className='loginForm'>
        <div>
          {formFields && (
            <label className='formLabel' style={{ display: 'block', marginBottom: '10px' }}>
              You already have an account, would you like to log in?
            </label>
          )}
          <div className='fieldWrapper'>
            <label className='formLabel'>Enter email</label>
            <input
              disabled={formFields?.email ? true : false}
              className={
                errors?.email?.message ? 'formInput' + ' ' + 'formErrorField' : 'formInput'
              }
              {...register('email')}
              placeholder='Enter your email'
            ></input>
            {errors?.email?.message && (
              <div className='formRequiredField'>{errors?.email?.message}</div>
            )}
          </div>

          <div className='fieldWrapper'>
            <label className='formLabel'>Enter password</label>
            <input
              className={
                errors?.password?.message ? 'formInput' + ' ' + 'formErrorField' : 'formInput'
              }
              type='password'
              {...register('password')}
              placeholder='Enter your password'
            ></input>
            {errors?.password?.message && (
              <div className='formRequiredField'>{errors?.password?.message}</div>
            )}
          </div>
        </div>
        {!formFields && (
          <div className='myButtonWrapper'>
            <MyBigButton disabled={inProcess}>{(inProcess && loader) || 'Log in'}</MyBigButton>
          </div>
        )}

        {formFields && (
          <div className='buttonBoxWrapper'>
            <div className='buttonBox'>
              <MyBigButton
                onClick={(event: React.SyntheticEvent<EventTarget>) => skipAuthorization(event)}
                className='backBigButton'
              >
                Skip
              </MyBigButton>
            </div>
            <div className='buttonBox'>
              <MyBigButton disabled={inProcess}>{(inProcess && loader) || 'Next'}</MyBigButton>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}

export default LoginForm
