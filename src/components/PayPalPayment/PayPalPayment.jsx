import { PayPalButtons } from '@paypal/react-paypal-js'
import { useNavigate } from 'react-router-dom'

const PayPalPayment = ({ cost, createOrderForPayment }) => {
  const navigate = useNavigate()

  return (
    <PayPalButtons
      style={{
        layout: 'horizontal',
        color: 'silver',
        tagline: 'false',
        label: 'pay',
        shape: 'pill',
        height: 35
      }}
      createOrder={async (data, actions) => {
        const orderId = await createOrderForPayment()
        if (orderId) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: cost
                },
                custom_id: orderId
              }
            ]
          })
        }
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((order) => {
          if (order) {
            navigate('/user/paymentCompleted', { replace: true })
          }
        })
      }}
      onCancel={() => {
        navigate('/user/paymentCanceled', { replace: true })
      }}
    />
  )
}

export default PayPalPayment
