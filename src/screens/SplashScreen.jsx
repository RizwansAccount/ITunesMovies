import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import CustomScreen from '../components/CustomScreen'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../routes/RouteConstants'
import CustomImage from '../components/CustomImage'

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(()=>{
    setTimeout(() => {
      navigation.replace(ROUTES.home);
    }, 2000);
  },[]);

  return (
    <CustomScreen style={styles.container}>
        <CustomImage style={styles.logo} source={require('../../assets/images/logo.png')} />
    </CustomScreen>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logo : {
      height: 100,
      width: 100
    }
})