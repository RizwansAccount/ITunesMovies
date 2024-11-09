import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import CustomScreen from '../components/CustomScreen';
import CustomText from '../components/CustomText';
import useFavoriteManager from '../customHooks/useFavoriteManager';
import CustomIcon, { ICON_TYPES } from '../components/CustomIcon';
import themeStyles from '../styles/themeStyles';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';

const MovieDetailScreen = () => {

  const { fnAddOrRemoveFromFavorites, fnIsAlreadyInFavorite } = useFavoriteManager();
  const route = useRoute();

  const { detail, index } = route.params;
  const movieId = index + 1;

  const isAlreadyInFavorite = fnIsAlreadyInFavorite(movieId);

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isModalVisible) { Orientation.lockToLandscape(); }
    else { Orientation.lockToPortrait(); }
    return () => { Orientation.lockToPortrait(); }
  }, [isModalVisible]);

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

          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.watchMovieBox}>
            <CustomText style={styles.watchMovieTxt}>{'Watch Movie'}</CustomText>
          </TouchableOpacity>

          <CustomText style={styles.movieName} bold>{detail?.trackCensoredName}</CustomText>

          <CustomText bold>{`Price : ${detail?.trackPrice}`}</CustomText>

          <CustomText bold>{`Artist Name : ${detail?.artistName}`}</CustomText>

          <CustomText>{detail?.longDescription}</CustomText>

        </View>

      </View>

      <Modal statusBarTranslucent={true}  visible={isModalVisible} onDismiss={()=> setModalVisible(false)} >
        <View style={{height:'100%', width:'100%'}}>
        <TouchableOpacity style={styles.crossIcon} onPress={() => setModalVisible(false)}>
          <CustomIcon name={'cross'} type={ICON_TYPES.Entypo} size={32} color={themeStyles.WHITE} />
        </TouchableOpacity>
        <Video
          source={{ uri: detail?.previewUrl }}
          style={styles.video}
          controls
          resizeMode="cover"
          controlsStyles={{ hideFullscreen : true }}
        />
        </View>
      </Modal>

    </CustomScreen>
  )
}

export default MovieDetailScreen

const styles = StyleSheet.create({
  movieContainer: { height: '100%', width: '100%', gap: 22 },
  imgBox: { height: '25%', },
  img: { height: '100%', width: '100%', borderRadius: 12 },
  contentBox: { gap: 1 },
  movieName: { fontSize: 22 },
  heartBox: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: themeStyles.DIM_COLOR,
    height: 28,
    width: 28,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    height: '100%', width: '100%', position: 'absolute', top :0, left :0, bottom: 0, right : 0, zIndex : 1
  },
  watchMovieTxt: {
    color: themeStyles.WHITE
  },
  watchMovieBox: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 3,
    alignSelf: 'flex-end',
    backgroundColor: themeStyles.BLACK,
    marginBottom: 12
  },
  crossIcon : {
    position:'absolute',
    top : 32,
    right : 12,
    backgroundColor: themeStyles.BLACK,
    zIndex:2
  }
})