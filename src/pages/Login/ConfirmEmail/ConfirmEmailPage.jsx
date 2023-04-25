import { useNavigate } from 'react-router-dom'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'
import MySpan from '../../../components/Span/MySpan'
import MyLabel from '../../../components/Label/MyLabel'

const ConfirmEmailPage = () => {
  const navigate = useNavigate()

  const message = `You need confirm your email follow the link from your email message`

  const goBack = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className='userPage'>
      <div className='content'>
        <MyLabel>Please confirm email</MyLabel>
        <MySpan>{message}</MySpan>
      </div>
      <div className='myButtonWrapper'>
        <MyLinkButton onClick={(e) => goBack(e)}>Go to main page</MyLinkButton>
      </div>
    </div>
  )
}

export default ConfirmEmailPage
