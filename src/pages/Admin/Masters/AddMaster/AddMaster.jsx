import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import citiesAPI from '../../../../api/citiesAPI'
import mastersAPI from '../../../../api/mastersAPI'
import MyBigButton from '../../../../components/Buttons/BigButton/MyBigButton'
import MyInputItem from '../../../../components/InputItem/MyInputItem'
import ReactSelect from '../../../../components/React-select/React-select'
import MySelect from '../../../../components/Select/MySelect'

const AddMaster = () => {
  const loadOptions = async () => {
    const cities = await citiesAPI.getCities()
    const options = await cities.map((city) => {
      return { value: city.id, label: city.name }
    })
    return options
  }
  const prevPage = useNavigate()

  const [name, setName] = useState('')
  const [rating, setRating] = useState('')
  const [cities, setCities] = useState([])

  const [nameError, setNameError] = useState('')
  const [ratingError, setRatingError] = useState('')
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
  const onBlurCity = () => {
    return setCitiesError('')
  }
  const changeRating = (rating) => {
    setRating(Number(rating))
    setRatingError('')
  }
  const goBack = (e) => {
    e.preventDefault()
    prevPage(-1)
  }

  const addMaster = async (e) => {
    e.preventDefault()
    if (!name || !rating || !cities.length || nameError) {
      if (!name) {
        setNameError(requiredField)
      }
      if (!rating) {
        setRatingError(requiredField)
      }
      if (!cities.length) {
        setCitiesError(requiredField)
      }
      return
    }
    const citiesId = cities.map((city) => city.value)

    await mastersAPI.addMaster(name, rating, citiesId)
    await mastersAPI.getMasters()

    setName('')
    setRating('')
    setCities([])
    prevPage(-1)
  }
  return (
    <form onSubmit={(e) => addMaster(e)} className={'form'}>
      <MyInputItem
        name='name'
        value={name}
        error={nameError}
        onChange={(e) => setName(e.target.value)}
        onBlur={(e) => onBlurName(e)}
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
        error={ratingError}
        value={rating}
        onChange={(e) => {
          changeRating(e.target.value)
        }}
      />
      <ReactSelect
        value={cities}
        error={citiesError}
        name='cities'
        loadOptions={loadOptions}
        onChange={(e) => setCities(e)}
        onBlur={(e) => onBlurCity(e)}
      />
      <div className='myButtonWrapper'>
        <MyBigButton>Add master</MyBigButton>
      </div>
      <div className='myButtonWrapper'>
        <MyBigButton onClick={(e) => goBack(e)}>Cancel</MyBigButton>
      </div>
    </form>
  )
}

export default AddMaster
