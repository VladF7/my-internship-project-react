import { Avatar, Divider, Grid, List, ListItem, ListItemAvatar, Typography } from '@mui/material'
import React from 'react'
import { IOrder } from '../../types/order.types'

interface IProps {
  items: IOrder[]
}

const ReviewsList: React.FC<IProps> = ({ items }) => {
  return !items.length ? (
    <Typography
      sx={{ display: 'inline', pl: '16px', color: 'rgba(255, 255, 255, 0.8)' }}
      component='span'
      variant='body1'
      color='text.primary'
    >
      Master have not reviews
    </Typography>
  ) : (
    <>
      <Typography
        sx={{ display: 'inline', pl: '16px', color: 'rgba(255, 255, 255, 0.8)' }}
        component='span'
        variant='body1'
        color='text.primary'
      >
        Last five reviews
      </Typography>
      <List disablePadding>
        {items.map((item, index) => (
          <div key={item.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={`customer avater`} src='' />
              </ListItemAvatar>
              <Grid container display={'flex'} flexDirection={'column'}>
                <Grid item>
                  <Typography
                    sx={{ display: 'inline', color: 'rgba(255, 255, 255)' }}
                    component='span'
                    variant='body1'
                    color='text.primary'
                  >
                    {item.customer ? item.customer.name : ''}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    sx={{ display: 'inline', color: 'rgba(255, 255, 255, 0.8)' }}
                    component='span'
                    variant='body2'
                    color='text.primary'
                  >
                    Rating
                  </Typography>
                  <Typography
                    sx={{ display: 'inline', color: 'rgba(255, 255, 255, 0.6)' }}
                    component='span'
                    variant='body2'
                    color='text.primary'
                  >
                    {` — ${item.rating}`}
                  </Typography>
                </Grid>
                {item.comment && (
                  <Grid item>
                    <Typography
                      sx={{ display: 'inline', color: 'rgba(255, 255, 255, 0.8)' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      Comment
                    </Typography>
                    <Typography
                      sx={{ display: 'inline', color: 'rgba(255, 255, 255, 0.6)' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      {` — ${item.comment}`}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </ListItem>
            {index !== items.length - 1 && (
              <Divider variant='inset' sx={{ backgroundColor: 'lightsalmon' }} component='li' />
            )}
          </div>
        ))}
      </List>
    </>
  )
}

export default ReviewsList
