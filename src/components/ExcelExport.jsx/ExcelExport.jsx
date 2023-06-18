import { Button } from '@mui/material'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

const buttonStyle = {
  backgroundColor: 'rgb(128,128,128, 0.4)',
  borderColor: 'rgb(255,255,255, 0.4)',
  color: 'rgba(255,255,255, 0.9)',
  ':hover': {
    backgroundColor: 'rgb(128,128,128, 0.7)',
    borderColor: 'rgb(255,255,255, 0.4)'
  }
}

const columnWidths = (tableData) => {
  let objectMaxLength = []
  for (let i = 0; i < tableData.length; i++) {
    let value = Object.values(tableData[i])
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

export const ExportToExcel = ({ exportFileName, getExportTableData }) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (tableData, fileName) => {
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
    exportToCSV(tableData, exportFileName)
  }

  return (
    <Button variant='outlined' sx={buttonStyle} onClick={exportButtonHandler}>
      Export table
    </Button>
  )
}

export default ExportToExcel
