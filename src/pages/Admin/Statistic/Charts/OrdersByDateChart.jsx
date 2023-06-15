import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { useEffect, useState } from 'react'
import statisticsAPI from '../../../../api/statisticsAPI'
import OrdersByDateFiltersForm from '../../../../components/ReactHookForms/Filters/OrdersByDateFiltersForm'
import ordersAPI from '../../../../api/ordersAPI'
import RangeDatePicker from '../../../../components/DatePicker/RangeDatePicker'
import { Box, Button, Collapse, FormControl, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import LineChart from '../../../../components/Charts/LineChart'
import MyClockLoader from '../../../../components/Loader/MyClockLoader'

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

const OrdersByDateChart = () => {
  const { timezone } = useSelector((state) => state.timezone)
  const [chartData, setChartData] = useState([])
  const [filtersFields, setFiltersFields] = useState({
    cityIds: [],
    masterIds: [],
    minMaxDate: []
  })
  const [minMaxDateOptions, setMinMaxDateOptions] = useState([])
  const [minMaxDate, setMinMaxDate] = useState([null, null])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

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
  }, [minMaxDate])

  useEffect(() => {
    if (isLoading) return
    statisticsAPI
      .getNumberOfOrdersByDate(filtersFields, timezone)
      .then((chartData) => setChartData(chartData))
  }, [filtersFields])

  const filterMenuButtonHandler = () => {
    setShowFilters(!showFilters)
  }

  const applyFilters = (formFiltersFields) => {
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
      <Grid item display={'flex'} justifyContent={'center'} height={'75%'} xs>
        <LineChart
          titleText={'Line chart number of orders by dates'}
          label={' # count of orders'}
          labels={chartData.map((data) => data.date)}
          data={chartData.map((data) => data.orderCount)}
        />
      </Grid>
    </Grid>
  )
}

export default OrdersByDateChart
