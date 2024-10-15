import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS } from '../../src/constants'
import LinearGradient from 'react-native-linear-gradient'
import { CoffeeType } from '../mainScreens/HomeScreen';
import { splitName } from '../../utils/StringExtension.js';


const FavouriteItem = ({ item, onPress }) => {
    const { title, description } = splitName(item.name);
    const [img1, setImg1] = useState(item.name.includes('Beans') ? require('../../assets/ic_coffeeBeansCate.png') : require('../../assets/ic_coffeeCate.png'));
    const [img2, setImg2] = useState(item.name.includes('Beans') ? require('../../assets/ic_location.png') : require('../../assets/ic_milkCate.png'));
    const [isFavourite, setIsFavourite] = useState(true);

    return (
        <View style={st.container}>
            <View>
                <Image source={{ uri: item.image }} style={st.image} resizeMode='cover' />
                <TouchableOpacity
                    style={st.button}
                    onPress={() => {
                        setIsFavourite(!isFavourite);
                        onPress(item, isFavourite);  
                    }}>
                    <Image source={require('../../assets/bt_favourite_selected.png')} style={st.favouriteImg} resizeMode='contain' />
                </TouchableOpacity>
                <View style={st.infoView}>
                    <View style={{ margin: 30 }}>
                        <Text style={[st.text, { fontSize: 20, fontFamily: FONTS.bold }]}>{title}</Text>
                        <Text style={[st.text, { fontSize: 12, color: '#AEAEAE' }]}>{description}</Text>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={[st.cate, { width: 45, height: 45 }]}>
                                <Image source={img1} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                <Text style={[st.text, { fontSize: 10, color: '#AEAEAE' }]}>{item.name.includes('Beans') ? "Bean" : "Coffee"}</Text>
                            </View>
                            <View style={[st.cate, { width: 45, height: 45 }]}>
                                <Image source={img2} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                <Text style={[st.text, { fontSize: 10, color: '#AEAEAE' }]}>{item.name.includes('Beans') ? "Africa" : "Bean"}</Text>
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
                    <Text style={[st.text, { fontSize: 14, fontFamily: FONTS.medium, color: '#AEAEAE' }]}>Description</Text>
                    <Text numberOfLines={3} style={[st.text, { fontSize: 12, fontFamily: FONTS.regular, color: COLORS.textColor }]}>{item.description}</Text>
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
        marginBottom: 25,
        overflow: 'hidden'
    },
    image: {
        height: 457,
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