import { IconButton, ImageList, ImageListItem } from '@mui/material'
import { TiDelete } from 'react-icons/ti'

const ImageListMui = ({
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
  emptyImagesList
}) => {
  const handleRemoveImage = (index) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages(updatedImages)
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
