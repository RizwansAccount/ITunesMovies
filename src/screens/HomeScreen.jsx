import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomScreen from '../components/CustomScreen'
import CustomText from '../components/CustomText'
import useApiManager from '../customHooks/useApiManager'

const HomeScreen = () => {

    const { fnGetApi, isLoading } = useApiManager();
    
    const [allMovies, setAllMovies] = useState([]);

    useEffect(()=> { fnGetAllMovies() },[]);
    
    const fnGetAllMovies =async()=>{
        const data = await fnGetApi();
        setAllMovies(data?.results);
    };

    return (
        <CustomScreen>
            <CustomText>
                Movies
            </CustomText>
            <FlatList
                data={allMovies}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item })=>(
                        <CustomText>
                            {item?.shortDescription}
                        </CustomText>
                    )
                }
            />
        </CustomScreen>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})