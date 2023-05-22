import { FormControl, Grid } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const FilterDatePicker = ({ value, onChange, options }) => {
  const handlerMinDate = (event) => {
    onChange([event, value[1]])
  }
  const handlerMaxDate = (event) => {
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
