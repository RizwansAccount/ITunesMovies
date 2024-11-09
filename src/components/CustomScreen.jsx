import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import themeStyles from '../styles/themeStyles'
import CustomIcon from './CustomIcon'
import { useNavigation } from '@react-navigation/native'

const CustomScreen = ({ children, style, addScroll = false, backIcon, onPressBackIcon = false }) => {
    const navigation = useNavigation();
    return (
        addScroll ? <ScrollView keyboardShouldPersistTaps='always' >
            <View style={[styles.container, style]}>
                {
                    backIcon && <TouchableOpacity onPress={() => { onPressBackIcon ? onPressBackIcon() : navigation.goBack() }} style={styles.backBtnBox}>
                        <CustomIcon size={22} name={'arrow-back'} />
                    </TouchableOpacity>
                }
                {children}
            </View>
        </ScrollView>
            : <View style={[styles.container, style]}>
                {
                    backIcon && <TouchableOpacity onPress={() => { onPressBackIcon ? onPressBackIcon() : navigation.goBack() }} style={styles.backBtnBox}>
                        <CustomIcon size={22} name={'arrow-back'} />
                    </TouchableOpacity>
                }
                {children}
            </View>
    )
}

export default CustomScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, paddingHorizontal: '4.5%', paddingVertical: '2.5%', backgroundColor: themeStyles.WHITE,
        width : '100%', height:'100%'
    },
    backBtnBox: {
        marginVertical: 12
    },
})