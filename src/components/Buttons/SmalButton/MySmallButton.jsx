import { Link } from 'react-router-dom'
import './MySmallButton.css'

const MySmallButton = ({ children, to, className, ...props }) => {
  return to ? (
    <Link to={to}>
      <button {...props} className={className ? className : 'smallButton'}>
        {children}
      </button>
    </Link>
  ) : (
    <button {...props} className={className ? className : 'smallButton'}>
      {children}
    </button>
  )
}

export default MySmallButton
