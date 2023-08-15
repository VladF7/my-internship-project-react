import { Autocomplete, CircularProgress, FormControl, TextField } from '@mui/material'
import debounce from 'lodash.debounce'
import React, { useCallback, useEffect, useState } from 'react'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { IMaster } from '../../types/master.types'
import { IOption } from '../../types'

interface IProps {
  value: IOption[]
  onChange: (value: IOption[]) => void
  label: string
  placeholder: string
  getOptions: (name: string) => Promise<IMaster[]>
  loadingText: string
}

const AutocompleteSearchSelect: React.FC<IProps> = ({
  value,
  onChange,
  label,
  placeholder,
  getOptions,
  loadingText
}) => {
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<IOption[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const sendRequest = async (value: string) => {
    setIsLoading(true)
    const options = await getOptions(value)
    setOptions(
      options.map((option) => {
        return { value: option.id, label: option.name }
      })
    )
    setIsLoading(false)
  }

  const debouncedSendRequest = useCallback(
    debounce((value: string) => sendRequest(value), 1000),
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
        getOptionLabel={(option) => option.label}
        value={value}
        inputValue={inputValue}
        onChange={(event, value) => onChange(value)}
        onInputChange={(event, value) => setInputValue(value)}
        loading={isLoading}
        loadingText={loadingText}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        filterOptions={(options) => options}
        filterSelectedOptions
        blurOnSelect
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.label, inputValue, { insideWords: true })
          const parts = parse(option.label, matches)

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
