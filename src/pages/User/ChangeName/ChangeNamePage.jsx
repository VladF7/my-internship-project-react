import { useNavigate } from 'react-router-dom'
import MySpan from '../../../components/Span/MySpan'
import MyLabel from '../../../components/Label/MyLabel'
import { useSelector } from 'react-redux'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'

const ChangeNamePage = () => {
  const navigate = useNavigate()
  const currentUserEmail = useSelector((state) => state.auth.currentUser.email)
  const currentUserName = useSelector((state) => state.auth.currentUser.name)
  const name = JSON.parse(sessionStorage.getItem('name'))

  const message = `
  The profile with email ${currentUserEmail} has name ${currentUserName}. 
  When placing an order, was specified different name - ${name}, do you want to change the name of the profile? `

  const changeName = (e) => {
    e.preventDefault()
    navigate(`/user/chooseMaster`, { replace: true })
  }
  const leaveName = (e) => {
    e.preventDefault()
    sessionStorage.setItem('name', JSON.stringify(currentUserName))
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
