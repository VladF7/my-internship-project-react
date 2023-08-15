import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ReactNode, useState } from 'react'
import { ListItemIcon, Typography } from '@mui/material'
import React from 'react'

interface IProps {
  elements: {
    iconType: ReactNode
    action: () => void | Promise<void>
    label: string
    hidden: boolean
    disabled: boolean
  }[]
}

const ITEM_HEIGHT = 48

const DropDownMenu: React.FC<IProps> = ({ elements }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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
