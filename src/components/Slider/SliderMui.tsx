import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import { useEffect, useState } from 'react'
import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'

interface IProps {
  value: number[]
  onChange: (value: number[]) => void
  options: number[]
}

const SliderMui: React.FC<IProps> = ({ value, onChange, options }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState<(string | number)[]>([])

  useEffect(() => {
    if (!value.length) return
    setInputValue(value)
    setIsLoading(false)
  }, [value])

  const minValue = options[0]
  const maxValue = options[1]
  const step = 1

  const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }
    const minDistance = step
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxValue - minDistance)
        onChange([clamped, clamped + minDistance])
        setInputValue([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        onChange([clamped - minDistance, clamped])
        setInputValue([clamped - minDistance, clamped])
      }
    } else {
      onChange(newValue)
      setInputValue(newValue)
    }
  }

  const handleInputOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue([event.target.value, inputValue[1]])
  }
  const handleInputTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue([inputValue[0], event.target.value])
  }

  const handleBlurInputOne = () => {
    if (inputValue[0] > inputValue[1] || inputValue[0] === '') {
      onChange([value[0], inputValue[1] as number])
      setInputValue([value[0], inputValue[1]])
      return
    }
    if ((inputValue[0] as number) < minValue) {
      onChange([minValue, inputValue[1] as number])
      setInputValue([minValue, inputValue[1]])
      return
    }
    onChange([Math.trunc(inputValue[0] as number), inputValue[1] as number])
    setInputValue([Math.trunc(inputValue[0] as number), inputValue[1]])
  }

  const handleBlurInputTwo = () => {
    if (inputValue[1] < inputValue[0] || inputValue[1] === '') {
      onChange([inputValue[0] as number, value[1]])
      setInputValue([inputValue[0], value[1]])
      return
    }
    if ((inputValue[1] as number) > maxValue) {
      onChange([inputValue[0] as number, maxValue])
      setInputValue([inputValue[0], maxValue])
      return
    }
    onChange([inputValue[0] as number, Math.trunc(inputValue[1] as number)])
    setInputValue([inputValue[0], Math.trunc(inputValue[1] as number)])
  }

  if (isLoading) {
    return
  }

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <Grid container direction={'column'} alignItems='center'>
        <Grid container direction={'row'} justifyContent={'space-between'}>
          <Grid item xs={5}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel size='small' htmlFor='input-one-name'>
                Minimal price
              </InputLabel>
              <OutlinedInput
                id='input-one-name'
                label={'Minimal price'}
                aria-describedby='base-name-helper-text'
                value={inputValue[0]}
                size='small'
                onChange={handleInputOneChange}
                onBlur={handleBlurInputOne}
                inputProps={{
                  step: step,
                  min: minValue,
                  max: (inputValue[1] as number) - step,
                  type: 'number',
                  'aria-labelledby': 'input-slider'
                }}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={2}
            color={'rgba(255, 255, 255, 0.7)'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            -
          </Grid>
          <Grid item xs={5}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel size='small' htmlFor='input-two-name'>
                Maximal price
              </InputLabel>
              <OutlinedInput
                id='input-two-name'
                label={'Maximal price'}
                aria-describedby='base-name-helper-text'
                value={inputValue[1]}
                size='small'
                onChange={handleInputTwoChange}
                onBlur={handleBlurInputTwo}
                inputProps={{
                  step: step,
                  min: (inputValue[0] as number) + step,
                  max: maxValue,
                  type: 'number',
                  'aria-labelledby': 'input-slider'
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item width={'100%'} justifyContent={'center'}>
          <FormControl sx={{ p: 1, width: '100%' }}>
            <Slider
              getAriaLabel={() => 'Minimum distance shift'}
              value={value}
              step={step}
              min={minValue}
              max={maxValue}
              onChange={handleSliderChange}
              valueLabelDisplay='auto'
              disableSwap
            />
          </FormControl>
        </Grid>
      </Grid>
    </FormControl>
  )
}
export default SliderMui
