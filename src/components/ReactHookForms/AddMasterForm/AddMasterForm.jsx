import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import MyBigButton from '../../Buttons/BigButton/MyBigButton'
import { useEffect } from 'react'
import '../ReactHookForms.css'
import { useNavigate } from 'react-router-dom'
import CitiesSelect from '../../React-select/React-select'
import citiesAPI from '../../../api/citiesAPI'

const schema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Required Field' })
      .min(3, { message: 'Name must be be 3 or more characters long' }),
    email: z.string().min(1, { message: 'Required Field' }).email().nonempty(),
    password: z
      .string()
      .min(1, { message: 'Required Field' })
      .min(3, { message: 'Password must be 3 or more characters long' })
      .max(16, { message: 'Password must be 16 or fewer characters long' })
      .nonempty(),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' })
    // cities: z.array(z.number().int().positive())
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match"
  })
const AddMasterForm = ({ formFields, onSubmit, masterExistError }) => {
  const prevPage = useNavigate()

  useEffect(() => {
    reset({
      masterName: formFields.name,
      masterEmail: formFields.email,
      password: formFields.password,
      confirmPassword: formFields.confirmPassword,
      cities: formFields.cities
    })
  }, [])
  useEffect(() => {
    if (masterExistError) {
      setError('email', { type: 'custom', message: 'A user with that email alredy exist' })
    }
  }, [masterExistError])

  const goBack = (event) => {
    event.preventDefault()
    prevPage(-1)
  }
  const loadOptions = async () => {
    const cities = await citiesAPI.getCities()
    const options = await cities.map((city) => {
      return { value: city.id, label: city.name }
    })
    return options
  }

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  })
  return (
    <form className='formWrapper' onSubmit={handleSubmit(onSubmit)}>
      <div className='fieldWrapper'>
        <label className='formLabel'>Enter master name</label>
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

      <div className='fieldWrapper'>
        <Controller
          name='cities'
          control={control}
          render={({ field }) => <CitiesSelect {...field} loadOptions={loadOptions} />}
        />

        {/* <label className='formLabel'>Choose master cities</label>
        <input
          className={errors?.cities?.message ? 'formInput' + ' ' + 'formErrorField' : 'formInput'}
          {...register('cities')}
          placeholder='Choose avaliable cities'
        ></input>
        {errors?.cities?.message && (
          <div className='formRequiredField'>{errors?.cities?.message}</div>
        )} */}
      </div>

      <div className='myButtonWrapper'>
        <MyBigButton>Add master</MyBigButton>
      </div>
      <div className='myButtonWrapper'>
        <MyBigButton onClick={(event) => goBack(event)} className='backBigButton'>
          Cancel
        </MyBigButton>
      </div>
    </form>
  )
}

export default AddMasterForm
