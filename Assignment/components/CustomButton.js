import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FONTS } from '../src/constants'

const CustomButton = ({ title, bgColor, textColor, isShowIcon = false, customStyle, onPress }) => {
    let icon
    if (isShowIcon) {
        icon = (
            <Image
                source={require('../assets/ic_google.png')}
                style={st.icon}
                resizeMode='contain'
            />
        )
    }

    return (
        <TouchableOpacity style={customStyle} onPress={onPress}>
            <View style={[st.container, bgColor]}>
                {icon}
                <Text style={[st.title, textColor]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton

const st = StyleSheet.create({
    container: {
        borderRadius: 20,
        height: 57,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    icon: {
        position: 'absolute',
        width: 15,
        height: 15,
        left: 40,
    },
})