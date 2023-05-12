import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import mastersAPI from '../../../../api/mastersAPI'
import MySpan from '../../../../components/Span/MySpan'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import EditMasterForm from '../../../../components/ReactHookForms/EditMaster/EditMasterForm'
import { useToasts } from 'react-toast-notifications'
import { editMasterThunk } from '../../../../store/masters/thunk'
import { useDispatch, useSelector } from 'react-redux'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { PulseLoader } from 'react-spinners'

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

  const { inProcess } = useSelector((state) => state.masters)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const onSubmit = async (formData) => {
    const editedMaster = await dispatch(editMasterThunk({ id, formData }))

    if (isFulfilled(editedMaster)) {
      addToast('Master has been edited', {
        transitionState: 'entered',
        appearance: 'success'
      })
      navigate('/admin/masters')
    } else if (isRejected(editedMaster)) {
      addToast('Master cannot be edited', {
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
          <MySpan>Data is loading, please wait...</MySpan>
        ) : (
          <EditMasterForm
            formFields={{ name, cities }}
            onSubmit={onSubmit}
            inProcess={inProcess}
            loader={<PulseLoader color='lightsalmon' size='10px' />}
          />
        )}
      </div>
    </div>
  )
}

export default EditMaster
