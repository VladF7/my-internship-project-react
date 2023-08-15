import { Controller, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import MyBigButton from '../../Buttons/BigButton/MyBigButton'
import { FC, ReactNode, useEffect, useMemo, useState } from 'react'
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
import ImageListMui from '../../ImageList/ImageListMui'
import { Grid } from '@mui/material'
import MySpan from '../../Span/MySpan'
import React from 'react'
import { ICity } from '../../../types/city.types'
import { IClock } from '../../../types/clock.types'
import { STATUS } from '../../../types/status.types'
import { IMaster } from '../../../types/master.types'
import { ICurrentOrderInfo, IEditOrder, IEditOrderFormFields } from '../../../types/order.types'

interface IProps {
  formFields: IEditOrderFormFields
  onSubmit: (formData: IEditOrder) => Promise<void>
  currentOrderInfo: ICurrentOrderInfo
  inProcess: boolean
  loader: ReactNode
}

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

const EditOrderForm: FC<IProps> = ({
  formFields,
  onSubmit,
  currentOrderInfo,
  inProcess,
  loader
}) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<IEditOrderFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(editOrdderSchema)
  })
  const [isLoading, setIsLoading] = useState(true)
  const [cities, setCities] = useState<ICity[]>([])
  const [clocks, setClocks] = useState<IClock[]>([])
  const [statuses, setStatuses] = useState<STATUS[]>([])
  const [masters, setMasters] = useState<IMaster[]>([])
  const [endTime, setEndTime] = useState(currentOrderInfo.endTime)
  const [deletedImages, setDeletedImages] = useState<string[]>([])
  const id = currentOrderInfo.id
  const currentPrice = currentOrderInfo.currentPrice
  const orderImages = formFields.images

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
        status: formFields.status,
        images: formFields.images
      })
    }
  }, [])

  const clockId: IEditOrderFormFields['clockId'] = useWatch({ control, name: 'clockId' })
  const cityId: IEditOrderFormFields['cityId'] = useWatch({ control, name: 'cityId' })
  const date: IEditOrderFormFields['date'] = useWatch({ control, name: 'date' })
  const images: IEditOrderFormFields['images'] = useWatch({ control, name: 'images' })

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
      setValue('masterId', 0)
    }
  }, [masters])

  useEffect(() => {
    if (isLoading) return
    setDeletedImages(orderImages.filter((image) => images.indexOf(image) === -1))
  }, [images])

  const timeToFix = useMemo(() => {
    if (isLoading) return
    if (!clockId) {
      const clock = clocks.find((clock) => clock.id === formFields.clockId)
      const timeToFix = clock?.timeToFix
      return timeToFix
    }
    const clock = clocks.find((clock) => clock.id === clockId)
    const timeToFix = clock?.timeToFix
    return timeToFix
  }, [clockId, isLoading])

  const priceForHour = useMemo(() => {
    if (isLoading) return
    if (!cityId && clockId) {
      const city = cities.find((city) => city.id === formFields.cityId)
      if (city) {
        const priceForHour = city?.priceForHour
        return priceForHour
      }
    }
    if (!cityId && !clockId && timeToFix) {
      const priceForHour = currentPrice / timeToFix
      return priceForHour
    }
    const city = cities.find((city) => city.id === cityId)
    const priceForHour = city?.priceForHour
    if (priceForHour) {
      return priceForHour
    }
  }, [cityId, clockId, isLoading])

  const price = useMemo(() => {
    if (!(timeToFix && priceForHour)) return currentPrice
    const totalPrice = timeToFix * priceForHour
    return totalPrice
  }, [timeToFix, priceForHour])

  const navigate = useNavigate()

  const clocksOptions = clocks.map((clock) => {
    return { value: clock.id, label: clock.size }
  })
  const citiesOptions = cities.map((city) => {
    return { value: city.id, label: city.name }
  })
  const mastersOptions = masters.map((master) => {
    return {
      value: master.id,
      label: `Name: ${master.name}, rating: ${master.rating ? master.rating : '0.0'}`
    }
  })
  const statusesOptions = statuses.map((status) => {
    return { value: status, label: status }
  })
  const currency = 'USD'

  const getOrderEndTime = async (clockId: number, date: Date) => {
    const endTime = await ordersAPI.getOrderEndTime(clockId, date)
    setEndTime(endTime)
  }
  const getFreeMastersList = async (
    id: number | string,
    cityId: number,
    startTime: Date,
    endTime: string
  ) => {
    const masters = await mastersAPI.getFreeMastersForCurrentOrder({
      orderId: id,
      cityId,
      startTime,
      endTime
    })
    setMasters(masters)
  }
  const goBack = (event: React.SyntheticEvent<EventTarget, Event>) => {
    event.preventDefault()
    navigate('/admin/orders')
  }

  const submit = (formData: IEditOrderFormFields) => {
    const startTime = format(formData.date, 'yyyy.MM.dd, HH:mm')
    if (priceForHour) {
      return onSubmit({ ...formData, price, priceForHour, startTime, endTime, deletedImages })
    }
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
              labelWord={(timeToFix as number) > 1 ? 'hours' : 'hour'}
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
              labelValue={formatValueToDecimal(priceForHour as number)}
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
      <label className='priceLabel' style={{ visibility: !price ? 'hidden' : 'visible' }}>
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
      <div className='fieldWrapper'>
        <label className='formLabel'>Order images</label>
        <Controller
          name='images'
          control={control}
          render={({ field: { value, onChange } }) => (
            <ImageListMui
              images={value}
              setImages={onChange}
              imageHeight={'100px'}
              imageWidtht={'100%'}
              imageBorderRadius={'5px'}
              columns={5}
              showIconButtons
              emptyImagesList={
                <Grid container justifyContent={'center'}>
                  <MySpan style={{ paddingBottom: '10px' }}>{`Order don't have images`}</MySpan>
                </Grid>
              }
            />
          )}
        />
      </div>

      <div className='buttonBoxWrapper'>
        <div className='buttonBox'>
          <MyBigButton onClick={(e) => goBack(e)} className='backBigButton'>
            Cancel
          </MyBigButton>
        </div>
        <div className='buttonBox'>
          <MyBigButton disabled={inProcess}>{(inProcess && loader) || 'Edit order'}</MyBigButton>
        </div>
      </div>
    </form>
  )
}

export default EditOrderForm
