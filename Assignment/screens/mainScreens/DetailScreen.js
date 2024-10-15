import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import { COLORS, FONTS } from '../../src/constants';
import { CoffeeType } from './HomeScreen';
import CustomButton from '../../components/CustomButton';
import { set } from 'mongoose';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { splitName } from '../../utils/StringExtension';
import DataManager from '../../utils/DataManager';
import { addCartItem, addFavouriteItem, link_api, updateCartItems, updateFavouriteItems } from '../../api/productApi';

const { height: screenHeight } = Dimensions.get('window');

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
    const [price, setPrice] = useState(item.price.S);

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
        if (size === 'S' || size === '250gm') {
            setPrice(item.price.S);
        } else if (size === 'M' || size === '500gm') {
            setPrice(item.price.M);
        } else {
            setPrice(item.price.L);
        }
    }

    const toggleFavourite = async () => {
        try {
            const userID = DataManager.shared.getCurrentUser().id;
            const favourites = DataManager.shared.getFavoriteItems(); //[{"id": <userID>, "items": [[Object]]}]

            if (favourites.length === 0)  {
                //add
                favourites.push({id: userID, items: [item]});
                console.log('items', favourites[0].items);
                
                await addFavouriteItem(userID, favourites[0].items)
                setIsFavourite(true);
            } else {
                if (isFavourite) {
                    //remove
                    favourites[0].items = favourites[0].items.filter(fav => fav.id !== item.id);
                    await updateFavouriteItems(userID, favourites[0].items);
                } else {
                    //update
                    favourites[0].items.push(item);
                    await updateFavouriteItems(userID, favourites[0].items);
                }

                setIsFavourite(!isFavourite);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const checkFavouriteStatus = async () => {
        const favourites = DataManager.shared.getFavoriteItems(); //[{"id": <userID>, "items": [[Object]]}]
        const isFav = favourites[0].items.find(fav => fav.id === item.id);
        setIsFavourite(isFav);
    };

    const addToCart = async (selectedSize) => {
        try {

            const userID = DataManager.shared.getCurrentUser().id;
            const carts = DataManager.shared.getCartItems(); //[{"id": <userID>, "items": [[Object]]}]
            
            if (carts.length === 0) {
                carts.push({id: userID, items: [{...item, size: selectedSize, quantity: 1}]});
                console.log('items', carts[0].items);
                await addCartItem(userID, carts[0].items)
            } else {
                // update
                const existingCartItemIndex = carts[0].items.findIndex(cartItem => cartItem.id === item.id && cartItem.size === selectedSize);
                if (existingCartItemIndex === -1) {
                    carts[0].items.push({...item, size: selectedSize, quantity: 1});
                } else {
                    carts[0].items[existingCartItemIndex].quantity += 1;
                }
                await updateCartItems(userID, carts[0].items)
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
                            <Text style={[st.text, { fontSize: 20, fontFamily: FONTS.bold, color: COLORS.textColor }]}>{price}</Text>
                        </View>
                    </View>

                    <CustomButton title='Add to Cart' bgColor={{ backgroundColor: '#D17842' }} textColor={{ color: COLORS.textColor }} customStyle={st.button} onPress={() => addToCart(selectedSize)} />
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