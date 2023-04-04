import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mastersAPI from '../../../api/mastersAPI'
import ordersAPI from '../../../api/ordersAPI'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'
import MyError from '../../../components/Error/MyError'
import MyLabel from '../../../components/Label/MyLabel'
import MySpan from '../../../components/Span/MySpan'

const ChooseMasterForm = () => {
  const navigate = useNavigate()
  const [freeMastersList, setFreeMastersList] = useState([])
  const [masterId, setMasterId] = useState(0)
  const [masterIdError, setMasterIdError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    mastersAPI
      .getFreeMasters()
      .then((res) => setFreeMastersList(res))
      .then(() => setIsLoading(false))
  }, [])
  const getMasterId = (masterId) => {
    setMasterId(Number(masterId))
    setMasterIdError('')
  }
  const goBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (!masterId) {
      setMasterIdError('Please choose master')
      return
    } else {
      const order = ordersAPI.addOrder(masterId)
      if (order) {
        navigate('/successOrder', { replace: true })
      }
    }
  }

  return (
    <div className='userPage'>
      <form className='userForm' onSubmit={(e) => onSubmit(e)}>
        <div className='mastersArea'>
          <fieldset className='mastersFieldset'>
            <MyError>{masterIdError}</MyError>
            <legend className='legend'>Choose master</legend>
            {isLoading ? (
              <MySpan>Free masters are loading, please wait...</MySpan>
            ) : freeMastersList.length === 0 ? (
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
                    />
                    <MyLabel htmlFor={master.id}>
                      Name: {master.name}, rating: {master.rating}
                    </MyLabel>
                  </div>
                )
              })
            )}
          </fieldset>
        </div>
        <div className='myButtonWrapper'>
          <MyBigButton>Create order</MyBigButton>
        </div>
        <MyBigButton onClick={(e) => goBack(e)}>Cancel</MyBigButton>
      </form>
    </div>
  )
}

export default ChooseMasterForm
