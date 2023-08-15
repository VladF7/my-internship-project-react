import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import citiesAPI from '../../../api/citiesAPI'
import clocksAPI from '../../../api/clocksAPI'
import mastersAPI from '../../../api/mastersAPI'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'
import MyLabel from '../../../components/Label/MyLabel'
import MySpan from '../../../components/Span/MySpan'
import { formatValueToDecimal } from '../../../helpers'
import { createOrderStepTwoThunk } from '../../../store/createOrder/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { useToasts } from 'react-toast-notifications'
import { PulseLoader } from 'react-spinners'
import ImageListMui from '../../../components/ImageList/ImageListMui'
import PayPalPayment from '../../../components/PayPalPayment/PayPalPayment'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { ICity } from '../../../types/city.types'
import { IClock } from '../../../types/clock.types'
import { IMaster } from '../../../types/master.types'

const ConfirmOrder: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [city, setCity] = useState<ICity>()
  const [clock, setClock] = useState<IClock>()
  const [master, setMaster] = useState<IMaster>()
  const currency = 'USD'
  const loader = <PulseLoader color='lightsalmon' size='10px' />

  const { inProcess, data } = useAppSelector((state) => state.createOrder)

  useEffect(() => {
    if (data.cityId && data.clockId && data.masterId) {
      Promise.all([
        citiesAPI.getCityById(data.cityId),
        clocksAPI.getClockById(data.clockId),
        mastersAPI.getMasterById(data.masterId)
      ])
        .then((result) => {
          const [city, clock, master] = result
          setCity(city)
          setClock(clock)
          setMaster(master)
        })
        .then(() => setIsLoading(false))
    }
  }, [])

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const goBack = (e: React.SyntheticEvent<EventTarget, Event>) => {
    e.preventDefault()
    navigate(-1)
  }
  const onSubmit = async (e: React.SyntheticEvent<EventTarget, Event>) => {
    e.preventDefault()
    const stepTwo = await dispatch(createOrderStepTwoThunk(data))
    if (isFulfilled(stepTwo)) {
      navigate('/user/successOrder', { replace: true })
    } else if (isRejected(stepTwo)) {
      addToast('Order cannot be created', {
        transitionState: 'entered',
        appearance: 'error'
      })
    }
  }
  const createOrderForPayment = async () => {
    const newOrder = await dispatch(createOrderStepTwoThunk(data))
    if (isFulfilled(newOrder)) {
      return newOrder.payload.id
    } else if (isRejected(newOrder)) {
      addToast('Order cannot be created', {
        transitionState: 'entered',
        appearance: 'error'
      })
    }
  }

  return (
    <div className='userPage'>
      <form className='userForm' onSubmit={(e) => onSubmit(e)}>
        <div className='content'>
          <MyLabel>Сheck the order information and confirm it:</MyLabel>
          {isLoading ? (
            <MySpan>Data is loading, please wait...</MySpan>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <MySpan>Email: {data?.email},</MySpan>
              <MySpan>Name: {data?.name},</MySpan>
              <MySpan>City: {city?.name},</MySpan>
              <MySpan>
                Price for hour: {formatValueToDecimal(data?.priceForHour as number)} {currency},
              </MySpan>
              <MySpan>Clock size: {clock?.size},</MySpan>
              <MySpan>
                Time to fix: {clock?.timeToFix}{' '}
                {(clock?.timeToFix as number) > 1 ? 'hours' : 'hour'},
              </MySpan>
              <MySpan>Master name: {master?.name},</MySpan>
              <MySpan>Start time: {data?.startTime as string},</MySpan>
              <MySpan>End time: {data?.endTime},</MySpan>
              <MySpan>
                Total price: {formatValueToDecimal(data?.price as number)} {currency}
              </MySpan>
              <MySpan>Images:</MySpan>
              <ImageListMui
                images={data?.images}
                imageHeight={'100px'}
                imageWidtht={'100%'}
                imageBorderRadius={'5px'}
                columns={5}
                emptyImagesList={<MySpan>Order have not images</MySpan>}
              />
            </div>
          )}
        </div>
        <div className='buttonBoxWrapper'>
          <div className='buttonBox'>
            <PayPalPayment
              cost={formatValueToDecimal(data?.price as number)}
              createOrderForPayment={createOrderForPayment}
            />
          </div>
          <div className='buttonBox'>
            <MyBigButton disabled={inProcess}>
              {(inProcess && loader) || 'Create order and pay later'}
            </MyBigButton>
          </div>
        </div>
        <MyBigButton onClick={(e) => goBack(e)} className='backBigButton'>
          Back
        </MyBigButton>
      </form>
    </div>
  )
}

export default ConfirmOrder