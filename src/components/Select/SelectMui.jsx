import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { forwardRef } from 'react'

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

const SelectMui = ({ options, label, value, onChange }, ref) => {
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel size='small' id='demo-simple-select-helper-label'>
        {label}
      </InputLabel>
      <Select
        ref={ref}
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
