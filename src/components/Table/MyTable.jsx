import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import MySpan from '../Span/MySpan'
import { ClockLoader } from 'react-spinners'

const MyTable = ({
  columns,
  rows,
  count,
  isLoading,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  rowsPerPageOptions,
  labelRowsPerPage,
  button
}) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  return (
    <Grid
      container
      direction='row'
      justifyContent={'space-around'}
      alignItems='center'
      height={'100%'}
      rowSpacing={0}
    >
      <TableContainer
        sx={{ height: 'calc(100% - 53px)', marginBottom: '12px', position: 'relative' }}
      >
        <Table size='medium' stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ width: column.width }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell sx={{ borderBottom: '0px' }}>
                  <div
                    style={{
                      position: 'absolute',
                      transform: 'translate(-50%)',
                      left: 'calc(50%)',
                      top: 'calc(50%)'
                    }}
                  >
                    <ClockLoader color='lightsalmon' />
                  </div>
                </TableCell>
              </TableRow>
            ) : !rows.length ? (
              <TableRow>
                <TableCell sx={{ borderBottom: '0px' }}>
                  <MySpan
                    style={{
                      position: 'absolute',
                      transform: 'translate(-50%)',
                      left: 'calc(50%)',
                      top: 'calc(50%)'
                    }}
                  >
                    The table is empty
                  </MySpan>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <>
        <div style={{ width: '30%', maxWidth: '350px', minWidth: '170px' }}>{button}</div>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={count}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={labelRowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    </Grid>
  )
}

export default MyTable
