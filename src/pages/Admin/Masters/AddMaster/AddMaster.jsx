import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mastersAPI from '../../../../api/mastersAPI'
import userAPI from '../../../../api/userAPI'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import AddMasterForm from '../../../../components/ReactHookForms/AddMaster/AddMasterForm'

const AddMaster = () => {
  const [submitError, setSubmitError] = useState('')

  const navigate = useNavigate()

  const onSubmit = async (formData) => {
    const successMasterRegistration = await userAPI.masterRegistrationFromAdminPage(formData)
    if (successMasterRegistration) {
      await mastersAPI.getMasters()
      navigate('/admin/masters')
    }
    setSubmitError(Date.now)
  }

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        <AddMasterForm onSubmit={onSubmit} submitError={submitError}></AddMasterForm>
      </div>
    </div>
  )
}

export default AddMaster
