import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomScreen from '../components/CustomScreen';
import CustomText from '../components/CustomText';
import useApiManager from '../customHooks/useApiManager';
import globalStyles from '../styles/globalStyles';
import CustomInput from '../components/CustomInput';

const HomeScreen = () => {

    const { isLoading, fnGetApi } = useApiManager();

    const [searchInput, setSearchInput] = useState("");
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => { fnGetAllMovies() }, []);

    const fnGetAllMovies = async () => {
        const data = await fnGetApi();
        setAllMovies(data?.results);
    };

    const fnOnSearch =(text)=> {
        setSearchInput(text);
        if(text?.trim()?.length > 0) {
            const filteredMovies = allMovies?.filter((x)=> {
                const input = text?.toLowerCase();
                const movieTitle = x?.artistName?.toLowerCase();
                return movieTitle?.includes(input);
            });
            setFilteredMovies(filteredMovies);
        } else {
            setFilteredMovies([]);
        }
    };

    const ViewMovieItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.7} style={styles.listItemBox} >
                <Image source={{uri: item?.artworkUrl100}} style={styles.movieImg} />
                <CustomText>
                    {item?.artistName}
                </CustomText>
            </TouchableOpacity>
        )
    };

    return (
        <CustomScreen>

            <CustomText style={globalStyles.screen_title}> All Movies </CustomText>

            <CustomInput style={{marginBottom : 8}} onChangeText={(text)=> fnOnSearch(text)} />

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
    listColumn : { justifyContent:'flex-start', gap:16, marginTop:16 },
    listItemBox : { flex:1, alignItems:'center', gap:4, maxWidth: '48%' },
    movieImg : { height:260, width: '100%', borderRadius:8 }
})