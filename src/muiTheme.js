import { createTheme } from '@mui/material'

export const theme = createTheme({
  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          boxShadow: '0px -2px 3px 0px rgba(0,0,0,0.2)',
          WebkitBoxShadow: '0px -2px 3px 0px rgba(0,0,0,0.2)',
          MozBoxShadow: '0px -2px 3px 0px rgba(0,0,0,0.2)'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontFamily: 'inherit',
          fontSize: '14px',
          borderColor: 'lightsalmon'
        },
        stickyHeader: {
          fontWeight: '700',
          color: '#ffffff',
          background: 'rgba(50, 60, 99)',
          borderBottom: '0px',
          boxShadow: 'inset -3px -2px 3px 0px rgba(0,0,0,0.1)',
          WebkitBoxShadow: 'inset -3px -2px 3px 0px rgba(0,0,0,0.1)',
          MozBoxShadow: 'inset -3px -2px 3px 0px rgba(0,0,0,0.1)'
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          background: 'rgba(35, 43, 85)',
          boxShadow: ' 0.1em 0.1em 0.5em rgba(0, 0, 0, 0.3)',
          WebkitBoxShadow: ' 0.1em 0.1em 0.5em rgba(0, 0, 0, 0.3)',
          MozBoxShadow: ' 0.1em 0.1em 0.5em rgba(0, 0, 0, 0.3)',
          borderRadius: '5px',
          color: '#ffffff'
        },
        selectLabel: {
          fontFamily: 'inherit',
          fontSize: '14px'
        },
        displayedRows: {
          fontFamily: 'inherit',
          fontSize: '14px'
        },
        selectRoot: {
          fontFamily: 'inherit',
          fontSize: '14px'
        },
        selectIcon: {
          color: 'lightsalmon'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
          fontSize: '14px'
        }
      }
    }
  }
})
