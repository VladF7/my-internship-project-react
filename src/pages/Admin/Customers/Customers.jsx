import { useEffect, useState } from 'react'
import MySmallButton from '../../../components/Buttons/SmalButton/MySmallButton'
import customersAPI from '../../../api/customersAPI'
import './Customers.css'
import MySpan from '../../../components/Span/MySpan'
import MyError from '../../../components/Error/MyError'

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [error, setError] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const textError = 'Customer cannot be deleted, used in order'

  useEffect(() => {
    customersAPI
      .getCustomers()
      .then((customers) => setCustomers(customers))
      .then(() => setIsLoading(false))
  }, [])

  const deleteCustomer = (id) => {
    customersAPI.delCustomer(id).then((customer) => {
      if (!customer) {
        setError(textError)
        setTimeout(() => {
          setError('')
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
                  {customerId === customer.id ? <MyError>{error}</MyError> : ''}
                  <div className='itemInfo'>
                    <MySpan>Name: {customer.name},</MySpan>
                    <MySpan>Email: {customer.email}</MySpan>
                  </div>
                  <div className='buttons'>
                    <MySmallButton onClick={() => deleteCustomer(customer.id)}>
                      Delete
                    </MySmallButton>
                  </div>
                </li>
              )
            })
          )}
        </ul>
      </div>
    </div>
  )
}

export default Customers
