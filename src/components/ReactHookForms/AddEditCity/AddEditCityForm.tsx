import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import MyBigButton from '../../Buttons/BigButton/MyBigButton'
import { ReactNode, useEffect } from 'react'
import '../ReactHookForms.css'
import { useNavigate } from 'react-router-dom'
import { formatValueToInteger } from '../../../helpers'
import { ICityForm } from '../../../types/city.types'
import React from 'react'

interface IProps {
  formFields?: ICityForm
  onSubmit: (formData: ICityForm) => Promise<void>
  submitError: number
  inProcess: boolean
  loader: ReactNode
}

const AddEditCitySchema = z.object({
  name: z.string().min(1, { message: 'Required Field' }),
  priceForHour: z
    .number({ required_error: 'Required Field', invalid_type_error: 'Must be a number' })
    .positive()
})

const AddEditCityForm: React.FC<IProps> = ({
  formFields,
  onSubmit,
  submitError,
  inProcess,
  loader
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(AddEditCitySchema),
    defaultValues: {
      name: '',
      priceForHour: 0
    }
  })

  useEffect(() => {
    if (formFields) {
      reset({
        name: formFields.name,
        priceForHour: formFields.priceForHour
      })
    }
  }, [])
  useEffect(() => {
    if (submitError) {
      setError('name', { type: 'custom', message: 'A city with that name alredy exist' })
    }
  }, [submitError])

  const navigate = useNavigate()

  const goBack = (event: React.SyntheticEvent<EventTarget, Event>) => {
    event.preventDefault()
    navigate('/admin/cities')
  }
  const submit = (formData: ICityForm) => {
    const fixedValue = formData.priceForHour.toFixed(2)
    const priceForHour = formatValueToInteger(fixedValue)
    return onSubmit({ ...formData, priceForHour })
  }

  return (
    <form className='formWrapper' onSubmit={handleSubmit(submit)}>
      <div className='fieldWrapper'>
        <label className='formLabel'>Enter the name of the city</label>
        <input
          className={errors?.name?.message ? 'formInput' + ' ' + 'formErrorField' : 'formInput'}
          {...register('name')}
          placeholder='Enter the name of the city'
        ></input>
        {errors?.name?.message && <div className='formRequiredField'>{errors?.name?.message}</div>}
      </div>

      <div className='fieldWrapper'>
        <label className='formLabel'>Enter the price for hour</label>
        <input
          className={
            errors?.priceForHour?.message ? 'formInput' + ' ' + 'formErrorField' : 'formInput'
          }
          {...register('priceForHour', {
            valueAsNumber: true
          })}
          placeholder='Enter the price for hour'
        ></input>
        {errors?.priceForHour?.message && (
          <div className='formRequiredField'>{errors?.priceForHour?.message}</div>
        )}
      </div>

      <div className='buttonBoxWrapper'>
        <div className='buttonBox'>
          <MyBigButton onClick={(e) => goBack(e)} className='backBigButton'>
            Cancel
          </MyBigButton>
        </div>
        <div className='buttonBox'>
          <MyBigButton disabled={inProcess}>
            {(inProcess && loader) || (formFields && 'Edit city') || 'Add city'}
          </MyBigButton>
        </div>
      </div>
    </form>
  )
}

export default AddEditCityForm
