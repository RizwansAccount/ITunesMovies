import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomScreen from '../components/CustomScreen';
import useApiManager from '../customHooks/useApiManager';
import CustomInput from '../components/CustomInput';
import { useSelector } from 'react-redux';
import { selectedFavoriteSelector } from '../redux/FavoriteReducer';
import ViewFavoriteCard from '../components/views/ViewFavoriteCard';
import ViewMovieCard from '../components/views/ViewMovieCard';
import CustomText from '../components/CustomText';
import CustomIcon, { ICON_TYPES } from '../components/CustomIcon';

const HomeScreen = () => {

    const { isLoading, fnGetApi } = useApiManager();
    const favorites = useSelector(selectedFavoriteSelector);

    const isFavoritesExist = favorites?.length > 0;

    const [searchInput, setSearchInput] = useState("");
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const isSearchTxtExist = searchInput?.trim()?.length > 0;
    const isMoviesExist = isSearchTxtExist ? filteredMovies?.length > 0 : allMovies?.length > 0;

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

            {isFavoritesExist && <View style={{ paddingVertical: 10 }}>
                <FlatList
                    data={favorites}
                    horizontal={true}
                    renderItem={ViewFavoriteCard}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', gap: 12 }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>}

            <View>
                <CustomInput placeholder='Search Movies' value={searchInput} style={{ marginBottom: 8 }} onChangeText={(text) => fnOnSearch(text)} />
                {isSearchTxtExist > 0 &&
                    <TouchableOpacity style={styles.crossIcon} onPress={() => setSearchInput("")}>
                        <CustomIcon
                            name={'cross'}
                            type={ICON_TYPES.Entypo}
                            size={22}
                        />
                    </TouchableOpacity>
                }
            </View>
            {
                isMoviesExist ? <FlatList
                    data={isSearchTxtExist > 0 ? filteredMovies : allMovies}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.listColumn}
                    renderItem={({ item, index }) => <ViewMovieCard item={item} index={index} />}
                /> :
                    <View style={styles.loaderBox} >
                        <CustomText>{'No Movies'}</CustomText>
                    </View>
            }

        </CustomScreen>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    listColumn: { justifyContent: 'flex-start', gap: 16, marginTop: 16 },
    loaderBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    crossIcon: { position: 'absolute', right: 8, bottom: 22 }
})