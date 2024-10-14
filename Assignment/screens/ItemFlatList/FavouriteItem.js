import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../src/constants'
import LinearGradient from 'react-native-linear-gradient'

const FavouriteItem = ({ item }) => {
    return (
        <View style={st.container}>
            <View>
                <Image source={require('../../assets/img_coffee2.png')} style={st.image} resizeMode='contain' />
                <TouchableOpacity style={st.button}>
                    <Image source={require('../../assets/bt_favourite_selected.png')} style={st.favouriteImg} resizeMode='contain' />
                </TouchableOpacity>
                <View style={st.infoView}>
                    <View style={{ margin: 30 }}>
                        <Text style={[st.text, { fontSize: 20, fontFamily: FONTS.bold }]}>Cappuccino</Text>
                        <Text style={[st.text, { fontSize: 12, color: '#AEAEAE' }]}>With Steamed Milk</Text>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' , justifyContent: 'space-evenly'}}>
                            <View style={[st.cate, { width: 45, height: 45 }]}>
                                <Image source={require('../../assets/ic_coffeeCate.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                <Text style={[st.text, { fontSize: 10, color: '#AEAEAE' }]}>Coffee</Text>
                            </View>
                            <View style={[st.cate, { width: 45, height: 45 }]}>
                                <Image source={require('../../assets/ic_milkCate.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                <Text style={[st.text, { fontSize: 10, color: '#AEAEAE' }]}>Milk</Text>
                            </View>
                        </View>

                        <View style={[st.cate, { width: 100, height: 45 }]}>
                            <Text style={[st.text, { fontSize: 10, color: '#AEAEAE' }]}>Medium Roasted</Text>
                        </View>
                    </View>
                </View>
            </View>

            <LinearGradient
                colors={['#1D2128', '#262B3300']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={st.botView}
                >

                <View>
                    <Text style={[st.text, { fontSize: 14, fontFamily: FONTS.medium, color: '#AEAEAE'}]}>Description</Text>
                    <Text numberOfLines={3} style={[st.text, { fontSize: 12, fontFamily: FONTS.regular, color: COLORS.textColor}]}>Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top.</Text>
                </View>
            </LinearGradient>

        </View>
    )
}

export default FavouriteItem

const st = StyleSheet.create({
    text: {
        color: COLORS.textColor,
    },
    container: {
        borderRadius: 25,
        marginBottom: 25
    },
    image: {
        height: 457
    },
    button: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
    favouriteImg: {
        width: 30,
        height: 30
    },
    infoView: {
        backgroundColor: '#00000080',
        height: 133,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        flexDirection: 'row',
    },
    cate: {
        backgroundColor: '#141921',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    botView: {
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        padding: 30
    }
})