import AsyncSelect from 'react-select/async'
import './ReactSelectStyles.css'
import MyLabel from '../Label/MyLabel'
import MyError from '../Error/MyError'

const ReactSelect = ({ error, ...props }) => {
  const styles = {
    error: error,
    control: (baseStyles, state) => ({
      ...baseStyles,
      border: state.isFocused ? 0 : 0,
      boxShadow: error
        ? '0 0 0 1.5px rgba(220, 20, 60, 0.8)'
        : state.isFocused
        ? '0 0 0 3px #4C7C54'
        : 0,
      '&:hover': {
        border: state.isFocused ? 0 : 0
      },
      borderRadius: '20px',
      paddingLeft: '5px',
      color: 'white',
      background: 'rgba(255,255,255,.2)',
      marginBottom: '20px'
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: 'black',
      fontSize: '14px',
      opacity: '0.5',
      fontFamily: 'inherit'
    }),
    option: (baseStyles) => ({
      ...baseStyles,
      fontSize: '14px',
      fontFamily: '-moz-initial'
    }),
    multiValue: (baseStyles) => ({
      ...baseStyles,
      borderRadius: '20px',
      color: 'black',
      opacity: '0.5'
    }),
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: 'lightsalmon'
    })
  }

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
        error={error}
        styles={styles}
      />
    </div>
  )
}

export default ReactSelect
