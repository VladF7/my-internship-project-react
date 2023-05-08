import './Checkbox.css'
const Checkbox = ({ label, onChange, value }) => {
  return (
    <div className='checkBoxWrapper'>
      <label className='checkboxLabel' htmlFor='checkbox'>
        {label}
      </label>
      <input
        onChange={onChange}
        value={value}
        style={{ marginLeft: '8px' }}
        type='checkbox'
      ></input>
    </div>
  )
}

export default Checkbox
