import { IconContext } from 'react-icons'
import { BsThreeDotsVertical } from 'react-icons/bs'
import './ThreeDotsMenu.css'
import { useEffect, useRef, useState } from 'react'

const ThreeDotsMenu = ({ elements }) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const clickHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div ref={ref} className='wrapper'>
      <IconContext.Provider value={{ size: '1.2em' }}>
        <div className={isOpen ? 'showActionsMenu' : 'hideActionsMenu'}>
          <div className='menu'>
            {elements.map((element) => {
              return (
                <div
                  key={element.label}
                  onClick={element.action}
                  style={{
                    display: element.hidden ? 'none' : 'flex'
                  }}
                  className='element'
                >
                  <div className='elementIcon'>{element.iconType}</div>
                  <div className='elementLabel'>{element.label}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div onClick={clickHandler} className='threeDotsMenu'>
          <BsThreeDotsVertical color='lightsalmon' cursor='pointer' />
        </div>
      </IconContext.Provider>
    </div>
  )
}

export default ThreeDotsMenu
