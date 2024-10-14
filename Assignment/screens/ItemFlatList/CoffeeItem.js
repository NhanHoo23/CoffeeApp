import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../src/constants'
import LinearGradient from 'react-native-linear-gradient'

const splitName = (name) => {
    if (name.includes("Beans")) {
        const words = name.split(" ");

        const title = words.slice(0, 2).join(" ");
        const description = words.slice(2).join(" ");

        return {
            title,
            description
        };
    } else {
        const [title, ...description] = name.split(" ");

        return {
            title,
            description: description.join(" ")
        };
    }
};

const CoffeeItem = ({ item, onPress }) => {

    const { title, description } = splitName(item.name);

    return (
        <LinearGradient
            colors={['#252A32', '#262B3300']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={st.container}
            onTouchEnd={() => onPress(item)}>

            <Image style={st.image} source={{ uri: item.image }} resizeMode='cover' />
            <Text style={st.title}>{title}</Text>
            <Text style={st.des}>{description}</Text>
            <View style={st.priceView}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: FONTS.regular, fontSize: 15, fontWeight: 600, lineHeight: 20, color: '#D17842' }}>$</Text>
                    <Text style={{ fontFamily: FONTS.regular, fontSize: 15, fontWeight: 600, lineHeight: 20, color: COLORS.textColor }}>{" "}{item.price}</Text>
                </View>

                <TouchableOpacity>
                    <Image source={require('../../assets/ic_add.png')} style={{ width: 28, height: 28 }} resizeMode='contain' />
                </TouchableOpacity>

            </View>
        </LinearGradient>
    )
}

export default CoffeeItem

const st = StyleSheet.create({
    container: {
        borderRadius: 23,
        padding: 12,
        marginEnd: 20
    },

    image: {
        height: 126,
        width: 126,
        borderRadius: 16
    },

    title: {
        fontSize: 13,
        fontFamily: FONTS.regular,
        lineHeight: 20,
        color: COLORS.textColor,
        marginTop: 12
    },

    des: {
        fontSize: 9,
        fontFamily: FONTS.regular,
        lineHeight: 20,
        color: COLORS.textColor,
    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8
    },
})