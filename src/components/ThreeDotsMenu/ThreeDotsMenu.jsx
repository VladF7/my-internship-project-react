import { IconContext } from 'react-icons'
import { BsThreeDotsVertical } from 'react-icons/bs'
import './ThreeDotsMenu.css'

const ThreeDotsMenu = ({ showActionsFor, id, click, elements }) => {
  return (
    <IconContext.Provider value={{ size: '1.2em' }}>
      <div className='wrapper'>
        <div className={id === showActionsFor ? 'showActionsMenu' : 'hideActionsMenu'}>
          {elements.map((element) => {
            return (
              <div
                key={element.label}
                onClick={element.action}
                style={{
                  display: element.disabled ? 'none' : 'flex'
                }}
                className='element'
              >
                <span>{element.label}</span>
                <div className='icon'>{element.iconType}</div>
              </div>
            )
          })}
        </div>
        <div onClick={click} className='threeDotsMenu'>
          <BsThreeDotsVertical color='lightsalmon' cursor='pointer' />
        </div>
      </div>
    </IconContext.Provider>
  )
}

export default ThreeDotsMenu
