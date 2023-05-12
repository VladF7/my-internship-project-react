import { Controller, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import DatePicker from '../../DatePicker/DatePicker'
import MySelectWithLabel from '../../Select/MySelectWithLabel'
import citiesAPI from '../../../api/citiesAPI'
import clocksAPI from '../../../api/clocksAPI'
import MyBigButton from '../../Buttons/BigButton/MyBigButton'
import { formatValueToDecimal } from '../../../helpers'
import { format } from 'date-fns'

const addOrderSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Required field' })
    .min(3, { message: 'Name must be be 3 or more characters long' }),
  email: z.string().min(1, { message: 'Required field' }).email().nonempty(),
  startTime: z.date({
    invalid_type_error: 'Required field'
  }),
  clockId: z
    .number({
      invalid_type_error: 'Required field'
    })
    .int()
    .positive(),
  cityId: z
    .number({
      invalid_type_error: 'Required field'
    })
    .int()
    .positive()
})

const AddOrderForm = ({
  formFields,
  onSubmit,
  currentPriceInfo,
  submitError,
  disableEmail,
  inProcess,
  loader
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(addOrderSchema)
  })
  const [cities, setCities] = useState([])
  const [clocks, setClocks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Promise.all([clocksAPI.getClocks(), citiesAPI.getCities()])
      .then((result) => {
        const [clocks, cities] = result
        setClocks(clocks)
        setCities(cities)
      })

      .then(() => setIsLoading(false))
      .then(() => sessionStorage.clear())
  }, [])
  useEffect(() => {
    reset({
      name: formFields.name,
      email: formFields.email,
      startTime: formFields.startTime,
      cityId: formFields.cityId,
      clockId: formFields.clockId
    })
  }, [])
  useEffect(() => {
    if (submitError) {
      setError('email', { type: 'custom', message: "Order can't be created on this email" })
    }
  }, [submitError])

  const clockId = useWatch({ control, name: 'clockId' })
  const cityId = useWatch({ control, name: 'cityId' })

  const timeToFix = useMemo(() => {
    if (!clockId) return currentPriceInfo.timeToFix || null
    const clock = clocks.find((clock) => clock.id === clockId)
    const timeToFix = clock.timeToFix
    return timeToFix
  }, [clockId])

  const priceForHour = useMemo(() => {
    if (!cityId) return currentPriceInfo.priceForHour || null
    const city = cities.find((city) => city.id === +cityId)
    const priceForHour = city.priceForHour
    return priceForHour
  }, [cityId])

  const price = useMemo(() => {
    if (!(timeToFix && priceForHour)) return null
    const totalPrice = timeToFix * priceForHour
    return totalPrice
  }, [timeToFix, priceForHour])

  const clocksOptions = clocks.map((clock) => {
    return { id: clock.id, name: clock.size }
  })
  const currency = 'USD'

  const submit = (formData) => {
    formData.startTime = format(formData.startTime, 'yyyy.MM.dd, HH:mm')
    return onSubmit({ ...formData, price, priceForHour, timeToFix })
  }

  if (isLoading) return <div className='formWrapper'></div>

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
        <label className='formLabel'>Enter your email</label>
        <input
          className={errors?.email?.message ? 'formInput formErrorField' : 'formInput'}
          {...register('email')}
          placeholder='example@example.com'
          disabled={disableEmail}
        ></input>
        {errors?.email?.message && (
          <div className='formRequiredField'>{errors?.email?.message}</div>
        )}
      </div>
      <div className='fieldWrapper'>
        <label className='formLabel'>Choose time and date</label>
        <Controller
          name='startTime'
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              className={
                errors?.startTime?.message ? 'formInput' + ' ' + 'formErrorField' : 'formInput'
              }
            />
          )}
        />
        {errors?.startTime?.message && (
          <div className='formRequiredField'>{errors?.startTime?.message}</div>
        )}
      </div>
      <div className='fieldWrapper'>
        <label className='formLabel'>Choose clock size</label>
        <Controller
          name='clockId'
          control={control}
          render={({ field }) => (
            <MySelectWithLabel
              {...field}
              options={clocksOptions}
              placeholder='Click to choose clock size'
              error={!!errors?.clockId}
            />
          )}
        />
        {errors?.clockId?.message && (
          <div className='formRequiredField'>{errors?.clockId?.message}</div>
        )}
      </div>
      <div className='fieldWrapper'>
        <label className='formLabel'>Choose your city</label>
        <Controller
          name='cityId'
          control={control}
          render={({ field }) => (
            <MySelectWithLabel
              {...field}
              options={cities}
              placeholder='Click to choose city'
              error={!!errors?.cityId}
            />
          )}
        />
        {errors?.cityId?.message && (
          <div className='formRequiredField'>{errors?.cityId?.message}</div>
        )}
      </div>

      <label className='priceLabel' style={{ visibility: !price && 'hidden' }}>
        Total price {formatValueToDecimal(price)} {currency}
      </label>

      <div className='addButtonWrapper'>
        <MyBigButton disabled={inProcess}>{(inProcess && loader) || 'Next'}</MyBigButton>
      </div>
    </form>
  )
}

export default AddOrderForm
