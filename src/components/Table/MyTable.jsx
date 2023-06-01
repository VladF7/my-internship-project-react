import {
  Box,
  Button,
  Collapse,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@mui/material'
import MySpan from '../Span/MySpan'
import { ClockLoader } from 'react-spinners'
import { useState } from 'react'

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
  button,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  filtersForm
}) => {
  const [showFilters, setShowFilters] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    setPage(0)
  }
  const filterMenuButtonHandler = () => {
    setShowFilters(!showFilters)
  }

  return (
    <Grid
      container
      direction='row'
      justifyContent={'space-around'}
      alignItems='center'
      height={'100%'}
      rowSpacing={2}
    >
      {filtersForm && (
        <Grid item xs={12} position={'relative'}>
          <Button
            variant='outlined'
            sx={{
              marginLeft: '8px',
              backgroundColor: 'rgb(255, 160, 122 ,0.4)',
              borderColor: 'rgb(255, 160, 122)',
              color: 'rgba(255,255,255, 0.9)',
              ':hover': {
                backgroundColor: 'rgb(255, 160, 122,0.6)',
                borderColor: 'rgb(255, 160, 122)'
              }
            }}
            onClick={() => filterMenuButtonHandler()}
          >
            {showFilters ? 'Close filter menu' : 'Open filter menu'}
          </Button>

          <Collapse in={showFilters}>
            <Box
              sx={{
                height: 'auto'
              }}
            >
              {filtersForm}
            </Box>
          </Collapse>
        </Grid>
      )}

      <Grid item xs={12} height={filtersForm ? '80%' : '90%'}>
        <TableContainer sx={{ height: '100%', position: 'relative' }}>
          <Table size='medium' stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sortDirection={orderBy === column.id ? order : false}
                    align={column.align}
                    style={{ width: column.width }}
                  >
                    {column.disableSort ? (
                      column.label
                    ) : (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    )}
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
      </Grid>
      <Grid item xs={12} paddingBottom={'10px'}>
        <Grid container direction='row' justifyContent={'space-evenly'} alignItems={'center'}>
          <Grid item xs={4}>
            <div style={{ width: '100%' }}>{button}</div>
          </Grid>
          <Grid item xs={5}>
            <TablePagination
              showFirstButton
              showLastButton
              rowsPerPageOptions={rowsPerPageOptions}
              component='div'
              count={count}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage={labelRowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MyTable
