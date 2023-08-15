import { IconButton, ImageList, ImageListItem } from '@mui/material'
import React, { ReactNode } from 'react'
import { TiDelete } from 'react-icons/ti'

interface IProps {
  images: string[]
  setImages?: (images: string[]) => void
  imageHeight: string
  imageWidtht: string
  imageBorderRadius: string
  listHeight?: string
  listWidth?: string
  columns: number
  showIconButtons?: boolean
  iconButton?: ReactNode
  emptyImagesList: ReactNode
  changeErrorMessage?: () => void
}

const ImageListMui: React.FC<IProps> = ({
  images,
  setImages,
  imageHeight,
  imageWidtht,
  imageBorderRadius,
  listHeight,
  listWidth,
  columns,
  showIconButtons,
  iconButton,
  emptyImagesList,
  changeErrorMessage
}) => {
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages && setImages(updatedImages)
    changeErrorMessage && changeErrorMessage()
  }

  return (
    <div>
      {!images || !images.length ? (
        emptyImagesList
      ) : (
        <ImageList
          cols={columns}
          sx={{ heigth: listHeight, width: listWidth }}
          gap={8}
          rowHeight={100}
        >
          {images.map((image, index) => (
            <ImageListItem key={image} sx={{ position: 'relative', overflow: 'hidden' }}>
              <img
                style={{
                  width: imageWidtht,
                  height: imageHeight,
                  borderRadius: imageBorderRadius
                }}
                srcSet={image}
                alt={`Image ${index}`}
                loading='lazy'
              />
              {showIconButtons && (
                <IconButton
                  onClick={() => handleRemoveImage(index)}
                  size='medium'
                  sx={{
                    backgroundColor: 'rgba(35, 43, 85, 0.9)',
                    color: 'lightsalmon',
                    padding: '0px',
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    ':hover': {
                      backgroundColor: 'rgba(35, 43, 85, 0.9)',
                      color: 'red'
                    }
                  }}
                  color='primary'
                  aria-label='remove-image'
                >
                  {iconButton || <TiDelete />}
                </IconButton>
              )}
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  )
}

export default ImageListMui
