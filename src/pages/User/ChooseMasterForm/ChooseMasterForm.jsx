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
  const [freeMastersList, setFreeMastersList] = useState('')
  const [masterId, setMasterId] = useState('')
  const [masterIdError, setMasterIdError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    mastersAPI
      .getFreeMasters(sessionStorage)
      .then((res) => setFreeMastersList(res))
      .then(() => setIsLoading(false))
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!masterId) {
      setMasterIdError('Обязательно укажите мастера')
      return
    } else {
      ordersAPI.addOrder(e)
      navigate('/successOrder', { replace: true })
    }
  }
  const getMasterId = (e) => {
    setMasterId(e.target.value)
    setMasterIdError('')
  }
  const goBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <div className='userPage'>
      <form className='userForm' onSubmit={(e) => onSubmit(e)}>
        <div className='mastersArea'>
          <fieldset className='mastersFieldset'>
            <MyError>{masterIdError}</MyError>
            <legend className='legend'>Выберите мастера</legend>
            {isLoading ? (
              <MySpan>Идет загрузка свободных мастеров, подождите...</MySpan>
            ) : freeMastersList.length === 0 ? (
              <MySpan>К сожалению сейчас нету свободных масеров, выберите другое время</MySpan>
            ) : (
              freeMastersList.map((master) => {
                return (
                  <div className='masterItem' key={master.id}>
                    <input
                      className='input'
                      onChange={(e) => getMasterId(e)}
                      type='radio'
                      id={master.id}
                      name='masterId'
                      value={master.id}
                    />
                    <MyLabel htmlFor={master.id}>
                      имя: {master.name}, рейтинг: {master.rating}
                    </MyLabel>
                  </div>
                )
              })
            )}
          </fieldset>
        </div>
        <div className='myButtonWrapper'>
          <MyBigButton>Сделать заказ</MyBigButton>
        </div>
        <MyBigButton onClick={(e) => goBack(e)}>Отменить</MyBigButton>
      </form>
    </div>
  )
}

export default ChooseMasterForm
