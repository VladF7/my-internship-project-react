import { useEffect, useState } from 'react'
import mastersAPI from '../../../api/mastersAPI'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'
import MySmallButton from '../../../components/Buttons/SmalButton/MySmallButton'
import MySpan from '../../../components/Span/MySpan'
import './Masters.css'
import AdminNavBar from '../../../components/NavBar/AdminNavBar/AdminNavBar'
import { useToasts } from 'react-toast-notifications'

const Masters = () => {
  const [masters, setMasters] = useState([])
  const [currentMasterId, setCurrentMasterId] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const { addToast } = useToasts()

  useEffect(() => {
    mastersAPI
      .getMasters()
      .then((masters) => {
        setMasters(masters)
      })
      .then(() => setIsLoading(false))
  }, [currentMasterId])

  const activateMaster = async (id) => {
    const activateMaster = await mastersAPI.activateMaster(id)
    if (!activateMaster) {
      addToast('Master cannot be activated', { transitionState: 'entered', appearance: 'error' })
    } else {
      addToast('Master has been activated', { transitionState: 'entered', appearance: 'success' })
      setCurrentMasterId(id)
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
  const deleteMaster = async (id) => {
    const deletedMaster = await mastersAPI.delMaster(id)
    if (!deletedMaster) {
      addToast('Master cannot be deleted, used in order', {
        transitionState: 'entered',
        appearance: 'error'
      })
      return
    } else {
      setMasters(masters.filter((master) => master.id !== id))
    }
  }

  if (isLoading)
    return (
      <div className='adminPage'>
        <div className={'navBar'}>
          <AdminNavBar />
        </div>
        <div className='adminItem'>
          <MySpan>The list of masters is loading...</MySpan>
        </div>
      </div>
    )

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        <div className='masters'>
          <ul className='list'>
            {masters.length === 0 ? (
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
                      <MySmallButton
                        style={{
                          display: !master.isActivated ? '' : 'none'
                        }}
                        className='smallButtonActivate'
                        onClick={() => activateMaster(master.id)}
                      >
                        Activate profile
                      </MySmallButton>

                      <MySmallButton to={`${master.id}`}>Edit</MySmallButton>
                      <MySmallButton onClick={() => resetPassword(master.id)}>
                        Reset password
                      </MySmallButton>
                      <MySmallButton
                        onClick={() => deleteMaster(master.id)}
                        className='smallButtonDelete'
                      >
                        Delete
                      </MySmallButton>
                    </div>
                  </li>
                )
              })
            )}
          </ul>
        </div>
        <div className='addButtonWrapper form'>
          <MyLinkButton to='registration'>Add master</MyLinkButton>
        </div>
      </div>
    </div>
  )
}

export default Masters
