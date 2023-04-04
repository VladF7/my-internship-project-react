import { useEffect, useState } from 'react'
import mastersAPI from '../../../api/mastersAPI'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'
import MySmallButton from '../../../components/Buttons/SmalButton/MySmallButton'
import MyError from '../../../components/Error/MyError'
import MySpan from '../../../components/Span/MySpan'
import './Masters.css'

const Masters = () => {
  const [masters, setMasters] = useState([])
  const [error, setError] = useState('')
  const [currMasterId, setCurrMasterId] = useState('')
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
  const deleteMaster = (id) => {
    mastersAPI.delMaster(id).then((master) => {
      if (!master) {
        setError(textError)
        setTimeout(() => {
          setError('')
        }, 1500)
      } else {
        setMasters(masters.filter((master) => master.id !== id))
      }
    })
    setCurrMasterId(id)
  }

  if (isLoading) return <MySpan>The list of masters is loading...</MySpan>

  return (
    <div className='itemContent'>
      <div className='masters'>
        <ul className='list'>
          {masters.length === 0 ? (
            <MySpan>The list of customers is empty</MySpan>
          ) : (
            masters.map((master) => {
              return (
                <li id={master.id} key={master.id} className='listItem'>
                  {currMasterId === master.id ? <MyError>{error}</MyError> : ''}
                  <div className='itemInfo'>
                    <MySpan>Name: {master.name},</MySpan>
                    <MySpan>Rating: {master.rating},</MySpan>
                    <MySpan>City: {master.cities.map((city) => city.name + ', ')}</MySpan>
                  </div>
                  <div className='buttons'>
                    <MySmallButton to={`${master.id}`}>Edit</MySmallButton>
                    <MySmallButton onClick={() => deleteMaster(master.id)}>Delete</MySmallButton>
                  </div>
                </li>
              )
            })
          )}
        </ul>
      </div>
      <div className='addButtonWrapper form'>
        <MyLinkButton to='addMaster'>Add master</MyLinkButton>
      </div>
    </div>
  )
}

export default Masters
