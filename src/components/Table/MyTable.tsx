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
import { ReactNode, useState } from 'react'
import ExportToExcel, { ITableData } from '../ExcelExport/ExcelExport'
import React from 'react'

interface ITableRow {
  id: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface ITableColumn {
  id: string
  label: string
  align: 'center' | 'inherit' | 'left' | 'right' | 'justify' | undefined
  disableSort?: boolean
  width?: string
}

interface IProps<TRow extends ITableRow> {
  columns: ITableColumn[]
  rows: TRow[]
  count: number
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  rowsPerPage: number
  setRowsPerPage: (rowsPerPage: number) => void
  rowsPerPageOptions: number[]
  labelRowsPerPage: string
  order: 'asc' | 'desc'
  orderBy: string
  setOrder: (order: 'asc' | 'desc') => void
  setOrderBy: (orderBy: string) => void
  getExportTableData?: () => Promise<ITableData[] | undefined>
  exportFileName?: string
  button?: ReactNode
  filtersForm?: ReactNode
}

const MyTable = <TRow extends ITableRow>(props: IProps<TRow>) => {
  const {
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
    filtersForm,
    getExportTableData,
    exportFileName
  } = props

  const [showFilters, setShowFilters] = useState(false)

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleRequestSort = (property: string) => {
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
          <Grid container columnSpacing={2}>
            <Grid item>
              <Button
                variant='outlined'
                sx={{
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
            </Grid>
            {getExportTableData && exportFileName && (
              <Grid item>
                <ExportToExcel
                  getExportTableData={getExportTableData}
                  exportFileName={exportFileName}
                />
              </Grid>
            )}
          </Grid>
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

      <Grid item xs={12} height={filtersForm ? '80%' : '89%'}>
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
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
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
      <Grid item xs={12}>
        <Grid container direction='row' justifyContent={'space-evenly'} alignItems={'center'}>
          {button && (
            <Grid item xs={4}>
              <div style={{ width: '100%' }}>{button}</div>
            </Grid>
          )}
          <Grid item>
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
