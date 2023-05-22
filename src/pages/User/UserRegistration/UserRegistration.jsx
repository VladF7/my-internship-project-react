import { useNavigate } from 'react-router-dom'
import MySpan from '../../../components/Span/MySpan'
import MyLabel from '../../../components/Label/MyLabel'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'
import { useDispatch, useSelector } from 'react-redux'
import { createUserCustomerThunk } from '../../../store/auth/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { useToasts } from 'react-toast-notifications'
import { PulseLoader } from 'react-spinners'

const UserRegistration = () => {
  const { inProcess } = useSelector((state) => state.auth)
  const { name, email } = useSelector((state) => state.createOrder.data)

  const message = `A message with login information will be sent to your email.`

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { addToast } = useToasts()

  const goNext = (e) => {
    e.preventDefault()
    navigate('/user/chooseMaster', { replace: true })
  }
  const createUser = async () => {
    const newUser = await dispatch(createUserCustomerThunk({ email, name }))
    if (isFulfilled(newUser)) {
      navigate('/user/chooseMaster', { replace: true })

      addToast('Account has been created', {
        transitionState: 'entered',
        appearance: 'success'
      })
    } else if (isRejected(newUser)) {
      addToast("Account can't be created", {
        transitionState: 'entered',
        appearance: 'error'
      })
    }
  }
  return (
    <div className='userPage'>
      <div className='content'>
        <MyLabel>Do you want to create account ?</MyLabel>
        <MySpan>{message}</MySpan>
      </div>
      <div className='buttonBoxWrapper'>
        <div className='buttonBox'>
          <MyBigButton onClick={(e) => goNext(e)} className='backBigButton'>
            No
          </MyBigButton>
        </div>
        <div className='buttonBox'>
          <MyBigButton disabled={inProcess} onClick={() => createUser()}>
            {(inProcess && <PulseLoader color='lightsalmon' size='10px' />) || 'Yes'}
          </MyBigButton>
        </div>
      </div>
    </div>
  )
}

export default UserRegistration
