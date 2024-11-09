import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const CustomAnimation = ({source, style}) => {
  return (
   <LottieView autoPlay source={source} loop style={[styles.lottie, style]} />
  )
}

export default CustomAnimation

const styles = StyleSheet.create({
    lottie : {
        height : 140,
        width: 140
    }
})