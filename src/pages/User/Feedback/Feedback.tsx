import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ordersAPI from '../../../api/ordersAPI'
import { ClockLoader } from 'react-spinners'
import { Box, Typography } from '@mui/material'
import AddFeedbackForm from '../../../components/ReactHookForms/AddFeedback/AddFeedbackForm'
import { useToasts } from 'react-toast-notifications'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'
import React from 'react'
import { IFeedback, IOrder } from '../../../types/order.types'

const typographyStyle = {
  display: 'flex',
  justifyContent: 'center',
  color: 'rgba(255, 255, 255, 0.7)'
}
const loaderStyle = {
  transform: 'translate(-50%,-50%)',
  left: 'calc(50%)',
  top: 'calc(50%)'
}

const Feedback: FC = () => {
  const { feedbackToken } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<IOrder>()
  useEffect(() => {
    const getOrder = async (feedbackToken: string) => {
      try {
        const order = await ordersAPI.getOrderByFeedbackToken(feedbackToken)
        setOrder(order)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
    if (feedbackToken) {
      getOrder(feedbackToken)
    }
  }, [feedbackToken])

  const navigate = useNavigate()
  const { addToast } = useToasts()

  const goBack = (e: React.SyntheticEvent<EventTarget, Event>) => {
    e.preventDefault()
    navigate('/')
  }

  const submit = async (formData: IFeedback) => {
    try {
      if (order) {
        await ordersAPI.setFeedback(order.feedbackToken as string, formData)
        addToast('Feedback has been send', {
          transitionState: 'entered',
          appearance: 'success'
        })
        navigate('/')
      }
    } catch (error) {
      addToast('Feedback can not be send', {
        transitionState: 'entered',
        appearance: 'error'
      })
    }
  }

  return (
    <div className='userPage' style={{ height: '350px', position: 'relative' }}>
      {isLoading ? (
        <Box position={'absolute'} style={loaderStyle}>
          <ClockLoader color='lightsalmon' />
        </Box>
      ) : !order ? (
        <>
          <Typography style={typographyStyle}>Order not found</Typography>
          <MyBigButton onClick={goBack}>Go to main page</MyBigButton>
        </>
      ) : order.rating ? (
        <>
          <Typography style={typographyStyle}>This order alredy has review</Typography>
          <MyBigButton onClick={goBack}>Go to main page</MyBigButton>
        </>
      ) : (
        <AddFeedbackForm onSubmit={submit} goBack={goBack} />
      )}
    </div>
  )
}

export default Feedback
