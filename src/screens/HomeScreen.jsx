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
import themeStyles from '../styles/themeStyles';
import useLocalStorage from '../customHooks/useLocalStorage';
import { KEYS, VIEWS_TYPES } from '../constants/Index';
import CustomAnimation from '../components/CustomAnimation';

const HomeScreen = () => {

    const { isLoading, fnGetApi } = useApiManager();
    const { fnSetStorage, fnGetStorage } = useLocalStorage();
    const favorites = useSelector(selectedFavoriteSelector);

    const isFavoritesExist = favorites?.length > 0;

    const [searchInput, setSearchInput] = useState("");
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [selectedViewStyle, setSelectedViewStyle] = useState("");

    const isSearchTxtExist = searchInput?.trim()?.length > 0;
    const isMoviesExist = isSearchTxtExist ? filteredMovies?.length > 0 : allMovies?.length > 0;
    const isGridView = selectedViewStyle === VIEWS_TYPES.grid;
    const isListView = selectedViewStyle === VIEWS_TYPES.list;

    useEffect(() => { fnGetAllMovies(); fnGetViewStyle() }, []);

    const fnGetAllMovies = async () => {
        const data = await fnGetApi();
        setAllMovies(data?.results);
    };

    const fnOnSearch = (text) => {
        setSearchInput(text);
        if (text?.trim()?.length > 0) {
            const filteredMovies = allMovies?.filter((x) => {
                const input = text?.toLowerCase();
                const movieTitle = x?.trackCensoredName?.toLowerCase();
                const artistName = x?.artistName?.toLowerCase();
                return movieTitle?.includes(input) || artistName?.includes(input);
            });
            setFilteredMovies(filteredMovies);
        } else {
            setFilteredMovies([]);
        }
    };

    const fnOnClickViews = async (data) => {
        await fnSetStorage(KEYS.view, data);
        setSelectedViewStyle(data);
    };

    const fnGetViewStyle = async () => {
        const data = await fnGetStorage(KEYS.view);
        if (data) {
            setSelectedViewStyle(data);
        } else {
            fnSetStorage(KEYS.view, VIEWS_TYPES.grid);
            setSelectedViewStyle(VIEWS_TYPES.grid);
        }
    };
    return (
        <CustomScreen>

            {isFavoritesExist && <View style={{ paddingVertical: 10 }}>
                <FlatList
                    data={favorites}
                    horizontal={true}
                    renderItem={({item})=> <ViewFavoriteCard item={item} /> }
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', gap: 12 }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>}

            <View>
                <CustomInput placeholder='Search Movies' value={searchInput} style={{ marginBottom: 8 }} onChangeText={(text) => fnOnSearch(text)} />

                <View style={styles.gridBox}>
                    <TouchableOpacity style={[styles.gridIcon, isGridView && { backgroundColor: themeStyles.BLUE }]} onPress={() => fnOnClickViews(VIEWS_TYPES.grid)}>
                        <CustomIcon size={24} name={'grid'} color={isGridView ? themeStyles.WHITE : themeStyles.BLACK} type={ICON_TYPES.Entypo} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.gridIcon, isListView && { backgroundColor: themeStyles.BLUE }]} onPress={() => fnOnClickViews(VIEWS_TYPES.list)}>
                        <CustomIcon size={20} name={'list'} color={isListView ? themeStyles.WHITE : themeStyles.BLACK} type={ICON_TYPES.FontAwesome} />
                    </TouchableOpacity>
                </View>

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
                isLoading ? <View style={styles.loaderBox}>
                    <CustomAnimation source={require('../../assets/animations/loader.json')} />
                </View> :
                    <> 
                        {
                            isMoviesExist ?
                                <>
                                    {
                                        selectedViewStyle === VIEWS_TYPES.grid ?
                                            <FlatList
                                                key={'grid'}
                                                data={isSearchTxtExist > 0 ? filteredMovies : allMovies}
                                                keyExtractor={(item, index) => index.toString()}
                                                numColumns={2}
                                                showsVerticalScrollIndicator={false}
                                                style={{ marginTop: 16 }}
                                                columnWrapperStyle={styles.listColumn}
                                                keyboardShouldPersistTaps='always'
                                                renderItem={({ item, index }) => <ViewMovieCard item={item} index={index} view={VIEWS_TYPES.grid} />}
                                            />
                                            : <FlatList
                                                key={'list'}
                                                data={isSearchTxtExist > 0 ? filteredMovies : allMovies}
                                                style={{ marginTop: 16 }}
                                                contentContainerStyle={{ gap: 8, paddingBottom: 16, }}
                                                keyboardShouldPersistTaps='always'
                                                renderItem={({ item, index }) => <ViewMovieCard item={item} index={index} view={VIEWS_TYPES.list} />}
                                            />
                                    }
                                </>
                                : <View style={styles.loaderBox} >
                                    <CustomAnimation style={{height : 200, width: 200}} source={require('../../assets/animations/empty_loader.json')} />
                                </View>
                        }
                    </>
            }

        </CustomScreen>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    listColumn: { justifyContent: 'flex-start', gap: 8, paddingBottom: 16 },
    loaderBox: { flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 82 },
    crossIcon: { position: 'absolute', right: 8, bottom: 62 },
    gridBox: {
        backgroundColor: themeStyles.WHITE,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 4,
        width: '20%',
        height: 40,
        elevation: 4
    },
    gridIcon: { flex: 1, alignItems: 'center', height: '100%', justifyContent: 'center', borderRadius: 4 }
})