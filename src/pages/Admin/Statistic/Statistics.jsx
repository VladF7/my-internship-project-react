import { Divider, Grid, List, ListItemButton, ListItemText } from '@mui/material'
import AdminNavBar from '../../../components/NavBar/AdminNavBar/AdminNavBar'
import { useEffect, useState } from 'react'
import OrdersByDateChart from './Charts/OrdersByDateChart'
import OrdersByCityChart from './Charts/OrdersByCityChart'
import OrdersByMasterChart from './Charts/OrdersByMastersChart'
import MasterStatistics from './Charts/MasterStatistics'
import './Statistics.css'

const Statistic = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [content, setContent] = useState('')

  useEffect(() => {
    setContent(items[selectedIndex].content)
  }, [selectedIndex])

  const items = [
    { label: 'Number of orders by date', content: <OrdersByDateChart /> },
    { label: 'Number of orders by city', content: <OrdersByCityChart /> },
    {
      label: 'Number of orders by masters',
      content: <OrdersByMasterChart />
    },
    { label: 'Master statistics', content: <MasterStatistics /> }
  ]

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }
  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        <Grid container wrap='nowrap' height={'100%'} width={'100%'}>
          <Grid item minWidth={'250px'} maxWidth={'250px'}>
            <List component='nav'>
              {items.map((item, index) => (
                <ListItemButton
                  disableRipple
                  key={item.label}
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index)}
                >
                  <ListItemText
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}
                    primary={item.label}
                  />
                </ListItemButton>
              ))}
            </List>
          </Grid>
          <Grid item padding={'0 10px'}>
            <Divider
              orientation='vertical'
              variant='fullWidth'
              sx={{ backgroundColor: 'lightsalmon', margin: '0' }}
              component={'p'}
            />
          </Grid>
          <Grid item xs sx={{ overflowX: 'auto' }}>
            {content}
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
export default Statistic
