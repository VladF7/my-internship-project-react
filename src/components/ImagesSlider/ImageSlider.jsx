import { useTheme } from '@emotion/react'
import { Box, Button, MobileStepper } from '@mui/material'
import { useState } from 'react'
import { autoPlay } from 'react-swipeable-views-utils'
import SwipeableViews from 'react-swipeable-views'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { MdOutlineArrowBackIos } from 'react-icons/md'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
const buttonStyle = {
  fontWeight: 'bold',
  color: 'rgba(35, 43, 85, 0.95)',
  ':hover': { background: 'none', color: 'red' }
}

const ImageSlider = ({ images }) => {
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = images.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step) => {
    setActiveStep(step)
  }
  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        interval={4000}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.publicId}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component='img'
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%'
                }}
                src={step.url}
                alt={`Image ${index + 1}`}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        sx={{ background: 'transparent' }}
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button
            disableRipple
            sx={buttonStyle}
            size='small'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? <MdOutlineArrowBackIos /> : <MdOutlineArrowForwardIos />}
          </Button>
        }
        backButton={
          <Button
            disableRipple
            sx={buttonStyle}
            size='small'
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === 'rtl' ? <MdOutlineArrowForwardIos /> : <MdOutlineArrowBackIos />}
            Back
          </Button>
        }
      />
    </Box>
  )
}

export default ImageSlider
