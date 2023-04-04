import AsyncSelect from 'react-select/async'
import './ReactSelectStyles.css'
import ReactSelectStyles from './ReactSelectStyles'
import MyLabel from '../Label/MyLabel'
import MyError from '../Error/MyError'

const ReactSelect = ({ error, ...props }) => {
  return (
    <div className='reactSelectContainer'>
      <MyLabel discription={'Choose master cities'}></MyLabel>
      <MyError>{error}</MyError>
      <AsyncSelect
        {...props}
        cacheOptions
        defaultOptions
        closeMenuOnSelect={false}
        isMulti
        placeholder='Choose available cities'
        isSearchable={false}
        noOptionsMessage={() => 'No more cities'}
        styles={ReactSelectStyles}
      />
    </div>
  )
}

export default ReactSelect
