import AsyncSelect from 'react-select/async'
import './ReactSelectStyles.css'
import { forwardRef } from 'react'

const CitiesSelect = (props, ref) => {
  const styles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      border: state.isFocused ? 0 : 0,
      boxShadow: props.error
        ? '0 0 0 1.5px red'
        : state.isFocused
        ? '0 0 0 3px #4C7C54'
        : '0.1em 0.1em 0.5em rgba(0, 0, 0, 0.3)',
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
    <AsyncSelect
      ref={ref}
      {...props}
      cacheOptions
      defaultOptions
      maxMenuHeight={160}
      menuPlacement='top'
      closeMenuOnSelect={false}
      isMulti
      placeholder='Choose available cities'
      isSearchable={false}
      noOptionsMessage={() => 'No more cities'}
      styles={styles}
    />
  )
}

export default forwardRef(CitiesSelect)
