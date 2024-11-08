import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import themeStyles from '../styles/themeStyles';

const CustomInput = ({ placeholder = 'Search', style, onChangeText }) => {
    return (
        <TextInput
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={themeStyles.GREY}
            style={[styles.input, style]}
        />
    )
}

export default CustomInput

const styles = StyleSheet.create({
    input: {
        borderWidth: 0.7, borderColor: themeStyles.GREY, paddingLeft: 8, borderRadius: 4, color : themeStyles.BLACK
    }
})