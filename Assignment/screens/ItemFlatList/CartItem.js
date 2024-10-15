import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, FONTS } from '../../src/constants';
import { splitName } from '../../utils/StringExtension';

const CartItem = ({ item, onDecresePress, onIncresePress }) => {
    const { title, description } = splitName(item.name);
    const beanType = item.name.includes('Beans')

    return (
        <LinearGradient
            colors={['#252A32', '#262B3300']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={st.container}
            onTouchEnd={() => onPress(item)}>

            <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                <Image style={st.image} source={{ uri: item.image }} resizeMode='cover' />
                <View style={{ marginLeft: 16 }}>
                    <Text style={st.title}>{title}</Text>
                    <Text style={st.des}>{description}</Text>
                    <View style={[st.cate, { width: 118, height: 40 }]}>
                        <Text style={[{ color: COLORS.textColor, fontSize: 10, color: '#AEAEAE' }]}>Medium Roasted</Text>
                    </View>
                </View>
            </View>


            {item.sizes.map(s => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={st.sizeBox}>
                        <Text style={[st.title, { fontSize: 12 }]}>{s.size}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: FONTS.regular, fontSize: 15, fontWeight: 600, lineHeight: 20, color: '#D17842' }}>$</Text>
                            <Text style={{ fontFamily: FONTS.regular, fontSize: 15, fontWeight: 600, lineHeight: 20, color: COLORS.textColor }}>{" "}{s.price}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={onDecresePress}>
                            <Image source={require('../../assets/ic_minus.png')} style={{ width: 28, height: 28 }} resizeMode='contain' />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: FONTS.regular, fontSize: 15, fontWeight: 600, lineHeight: 20, color: COLORS.textColor, width: 50, textAlign: 'center' }}>{" "}{s.quantity}</Text>
                        <TouchableOpacity onPress={onIncresePress}>
                            <Image source={require('../../assets/ic_plus.png')} style={{ width: 28, height: 28 }} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

        </LinearGradient>
    )
}

export default CartItem

const st = StyleSheet.create({
    container: {
        borderRadius: 23,
        padding: 16,
        marginBottom: 16
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    title: {
        color: COLORS.textColor,
        fontSize: 16
    },
    des: {
        color: '#AEAEAE',
        fontSize: 12
    },
    cate: {
        backgroundColor: '#141921',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },
    sizeBox: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        backgroundColor: COLORS.mainBackgroundColor,
        width: 72,
        height: 35,
        borderRadius: 10,
        marginBottom: 8
    }
})