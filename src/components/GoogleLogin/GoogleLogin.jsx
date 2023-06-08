import { Box, Button } from '@mui/material'
import { useGoogleLogin } from '@react-oauth/google'
import GoogleIcon from '../Icons/GoogleIcon'

const buttonStyle = {
  width: '100%',
  height: '35px',
  borderRadius: '20px',
  backgroundColor: 'white',
  color: 'black',
  boxShadow: '0.1em 0.1em 0.5em rgba(0, 0, 0, 0.3)',
  ':hover': { backgroundColor: 'white' }
}

const GoogleLogin = ({ onLogin, inProcess, loader, label }) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await onLogin(tokenResponse.access_token)
    }
  })

  return (
    <Button
      startIcon={<GoogleIcon height='20px' width='20px' />}
      sx={buttonStyle}
      variant='contained'
      onClick={() => login()}
      disabled={inProcess}
    >
      {inProcess ? loader : <Box width={'100%'}>{label}</Box>}
    </Button>
  )
}

export default GoogleLogin
