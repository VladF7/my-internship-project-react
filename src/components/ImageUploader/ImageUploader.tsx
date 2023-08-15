import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material'
import ImageListMui from '../ImageList/ImageListMui'

interface IProps {
  value: string[]
  onChange: (value: string[]) => void
  accept: string[]
  maxSize: number
  filesCount: number
}

const ImageUploader: React.FC<IProps> = ({ value, onChange, accept, maxSize, filesCount }) => {
  const [selectedImages, setSelectedImages] = useState(value)
  const [error, setError] = useState('')
  useEffect(() => {
    onChange(selectedImages)
  }, [selectedImages])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files as FileList)

    const newImages: string[] = []

    files.forEach((file) => {
      if (file.size <= maxSize) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          if (selectedImages.includes(e.target?.result as string)) {
            setError('Image wiht that name has been uploaded')
            return
          }
          newImages.push(e.target?.result as string)

          if (newImages.length + selectedImages.length > filesCount) {
            setError('Maximal count of images 5')
            return
          }

          setSelectedImages([...selectedImages, ...newImages])
        }
      } else {
        setError('Image size must not exceed 1 MB')
      }
    })
  }
  const handleClearInputValue = (event: React.MouseEvent<HTMLInputElement>) => {
    setError('')
    const target = event.target as HTMLInputElement
    target.value = ''
  }

  return (
    <Grid container rowSpacing={'20px'} paddingBottom={'20px'} alignItems='center'>
      <Grid item xs={12}>
        <Grid container alignItems={'center'} columnSpacing={3} wrap='nowrap'>
          <Grid item>
            <label htmlFor='image-input'>
              <Button
                variant='outlined'
                sx={{
                  backgroundColor: 'rgb(128,128,128, 0.4)',
                  borderColor: 'rgb(128,128,128 )',
                  color: 'rgba(255,255,255, 0.9)',
                  ':hover': {
                    backgroundColor: 'rgb(128,128,128, 0.6)',
                    borderColor: 'rgb(128,128,128)'
                  }
                }}
                component='span'
              >
                Choose images
              </Button>
            </label>
            <input
              style={{ display: 'none' }}
              type='file'
              accept={accept.join(',')}
              multiple
              onChange={handleImageChange}
              onClick={handleClearInputValue}
              id='image-input'
            />
          </Grid>
          {error && (
            <Grid item color={'#ff0000'}>
              {error}
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <ImageListMui
          images={selectedImages}
          setImages={setSelectedImages}
          imageHeight={'100px'}
          imageWidtht={'100%'}
          imageBorderRadius={'5px'}
          columns={5}
          showIconButtons
          emptyImagesList={''}
          changeErrorMessage={() => setError('')}
        />
      </Grid>
    </Grid>
  )
}

export default ImageUploader
