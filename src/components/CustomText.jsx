import { StyleSheet, Text } from 'react-native'
import React from 'react'
import themeStyles from '../styles/themeStyles'

const CustomText = ({ children, style, bold }) => {
    return (
        <Text style={[styles.textStyle, {fontFamily : bold ? themeStyles.FONT_SEMI_BOLD : themeStyles.FONT_REGULAR}, style]}>
            {children}
        </Text>
    )
}

export default CustomText

const styles = StyleSheet.create({
    textStyle: {
        color: themeStyles.BLACK, fontSize: 16
    }
})