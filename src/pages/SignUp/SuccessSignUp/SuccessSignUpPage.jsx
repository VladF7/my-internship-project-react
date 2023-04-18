import { useNavigate } from 'react-router-dom'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'
import MySpan from '../../../components/Span/MySpan'

const SuccessSignUp = () => {
  const navigate = useNavigate()

  const message = `Sign up has been successfully.
  For login you need activated your email, follow the activation link from your email message.`

  const goBack = (e) => {
    e.preventDefault()
    navigate('/auth')
  }
  return (
    <div className='userPage'>
      <div className='content'>
        <MySpan>{message}</MySpan>
      </div>
      <div className='myButtonWrapper'>
        <MyLinkButton onClick={(e) => goBack(e)}>Done</MyLinkButton>
      </div>
    </div>
  )
}

export default SuccessSignUp
