import { StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import CustomScreen from '../components/CustomScreen';
import CustomText from '../components/CustomText';

const MovieDetailScreen = () => {

  const route = useRoute();
  const { detail } = route.params;

  return (
    <CustomScreen backIcon={true}>
      <CustomText>{detail?.artistName}</CustomText>
    </CustomScreen>
  )
}

export default MovieDetailScreen

const styles = StyleSheet.create({

})