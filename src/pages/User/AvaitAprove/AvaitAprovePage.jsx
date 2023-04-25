import { useNavigate } from 'react-router-dom'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'
import MySpan from '../../../components/Span/MySpan'
import MyLabel from '../../../components/Label/MyLabel'

const AwaitAprovePage = () => {
  const navigate = useNavigate()

  const message = `You need await aprove form admin`

  const goBack = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className='userPage'>
      <div className='content'>
        <MyLabel>Need aprove</MyLabel>
        <MySpan>{message}</MySpan>
      </div>
      <div className='myButtonWrapper'>
        <MyLinkButton onClick={(e) => goBack(e)}>Go to main page</MyLinkButton>
      </div>
    </div>
  )
}

export default AwaitAprovePage
