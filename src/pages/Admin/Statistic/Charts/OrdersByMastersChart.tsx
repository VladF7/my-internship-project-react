import Chart from 'chart.js/auto'
import { Grid } from '@mui/material'
import { CategoryScale } from 'chart.js'
import { FC, useEffect, useState } from 'react'
import ordersAPI from '../../../../api/ordersAPI'
import statisticsAPI from '../../../../api/statisticsAPI'
import RangeDatePicker from '../../../../components/DatePicker/RangeDatePicker'
import PieChart from '../../../../components/Charts/PieChart'
import MyClockLoader from '../../../../components/Loader/MyClockLoader'
import { useAppSelector } from '../../../../hooks/hooks'
import React from 'react'
import { INumberOfOrdersByMasters, MIN_MAX_DATE } from '../../../../types/statistic.types'

Chart.register(CategoryScale)

const OrdersByMastersChart: FC = () => {
  const { timezone } = useAppSelector((state) => state.timezone)
  const [chartData, setChartData] = useState<INumberOfOrdersByMasters[]>([])
  const [minMaxDateOptions, setMinMaxDateOptions] = useState<Date[]>([])
  const [minMaxDate, setMinMaxDate] = useState<MIN_MAX_DATE>([null, null])
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
    if (minMaxDate.includes(null)) return
    statisticsAPI
      .getNumberOfOrdersByMasters(minMaxDate, timezone)
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
            titleText={'Pie chart number of orders by masters'}
            labels={chartData.map((data) => data.masterName)}
            data={chartData.map((data) => data.orderCount)}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OrdersByMastersChart
