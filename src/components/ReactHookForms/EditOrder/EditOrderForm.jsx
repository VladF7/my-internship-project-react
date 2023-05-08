import { Controller, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import MyBigButton from '../../Buttons/BigButton/MyBigButton'
import { useEffect, useMemo, useState } from 'react'
import '../ReactHookForms.css'
import { useNavigate } from 'react-router-dom'
import { formatValueToDecimal } from '../../../helpers'
import clocksAPI from '../../../api/clocksAPI'
import citiesAPI from '../../../api/citiesAPI'
import statusesAPI from '../../../api/statuses.API'
import DatePicker from '../../DatePicker/DatePicker'
import MySelectWithLabel from '../../Select/MySelectWithLabel'
import MySelect from '../../Select/MySelect'
import { format } from 'date-fns'
import ordersAPI from '../../../api/ordersAPI'
import mastersAPI from '../../../api/mastersAPI'

const editOrdderSchema = z.object({
  date: z.date({
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
  masterId: z
    .string()
    .nonempty({ message: 'Required field' })
    .regex(/^[1-9]\d*$/)
    .transform(Number)
    .or(
      z
        .number({
          invalid_type_error: 'Required field'
        })
        .int()
        .positive()
    ),
  status: z.string().nonempty({ message: 'Required field' })
})

const EditOrderForm = ({ formFields, onSubmit, currentOrderInfo }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(editOrdderSchema)
  })
  const [isLoading, setIsLoading] = useState(true)
  const [cities, setCities] = useState([])
  const [clocks, setClocks] = useState([])
  const [statuses, setStatuses] = useState([])
  const [masters, setMasters] = useState([])
  const [endTime, setEndTime] = useState(currentOrderInfo.endTime)
  const id = currentOrderInfo.id
  const currentPrice = currentOrderInfo.currentPrice

  useEffect(() => {
    Promise.all([clocksAPI.getClocks(), citiesAPI.getCities(), statusesAPI.getStatuses()])
      .then((result) => {
        const [clocks, cities, statuses] = result
        setClocks(clocks)
        setCities(cities)
        setStatuses(statuses)
      })
      .then(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (formFields) {
      reset({
        date: formFields.date,
        clockId: formFields.clockId,
        cityId: formFields.cityId,
        masterId: formFields.masterId,
        status: formFields.status
      })
    }
  }, [])

  const clockId = useWatch({ control, name: 'clockId' })
  const cityId = useWatch({ control, name: 'cityId' })
  const date = useWatch({ control, name: 'date' })

  useEffect(() => {
    if (!date && !clockId) return
    getOrderEndTime(clockId || formFields.clockId, date || formFields.date)
  }, [date, clockId])
  useEffect(() => {
    getFreeMastersList(id, cityId || formFields.cityId, date || formFields.date, endTime)
  }, [endTime, cityId])
  useEffect(() => {
    if (isLoading) return
    if (!masters.length) {
      setError('masterId', { type: 'custom', message: 'There are no free masers at the moment' })
    } else {
      clearErrors('masterId')
    }
    const master = masters.find((master) => master.id === formFields.masterId)
    if (!master) {
      setValue('masterId', '')
    }
  }, [masters])

  const timeToFix = useMemo(() => {
    if (isLoading) return
    if (!clockId) {
      const clock = clocks.find((clock) => clock.id === formFields.clockId)
      const timeToFix = clock.timeToFix
      return timeToFix
    }
    const clock = clocks.find((clock) => clock.id === clockId)
    const timeToFix = clock.timeToFix
    return timeToFix
  }, [clockId, isLoading])

  const priceForHour = useMemo(() => {
    if (isLoading) return
    if (!cityId && clockId) {
      const city = cities.find((city) => city.id === formFields.cityId)
      const priceForHour = city.priceForHour
      return priceForHour
    }
    if (!cityId && !clockId) {
      const priceForHour = currentPrice / timeToFix
      return priceForHour
    }
    const city = cities.find((city) => city.id === cityId)
    const priceForHour = city.priceForHour
    return priceForHour
  }, [cityId, clockId, isLoading])

  const price = useMemo(() => {
    if (!(timeToFix && priceForHour)) return currentPrice || null
    const totalPrice = timeToFix * priceForHour
    return totalPrice
  }, [timeToFix, priceForHour])

  const navigate = useNavigate()

  const clocksOptions = clocks.map((clock) => {
    return { id: clock.id, name: clock.size }
  })
  const mastersOptions = masters.map((master) => {
    return {
      id: master.id,
      label: `Name: ${master.name}, rating: ${master.rating ? master.rating : '0.0'}`
    }
  })
  const statusesOptions = statuses.map((status) => {
    return { id: status, label: status }
  })
  const currency = 'USD'

  const getOrderEndTime = async (clockId, date) => {
    const endTime = await ordersAPI.getOrderEndTime(clockId, date)
    setEndTime(endTime)
  }
  const getFreeMastersList = async (id, cityId, startTime, endTime) => {
    const masters = await mastersAPI.getFreeMastersForCurrentOrder(id, cityId, startTime, endTime)
    setMasters(masters)
  }
  const goBack = (event) => {
    event.preventDefault()
    navigate('/admin/orders')
  }

  const submit = (formData) => {
    const startTime = format(formData.date, 'yyyy.MM.dd, HH:mm')
    return onSubmit({ ...formData, price, priceForHour, startTime, endTime })
  }

  if (isLoading) return <div className='formWrapper'></div>

  return (
    <form className='formWrapper' onSubmit={handleSubmit(submit)}>
      <div className='fieldWrapper'>
        <label className='formLabel'>Choose time and date</label>
        <Controller
          name='date'
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              className={errors?.date?.message ? 'formInput' + ' ' + 'formErrorField' : 'formInput'}
            />
          )}
        />
        {errors?.date?.message && <div className='formRequiredField'>{errors?.date?.message}</div>}
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
              labelText='Time to fix'
              labelValue={timeToFix}
              labelWord={timeToFix > 1 ? 'hours' : 'hour'}
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
              labelValue={formatValueToDecimal(priceForHour)}
              labelWord={currency}
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
      <div className='fieldWrapper'>
        <label className='formLabel'>Choose master</label>
        <Controller
          name='masterId'
          control={control}
          render={({ field }) => (
            <MySelect
              {...field}
              options={mastersOptions}
              placeholder='Click to select master'
              error={!!errors?.masterId}
            />
          )}
        />
        {errors?.masterId?.message && (
          <div className='formRequiredField'>{errors?.masterId?.message}</div>
        )}
      </div>
      <div className='fieldWrapper'>
        <label className='formLabel'>Change status</label>
        <Controller
          name='status'
          control={control}
          render={({ field }) => (
            <MySelect
              {...field}
              options={statusesOptions}
              placeholder='Click to change status'
              error={!!errors?.status}
            />
          )}
        />
        {errors?.status?.message && (
          <div className='formRequiredField'>{errors?.status?.message}</div>
        )}
      </div>

      <div className='buttonBoxWrapper'>
        <div className='buttonBox'>
          <MyBigButton onClick={(e) => goBack(e)} className='backBigButton'>
            Cancel
          </MyBigButton>
        </div>
        <div className='buttonBox'>
          <MyBigButton>Edit order</MyBigButton>
        </div>
      </div>
    </form>
  )
}

export default EditOrderForm
