import { StyleSheet, Text } from 'react-native'
import React from 'react'
import themeStyles from '../styles/themeStyles'

const CustomText = ({ children, style, bold, center = false, numberOfLines }) => {
    return (
        <Text numberOfLines={numberOfLines} style={[styles.textStyle, center && { textAlign : 'center'}, bold && {fontFamily :themeStyles.FONT_SEMI_BOLD }, style]}>
            {children}
        </Text>
    )
}

export default CustomText

const styles = StyleSheet.create({
    textStyle: {
        color: themeStyles.BLACK, fontSize: 16, fontFamily : themeStyles.FONT_REGULAR
    }
})