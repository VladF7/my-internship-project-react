import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userAPI from '../../../../api/userAPI'
import customersAPI from '../../../../api/customersAPI'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import AddCustomerForm from '../../../../components/ReactHookForms/AddCustomer/AddCustomerForm'

const AddCustomer = () => {
  const [submitError, setSubmitError] = useState('')

  const navigate = useNavigate()

  const onSubmit = async (formData) => {
    const successCustomerRegistration = await userAPI.customerRegistrationFromAdminPage(formData)
    if (successCustomerRegistration) {
      await customersAPI.getCustomers()
      navigate('/admin/customers')
    }
    setSubmitError(Date.now)
  }
  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        <AddCustomerForm onSubmit={onSubmit} submitError={submitError} />
      </div>
    </div>
  )
}

export default AddCustomer
