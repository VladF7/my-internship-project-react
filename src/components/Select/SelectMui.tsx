import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { forwardRef } from 'react'
import { IOption } from '../../types'

interface IProps {
  options: IOption[]
  label: string
  value: string
  onChange: (value: string) => void
}

const ITEM_HEIGHT = 40
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const SelectMui: React.ForwardRefRenderFunction<unknown, IProps> = (
  { options, label, value, onChange },
  ref
) => {
  console.log(value)

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel size='small' id='demo-simple-select-helper-label'>
        {label}
      </InputLabel>
      <Select
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        label={label}
        size='small'
        labelId='demo-simple-select-helper-label'
        id='demo-simple-select-helper-label'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        MenuProps={MenuProps}
      >
        <MenuItem value={''}>No status</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default forwardRef(SelectMui)
