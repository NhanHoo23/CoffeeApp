import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import DataManager from '../../utils/DataManager';
import Header from '../../components/Header';
import CartItem from '../ItemFlatList/CartItem';
import { COLORS } from '../../src/constants';

const CartScreen = ({ route }) => {
  const { onNavigateToSetting } = route.params;
  const [list, setList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getCartList();
      console.log('CartList:', list);
    }, [])
  );

  function mergeCartItems(cartItems) {
    const mergedItems = {};

    cartItems.forEach(item => {
      if (!mergedItems[item.id]) {
        mergedItems[item.id] = {
          id: item.id,
          name: item.name,
          image: item.image,
          sizes: []
        };
      }

      mergedItems[item.id].sizes.push({
        size: item.size,
        quantity: item.quantity,
        price: item.size === '250gm' ? item.price["S"] : (item.size === '500gm' ? item.price["M"] : (item.size === "S" ? item.price["S"] : (item.size === "M" ? item.price["M"] : item.price["L"])))
      });
    });

    return Object.values(mergedItems);
  }

  const getCartList = async () => {
    const carts = DataManager.shared.getCartItems();
    const cartItems = carts ? carts[0].items : [];

    const mergedCartItems = mergeCartItems(cartItems);

    setList(mergedCartItems);
  };



  return (
    <View style={st.container}>
      <Header customStyle={st.header} title={'Cart'} rightIcon={require('../../assets/ic_avatar.png')} onLeftPress={onNavigateToSetting} />
      <FlatList
        data={list}
        renderItem={({ item }) => <CartItem item={item} onPress={() => { }} />}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 30,
          paddingRight: 30,
        }}

      />
    </View>
  )
}

export default CartScreen

const st = StyleSheet.create({
  header: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
  },
})