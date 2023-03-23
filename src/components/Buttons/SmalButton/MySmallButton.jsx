import { Link } from 'react-router-dom'
import './MySmallButton.css'

const MySmallButton = ({ children, to, ...props }) => {
  return to ? (
    <Link to={to}>
      <button {...props} className={'smallButton'}>
        {children}
      </button>
    </Link>
  ) : (
    <button {...props} className={'smallButton'}>
      {children}
    </button>
  )
}

export default MySmallButton
