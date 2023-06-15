import { Box } from '@mui/material'
import { ClockLoader } from 'react-spinners'

const MyClockLoader = ({ size, color }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      <ClockLoader size={size || 50} color={color || 'lightsalmon'} />
    </Box>
  )
}

export default MyClockLoader
