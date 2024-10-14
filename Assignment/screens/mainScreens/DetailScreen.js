import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import { COLORS, FONTS } from '../../src/constants';
import { CoffeeType } from './HomeScreen';

const { height: screenHeight } = Dimensions.get('window');

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

const DetailScreen = ({ route, navigation }) => {
    const rightIcon = route.params.isFavorite ? require('../../assets/bt_favourite_selected.png') : require('../../assets/bt_favourite.png');
    const type = route.params.type;
    const item = route.params.item;
    const beanSizes = ['250gm', '500gm', '1000gm'];
    const coffeeSizes = ['S', 'M', 'L'];
    const [selectedSize, setSelectedSize] = useState(null)

    const img1 = type === CoffeeType.Coffee ? require('../../assets/ic_coffeeCate.png') : require('../../assets/ic_coffeeBeansCate.png')
    const img2 = type === CoffeeType.Coffee ? require('../../assets/ic_milkCate.png') : require('../../assets/ic_location.png')
    const coffeType = type === CoffeeType.Coffee ? 'Coffee' : 'Bean';
    const sizes = type === CoffeeType.Coffee ? coffeeSizes : beanSizes;

    const { title, description } = splitName(item.name);

    useEffect(() => {
        setSelectedSize(sizes[0]);
        console.log('Selected Size:', selectedSize);

    }, [navigation])

    const backToHome = () => {
        navigation.goBack();
    }

    const handleSize = (size) => {
        setSelectedSize(size);
    }

    return (
        <View style={{ flexDirection: 'column' }}>
            <View>
                <Image source={{ uri: item.image }} style={{ height: screenHeight * 0.58, aspectRatio: 1 }} resizeMode='cover' />
                <View style={st.titleContainer}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={[st.text, { fontSize: 20, fontFamily: FONTS.bold }]}>{title}</Text>
                            <Text style={[st.text, { fontSize: 12, color: '#AEAEAE' }]}>{description}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../assets/ic_star.png')} style={{ width: 23, height: 23 }} resizeMode='contain' />
                            <Text style={[st.text, { fontSize: 16, fontFamily: FONTS.medium, marginLeft: 8 }]}>{item.rate}</Text>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[st.cate, { width: 55, height: 55 }]}>
                                <Image source={img1} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                <Text style={[st.text, { fontSize: 10, color: '#AEAEAE' }]}>{coffeType}</Text>
                            </View>
                            <View style={[st.cate, { width: 55, height: 55 }]}>
                                <Image source={img2} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                <Text style={[st.text, { fontSize: 10, color: '#AEAEAE' }]}>Milk</Text>
                            </View>
                        </View>

                        <View style={[st.cate, { width: 120, height: 45 }]}>
                            <Text style={[st.text, { fontSize: 10, color: '#AEAEAE' }]}>Medium Roasted</Text>
                        </View>
                    </View>

                </View>
            </View>
            <Header customStyle={st.header} leftIcon={require('../../assets/bt_back.png')} rightIcon={rightIcon} onLeftPress={backToHome} />

            <View style={st.botView}>
                <Text style={[st.text, { color: '#AEAEAE', fontSize: 14, fontFamily: FONTS.medium }]}>Description</Text>
                <Text style={[st.text, { fontSize: 12, fontFamily: FONTS.regular }]}>{item.description}</Text>

                <Text style={[st.text, { color: '#AEAEAE', fontSize: 14, fontFamily: FONTS.medium, marginTop: 16 }]}>Size</Text>

                <View style={st.sizeContainer}>
                    {sizes.map((size) =>
                        <TouchableOpacity onPress={() =>handleSize(size)}>
                            <View key={size} style={[st.size, { borderWidth: 2, borderColor: selectedSize === size ? '#D17842' : 'transparent' }]}>
                                <Text style={[st.text, { color: selectedSize === size ? '#D17842' : COLORS.textColor, fontSize: 12, fontFamily: FONTS.regular }]}>{size}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    )
}

export default DetailScreen

const st = StyleSheet.create({
    header: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 0,
        left: 0,
        right: 0
    },
    titleContainer: {
        width: '100%',
        backgroundColor: '#00000050',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        padding: 22,
        flexDirection: 'row',
    },
    text: {
        color: COLORS.textColor,
    },
    cate: {
        backgroundColor: '#141921',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    botView: {
        backgroundColor: COLORS.mainBackgroundColor,
        padding: 10,
        height: screenHeight * 0.42,
    },
    sizeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    size: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100, height: 40,
        backgroundColor: "#141921",
        borderRadius: 10
    }
})