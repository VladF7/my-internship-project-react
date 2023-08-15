import { Controller, useForm, useWatch } from 'react-hook-form'
import citiesAPI from '../../../api/citiesAPI'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect, useState } from 'react'
import { Button, FormControl, Grid } from '@mui/material'
import MultipleSelectMui from '../../Select/MultipleSelectMui'
import mastersAPI from '../../../api/mastersAPI'
import AutocompleteSearchSelect from '../../AutocompleteSearchSelect/AutocompleteSearchSelect'
import React from 'react'
import {
  INumberOfOrdersByDateRequestParams,
  IOrdersByDateFiltersFields
} from '../../../types/statistic.types'
import { IOption } from '../../../types'

interface IProps {
  onSubmit: (formData: INumberOfOrdersByDateRequestParams) => void
}

const ordersByDateFilterSchema = z.object({
  masterIds: z
    .array(z.object({ id: z.number().int().positive(), name: z.string().nonempty() }))
    .optional(),
  cityIds: z.array(z.number().int().positive()).optional()
})
const OrdersByDateFiltersForm: FC<IProps> = ({ onSubmit }) => {
  const { control, handleSubmit, reset } = useForm<IOrdersByDateFiltersFields>({
    mode: 'onBlur',
    resolver: zodResolver(ordersByDateFilterSchema),
    defaultValues: {
      cityIds: [],
      masterIds: []
    }
  })

  const [isLoading, setIsLoading] = useState(true)

  const [citiesOptions, setCitiesOptions] = useState<IOption[]>([])

  const [disableApplyFiltersButton, setDisableApplyFiltersButton] = useState(true)
  const [disableResetFiltersButton, setDisableResetFiltersButton] = useState(true)

  useEffect(() => {
    citiesAPI
      .getCities()
      .then((cities) => {
        setCitiesOptions(
          cities.map((city) => {
            return { value: city.id, label: city.name }
          })
        )
      })
      .then(() => setIsLoading(false))
  }, [])

  const citiesField = useWatch({ control, name: 'cityIds' })
  const mastersField = useWatch({ control, name: 'masterIds' })

  useEffect(() => {
    if (isLoading) return
    resetFilters()
  }, [isLoading])

  useEffect(() => {
    if (isLoading) return
    if (!citiesField.length && !mastersField.length) {
      setDisableApplyFiltersButton(true)
    } else {
      setDisableApplyFiltersButton(false)
    }
  }, [citiesField, mastersField])

  const resetFilters = () => {
    reset({
      cityIds: [],
      masterIds: []
    })
  }
  const submit = (formData: IOrdersByDateFiltersFields) => {
    setDisableApplyFiltersButton(true)

    onSubmit({ ...formData, masterIds: formData.masterIds.map((master) => master.value as number) })

    if (!citiesField.length && !mastersField.length) {
      setDisableResetFiltersButton(true)
    } else {
      setDisableResetFiltersButton(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container>
        <Grid item>
          <Controller
            name='masterIds'
            control={control}
            render={({ field: { value, onChange } }) => (
              <AutocompleteSearchSelect
                value={value}
                onChange={onChange}
                getOptions={mastersAPI.getMastersByName}
                loadingText={'Masters list is loading...'}
                label={'Choose masters'}
                placeholder={'Enter master name'}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Grid container direction={'column'}>
            <Grid item>
              <Controller
                name='cityIds'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <MultipleSelectMui
                    value={value}
                    onChange={onChange}
                    label={'Choose cities'}
                    options={citiesOptions}
                  />
                )}
              />
            </Grid>
            <Grid item>
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
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}
export default OrdersByDateFiltersForm
