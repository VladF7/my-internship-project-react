import { Box, Modal } from '@mui/material'
import ReviewsList from '../List/ReviewsList'
import { IOrder } from '../../types/order.types'
import React from 'react'

interface IProps {
  setIsOpen: (value: React.SetStateAction<boolean>) => void
  isOpen: boolean
  items: IOrder[]
}

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

const ReviewsModal: React.FC<IProps> = ({ setIsOpen, isOpen, items }) => {
  const handleClose = () => setIsOpen(false)
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={modalStyle}>
        <ReviewsList items={items} />
      </Box>
    </Modal>
  )
}

export default ReviewsModal
