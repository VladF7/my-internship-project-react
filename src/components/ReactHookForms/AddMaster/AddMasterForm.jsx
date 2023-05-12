import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import MyBigButton from '../../Buttons/BigButton/MyBigButton'
import { useEffect } from 'react'
import '../ReactHookForms.css'
import { useNavigate } from 'react-router-dom'
import CitiesSelect from '../../React-select/React-select'
import citiesAPI from '../../../api/citiesAPI'

const AddMasterSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Required field' })
      .min(3, { message: 'Name must be be 3 or more characters long' }),
    email: z.string().min(1, { message: 'Required field' }).email().nonempty(),
    password: z
      .string()
      .min(1, { message: 'Required field' })
      .min(3, { message: 'Password must be 3 or more characters long' })
      .max(16, { message: 'Password must be 16 or fewer characters long' })
      .nonempty(),
    confirmPassword: z.string().min(1, { message: 'Required field' }),
    cities: z
      .array(z.object({ value: z.number().int().positive(), label: z.string().nonempty() }))
      .nonempty({ message: 'Required field' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match"
  })

const AddMasterForm = ({ onSubmit, submitError, loader, inProcess }) => {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(AddMasterSchema),
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
    navigate('/admin/masters')
  }
  const loadOptions = async () => {
    const cities = await citiesAPI.getCities()
    const options = await cities.map((city) => {
      return { value: city.id, label: city.name }
    })
    return options
  }

  const submit = (formData) => {
    const name = formData.name
    const email = formData.email
    const password = formData.password
    const cities = formData.cities.map((city) => city.value)
    return onSubmit({ name, email, password, cities })
  }

  return (
    <form className='formWrapper' onSubmit={handleSubmit(submit)}>
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
        <label className='formLabel'>Choose master cities</label>
        <Controller
          name='cities'
          control={control}
          render={({ field }) => (
            <CitiesSelect {...field} loadOptions={loadOptions} error={!!errors?.cities} />
          )}
        />
        {errors?.cities?.message && (
          <div className='formRequiredField'>{errors?.cities?.message}</div>
        )}
      </div>

      <div className='buttonBoxWrapper'>
        <div className='buttonBox'>
          <MyBigButton onClick={(e) => goBack(e)} className='backBigButton'>
            Cancel
          </MyBigButton>
        </div>
        <div className='buttonBox'>
          <MyBigButton disabled={inProcess}>{(inProcess && loader) || 'Add master'}</MyBigButton>
        </div>
      </div>
    </form>
  )
}

export default AddMasterForm
