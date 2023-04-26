import { useNavigate } from 'react-router-dom'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'
import MySpan from '../../../components/Span/MySpan'
import MyLabel from '../../../components/Label/MyLabel'

const SuccessSignUp = () => {
  const navigate = useNavigate()

  const message = `Sign up has been successfully.
  For login you need confirm your email, follow the activation link from your email message.`

  const goBack = (e) => {
    e.preventDefault()
    navigate('/auth')
  }
  return (
    <div className='userPage'>
      <div className='content'>
        <MyLabel>Successfully sign up </MyLabel>
        <MySpan>{message}</MySpan>
      </div>
      <div className='myButtonWrapper'>
        <MyLinkButton onClick={(e) => goBack(e)}>Done</MyLinkButton>
      </div>
    </div>
  )
}

export default SuccessSignUp
