import { Button } from '@mui/material'
import * as FileSaver from 'file-saver'
import React from 'react'
import * as XLSX from 'xlsx'

export interface ITableData {
  'Order ID': number
  'Customer name': string
  Email: string
  'Clock size': string
  'Time to fix': number
  'Master name': string
  City: string
  'Start time': string
  'End time': string
  Status: string
  Price: number
}
interface IProps {
  exportFileName: string
  getExportTableData: () => Promise<ITableData[] | undefined>
}

const buttonStyle = {
  backgroundColor: 'rgb(128,128,128, 0.4)',
  borderColor: 'rgb(255,255,255, 0.4)',
  color: 'rgba(255,255,255, 0.9)',
  ':hover': {
    backgroundColor: 'rgb(128,128,128, 0.7)',
    borderColor: 'rgb(255,255,255, 0.4)'
  }
}

const columnWidths = (tableData: ITableData[]) => {
  const objectMaxLength: number[] = []
  for (let i = 0; i < tableData.length; i++) {
    const value = Object.values(tableData[i])
    for (let j = 0; j < value.length; j++) {
      if (typeof value[j] == 'number') {
        objectMaxLength[j] = 10
      } else {
        objectMaxLength[j] =
          objectMaxLength[j] >= value[j].length ? objectMaxLength[j] : value[j].length
      }
    }
  }
  return objectMaxLength.map((length) => {
    return { wch: length }
  })
}

export const ExportToExcel: React.FC<IProps> = ({ exportFileName, getExportTableData }) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (tableData: ITableData[], fileName: string) => {
    const wscols = columnWidths(tableData)

    const ws = XLSX.utils.json_to_sheet(tableData)
    ws['!cols'] = wscols

    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, fileName + fileExtension)
  }
  const exportButtonHandler = async () => {
    const tableData = await getExportTableData()
    if (tableData) {
      exportToCSV(tableData, exportFileName)
    }
  }

  return (
    <Button variant='outlined' sx={buttonStyle} onClick={exportButtonHandler}>
      Export table
    </Button>
  )
}

export default ExportToExcel
