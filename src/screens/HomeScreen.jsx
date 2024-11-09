import { FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomScreen from '../components/CustomScreen';
import useApiManager from '../customHooks/useApiManager';
import CustomInput from '../components/CustomInput';
import { useSelector } from 'react-redux';
import { selectedFavoriteSelector } from '../redux/FavoriteReducer';
import ViewFavoriteCard from '../components/views/ViewFavoriteCard';
import ViewMovieCard from '../components/views/ViewMovieCard';

const HomeScreen = () => {

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

            <CustomInput placeholder='Search Movies' style={{ marginBottom: 8 }} onChangeText={(text) => fnOnSearch(text)} />

            <FlatList
                data={searchInput?.trim()?.length > 0 ? filteredMovies : allMovies}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.listColumn}
                renderItem={({item, index})=> <ViewMovieCard item={item} index={index} /> }
            />

        </CustomScreen>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    listColumn: { justifyContent: 'flex-start', gap: 16, marginTop: 16 },
})