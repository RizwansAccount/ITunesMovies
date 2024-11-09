import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from '../CustomText';
import CustomIcon, { ICON_TYPES } from '../CustomIcon';
import themeStyles from '../../styles/themeStyles';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../routes/RouteConstants';
import useFavoriteManager from '../../customHooks/useFavoriteManager';
import { VIEWS_TYPES } from '../../constants/Index';

const ViewMovieCard = ({ item, index, view }) => {

    const navigation = useNavigation();

    const { fnIsAlreadyInFavorite, fnAddOrRemoveFromFavorites } = useFavoriteManager();

    const movieId = item?.trackId;
    const isAlreadyInFavorite = fnIsAlreadyInFavorite(movieId);

    const isListView = view === VIEWS_TYPES.list;

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.movie_detail, { detail: item })}
            activeOpacity={0.7}
            style={[styles.listItemBox, isListView && { maxWidth: '100%', flexDirection: 'row', gap: 8, paddingBottom: 0 }]}
        >
            <Image
                source={{ uri: item?.artworkUrl100 }}
                style={[styles.movieImg, isListView && { width: 100, height: 100, borderRadius: 0, borderBottomLeftRadius: 8, borderTopLeftRadius: 8 }]}
            />

            <View style={[styles.contentBox, isListView && { alignItems: 'flex-start'}]}>
                <CustomText numberOfLines={1} bold style={[styles.listTxt,{marginTop : 12}, isListView && { width: '65%', textAlign:'start' }]} center>
                    {item?.trackCensoredName}
                </CustomText>
                <CustomText style={styles.listTxt} center>
                    {`Artist : ${item?.artistName}`}
                </CustomText>
                <CustomText style={styles.listTxt}>
                    {`Price : ${item?.collectionPrice}`}
                </CustomText>
            </View>

            <TouchableOpacity onPress={() => fnAddOrRemoveFromFavorites(item, movieId)} style={[styles.heartBox, isListView && { top: 10 }]}>
                <CustomIcon style={{ elevation: 5 }} color={isAlreadyInFavorite ? themeStyles.RED : themeStyles.WHITE} type={ICON_TYPES.AntDesign} name={'heart'} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default ViewMovieCard

const styles = StyleSheet.create({
    listItemBox: {
        flex: 1, alignItems: 'center', maxWidth: '49%', backgroundColor: themeStyles.WHITE, paddingBottom: 12, borderRadius: 8,
        elevation: 5, marginHorizontal: 4, overflow:'hidden' 
    },
    movieImg: { height: 220, width: '100%', borderRadius: 8 },
    heartBox: {
        position: 'absolute',
        bottom: 78,
        right: 6,
        backgroundColor: themeStyles.DIM_COLOR,
        height: 28,
        width: 28,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listTxt: {
        fontSize: 12,
    },
    contentBox: {
        alignItems: 'center',
        width:'100%',
    }
})