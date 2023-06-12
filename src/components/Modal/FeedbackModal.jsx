import { Box, Button, Modal } from '@mui/material'
import { useState } from 'react'
import AddFeedbackForm from '../ReactHookForms/AddFeedback/AddFeedbackForm'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgba(200,200,210, 0.65)',
  boxShadow: 24,
  borderRadius: '5px',
  p: '15px'
}
const buttonStyle = {
  mt: '5px',
  backgroundColor: 'rgb(255, 160, 122 ,0.4)',
  borderColor: 'rgb(255, 160, 122)',
  color: 'rgba(255,255,255, 0.9)',
  ':hover': {
    backgroundColor: 'rgb(255, 160, 122,0.6)',
    borderColor: 'rgb(255, 160, 122)'
  }
}

const FeedbackModal = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const goBack = (e) => {
    e.preventDefault()
    setIsOpen(false)
  }
  const submit = (formData) => {
    onSubmit(formData)
    setIsOpen(false)
  }

  return (
    <>
      <Button variant='outlined' size='small' sx={buttonStyle} onClick={() => handleOpen()}>
        Send feedback
      </Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <AddFeedbackForm onSubmit={submit} goBack={goBack} />
        </Box>
      </Modal>
    </>
  )
}

export default FeedbackModal
