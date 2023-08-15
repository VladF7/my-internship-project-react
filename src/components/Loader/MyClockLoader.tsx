import { Box } from '@mui/material'
import React from 'react'
import { ClockLoader } from 'react-spinners'

interface IProps {
  size?: number
  color?: string
}

const MyClockLoader: React.FC<IProps> = ({ size, color }) => {
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
