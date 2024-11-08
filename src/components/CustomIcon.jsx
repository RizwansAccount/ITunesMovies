import { StyleSheet } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeStyles from '../styles/themeStyles';

export const ICON_TYPES = {
    FontAwesome:'FontAwesome',
    AntDesign:'AntDesign',
    Entypo:'Entypo',
    Ionicons:'Ionicons'
};

const CustomIcon = ({type =  ICON_TYPES.Ionicons, name, size = 16, color = themeStyles.BLACK, style}) => {
    
    switch (type) {
        case ICON_TYPES.AntDesign:
            return <AntDesign name={name} size={size} color={color} style={style} />;

        case ICON_TYPES.Entypo:
            return <Entypo name={name} size={size} color={color} style={style} />;

        case ICON_TYPES.FontAwesome:
            return <FontAwesome name={name} size={size} color={color} style={style} />;

        case ICON_TYPES.Ionicons:
            return <Ionicons name={name} size={size} color={color} style={style} />;
    
        default: 
            return <Ionicons name={name} size={size} color={color} style={style} />;
    }
}

export default CustomIcon;

const styles = StyleSheet.create({})