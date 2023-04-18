import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import citiesAPI from '../../../../api/citiesAPI'
import mastersAPI from '../../../../api/mastersAPI'
import MyBigButton from '../../../../components/Buttons/BigButton/MyBigButton'
import MyInputItem from '../../../../components/InputItem/MyInputItem'
import MySelect from '../../../../components/Select/MySelect'
import MySpan from '../../../../components/Span/MySpan'
import CitiesSelect from '../../../../components/React-select/React-select'

const EditMaster = () => {
  const [isLoading, setIsLoadnig] = useState(true)

  const { id } = useParams()
  useEffect(() => {
    mastersAPI
      .getMasterById(id)
      .then((master) => {
        setName(master.name)
        setRating(master.rating)
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
  const [rating, setRating] = useState('')
  const [cities, setCities] = useState([])

  const [nameError, setNameError] = useState('')
  const [citiesError, setCitiesError] = useState('')
  const requiredField = 'Required field'
  const ratingOptions = [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
    { id: 3, label: 3 },
    { id: 4, label: 4 },
    { id: 5, label: 5 }
  ]

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
    const editedMaster = await mastersAPI.editMaster(id, name, rating, citiesId)
    if (editedMaster) {
      prevPage(-1)
      await mastersAPI.getMasters()
    }
  }

  if (isLoading) {
    return <MySpan>Data is loading, please wait...</MySpan>
  }

  return (
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
      <MySelect
        options={ratingOptions}
        placeholder='Click to select rating'
        name='rating'
        discription={'Choose master rating'}
        value={rating}
        onChange={(e) => {
          setRating(Number(e.target.value))
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
  )
}

export default EditMaster
