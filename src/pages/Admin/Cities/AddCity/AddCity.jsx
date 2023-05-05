import { useState } from 'react'
import AddEditCityForm from '../../../../components/ReactHookForms/AddEditCity/AddEditCityForm'
import citiesAPI from '../../../../api/citiesAPI'
import { useNavigate } from 'react-router-dom'
import '../Cities.css'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'

const AddCity = () => {
  const [submitError, setSubmitError] = useState('')

  const navigate = useNavigate()

  const onSubmit = async (formData) => {
    const newCity = await citiesAPI.addCity(formData)
    if (newCity) {
      await citiesAPI.getCities()
      navigate('/admin/cities')
    } else {
      setSubmitError(Date.now)
    }
  }

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        <AddEditCityForm onSubmit={onSubmit} submitError={submitError}></AddEditCityForm>
      </div>
    </div>
  )
}

export default AddCity
