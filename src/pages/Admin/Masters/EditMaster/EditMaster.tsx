import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import mastersAPI from '../../../../api/mastersAPI'
import MySpan from '../../../../components/Span/MySpan'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import EditMasterForm from '../../../../components/ReactHookForms/EditMaster/EditMasterForm'
import { useToasts } from 'react-toast-notifications'
import { editMasterThunk } from '../../../../store/masters/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { PulseLoader } from 'react-spinners'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import React from 'react'
import { IMasterEditForm } from '../../../../types/master.types'
import { IOption } from '../../../../types'

const EditMaster = () => {
  const { id } = useParams()

  const [name, setName] = useState('')
  const [cities, setCities] = useState<IOption[]>([])
  const [isLoading, setIsLoadnig] = useState(true)

  useEffect(() => {
    if (id) {
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
    }
  }, [id])

  const { inProcess } = useAppSelector((state) => state.masters)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const onSubmit = async (formData: IMasterEditForm) => {
    if (id) {
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
