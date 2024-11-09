import { Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import CustomScreen from '../components/CustomScreen'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../routes/RouteConstants'

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(()=>{
    setTimeout(() => {
      navigation.replace(ROUTES.home);
    }, 2000);
  },[]);

  return (
    <CustomScreen style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
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