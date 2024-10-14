import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../src/constants'

const SettingItem = ({ item }) => {
    return (
        <View style={st.container}>
            <Image style={st.image} source={item.icon} resizeMode='contain' />
            <Text style={st.title}>{item.title}</Text>
            <Image style={[st.image, {width: 20, height: 20}]} source={require('../../assets/ic_arrow.png')} resizeMode='contain' />
        </View>
    )
}

export default SettingItem

const st = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    image: {
        height: 40,
        width: 40,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontFamily: FONTS.regular,
        fontWeight: '500',
        lineHeight: 24,
        color: COLORS.textColor,
        flex: 10,
        marginStart: 10,
        
    },
})