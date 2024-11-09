import React from 'react'
import FastImage from 'react-native-fast-image'

const CustomImage = ({source, style}) => {
  return (
    <FastImage source={source} style={style} />
  )
}

export default CustomImage;