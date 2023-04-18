import { useEffect, useState } from 'react'
import MySmallButton from '../../../components/Buttons/SmalButton/MySmallButton'
import customersAPI from '../../../api/customersAPI'
import './Customers.css'
import MySpan from '../../../components/Span/MySpan'
import MyError from '../../../components/Error/MyError'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [deleteError, setdeleteError] = useState('')
  const [resetPasswordError, setResetPasswordError] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const textError = 'Customer cannot be deleted, used in order'

  useEffect(() => {
    customersAPI
      .getCustomers()
      .then((customers) => setCustomers(customers))
      .then(() => setIsLoading(false))
  }, [])

  const resetPassword = async (id) => {
    const resetPassword = await customersAPI.resetPassword(id)
    if (!resetPassword) {
      setResetPasswordError("Password can't be reseted")
    } else {
      setResetPasswordError('Password has been reset')
      setTimeout(() => {
        setResetPasswordError('')
      }, 1500)
    }
    setCustomerId(id)
  }

  const deleteCustomer = (id) => {
    customersAPI.delCustomer(id).then((customer) => {
      if (!customer) {
        setdeleteError(textError)
        setTimeout(() => {
          setdeleteError('')
        }, 1500)
      } else {
        setCustomers(customers.filter((customer) => customer.id !== id))
      }
    })
    setCustomerId(id)
  }

  if (isLoading) return <MySpan>The list of customers is loading...</MySpan>

  return (
    <div className='itemContent'>
      <div className='customers'>
        <ul className='list'>
          {customers.length === 0 ? (
            <MySpan>The list of customers is empty</MySpan>
          ) : (
            customers.map((customer) => {
              return (
                <li id={customer.id} key={customer.id} className='listItem'>
                  {customerId === customer.id ? (
                    <MyError>{deleteError || resetPasswordError}</MyError>
                  ) : (
                    ''
                  )}
                  <div className='itemInfo'>
                    <MySpan>Name: {customer.name},</MySpan>
                    <MySpan>Email: {customer.email},</MySpan>
                    {customer.user ? (
                      <MySpan>Email confirmed: {`${customer.user.isEmailActivated}`}.</MySpan>
                    ) : (
                      <MySpan>Customer not registered.</MySpan>
                    )}
                  </div>
                  <div className='buttons'>
                    {customer.user ? (
                      <MySmallButton onClick={() => resetPassword(customer.id)}>
                        Reset password
                      </MySmallButton>
                    ) : (
                      ''
                    )}
                    <MySmallButton
                      onClick={() => deleteCustomer(customer.id)}
                      className='smallButtonDelete'
                    >
                      Delete
                    </MySmallButton>
                  </div>
                </li>
              )
            })
          )}
        </ul>
      </div>
      <div className='addButtonWrapper form'>
        <MyLinkButton to='registration'>Add customer</MyLinkButton>
      </div>
    </div>
  )
}

export default Customers
