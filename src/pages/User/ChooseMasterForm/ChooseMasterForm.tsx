import { FC, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mastersAPI from '../../../api/mastersAPI'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'
import MySpan from '../../../components/Span/MySpan'
import '../../../components/SizeSelector/MySizeSelector.css'
import { useToasts } from 'react-toast-notifications'
import { addMasterIdToCreateOrderData } from '../../../store/createOrder/slice'
import ReviewsModal from '../../../components/Modal/ReviewsModal'
import ChooseMasterList from '../../../components/List/ChooseMasterList'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import React from 'react'
import { IFreeMastersRequestParams, IMaster } from '../../../types/master.types'
import { IOrder } from '../../../types/order.types'

const ChooseMasterForm: FC = () => {
  const {
    masterId: currentMasterId,
    cityId,
    startTime,
    endTime,
    email
  } = useAppSelector((state) => state.createOrder.data)

  const [freeMastersList, setFreeMastersList] = useState<IMaster[]>([])
  const [masterId, setMasterId] = useState(currentMasterId || '')
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState<IOrder[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (cityId && startTime && endTime && email) {
      mastersAPI
        .getFreeMasters({ cityId, startTime, endTime, email } as IFreeMastersRequestParams)
        .then((res) => setFreeMastersList(res))
        .then(() => setIsLoading(false))
    }
  }, [])

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const openModal = (reviews: IOrder[]) => {
    setReviews(reviews)
    setIsOpen(true)
  }

  const goBack = (e: React.SyntheticEvent<EventTarget, Event>) => {
    e.preventDefault()
    navigate('/')
  }
  const onSubmit = async (e: React.SyntheticEvent<EventTarget, Event>) => {
    e.preventDefault()
    if (!masterId) {
      addToast('Please choose master', { transitionState: 'entered', appearance: 'error' })
      return
    } else {
      dispatch(addMasterIdToCreateOrderData(masterId))
      navigate('/user/confirmOrder')
    }
  }

  return (
    <div className='userPage'>
      <ReviewsModal items={reviews} setIsOpen={setIsOpen} isOpen={isOpen} />
      <form className='userForm' onSubmit={(e) => onSubmit(e)}>
        <div className='content'>
          <legend className='legend'>Choose master</legend>
          {isLoading ? (
            <MySpan>Free masters are loading, please wait...</MySpan>
          ) : !freeMastersList.length ? (
            <MySpan>
              Sorry, there are no free masers at the moment, please select another time
            </MySpan>
          ) : (
            <ChooseMasterList
              value={masterId}
              onChange={setMasterId}
              items={freeMastersList}
              itemAction={openModal}
            />
          )}
        </div>
        <div className='buttonBoxWrapper'>
          <div className='buttonBox'>
            <MyBigButton onClick={(e) => goBack(e)} className='backBigButton'>
              Back
            </MyBigButton>
          </div>
          <div className='buttonBox'>
            <MyBigButton>Next</MyBigButton>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChooseMasterForm
