import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import { COLORS, FONTS } from '../../src/constants';
import { CoffeeType } from './HomeScreen';
import CustomButton from '../../components/CustomButton';
import { set } from 'mongoose';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const type = route.params.type;
    const item = route.params.item;
    const beanSizes = ['250gm', '500gm', '1000gm'];
    const coffeeSizes = ['S', 'M', 'L'];
    const [selectedSize, setSelectedSize] = useState(null)

    const [img1, setImg1] = useState(type === CoffeeType.Coffee ? require('../../assets/ic_coffeeCate.png') : require('../../assets/ic_coffeeBeansCate.png'));
    const [img2, setImg2] = useState(type === CoffeeType.Coffee ? require('../../assets/ic_milkCate.png') : require('../../assets/ic_location.png'));
    const [coffeType, setCoffeType] = useState(type === CoffeeType.Coffee ? 'Coffee' : 'Bean');
    const [sizes, setSizes] = useState(type === CoffeeType.Coffee ? coffeeSizes : beanSizes);
    const [isFavourite, setIsFavourite] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const { title, description } = splitName(item.name);


    useEffect(() => {
        console.log('type', type);
        
        setImg1(type === CoffeeType.Coffee ? require('../../assets/ic_coffeeCate.png') : require('../../assets/ic_coffeeBeansCate.png'));
        setImg2(type === CoffeeType.Coffee ? require('../../assets/ic_milkCate.png') : require('../../assets/ic_location.png'));
        setCoffeType(type === CoffeeType.Coffee ? 'Coffee' : 'Bean');
        setSizes(type === CoffeeType.Coffee ? coffeeSizes : beanSizes);
        setSelectedSize(sizes[0]);

        checkFavouriteStatus();


    }, [])

    const backToHome = () => {
        navigation.goBack();
    }

    const handleSize = (size) => {
        setSelectedSize(size);
    }

    const toggleFavourite = async () => {
        try {
            const existingFavourites = await AsyncStorage.getItem('favourites');
            const favourites = existingFavourites ? JSON.parse(existingFavourites) : [];
            
            if (isFavourite) {
                const updatedFavourites = favourites.filter(fav => fav.id !== item.id);
                setIsFavourite(false);
                await AsyncStorage.setItem('favourites', JSON.stringify(updatedFavourites));                
            } else {
                favourites.push(item);
                setIsFavourite(true);
                await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
            }
        } catch (error) {
            console.error('Error saving favourite:', error);
        }        
    };

    const checkFavouriteStatus = async () => {
        try {
            const existingFavourites = await AsyncStorage.getItem('favourites');
            const favourites = existingFavourites ? JSON.parse(existingFavourites) : [];
            const isFav = favourites.some(fav => fav.id === item.id);
            setIsFavourite(isFav);
        } catch (error) {
            console.error('Error fetching favourites:', error);
        }
    };

    const addToCart = async () => {
        try {
            const existingCartItems = await AsyncStorage.getItem('cartItems');
            const cart = existingCartItems ? JSON.parse(existingCartItems) : [];

            const isItemInCart = cart.some(cartItem => cartItem.id === item.id);
            if (!isItemInCart) {
                cart.push(item);
                await AsyncStorage.setItem('cartItems', JSON.stringify(cart));
                alert('Product added to cart!');
            } else {
                alert('Product is already in the cart!');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <View>
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
            <Header customStyle={st.header} leftIcon={require('../../assets/bt_back.png')} rightIcon={isFavourite ? require('../../assets/bt_favourite_selected.png') : require('../../assets/bt_favourite.png')} onLeftPress={backToHome} onRightPress={() => toggleFavourite()} />

            <View style={st.botView}>
                <View style={{ flex: 1 }}>
                    <Text style={[st.text, { color: '#AEAEAE', fontSize: 14, fontFamily: FONTS.medium }]}>Description</Text>
                    <Text style={[st.text, { fontSize: 12, fontFamily: FONTS.regular }]}>{item.description}</Text>

                    <Text style={[st.text, { color: '#AEAEAE', fontSize: 14, fontFamily: FONTS.medium, marginTop: 16 }]}>Size</Text>

                    <View style={st.sizeContainer}>
                        {sizes.map((size) =>
                            <TouchableOpacity onPress={() => handleSize(size)}>
                                <View key={size} style={[st.size, { borderWidth: 2, borderColor: selectedSize === size ? '#D17842' : 'transparent' }]}>
                                    <Text style={[st.text, { color: selectedSize === size ? '#D17842' : COLORS.textColor, fontSize: 12, fontFamily: FONTS.regular }]}>{size}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 30 }}>
                    <View style={{ marginRight: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[st.text, { fontSize: 12, fontFamily: FONTS.regular, color: '#AEAEAE' }]}>Price</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[st.text, { fontSize: 20, fontFamily: FONTS.bold, color: '#D17842' }]}>$</Text>
                            <Text style={[st.text, { fontSize: 20, fontFamily: FONTS.bold, color: COLORS.textColor }]}>{item.price}</Text>
                        </View>
                    </View>

                    <CustomButton title='Add to Cart' bgColor={{ backgroundColor: '#D17842' }} textColor={{ color: COLORS.textColor }} customStyle={st.button} onPress={() => addToCart()} />
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
        padding: 16,
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
    },
    button: {
        flex: 1
    },
})