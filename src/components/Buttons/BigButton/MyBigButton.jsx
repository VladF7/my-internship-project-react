import './MyBigButton.css'

const MyBigButton = ({ children, ...props }) => {
  return (
    <button {...props} className={'bigButton'}>
      {children}
    </button>
  )
}

export default MyBigButton
