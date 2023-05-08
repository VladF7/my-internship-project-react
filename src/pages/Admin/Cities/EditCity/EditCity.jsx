import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import citiesAPI from '../../../../api/citiesAPI'
import MySpan from '../../../../components/Span/MySpan'
import { formatValueToDecimal } from '../../../../helpers'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import AddEditCityForm from '../../../../components/ReactHookForms/AddEditCity/AddEditCityForm'

const EditCity = () => {
  const { id } = useParams()

  const [isLoading, setIsLoadnig] = useState(true)
  const [name, setName] = useState('')
  const [priceForHour, setPriceForHour] = useState('')
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    citiesAPI
      .getCityById(id)
      .then((city) => {
        setName(city.name)
        setPriceForHour(formatValueToDecimal(city.priceForHour))
      })
      .then(() => setIsLoadnig(false))
  }, [id])

  const navigate = useNavigate()

  const onSubmit = async (formData) => {
    const editedCity = await citiesAPI.editCity(id, formData)
    if (editedCity) {
      await citiesAPI.getCities()
      navigate('/admin/cities')
    } else {
      setSubmitError(Date.now)
    }
  }
  if (isLoading) {
    return (
      <div className='adminPage'>
        <div className={'navBar'}>
          <AdminNavBar />
        </div>
        <div className='adminItem'>
          <MySpan>Data is loading, please wait...</MySpan>
        </div>
      </div>
    )
  }
  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        <AddEditCityForm
          formFields={{ name, priceForHour }}
          onSubmit={onSubmit}
          submitError={submitError}
        ></AddEditCityForm>
      </div>
    </div>
  )
}

export default EditCity
