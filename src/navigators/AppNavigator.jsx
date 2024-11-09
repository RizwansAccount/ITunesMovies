import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ROUTES } from '../routes/RouteConstants'
import HomeScreen from '../screens/HomeScreen'
import FavoriteScreen from '../screens/FavoriteScreen'
import MovieDetailScreen from '../screens/MovieDetailScreen'
import SplashScreen from '../screens/SplashScreen'

const AppNavigator = () => {
    const Stack = createStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name={ROUTES.splash} component={SplashScreen} />
            <Stack.Screen name={ROUTES.home} component={HomeScreen} />
            <Stack.Screen name={ROUTES.favorites} component={FavoriteScreen} />
            <Stack.Screen name={ROUTES.movie_detail} component={MovieDetailScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})