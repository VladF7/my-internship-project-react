import { useEffect } from 'react'
import mastersAPI from '../../../api/mastersAPI'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'
import MySpan from '../../../components/Span/MySpan'
import './Masters.css'
import AdminNavBar from '../../../components/NavBar/AdminNavBar/AdminNavBar'
import { useToasts } from 'react-toast-notifications'
import ThreeDotsMenu from '../../../components/ThreeDotsMenu/ThreeDotsMenu'
import { GiConfirmed } from 'react-icons/gi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { MdLockReset } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMasterThunk, getMastersThunk } from '../../../store/masters/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'

const Masters = () => {
  const { isLoading, masters } = useSelector((state) => state.masters)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMastersThunk())
  }, [])

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const activateMaster = async (id) => {
    const activateMaster = await mastersAPI.activateMaster(id)
    if (!activateMaster) {
      addToast('Master cannot be activated', { transitionState: 'entered', appearance: 'error' })
    } else {
      addToast('Master has been activated', { transitionState: 'entered', appearance: 'success' })
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

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        {isLoading ? (
          <MySpan>The list of masters is loading...</MySpan>
        ) : (
          <div className='masters'>
            <ul className='list'>
              {!masters.length ? (
                <MySpan>The list of masters is empty</MySpan>
              ) : (
                masters.map((master) => {
                  return (
                    <li id={master.id} key={master.id} className='listItem'>
                      <div className='itemInfo'>
                        <MySpan>Name: {master.name},</MySpan>
                        <MySpan>Rating: {master.rating ? master.rating : '0.0'},</MySpan>
                        <MySpan>Cities: {master.cities.map((city) => city.name + ', ')}</MySpan>
                        <MySpan>Email: {master.user.email},</MySpan>
                        <MySpan>Email confirmed: {`${master.user.isEmailActivated}`},</MySpan>
                        <MySpan>Profile activated: {`${master.isActivated}`}.</MySpan>
                      </div>

                      <div className='buttons'>
                        <ThreeDotsMenu
                          elements={[
                            {
                              iconType: <GiConfirmed color='green' />,
                              action: () => activateMaster(master.id),
                              label: 'Activate master',
                              hidden: master.isActivated,
                              disabled: false
                            },
                            {
                              iconType: <FiEdit color='lightsalmon' />,
                              action: () => goToEdit(master.id),
                              label: 'Edit master',
                              hidden: false,
                              disabled: false
                            },
                            {
                              iconType: <MdLockReset color='lightsalmon' />,
                              action: () => resetPassword(master.id),
                              label: 'Reset password',
                              hidden: false,
                              disabled: false
                            },
                            {
                              iconType: <RiDeleteBin5Line color='red' />,
                              action: () => deleteMaster(master.id),
                              label: 'Delete',
                              hidden: false,
                              disabled: false
                            }
                          ]}
                        />
                      </div>
                    </li>
                  )
                })
              )}
            </ul>
          </div>
        )}
        {!isLoading && (
          <div className='addButtonWrapper form'>
            <MyLinkButton to='registration'>Add master</MyLinkButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default Masters
