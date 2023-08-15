import { PayPalButtons } from '@paypal/react-paypal-js'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  cost: number
  createOrderForPayment: () => Promise<number | undefined>
}

const PayPalPayment: React.FC<IProps> = ({ cost, createOrderForPayment }) => {
  const navigate = useNavigate()

  return (
    <PayPalButtons
      style={{
        layout: 'horizontal',
        color: 'silver',
        tagline: false,
        label: 'pay',
        shape: 'pill',
        height: 35
      }}
      createOrder={async (data, actions) => {
        const orderId = await createOrderForPayment()
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: cost as unknown as string
              },
              custom_id: orderId as unknown as string
            }
          ]
        })
      }}
      onApprove={async (data, actions) => {
        if (actions.order) {
          const order = await actions.order.capture()
          if (order) {
            navigate('/user/paymentCompleted', { replace: true })
          }
        }
      }}
      onCancel={() => {
        navigate('/user/paymentCanceled', { replace: true })
      }}
    />
  )
}

export default PayPalPayment
