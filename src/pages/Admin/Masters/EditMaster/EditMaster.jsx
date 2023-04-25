import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import citiesAPI from '../../../../api/citiesAPI'
import mastersAPI from '../../../../api/mastersAPI'
import MyBigButton from '../../../../components/Buttons/BigButton/MyBigButton'
import MyInputItem from '../../../../components/InputItem/MyInputItem'
import MySpan from '../../../../components/Span/MySpan'
import CitiesSelect from '../../../../components/React-select/React-select'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'

const EditMaster = () => {
  const [isLoading, setIsLoadnig] = useState(true)

  const { id } = useParams()
  useEffect(() => {
    mastersAPI
      .getMasterById(id)
      .then((master) => {
        setName(master.name)
        setCities(
          master.cities.map((city) => {
            return { value: city.id, label: city.name }
          })
        )
      })
      .then(() => setIsLoadnig(false))
  }, [id])

  const loadOptions = async () => {
    const cities = await citiesAPI.getCities()
    const options = await cities.map((city) => {
      return { value: city.id, label: city.name }
    })
    return options.filter((option) => option.value !== cities.value)
  }

  const prevPage = useNavigate()

  const [name, setName] = useState('')
  const [cities, setCities] = useState([])

  const [nameError, setNameError] = useState('')
  const [citiesError, setCitiesError] = useState('')
  const requiredField = 'Required field'

  const onBlurName = (e) => {
    if (e.target.value.length < 3) {
      setNameError('Name must not be less than 3 characters')
      if (e.target.value.length === 0) {
        setNameError('')
      }
    } else {
      setNameError('')
    }
  }
  const changeCities = (cities) => {
    setCities(cities)
    setCitiesError('')
  }
  const goBack = (e) => {
    e.preventDefault()
    prevPage(-1)
  }
  const editMaster = async (e) => {
    e.preventDefault()
    if (!name || !cities.length || nameError) {
      if (!name) {
        setNameError(requiredField)
      }
      if (!cities.length) {
        setCitiesError(requiredField)
      }
      return
    }
    const citiesId = cities.map((city) => city.value)
    const editedMaster = await mastersAPI.editMaster(id, name, citiesId)
    if (editedMaster) {
      prevPage(-1)
      await mastersAPI.getMasters()
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
        <form onSubmit={(e) => editMaster(e)} className={'form'}>
          <MyInputItem
            name='name'
            value={name}
            error={nameError}
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => onBlurName(e)}
            onFocus={() => setNameError('')}
            item={{
              id: 'name',
              type: 'text',
              placeholder: 'Must not be less than 3 characters',
              discription: 'Enter master name'
            }}
          />
          <CitiesSelect
            value={cities}
            error={citiesError}
            onFocus={() => setCitiesError('')}
            name='cities'
            loadOptions={loadOptions}
            onChange={(e) => changeCities(e)}
          />

          <div className='myButtonWrapper'>
            <MyBigButton>Edit master</MyBigButton>
          </div>
          <div className='myButtonWrapper'>
            <MyBigButton onClick={(e) => goBack(e)} className='backBigButton'>
              Cancel
            </MyBigButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditMaster
