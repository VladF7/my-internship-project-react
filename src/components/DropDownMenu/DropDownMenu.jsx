import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useState } from 'react'
import { ListItemIcon, Typography } from '@mui/material'

const ITEM_HEIGHT = 48

const DropDownMenu = ({ elements }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <BsThreeDotsVertical color='lightsalmon' />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch'
          }
        }}
      >
        {elements.map(
          (element) =>
            !element.hidden && (
              <MenuItem disabled={element.disabled} key={element.label} onClick={element.action}>
                <ListItemIcon>{element.iconType}</ListItemIcon>
                <Typography variant='inherit' noWrap>
                  {element.label}
                </Typography>
              </MenuItem>
            )
        )}
      </Menu>
    </div>
  )
}
export default DropDownMenu
