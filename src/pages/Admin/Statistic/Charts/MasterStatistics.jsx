import { useEffect, useState } from 'react'
import MyTable from '../../../../components/Table/MyTable'
import { getMasterStatisticsThunk } from '../../../../store/statistics/thunk'
import { useDispatch, useSelector } from 'react-redux'
import { formatValueToDecimal } from '../../../../helpers'

const MasterStatistics = () => {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [sort, setSort] = useState('desc')
  const [sortBy, setSortBy] = useState('totalEarned')
  const rowsPerPageOptions = [10, 25, 50]
  const labelRowsPerPage = 'Masters per page'
  const currency = 'USD'

  const { masters, isLoading, count } = useSelector((state) => state.statistics)
  useEffect(() => {
    dispatch(getMasterStatisticsThunk({ page, limit, sort, sortBy }))
  }, [page, limit, sort, sortBy])

  const dispatch = useDispatch()

  const createData = (
    id,
    name,
    smallOrdersCount,
    mediumOrdersCount,
    bigOrdersCount,
    rating,
    completedOrdersCount,
    notCompletedOrdersCount,
    totalEarned
  ) => {
    return {
      id,
      name,
      smallOrdersCount,
      mediumOrdersCount,
      bigOrdersCount,
      rating,
      completedOrdersCount,
      notCompletedOrdersCount,
      totalEarned: formatValueToDecimal(totalEarned)
    }
  }

  const columns = [
    { id: 'id', label: 'Master ID', width: '5%', align: 'center' },
    { id: 'name', label: 'Master name', width: '10%', align: 'center' },
    { id: 'smallOrdersCount', label: 'Small size orders', width: '20%', align: 'center' },
    { id: 'mediumOrdersCount', label: 'Medium size orders', width: '20%', align: 'center' },
    { id: 'bigOrdersCount', label: 'Big size orders', width: '20%', align: 'center' },
    { id: 'completedOrdersCount', label: 'Completed', width: '5%', align: 'center' },
    { id: 'notCompletedOrdersCount', label: 'Not completed', width: '5%', align: 'center' },
    { id: 'rating', label: 'Rating', width: '5%', align: 'center' },
    { id: 'totalEarned', label: `Total earned, ${currency}`, width: '10%', align: 'center' }
  ]
  const rows = masters.map((master) =>
    createData(
      master.id,
      master.name,
      master.smallOrdersCount,
      master.mediumOrdersCount,
      master.bigOrdersCount,
      master.rating,
      master.completedOrdersCount,
      master.notCompletedOrdersCount,
      master.totalEarned
    )
  )

  return (
    <MyTable
      columns={columns}
      rows={rows}
      count={count}
      isLoading={isLoading}
      page={page}
      rowsPerPage={limit}
      setPage={setPage}
      setRowsPerPage={setLimit}
      rowsPerPageOptions={rowsPerPageOptions}
      labelRowsPerPage={labelRowsPerPage}
      order={sort}
      orderBy={sortBy}
      setOrder={setSort}
      setOrderBy={setSortBy}
    />
  )
}

export default MasterStatistics
