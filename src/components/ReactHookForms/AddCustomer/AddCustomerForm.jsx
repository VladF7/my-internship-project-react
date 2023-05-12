import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import MyBigButton from '../../Buttons/BigButton/MyBigButton'
import { useEffect } from 'react'
import '../ReactHookForms.css'
import { useNavigate } from 'react-router-dom'

const AddCustomerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Required field' })
      .min(3, { message: 'Name must be be 3 or more characters long' }),
    email: z.string().min(1, { message: 'Required field' }).email(),
    password: z
      .string()
      .min(1, { message: 'Required field' })
      .min(3, { message: 'Password must be 3 or more characters long' })
      .max(16, { message: 'Password must be 16 or fewer characters long' }),
    confirmPassword: z.string().min(1, { message: 'Required field' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match"
  })

const AddCustomerForm = ({ onSubmit, submitError, loader, inProcess }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(AddCustomerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      cities: []
    }
  })

  useEffect(() => {
    if (submitError) {
      setError('email', { type: 'custom', message: 'A user with that email alredy exist' })
    }
  }, [submitError])

  const navigate = useNavigate()

  const goBack = (event) => {
    event.preventDefault()
    navigate('/admin/customers')
  }

  return (
    <form className='formWrapper' onSubmit={handleSubmit(onSubmit)}>
      <div className='fieldWrapper'>
        <label className='formLabel'>Enter customer name</label>
        <input
          className={errors?.name?.message ? 'formInput' + ' ' + 'formErrorField' : 'formInput'}
          {...register('name')}
          placeholder='Must not be less than 3 characters'
        ></input>
        {errors?.name?.message && <div className='formRequiredField'>{errors?.name?.message}</div>}
      </div>

      <div className='fieldWrapper'>
        <label className='formLabel'>Enter email</label>
        <input
          className={errors?.email?.message ? 'formInput' + ' ' + 'formErrorField' : 'formInput'}
          {...register('email')}
          placeholder='Enter email'
        ></input>
        {errors?.email?.message && (
          <div className='formRequiredField'>{errors?.email?.message}</div>
        )}
      </div>

      <div className='fieldWrapper'>
        <label className='formLabel'>Enter password</label>
        <input
          className={errors?.password?.message ? 'formInput' + ' ' + 'formErrorField' : 'formInput'}
          type='password'
          {...register('password')}
          placeholder='Must be 3 or more characters'
        ></input>
        {errors?.password?.message && (
          <div className='formRequiredField'>{errors?.password?.message}</div>
        )}
      </div>

      <div className='fieldWrapper'>
        <label className='formLabel'>Confirm password</label>
        <input
          className={
            errors?.confirmPassword?.message ? 'formInput' + ' ' + 'formErrorField' : 'formInput'
          }
          type='password'
          {...register('confirmPassword')}
          placeholder='Passwords must match'
        ></input>
        {errors?.confirmPassword?.message && (
          <div className='formRequiredField'>{errors?.confirmPassword?.message}</div>
        )}
      </div>

      <div className='buttonBoxWrapper'>
        <div className='buttonBox'>
          <MyBigButton onClick={(e) => goBack(e)} className='backBigButton'>
            Cancel
          </MyBigButton>
        </div>
        <div className='buttonBox'>
          <MyBigButton disabled={inProcess}> {(inProcess && loader) || 'Add customer'}</MyBigButton>
        </div>
      </div>
    </form>
  )
}

export default AddCustomerForm
