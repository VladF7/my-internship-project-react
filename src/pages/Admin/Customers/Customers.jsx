import { useEffect } from 'react'
import customersAPI from '../../../api/customersAPI'
import './Customers.css'
import MySpan from '../../../components/Span/MySpan'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'
import AdminNavBar from '../../../components/NavBar/AdminNavBar/AdminNavBar'
import { useToasts } from 'react-toast-notifications'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { MdLockReset } from 'react-icons/md'
import ThreeDotsMenu from '../../../components/ThreeDotsMenu/ThreeDotsMenu'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCustomerThunk, getCustomersThunk } from '../../../store/customers/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'

const Customers = () => {
  const { isLoading, customers } = useSelector((state) => state.customers)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCustomersThunk())
  }, [])

  const { addToast } = useToasts()

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
  const deleteCustomer = async (id) => {
    const deletedCustomer = await dispatch(deleteCustomerThunk(id))
    if (isFulfilled(deletedCustomer)) {
      addToast('Customer has been deleted', {
        transitionState: 'entered',
        appearance: 'success'
      })
    } else if (isRejected(deletedCustomer)) {
      addToast('Customer cannot be deleted, used in order', {
        transitionState: 'entered',
        appearance: 'error'
      })
    }
  }

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        {isLoading ? (
          <MySpan>The list of customers is loading...</MySpan>
        ) : (
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
                        <ThreeDotsMenu
                          elements={[
                            {
                              iconType: <MdLockReset color='lightsalmon' />,
                              action: () => resetPassword(customer.id),
                              label: 'Reset password',
                              hidden: customer.user ? false : true,
                              disabled: false
                            },
                            {
                              iconType: <RiDeleteBin5Line color='red' />,
                              action: () => deleteCustomer(customer.id),
                              label: 'Delete',
                              hidden: false,
                              disabled: false
                            }
                          ]}
                        />
                      </div>
                    </li>
                  )
                })
              )}
            </ul>
          </div>
        )}
        {!isLoading && (
          <div className='addButtonWrapper form'>
            <MyLinkButton to='registration'>Add customer</MyLinkButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default Customers
