import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import mastersAPI from '../../../../api/mastersAPI'
import MySpan from '../../../../components/Span/MySpan'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import EditMasterForm from '../../../../components/ReactHookForms/EditMaster/EditMasterForm'
import { useToasts } from 'react-toast-notifications'

const EditMaster = () => {
  const { id } = useParams()

  const [name, setName] = useState('')
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoadnig] = useState(true)

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

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const onSubmit = async (formData) => {
    const editedMaster = await mastersAPI.editMaster(id, formData)
    if (editedMaster) {
      await mastersAPI.getMasters()
      navigate('/admin/masters')
    } else {
      addToast("Master can't be edited", {
        transitionState: 'entered',
        appearance: 'error'
      })
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
        <EditMasterForm formFields={{ name, cities }} onSubmit={onSubmit}></EditMasterForm>
      </div>
    </div>
  )
}

export default EditMaster
