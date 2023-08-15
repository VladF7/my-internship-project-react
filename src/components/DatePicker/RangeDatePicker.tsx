import { FormControl, Grid } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import React from 'react'

type NullOrDate = null | Date
interface IProps {
  value: NullOrDate[]
  onChange: (event: NullOrDate[]) => void
  options: Date[]
}

const FilterDatePicker: React.FC<IProps> = ({ value, onChange, options }) => {
  const handlerMinDate = (event: NullOrDate) => {
    onChange([event, value[1]])
  }
  const handlerMaxDate = (event: NullOrDate) => {
    onChange([value[0], event])
  }
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <Grid container justifyContent={'space-between'}>
        <Grid item xs={5.8}>
          <DatePicker
            slotProps={{
              actionBar: {
                actions: ['clear']
              }
            }}
            label={'Start time'}
            value={value[0]}
            minDate={options[0]}
            maxDate={value[1] || options[1]}
            onChange={handlerMinDate}
          />
        </Grid>
        <Grid item xs={5.8}>
          <DatePicker
            slotProps={{
              actionBar: {
                actions: ['clear']
              }
            }}
            label={'End time'}
            value={value[1]}
            minDate={value[0] || options[0]}
            maxDate={options[1]}
            onChange={handlerMaxDate}
          />
        </Grid>
      </Grid>
    </FormControl>
  )
}

export default FilterDatePicker
