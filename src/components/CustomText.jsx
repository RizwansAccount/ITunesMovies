import { StyleSheet, Text } from 'react-native'
import React from 'react'
import themeStyles from '../styles/themeStyles'

const CustomText = ({ children, style }) => {
    return (
        <Text style={[styles.textStyle, style]}>
            {children}
        </Text>
    )
}

export default CustomText

const styles = StyleSheet.create({
    textStyle: {
        color: themeStyles.BLACK_COLOR
    }
})