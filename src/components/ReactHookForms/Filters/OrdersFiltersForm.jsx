import { Controller, useForm, useWatch } from 'react-hook-form'
import citiesAPI from '../../../api/citiesAPI'
import statusesAPI from '../../../api/statuses.API'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { Button, FormControl, Grid } from '@mui/material'
import mastersAPI from '../../../api/mastersAPI'
import MultipleSelectMui from '../../Select/MultipleSelectMui'
import SelectMui from '../../Select/SelectMui'
import ordersAPI from '../../../api/ordersAPI'
import RangeDatePicker from '../../DatePicker/RangeDatePicker'
import SliderMui from '../../Slider/SliderMui'
import { formatValueToDecimal, formatValueToInteger } from '../../../helpers'

const ordersFilterSchema = z.object({
  masters: z.array(z.number().int().positive()).optional(),
  cities: z.array(z.number().int().positive()).optional(),
  status: z.string().optional(),
  dateRange: z.array(z.coerce.date().nullable()).optional(),
  priceRange: z.array(z.number().int().positive())
})
const OrdersFiltersForm = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(ordersFilterSchema)
  })

  const [isLoading, setIsLoading] = useState(true)

  const [cities, setCities] = useState([])
  const [masters, setMasters] = useState([])
  const [statuses, setStatuses] = useState([])
  const [dateRange, setDateRange] = useState([])
  const [priceRange, setPriceRange] = useState([])

  const [disableApplyFiltersButton, setDisableApplyFiltersButton] = useState(true)
  const [disableResetFiltersButton, setDisableResetFiltersButton] = useState(true)

  useEffect(() => {
    Promise.all([
      citiesAPI.getCities(),
      mastersAPI.getMastersAll(),
      statusesAPI.getStatuses(),
      ordersAPI.getOrdersDateRange(),
      ordersAPI.getOrdersPriceRange()
    ])
      .then((result) => {
        const [cities, masters, statuses, dateRange, priceRange] = result
        setCities(cities)
        setMasters(masters)
        setStatuses(statuses)
        setDateRange(dateRange)
        setPriceRange(priceRange)
      })
      .then(() => setIsLoading(false))
  }, [])

  const citiesField = useWatch({ control, name: 'cities' })
  const mastersField = useWatch({ control, name: 'masters' })
  const statusField = useWatch({ control, name: 'status' })
  const dateRangeField = useWatch({ control, name: 'dateRange' })
  const priceRangeField = useWatch({ control, name: 'priceRange' })

  useEffect(() => {
    resetFilters()
  }, [isLoading])

  useEffect(() => {
    if (isLoading) return
    if (
      !citiesField.length &&
      !mastersField.length &&
      !statusField &&
      !dateRangeField.filter((date) => date !== null).length &&
      priceRangeOptions.toString() === priceRangeField.toString()
    ) {
      setDisableApplyFiltersButton(true)
    } else {
      setDisableApplyFiltersButton(false)
    }
  }, [citiesField, mastersField, statusField, dateRangeField, priceRangeField])

  const citiesOptions = useMemo(() => {
    if (isLoading) return []
    return cities.map((city) => {
      return { value: city.id, label: city.name }
    })
  }, [isLoading])

  const mastersOptions = useMemo(() => {
    if (isLoading) return []
    return masters.map((master) => {
      return { value: master.id, label: master.name }
    })
  }, [isLoading])

  const statusOptions = useMemo(() => {
    if (isLoading) return []
    return statuses.map((status) => {
      return { value: status, label: status }
    })
  }, [isLoading])

  const dateRangesOptions = useMemo(() => {
    if (isLoading) return []
    return dateRange.map((date) => new Date(date))
  }, [isLoading])

  const priceRangeOptions = useMemo(() => {
    if (isLoading) return []
    const [minPrice, maxPrice] = priceRange.map((price) => formatValueToDecimal(price))
    return [Math.floor(minPrice), Math.ceil(maxPrice)]
  }, [isLoading])

  const resetFilters = () => {
    reset({
      cities: [],
      masters: [],
      status: '',
      dateRange: [null, null],
      priceRange: priceRangeOptions
    })
  }
  const submit = (formData) => {
    formData.priceRange = formData.priceRange.map((price) => formatValueToInteger(price))

    setDisableApplyFiltersButton(true)

    onSubmit(formData)

    if (
      !citiesField.length &&
      !mastersField.length &&
      !statusField &&
      !dateRangeField.filter((date) => date !== null).length &&
      priceRangeOptions.toString() === priceRangeField.toString()
    ) {
      setDisableResetFiltersButton(true)
    } else {
      setDisableResetFiltersButton(false)
    }
  }

  if (isLoading) {
    return
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container direction={'column'} paddingTop={'16px'}>
        <Grid container direction={'row'} width={'100%'}>
          <Grid container direction={'column'} width={'auto'} height={'100%'}>
            <Grid container direction={'row'} width={'auto'} height={'100%'}>
              <Grid item>
                <Controller
                  name='cities'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <MultipleSelectMui
                      value={value}
                      onChange={onChange}
                      label={'Cities'}
                      options={citiesOptions}
                      error={!!errors?.cities}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name='status'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SelectMui
                      value={value}
                      onChange={onChange}
                      label={'Status'}
                      options={statusOptions}
                      error={!!errors?.status}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item>
              <Controller
                name='dateRange'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RangeDatePicker value={value} options={dateRangesOptions} onChange={onChange} />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name='priceRange'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SliderMui value={value} options={priceRangeOptions} onChange={onChange} />
                )}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Controller
              name='masters'
              control={control}
              render={({ field: { value, onChange } }) => (
                <MultipleSelectMui
                  value={value}
                  onChange={onChange}
                  label={'Masters'}
                  options={mastersOptions}
                  error={!!errors?.masters}
                />
              )}
            />
          </Grid>
        </Grid>

        <FormControl sx={{ m: 1, width: '300px' }}>
          <Grid container justifyContent={'space-between'}>
            <Grid item>
              <Button
                disabled={disableApplyFiltersButton}
                variant='outlined'
                type='submit'
                sx={{
                  backgroundColor: 'rgb(30, 130, 76, 0.4)',
                  borderColor: 'rgb(30, 130, 76)',
                  color: 'rgba(255,255,255, 0.9)',
                  ':hover': {
                    backgroundColor: 'rgb(30, 130, 76, 0.6)',
                    borderColor: 'rgb(30, 130, 76)'
                  }
                }}
              >
                Apply filters
              </Button>
            </Grid>

            <Grid item>
              <Button
                disabled={disableResetFiltersButton}
                variant='outlined'
                type='submit'
                sx={{
                  backgroundColor: 'rgb(128,128,128, 0.4)',
                  borderColor: 'rgb(128,128,128 )',
                  color: 'rgba(255,255,255, 0.9)',
                  ':hover': {
                    backgroundColor: 'rgb(128,128,128, 0.6)',
                    borderColor: 'rgb(128,128,128)'
                  }
                }}
                onClick={() => resetFilters()}
              >
                Reset filters
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Grid>
    </form>
  )
}
export default OrdersFiltersForm
