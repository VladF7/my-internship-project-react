import { useEffect, useState } from 'react'
import mastersAPI from '../../../api/mastersAPI'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'
import './Masters.css'
import AdminNavBar from '../../../components/NavBar/AdminNavBar/AdminNavBar'
import { useToasts } from 'react-toast-notifications'
import { GiConfirmed } from 'react-icons/gi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { MdLockReset } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  activateMasterThunk,
  deleteMasterThunk,
  getMastersThunk
} from '../../../store/masters/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import DropDownMenu from '../../../components/DropDownMenu/DropDownMenu'
import MyTable from '../../../components/Table/MyTable'

const Masters = () => {
  const [page, setPage] = useState(0)
  const [mastersPerPage, setMastersPerPage] = useState(10)
  const rowsPerPageOptions = [10, 25, 50]
  const labelRowsPerPage = 'Masters per page'

  const { masters, count, isLoading } = useSelector((state) => state.masters)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMastersThunk({ page, mastersPerPage }))
  }, [page, mastersPerPage])

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const activateMaster = async (id) => {
    const activateMaster = await dispatch(activateMasterThunk(id))
    if (isFulfilled(activateMaster)) {
      addToast('Master has been activated', { transitionState: 'entered', appearance: 'success' })
    } else if (isRejected(activateMaster)) {
      addToast('Master cannot be activated', { transitionState: 'entered', appearance: 'error' })
    }
  }
  const resetPassword = async (id) => {
    const resetPassword = await mastersAPI.resetPassword(id)
    if (!resetPassword) {
      addToast('Password cannot be reset', { transitionState: 'entered', appearance: 'error' })
    } else {
      addToast('Password has been reset', {
        transitionState: 'entered',
        appearance: 'success'
      })
    }
  }
  const goToEdit = (id) => {
    navigate(`${id}`)
  }
  const deleteMaster = async (id) => {
    const deletedMaster = await dispatch(deleteMasterThunk(id))
    if (isFulfilled(deletedMaster)) {
      dispatch(getMastersThunk({ page, mastersPerPage }))

      addToast('Master has been deleted', {
        transitionState: 'entered',
        appearance: 'success'
      })
    } else if (isRejected(deletedMaster)) {
      addToast('Master cannot be deleted, used in order', {
        transitionState: 'entered',
        appearance: 'error'
      })
    }
  }

  const createData = (id, name, email, rating, cities, isEmailActivated, isActivated) => {
    return {
      id,
      name,
      email,
      rating: rating || '0.0',
      cities: cities.map((city) => city.name + ', '),
      isEmailActivated: isEmailActivated ? 'True' : 'False',
      isActivated: isActivated ? 'True' : 'False',
      actions: (
        <DropDownMenu
          elements={[
            {
              iconType: <GiConfirmed color='green' />,
              action: () => activateMaster(id),
              label: 'Activate master',
              hidden: isActivated,
              disabled: false
            },
            {
              iconType: <FiEdit color='lightsalmon' />,
              action: () => goToEdit(id),
              label: 'Edit master',
              hidden: false,
              disabled: false
            },
            {
              iconType: <MdLockReset color='lightsalmon' />,
              action: () => resetPassword(id),
              label: 'Reset password',
              hidden: false,
              disabled: false
            },
            {
              iconType: <RiDeleteBin5Line color='red' />,
              action: () => deleteMaster(id),
              label: 'Delete',
              hidden: false,
              disabled: false
            }
          ]}
        />
      )
    }
  }
  const columns = [
    { id: 'id', label: 'Master ID', width: '12.5%', align: 'center' },
    { id: 'name', label: 'Name', width: '12.5%', align: 'center' },
    { id: 'email', label: 'Email', width: '12.5%', align: 'center' },
    { id: 'rating', label: 'Rating', width: '12.5%', align: 'center' },
    { id: 'cities', label: 'Cities', width: '12.5%', align: 'center' },
    { id: 'isEmailActivated', label: 'Confirm email', width: '12.5%', align: 'center' },
    { id: 'isActivated', label: 'Profile activated', width: '12.5%', align: 'center' },
    { id: 'actions', label: 'Actions', width: '12.5%', align: 'center' }
  ]

  const rows = masters.map((master) =>
    createData(
      master.id,
      master.name,
      master.user.email,
      master.rating,
      master.cities,
      master.user.isEmailActivated,
      master.isActivated
    )
  )
  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        <MyTable
          columns={columns}
          rows={rows}
          count={count}
          isLoading={isLoading}
          page={page}
          rowsPerPage={mastersPerPage}
          setPage={setPage}
          setRowsPerPage={setMastersPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          labelRowsPerPage={labelRowsPerPage}
          button={<MyLinkButton to='registration'>Add master</MyLinkButton>}
        />
      </div>
    </div>
  )
}

export default Masters
