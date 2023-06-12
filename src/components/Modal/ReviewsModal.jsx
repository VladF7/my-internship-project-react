import { Box, Modal } from '@mui/material'
import RewievsList from '../List/ReviewsList'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  maxHeight: '90%',
  overflowY: 'auto',
  transform: 'translate(-50%, -50%)',
  width: 500,
  background:
    'linear-gradient(rgba(35, 43, 85, 0.95), rgba(35, 43, 85, 0.98)), no-repeat center center',
  boxShadow: 24,
  borderRadius: '5px',
  p: '15px'
}

const ReviewsModal = ({ setIsOpen, isOpen, items }) => {
  const handleClose = () => setIsOpen(false)
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={modalStyle}>
        <RewievsList items={items} />
      </Box>
    </Modal>
  )
}

export default ReviewsModal
