import Chart from 'chart.js/auto'
import { Grid } from '@mui/material'
import { CategoryScale } from 'chart.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ordersAPI from '../../../../api/ordersAPI'
import statisticsAPI from '../../../../api/statisticsAPI'
import RangeDatePicker from '../../../../components/DatePicker/RangeDatePicker'
import PieChart from '../../../../components/Charts/PieChart'
import MyClockLoader from '../../../../components/Loader/MyClockLoader'

Chart.register(CategoryScale)

const OrdersByCityChart = () => {
  const { timezone } = useSelector((state) => state.timezone)
  const [chartData, setChartData] = useState([])
  const [minMaxDateOptions, setMinMaxDateOptions] = useState([])
  const [minMaxDate, setMinMaxDate] = useState([null, null])
  const [isLoading, setIsLoading] = useState(true)

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
    statisticsAPI
      .getNumberOfOrdersByCity(minMaxDate, timezone)
      .then((chartData) => setChartData(chartData))
  }, [minMaxDate])

  if (isLoading) return <MyClockLoader />

  return (
    <Grid container height={'100%'}>
      <Grid item>
        <RangeDatePicker value={minMaxDate} options={minMaxDateOptions} onChange={setMinMaxDate} />
      </Grid>
      <Grid item display={'flex'} flexGrow={2} justifyContent={'center'}>
        <Grid container maxHeight={'100%'}>
          <PieChart
            label={' # count of orders'}
            titleText={'Pie chart number of orders by cities'}
            labels={chartData.map((data) => data.cityName)}
            data={chartData.map((data) => data.orderCount)}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OrdersByCityChart
