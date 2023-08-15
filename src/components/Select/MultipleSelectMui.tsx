import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material'
import React, { forwardRef, useState } from 'react'
import { IOption } from '../../types'

interface IProps {
  options: IOption[]
  label: string
  value: number[]
  onChange: (value: number[]) => void
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

const MultipleSelectMui: React.ForwardRefRenderFunction<unknown, IProps> = (
  { options, label, value, onChange },
  ref
) => {
  const [open, setOpen] = useState(false)

  const deleteHandler = (deletedItem: number) => {
    onChange(value.filter((item) => item !== deletedItem))
  }

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    onChange(event.target.value as number[])
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel size='small' id='demo-multiple-chip-label'>
        {label}
      </InputLabel>
      <Select
        ref={ref}
        labelId='demo-multiple-chip-label'
        id='demo-multiple-chip'
        multiple
        size='small'
        value={value}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        onChange={(event) => handleChange(event)}
        input={<OutlinedInput id='select-multiple-chip' label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((item) => {
              const option = options.find((option) => option.value === item)
              return (
                <Chip
                  size='small'
                  onDelete={() => deleteHandler(item)}
                  onMouseDown={(event) => {
                    event.stopPropagation()
                  }}
                  key={item}
                  label={option?.label || ''}
                />
              )
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default forwardRef(MultipleSelectMui)
