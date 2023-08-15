import {
  Button,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { IMaster } from '../../types/master.types'
import { IOrder } from '../../types/order.types'

interface IProps {
  value: number | string
  onChange: (value: number | string) => void
  items: IMaster[]
  itemAction: (reviews: IOrder[]) => void
}

const buttonStyle = {
  backgroundColor: 'rgb(255, 160, 122 ,0.4)',
  borderColor: 'rgb(255, 160, 122)',
  color: 'rgba(255,255,255, 0.9)',
  ':hover': {
    backgroundColor: 'rgb(255, 160, 122,0.6)',
    borderColor: 'rgb(255, 160, 122)'
  }
}

const ChooseMasterList: React.FC<IProps> = ({ value, onChange, items, itemAction }) => {
  const [selectedIndex, setSelectedIndex] = useState(
    typeof value === 'number' ? items.map((item) => item.id).indexOf(value) : ''
  )

  const handleListItemClick = (event: React.SyntheticEvent, index: number) => {
    setSelectedIndex(index)
    onChange(items[index].id as number)
  }
  return (
    <List component='nav' aria-label='free masters list'>
      {items.map((item, index) => (
        <div key={item.id}>
          <ListItem
            sx={{ padding: '3px 0' }}
            secondaryAction={
              <Button
                variant='outlined'
                size='small'
                sx={buttonStyle}
                onClick={() => itemAction(item.orders as IOrder[])}
              >
                Show reviews
              </Button>
            }
          >
            <ListItemButton
              sx={{ borderRadius: '5px', padding: '6px 0' }}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon>
                <Checkbox
                  sx={{ color: 'lightsalmon', ml: '3px' }}
                  edge='start'
                  checked={selectedIndex === index}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': String(item.id) }}
                />
              </ListItemIcon>

              <Grid container display={'flex'} flexDirection={'column'}>
                <Grid item>
                  <Typography
                    sx={{ display: 'inline', color: 'rgba(255, 255, 255)' }}
                    component='span'
                    variant='body1'
                  >
                    {item.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <div>
                    <Typography
                      sx={{ display: 'inline', color: 'rgba(255, 255, 255, 0.8)' }}
                      component='span'
                      variant='body2'
                    >
                      Rating
                    </Typography>
                    <Typography
                      sx={{ display: 'inline', color: 'rgba(255, 255, 255, 0.6)' }}
                      component='span'
                      variant='body2'
                    >
                      {item.rating !== '0' ? ` — ${item.rating}` : ' - no rating'}
                    </Typography>
                  </div>
                </Grid>
                {!!item.ratingCount && (
                  <Grid item>
                    <div>
                      <Typography
                        sx={{ display: 'inline', color: 'rgba(255, 255, 255, 0.8)' }}
                        component='span'
                        variant='body2'
                      >
                        {'Review(s)'}
                      </Typography>
                      <Typography
                        sx={{ display: 'inline', color: 'rgba(255, 255, 255, 0.6)' }}
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        {` — ${item.ratingCount}`}
                      </Typography>
                    </div>
                  </Grid>
                )}
              </Grid>
            </ListItemButton>
          </ListItem>
          {index !== items.length - 1 && (
            <Divider variant='inset' sx={{ backgroundColor: 'lightsalmon' }} component={'li'} />
          )}
        </div>
      ))}
    </List>
  )
}

export default ChooseMasterList
