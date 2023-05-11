import { useNavigate } from 'react-router-dom'
import MySpan from '../../../components/Span/MySpan'
import MyLabel from '../../../components/Label/MyLabel'
import { useDispatch, useSelector } from 'react-redux'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'
import { leaveNameForCreateOrderData } from '../../../store/createOrder/slice'

const ChangeNamePage = () => {
  const { name: currentUserName, email: currentUserEmail } = useSelector(
    (state) => state.auth.currentUser
  )
  const { name } = useSelector((state) => state.createOrder.data)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const message = `
  The profile with email ${currentUserEmail} has name ${currentUserName}. 
  When placing an order, was specified different name - ${name}, do you want to change the name of the profile? `

  const changeName = (e) => {
    e.preventDefault()
    navigate(`/user/chooseMaster`, { replace: true })
  }
  const leaveName = (e) => {
    e.preventDefault()
    dispatch(leaveNameForCreateOrderData(currentUserName))
    navigate(`/user/chooseMaster`, { replace: true })
  }

  return (
    <div className='userPage'>
      <div className='content'>
        <MyLabel>do you want to change the name of the profile</MyLabel>
        <MySpan>{message}</MySpan>
      </div>
      <div className='buttonBoxWrapper'>
        <div className='buttonBox'>
          <MyBigButton onClick={(e) => leaveName(e)} className='backBigButton'>
            No
          </MyBigButton>
        </div>
        <div className='buttonBox'>
          <MyBigButton onClick={(e) => changeName(e)}>Yes</MyBigButton>
        </div>
      </div>
    </div>
  )
}

export default ChangeNamePage
