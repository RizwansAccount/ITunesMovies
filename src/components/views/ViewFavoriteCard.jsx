import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../routes/RouteConstants';

const ViewFavoriteCard = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=> navigation.navigate(ROUTES.movie_detail, { detail : item })} >
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