module.exports = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        border: state.isFocused ? 0 : 0,
        boxShadow: state.isFocused ? '0 0 0 3px #4C7C54' : 0,
            "&:hover": {
        border: state.isFocused ? 0 : 0
        },
        borderRadius: '20px',
        paddingLeft:  '5px',
        color: 'white',
        background: 'rgba(255,255,255,.2)',
        marginBottom: '20px',
    }),
    placeholder: (baseStyles) => ({
        ...baseStyles,
        color: 'black',
        fontSize: '14px',
        opacity: '0.5',
        fontFamily: 'inherit',
    }),
    option: (baseStyles) => ({
        ...baseStyles,
        fontSize: '14px',
        fontFamily: '-moz-initial',
    }),
    multiValue: (baseStyles) => ({
        ...baseStyles,
        borderRadius: '20px',
        color: 'black',
        opacity: '0.5',
    }),
    indicatorSeparator: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: 'lightsalmon',
    }),
  }