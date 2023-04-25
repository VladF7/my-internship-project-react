import { useEffect, useState } from 'react'
import MySmallButton from '../../../components/Buttons/SmalButton/MySmallButton'
import customersAPI from '../../../api/customersAPI'
import './Customers.css'
import MySpan from '../../../components/Span/MySpan'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'
import AdminNavBar from '../../../components/NavBar/AdminNavBar/AdminNavBar'
import { useToasts } from 'react-toast-notifications'

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { addToast } = useToasts()

  useEffect(() => {
    customersAPI
      .getCustomers()
      .then((customers) => setCustomers(customers))
      .then(() => setIsLoading(false))
  }, [])

  const resetPassword = async (id) => {
    const resetPassword = await customersAPI.resetPassword(id)
    if (!resetPassword) {
      addToast('Password cannot be reset', { transitionState: 'entered', appearance: 'error' })
    } else {
      addToast('Password has been reset', {
        transitionState: 'entered',
        appearance: 'success'
      })
    }
  }

  const deleteCustomer = (id) => {
    customersAPI.delCustomer(id).then((customer) => {
      if (!customer) {
        addToast('Customer cannot be deleted, used in order', {
          transitionState: 'entered',
          appearance: 'error'
        })
        return
      } else {
        setCustomers(customers.filter((customer) => customer.id !== id))
      }
    })
  }

  if (isLoading)
    return (
      <div className='adminPage'>
        <div className={'navBar'}>
          <AdminNavBar />
        </div>
        <div className='adminItem'>
          <MySpan>The list of customers is loading...</MySpan>
        </div>
      </div>
    )

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        <div className='customers'>
          <ul className='list'>
            {customers.length === 0 ? (
              <MySpan>The list of customers is empty</MySpan>
            ) : (
              customers.map((customer) => {
                return (
                  <li id={customer.id} key={customer.id} className='listItem'>
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
    </div>
  )
}

export default Customers
