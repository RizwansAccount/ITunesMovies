import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomScreen from '../components/CustomScreen';
import CustomText from '../components/CustomText';
import useApiManager from '../customHooks/useApiManager';
import globalStyles from '../styles/globalStyles';
import CustomInput from '../components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../routes/RouteConstants';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites, selectedFavoriteSelector } from '../redux/FavoriteReducer';
import CustomIcon, { ICON_TYPES } from '../components/CustomIcon';
import themeStyles from '../styles/themeStyles';
import ViewFavoriteCard from '../components/views/ViewFavoriteCard';

const HomeScreen = () => {

    const dispath = useDispatch();
    const navigation = useNavigation();
    const { isLoading, fnGetApi } = useApiManager();
    const favorites = useSelector(selectedFavoriteSelector);

    const isFavoritesExist = favorites?.length > 0;

    const [searchInput, setSearchInput] = useState("");
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => { fnGetAllMovies() }, []);

    const fnGetAllMovies = async () => {
        const data = await fnGetApi();
        setAllMovies(data?.results);
    };

    const fnOnSearch = (text) => {
        setSearchInput(text);
        if (text?.trim()?.length > 0) {
            const filteredMovies = allMovies?.filter((x) => {
                const input = text?.toLowerCase();
                const movieTitle = x?.artistName?.toLowerCase();
                return movieTitle?.includes(input);
            });
            setFilteredMovies(filteredMovies);
        } else {
            setFilteredMovies([]);
        }
    };

    const fnAddOrRemoveFromFavorites = (item, id, isAlreadyInFavorite) => {
        if (isAlreadyInFavorite) {
            dispath(removeFromFavorites(id));
        } else {
            dispath(addToFavorites({ ...item, id: id }));
        }
    };

    const ViewMovieItem = ({ item, index }) => {
        const movieId = index + 1;
        const isAlreadyInFavorite = favorites?.find((item) => item?.id == movieId);
        return (
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.movie_detail, { detail: item })} activeOpacity={0.7} style={styles.listItemBox} >
                <Image source={{ uri: item?.artworkUrl100 }} style={styles.movieImg} />
                <CustomText>
                    {item?.artistName}
                </CustomText>
                <TouchableOpacity onPress={() => fnAddOrRemoveFromFavorites(item, movieId, isAlreadyInFavorite)} style={styles.heartBox}>
                    <CustomIcon style={{ elevation: 5 }} color={isAlreadyInFavorite ? themeStyles.RED : themeStyles.WHITE} type={ICON_TYPES.AntDesign} name={'heart'} />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    };

    return (
        <CustomScreen>

            {isFavoritesExist && <FlatList
                data={favorites}
                horizontal={true}
                renderItem={ViewFavoriteCard}
                style={{ height: '12%' }}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', gap: 12}}
                showsHorizontalScrollIndicator={false}
            />}

            {/* <CustomText style={globalStyles.screen_title}> All Movies </CustomText> */}

            <CustomInput placeholder='Search Movies' style={{ marginBottom: 8 }} onChangeText={(text) => fnOnSearch(text)} />

            <FlatList
                data={searchInput?.trim()?.length > 0 ? filteredMovies : allMovies}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.listColumn}
                renderItem={ViewMovieItem}
            />

        </CustomScreen>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    listColumn: { justifyContent: 'flex-start', gap: 16, marginTop: 16 },
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