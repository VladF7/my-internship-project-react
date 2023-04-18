import { useEffect, useState } from 'react'
import mastersAPI from '../../../api/mastersAPI'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'
import MySmallButton from '../../../components/Buttons/SmalButton/MySmallButton'
import MyError from '../../../components/Error/MyError'
import MySpan from '../../../components/Span/MySpan'
import './Masters.css'

const Masters = () => {
  const [masters, setMasters] = useState([])
  const [deleteError, setdeleteError] = useState('')
  const [activateError, setActivateError] = useState('')
  const [resetPasswordError, setResetPasswordError] = useState('')
  const [currentMasterId, setCurrentMasterId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const textError = 'Master cannot be deleted, used in order'

  useEffect(() => {
    mastersAPI
      .getMasters()
      .then((masters) => {
        setMasters(masters)
      })
      .then(() => setIsLoading(false))
  }, [])

  const activateMaster = async (id) => {
    const activateMaster = await mastersAPI.activateMaster(id)
    if (!activateMaster) {
      setActivateError("Master can't be activated")
    } else {
      const masters = await mastersAPI.getMasters()
      setMasters(masters)
    }
  }
  const resetPassword = async (id) => {
    const resetPassword = await mastersAPI.resetPassword(id)
    if (!resetPassword) {
      setResetPasswordError("Password can't be reseted")
    } else {
      setResetPasswordError('Password has been reset')
      setTimeout(() => {
        setResetPasswordError('')
      }, 1500)
    }
    setCurrentMasterId(id)
  }

  const deleteMaster = async (id) => {
    const deletedMaster = await mastersAPI.delMaster(id)
    if (!deletedMaster) {
      setdeleteError(textError)
      setTimeout(() => {
        setdeleteError('')
      }, 1500)
    } else {
      setMasters(masters.filter((master) => master.id !== id))
    }
    setCurrentMasterId(id)
  }

  if (isLoading) return <MySpan>The list of masters is loading...</MySpan>

  return (
    <div className='itemContent'>
      <div className='masters'>
        <ul className='list'>
          {masters.length === 0 ? (
            <MySpan>The list of masters is empty</MySpan>
          ) : (
            masters.map((master) => {
              return (
                <li id={master.id} key={master.id} className='listItem'>
                  {currentMasterId === master.id ? (
                    <MyError>{deleteError || activateError || resetPasswordError}</MyError>
                  ) : (
                    ''
                  )}
                  <div className='itemInfo'>
                    <MySpan>Name: {master.name},</MySpan>
                    <MySpan>Rating: {master.rating},</MySpan>
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
  )
}

export default Masters
