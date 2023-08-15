import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { FC, useEffect, useState } from 'react'
import statisticsAPI from '../../../../api/statisticsAPI'
import OrdersByDateFiltersForm from '../../../../components/ReactHookForms/Filters/OrdersByDateFiltersForm'
import ordersAPI from '../../../../api/ordersAPI'
import RangeDatePicker from '../../../../components/DatePicker/RangeDatePicker'
import { Box, Button, Collapse, FormControl, Grid } from '@mui/material'
import LineChart from '../../../../components/Charts/LineChart'
import MyClockLoader from '../../../../components/Loader/MyClockLoader'
import { format } from 'date-fns'
import React from 'react'
import { useAppSelector } from '../../../../hooks/hooks'
import { INumberOfOrdersByDateRequestParams, MIN_MAX_DATE } from '../../../../types/statistic.types'

Chart.register(CategoryScale)
const buttonStyle = {
  backgroundColor: 'rgb(255, 160, 122 ,0.4)',
  borderColor: 'rgb(255, 160, 122)',
  color: 'rgba(255,255,255, 0.9)',
  ':hover': {
    backgroundColor: 'rgb(255, 160, 122,0.6)',
    borderColor: 'rgb(255, 160, 122)'
  }
}

function getDatesInRange(startDate: Date, endDate: Date) {
  const dates = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    dates.push(format(new Date(currentDate), 'dd/MM/yy'))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

const OrdersByDateChart: FC = () => {
  const { timezone } = useAppSelector((state) => state.timezone)
  const [chartData, setChartData] = useState<(string | null)[]>([])
  const [filtersFields, setFiltersFields] = useState<INumberOfOrdersByDateRequestParams>({
    cityIds: [],
    masterIds: [],
    minMaxDate: []
  })
  const [minMaxDateOptions, setMinMaxDateOptions] = useState<Date[]>([])
  const [minMaxDate, setMinMaxDate] = useState<MIN_MAX_DATE>([null, null])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [datesInRange, setDatesInRange] = useState<string[]>([])

  useEffect(() => {
    ordersAPI
      .getMinMaxOrdersDate()
      .then((minMaxDate) => {
        setMinMaxDateOptions(minMaxDate.map((date) => new Date(date)))
      })
      .then(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (isLoading) return
    setMinMaxDate(minMaxDateOptions)
  }, [minMaxDateOptions])

  useEffect(() => {
    if (isLoading) return
    setFiltersFields({ ...filtersFields, minMaxDate: minMaxDate })
    setDatesInRange(getDatesInRange(minMaxDate[0] as Date, minMaxDate[1] as Date))
  }, [minMaxDate])

  useEffect(() => {
    if (isLoading) return
    statisticsAPI.getNumberOfOrdersByDate(filtersFields, timezone).then((response) => {
      const chartData: (string | null)[] = []
      datesInRange.forEach((date) => {
        const dataEntry = response.find((entry) => entry.date === date)
        if (dataEntry) {
          chartData.push(dataEntry.orderCount)
        } else {
          chartData.push(null)
        }
      })
      setChartData(chartData)
    })
  }, [filtersFields])
  const filterMenuButtonHandler = () => {
    setShowFilters(!showFilters)
  }

  const applyFilters = (formFiltersFields: INumberOfOrdersByDateRequestParams) => {
    setFiltersFields({ ...filtersFields, ...formFiltersFields })
  }
  if (isLoading) return <MyClockLoader />

  return (
    <Grid container direction={'column'} wrap='nowrap' width={'100%'} height={'100%'}>
      <Grid item>
        <Grid
          container
          direction={'row-reverse'}
          wrap='nowrap'
          justifyContent={'space-between'}
          sx={{ overflowX: 'auto' }}
        >
          <Grid item>
            <Collapse in={showFilters}>
              <Box
                sx={{
                  height: 'auto'
                }}
              >
                <OrdersByDateFiltersForm onSubmit={applyFilters} />
              </Box>
            </Collapse>
          </Grid>
          <Grid item>
            <Grid container direction={'column'}>
              <Grid item>
                <RangeDatePicker
                  value={minMaxDate}
                  options={minMaxDateOptions}
                  onChange={setMinMaxDate}
                />
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 1, width: '300px' }}>
                  <Button
                    variant='outlined'
                    sx={buttonStyle}
                    onClick={() => filterMenuButtonHandler()}
                  >
                    {showFilters ? 'Close filter menu' : 'Open filter menu'}
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item display={'flex'} justifyContent={'center'} xs>
        <LineChart
          titleText={'Line chart number of orders by dates'}
          label={' # count of orders'}
          labels={datesInRange}
          data={chartData}
        />
      </Grid>
    </Grid>
  )
}

export default OrdersByDateChart
