import './MyBigButton.css'

const MyBigButton = ({ children, className, ...props }) => {
  return (
    <button {...props} className={className ? className : 'bigButton'}>
      {children}
    </button>
  )
}

export default MyBigButton
