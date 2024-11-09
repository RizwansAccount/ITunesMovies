import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import CustomScreen from '../components/CustomScreen';
import CustomText from '../components/CustomText';
import useFavoriteManager from '../customHooks/useFavoriteManager';
import CustomIcon, { ICON_TYPES } from '../components/CustomIcon';
import themeStyles from '../styles/themeStyles';

const MovieDetailScreen = () => {

  const { fnAddOrRemoveFromFavorites, fnIsAlreadyInFavorite } = useFavoriteManager();
  const route = useRoute();

  const { detail, index } = route.params;
  const movieId = index + 1;

  const isAlreadyInFavorite = fnIsAlreadyInFavorite(movieId);

  return (
    <CustomScreen backIcon={true}>
      <View style={styles.movieContainer}>

        <View style={styles.imgBox}>
          <Image source={{ uri: detail?.artworkUrl100 }} style={styles.img} />
          <TouchableOpacity onPress={() => fnAddOrRemoveFromFavorites(detail, movieId)} style={styles.heartBox}>
            <CustomIcon style={{ elevation: 5 }} color={isAlreadyInFavorite ? themeStyles.RED : themeStyles.WHITE} type={ICON_TYPES.AntDesign} name={'heart'} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentBox}>

          <CustomText style={styles.movieName} bold>{detail?.trackCensoredName}</CustomText>

          <CustomText bold>{`Price : ${detail?.trackPrice}`}</CustomText>

          <CustomText bold>{`Artist Name : ${detail?.artistName}`}</CustomText>

          <CustomText>{detail?.longDescription}</CustomText>

        </View>

      </View>
    </CustomScreen>
  )
}

export default MovieDetailScreen

const styles = StyleSheet.create({
  movieContainer: { height: '100%', width: '100%', gap: 22 },
  imgBox : { height: '25%',  },
  img: { height : '100%', width: '100%', borderRadius: 12 },
  contentBox: { gap: 1 },
  movieName: { fontSize: 22 },
  heartBox: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: themeStyles.DIM_COLOR,
    height: 28,
    width: 28,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  }
})