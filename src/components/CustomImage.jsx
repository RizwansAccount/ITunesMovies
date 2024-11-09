import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'

const CustomImage = ({ source, style }) => {
  const [isFailToLoad, setIsFailToLoad] = useState(false);
  return (
    <FastImage
      source={isFailToLoad ? require('../../assets/images/empty_img.png') : source}
      style={[style, isFailToLoad && { height: 100, width: 100 }]}
      onError={() => setIsFailToLoad(true)}
    />
  )
}

export default CustomImage;