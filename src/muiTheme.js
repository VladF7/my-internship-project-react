import { experimental_extendTheme as materialExtendTheme } from '@mui/material/styles'
import { extendTheme } from '@mui/joy'

export const joyTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          500: '#ffa07a'
        }
      }
    }
  }
})

export const theme = materialExtendTheme({
  typography: {
    fontFamily: 'inherit'
  },
  palette: {
    primary: {
      main: '#ffa07a'
    }
  },
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
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: 'lightsalmon'
          },
          ':hover': {
            color: 'lightsalmon'
          }
        },
        icon: {
          color: 'lightsalmon'
        },
        iconDirectionAsc: {
          fill: 'lightsalmon'
        },
        iconDirectionDesc: {
          fill: 'lightsalmon'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'lightsalmon'
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          backgroundColor: 'rgba(195,195,195)'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.9)',
          '&:hover fieldset': {
            border: '1px solid lightsalmon!important'
          }
        },
        notchedOutline: {
          borderColor: 'rgba(255, 255, 255, 0.3)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.9)'
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: 'lightsalmon'
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        input: {
          width: '85%!important'
        },
        option: {
          fontSize: '14px'
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          fontSize: '13px',
          '&.Mui-selected': {
            backgroundColor: 'rgb(255, 160, 122 ,0.4)',
            borderRadius: '5px',
            '&:hover': {
              backgroundColor: 'rgb(255, 160, 122 ,0.4)'
            }
          },
          ':hover': {
            borderRadius: '5px'
          }
        }
      }
    }
  }
})
