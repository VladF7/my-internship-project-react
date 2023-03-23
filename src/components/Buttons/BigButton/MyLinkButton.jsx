import { Link } from 'react-router-dom'

const MyLinkButton = ({ children, to, ...props }) => {
  return (
    <Link to={to}>
      <button {...props} className={'bigButton'}>
        {children}
      </button>
    </Link>
  )
}

export default MyLinkButton
