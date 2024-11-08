import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomScreen from '../components/CustomScreen'
import CustomText from '../components/CustomText'
import useApiManager from '../customHooks/useApiManager'

const HomeScreen = () => {

    const { fnGetApi, isLoading } = useApiManager();

    const [allMovies, setAllMovies] = useState([]);

    useEffect(() => { fnGetAllMovies() }, []);

    const fnGetAllMovies = async () => {
        const data = await fnGetApi();
        setAllMovies(data?.results);
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
    }

    return (
        <CustomScreen>
            <CustomText>
                All Movies
            </CustomText>
            <FlatList
                data={allMovies}
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
    listColumn : {justifyContent:'space-around', gap:16, marginTop:16},
    listItemBox : {flex:1, alignItems:'center', gap:4},
    movieImg : {height:260, width: '100%', borderRadius:8}
})