import { Autocomplete, CircularProgress, FormControl, TextField } from '@mui/material'
import debounce from 'lodash.debounce'
import { useCallback, useEffect, useState } from 'react'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

const AutocompleteSearchSelect = ({
  value,
  onChange,
  label,
  placeholder,
  getOptions,
  loadingText
}) => {
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const sendRequest = async (value) => {
    setIsLoading(true)
    const options = await getOptions(value)
    setOptions(
      options.map((option) => {
        return { id: option.id, name: option.name }
      })
    )
    setIsLoading(false)
  }

  const debouncedSendRequest = useCallback(
    debounce((value) => sendRequest(value), 1000),
    []
  )

  useEffect(() => {
    debouncedSendRequest(inputValue)
    return debouncedSendRequest.cancel
  }, [inputValue])

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <Autocomplete
        id='master-filter-autocomplete'
        size='small'
        multiple
        options={value ? [...value, ...options] : options}
        getOptionLabel={(option) => option.name}
        value={value}
        inputValue={inputValue}
        onChange={(event, value) => onChange(value)}
        onInputChange={(event, value) => setInputValue(value)}
        loading={isLoading}
        loadingText={loadingText}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        filterOptions={(options) => options}
        filterSelectedOptions
        blurOnSelect
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.name, inputValue, { insideWords: true })
          const parts = parse(option.name, matches)

          return (
            <li {...props}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          )
        }}
        renderInput={(params) => (
          <TextField
            sx={{ position: 'relative' }}
            {...params}
            label={label}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      visibility: !isLoading ? 'hidden' : 'visible'
                    }}
                  >
                    <CircularProgress color='inherit' size={20} />
                  </div>
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />
    </FormControl>
  )
}

export default AutocompleteSearchSelect
