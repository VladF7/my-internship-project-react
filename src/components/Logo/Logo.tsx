import React from 'react'

interface IProps {
  src: string
  color: string
  width: string
  height: string
  alt: string
  dropShadow?: boolean
}
interface IPalette {
  [key: string]: string
}

const palette: IPalette = {
  lightsalmon:
    'invert(90%) sepia(13%) saturate(7079%) hue-rotate(307deg) brightness(102%) contrast(102%)',
  white: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(333deg) brightness(103%) contrast(102%)'
}

const Logo: React.FC<IProps> = ({ src, color, width, height, alt, dropShadow }) => {
  return (
    <img
      src={src}
      style={{
        filter: `${palette[color]} ${dropShadow ? 'drop-shadow(2px 4px 6px black)' : ''}`,
        width: width,
        height: height
      }}
      alt={alt}
    />
  )
}

export { Logo }
