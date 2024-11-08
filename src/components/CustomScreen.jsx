import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import themeStyles from '../styles/themeStyles'

const CustomScreen = ({ children, style, addScroll = false }) => {
    return (
        addScroll ? <ScrollView>
            <View style={[styles.container, style]}>
                {children}
            </View>
        </ScrollView>
            : <View style={[styles.container, style]}>
                {children}
            </View>
    )
}

export default CustomScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, paddingHorizontal: '4.5%', paddingVertical: '2.5%', backgroundColor: themeStyles.WHITE
    }
})