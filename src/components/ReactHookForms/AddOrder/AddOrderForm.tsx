import { Controller, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import DatePicker from '../../DatePicker/DatePicker'
import MySelectWithLabel from '../../Select/MySelectWithLabel'
import citiesAPI from '../../../api/citiesAPI'
import clocksAPI from '../../../api/clocksAPI'
import MyBigButton from '../../Buttons/BigButton/MyBigButton'
import { formatValueToDecimal } from '../../../helpers'
import { format } from 'date-fns'
import ImageUploader from '../../ImageUploader/ImageUploader'
import { ClockLoader } from 'react-spinners'
import { Box } from '@mui/material'
import { ICreateOrder, ICreateOrderForm, ICurrentPriceInfo } from '../../../types/createOrder.types'
import React from 'react'
import { ICity } from '../../../types/city.types'
import { IClock } from '../../../types/clock.types'

interface IProps {
  formFields: ICreateOrderForm
  onSubmit: (formData: ICreateOrder) => Promise<void>
  currentPriceInfo: ICurrentPriceInfo
  submitError: number
  disableEmail: boolean
  inProcess: boolean
  loader: ReactNode
}

const MAX_FILE_SIZE = 1000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png']
const MAX_FILES_COUNT = 5

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
    .positive(),
  images: z.array(z.string().nonempty()).optional()
})

const AddOrderForm: FC<IProps> = ({
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
  } = useForm<ICreateOrderForm>({
    mode: 'onBlur',
    resolver: zodResolver(addOrderSchema),
    defaultValues: {
      name: '',
      email: '',
      startTime: '',
      cityId: '',
      clockId: '',
      images: []
    }
  })
  const [cities, setCities] = useState<ICity[]>([])
  const [clocks, setClocks] = useState<IClock[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Promise.all([clocksAPI.getClocks(), citiesAPI.getCities()])
      .then((result) => {
        const [clocks, cities] = result
        setClocks(clocks)
        setCities(cities)
      })

      .then(() => setIsLoading(false))
  }, [])
  useEffect(() => {
    reset({
      name: formFields?.name,
      email: formFields?.email,
      startTime: formFields?.startTime,
      cityId: formFields?.cityId,
      clockId: formFields?.clockId,
      images: formFields?.images
    })
  }, [])
  useEffect(() => {
    if (submitError) {
      setError('email', { type: 'custom', message: "Order can't be created on this email" })
    }
  }, [submitError])

  const clockId = useWatch({ control, name: 'clockId' })
  const cityId = useWatch({ control, name: 'cityId' })

  console.log(clockId, cityId)

  const timeToFix = useMemo(() => {
    if (!clockId) return currentPriceInfo.timeToFix || ''
    const clock = clocks.find((clock) => clock.id === +clockId)
    if (clock) {
      const timeToFix = clock.timeToFix
      return timeToFix
    } else {
      return ''
    }
  }, [clockId])

  const priceForHour = useMemo(() => {
    if (!cityId) return currentPriceInfo?.priceForHour || ''
    const city = cities.find((city) => city.id === +cityId)
    if (city) {
      const priceForHour = city.priceForHour
      return priceForHour
    } else {
      return ''
    }
  }, [cityId])

  const price = useMemo(() => {
    if (!(timeToFix && priceForHour)) return ''
    const totalPrice = timeToFix * priceForHour
    return totalPrice
  }, [timeToFix, priceForHour])

  const clocksOptions = clocks.map((clock) => {
    return { value: clock.id, label: clock.size }
  })
  const citiesOptions = cities.map((city) => {
    return { value: city.id, label: city.name }
  })
  const currency = 'USD'

  const submit = (formData: ICreateOrderForm) => {
    console.log(formData)

    formData.startTime = format(formData.startTime as Date, 'yyyy.MM.dd, HH:mm')
    return onSubmit({ ...formData, price, priceForHour, timeToFix })
  }

  if (isLoading)
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}
      >
        <ClockLoader color='lightsalmon' />
      </Box>
    )

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
              options={citiesOptions}
              placeholder='Click to choose city'
              error={!!errors?.cityId}
            />
          )}
        />
        {errors?.cityId?.message && (
          <div className='formRequiredField'>{errors?.cityId?.message}</div>
        )}
      </div>
      <div className='fieldWrapper'>
        <Controller
          name='images'
          control={control}
          render={({ field: { value, onChange } }) => (
            <ImageUploader
              value={value}
              onChange={onChange}
              accept={ACCEPTED_IMAGE_TYPES}
              maxSize={MAX_FILE_SIZE}
              filesCount={MAX_FILES_COUNT}
            />
          )}
        />
      </div>

      <label className='priceLabel' style={{ visibility: !price ? 'hidden' : 'visible' }}>
        Total price {formatValueToDecimal(price as number)} {currency}
      </label>

      <div className='addButtonWrapper'>
        <MyBigButton disabled={inProcess}>{(inProcess && loader) || 'Next'}</MyBigButton>
      </div>
    </form>
  )
}

export default AddOrderForm
