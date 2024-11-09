import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../CustomText';
import CustomIcon, { ICON_TYPES } from '../CustomIcon';
import themeStyles from '../../styles/themeStyles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectedFavoriteSelector } from '../../redux/FavoriteReducer';
import { useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/FavoriteReducer';
import { ROUTES } from '../../routes/RouteConstants';

const ViewMovieCard = ({item, index}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const favorites = useSelector(selectedFavoriteSelector);

    const movieId = index + 1;
    const isAlreadyInFavorite = favorites?.find((item) => item?.id == movieId);

    const fnAddOrRemoveFromFavorites = (item, id) => {
        if (isAlreadyInFavorite) {
            dispatch(removeFromFavorites(id));
        } else {
            dispatch(addToFavorites({ ...item, id: id }));
        }
    };

    return (
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.movie_detail, { detail: item })} activeOpacity={0.7} style={styles.listItemBox} >
            <Image source={{ uri: item?.artworkUrl100 }} style={styles.movieImg} />
            <CustomText>
                {item?.artistName}
            </CustomText>
            <TouchableOpacity onPress={() => fnAddOrRemoveFromFavorites(item, movieId)} style={styles.heartBox}>
                <CustomIcon style={{ elevation: 5 }} color={isAlreadyInFavorite ? themeStyles.RED : themeStyles.WHITE} type={ICON_TYPES.AntDesign} name={'heart'} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default ViewMovieCard

const styles = StyleSheet.create({
    listItemBox: { flex: 1, alignItems: 'center', gap: 4, maxWidth: '48%' },
    movieImg: { height: 260, width: '100%', borderRadius: 8 },
    heartBox: {
        position: 'absolute',
        bottom: 32,
        right: 8,
        backgroundColor: themeStyles.DIM_COLOR,
        height: 28,
        width: 28,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    }
})