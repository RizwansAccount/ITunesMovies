import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ViewFavoriteCard = ({item, index}) => {
  return (
    <TouchableOpacity>
        <Image style={styles.img} source={{uri : item?.artworkUrl100}} />
    </TouchableOpacity>
  )
}

export default ViewFavoriteCard

const styles = StyleSheet.create({
    img : {
        height:60,
        width: 60,
        borderRadius: 30
    }
})