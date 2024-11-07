import { StyleSheet, Text, View } from 'react-native'
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
        setAllMovies(data);
    };

    return (
        <CustomScreen>
            <CustomText>
                HomeScreen
            </CustomText>
        </CustomScreen>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})