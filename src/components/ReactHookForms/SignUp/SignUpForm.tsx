import { Controller, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import MyBigButton from '../../Buttons/BigButton/MyBigButton'
import { ReactNode, useEffect, useState } from 'react'
import '../ReactHookForms.css'
import citiesAPI from '../../../api/citiesAPI'
import CitiesSelect from '../../React-select/React-select'
import Checkbox from '../../CheckBox/Checkbox'
import ShowPasswordButton from '../../ShowPasswordButton/ShowPasswordButton'
import React from 'react'
import { ISignUpForm } from '../../../types/user.types'
import { IOption } from '../../../types'

interface IProps {
  onSubmit: (formData: ISignUpForm) => void
  submitError: number
  inProcess: boolean
  loader: ReactNode
}

const SignUpSchema = z
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
    cities: z.array(z.object({ value: z.number().int().positive(), label: z.string().nonempty() })),
    signUpAsMaster: z.boolean()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match"
  })
  .refine((data) => !data.signUpAsMaster || (data.signUpAsMaster && data?.cities?.length), {
    path: ['cities'],
    message: 'Required field'
  })

const SignUpForm: React.FC<IProps> = ({ onSubmit, submitError, inProcess, loader }) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      cities: [],
      confirmPassword: '',
      signUpAsMaster: false
    }
  })
  const [confirmRules, setConfirmRules] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const signUpAsMaster = useWatch({ control, name: 'signUpAsMaster' })

  useEffect(() => {
    if (!signUpAsMaster) {
      reset({
        cities: []
      })
    }
  }, [signUpAsMaster])
  useEffect(() => {
    if (submitError) {
      setError('email', { type: 'custom', message: 'A user with that email alredy exist' })
    }
  }, [submitError])

  const loadOptions = async () => {
    const cities = await citiesAPI.getCities()
    const options = cities.map((city) => {
      return { value: city.id, label: city.name }
    })
    return options
  }
  const changedCities: IOption[] = useWatch({ control, name: 'cities' })

  const submit = (formData: ISignUpForm) => {
    const cities = changedCities.map((city) => city.value as number)
    return onSubmit({ ...formData, cities })
  }

  return (
    <form className='formWrapper' onSubmit={handleSubmit(submit)}>
      <div className='fieldWrapper'>
        <label className='formLabel'>Enter your name</label>
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
          placeholder='Enter your email'
        ></input>
        {errors?.email?.message && (
          <div className='formRequiredField'>{errors?.email?.message}</div>
        )}
      </div>
      <div className='fieldWrapper'>
        <label className='formLabel'>Enter password</label>
        <input
          className={errors?.password?.message ? 'formInput' + ' ' + 'formErrorField' : 'formInput'}
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          placeholder='Enter your password'
        ></input>

        {errors?.password?.message && (
          <div className='formRequiredField'>{errors?.password?.message}</div>
        )}
        <ShowPasswordButton value={showPassword} setValue={setShowPassword} />
      </div>

      <div className='fieldWrapper'>
        <label className='formLabel'>Confirm password</label>
        <input
          className={
            errors?.confirmPassword?.message ? 'formInput' + ' ' + 'formErrorField' : 'formInput'
          }
          type={showConfirmPassword ? 'text' : 'password'}
          {...register('confirmPassword')}
          placeholder='Passwords must match'
        ></input>
        {errors?.confirmPassword?.message && (
          <div className='formRequiredField'>{errors?.confirmPassword?.message}</div>
        )}
        <ShowPasswordButton value={showConfirmPassword} setValue={setShowConfirmPassword} />
      </div>
      {signUpAsMaster && (
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
      )}
      <Controller
        name='signUpAsMaster'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label={'Sign up as master'}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
          />
        )}
      />
      <Checkbox
        label={'I have read and agree to all rules'}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmRules(e.target.checked)}
      />
      <div className='myButtonWrapper'>
        <MyBigButton
          style={{ background: !confirmRules && 'rgba(255, 255, 255, 0.499)' }}
          disabled={!confirmRules || inProcess}
        >
          {(inProcess && loader) || 'Sign up'}
        </MyBigButton>
      </div>
    </form>
  )
}

export default SignUpForm