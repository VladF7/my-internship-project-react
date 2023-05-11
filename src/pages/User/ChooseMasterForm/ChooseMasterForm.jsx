import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mastersAPI from '../../../api/mastersAPI'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'
import MyError from '../../../components/Error/MyError'
import MyLabel from '../../../components/Label/MyLabel'
import MySpan from '../../../components/Span/MySpan'
import '../../../components/SizeSelector/MySizeSelector.css'
import { useToasts } from 'react-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import { addMasterIdToCreateOrderData } from '../../../store/createOrder/slice'

const ChooseMasterForm = () => {
  const {
    masterId: currentMasterId,
    cityId,
    startTime,
    endTime,
    email
  } = useSelector((state) => state.createOrder.data)

  const [freeMastersList, setFreeMastersList] = useState([])
  const [masterId, setMasterId] = useState(currentMasterId || '')
  const [masterIdError, setMasterIdError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    mastersAPI
      .getFreeMasters({ cityId, startTime, endTime, email })
      .then((res) => setFreeMastersList(res))
      .then(() => setIsLoading(false))
  }, [])

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const getMasterId = (masterId) => {
    setMasterId(Number(masterId))
    setMasterIdError('')
  }
  const goBack = (e) => {
    e.preventDefault()
    navigate('/')
  }
  const onSubmit = async (e) => {
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
      <form className='userForm' onSubmit={(e) => onSubmit(e)}>
        <div className='content'>
          <fieldset className='mastersFieldset'>
            <MyError>{masterIdError}</MyError>
            <legend className='legend'>Choose master</legend>
            {isLoading ? (
              <MySpan>Free masters are loading, please wait...</MySpan>
            ) : !freeMastersList.length ? (
              <MySpan>
                Sorry, there are no free masers at the moment, please select another time
              </MySpan>
            ) : (
              freeMastersList.map((master) => {
                return (
                  <div className='masterItem' key={master.id}>
                    <input
                      className='input'
                      onChange={(e) => getMasterId(e.target.value)}
                      type='radio'
                      id={master.id}
                      name='masterId'
                      value={master.id}
                      defaultChecked={master.id === masterId ? true : false}
                    />
                    <MyLabel htmlFor={master.id}>
                      Name: {master.name}, rating: {master.rating ? master.rating : '0.0'}
                    </MyLabel>
                  </div>
                )
              })
            )}
          </fieldset>
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
