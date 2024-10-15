import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { COLORS } from '../../src/constants'
import Header from '../../components/Header'
import FavouriteItem from '../ItemFlatList/FavouriteItem'
import { FlatList } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { set } from 'mongoose'
import DataManager from '../../utils/DataManager'
import { addFavouriteItem, updateFavouriteItems } from '../../api/productApi'

const FavouriteScreen = ({ route, navigation }) => {
  const { onNavigateToSetting } = route.params;
  const [list, setList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getFavouritesList();
      console.log('FavouriteScreen:', list);
    }, [])
  );


  const toggleFavourite = async (item, isFavourite) => {
    console.log('item', item);
    console.log('isFavourite', isFavourite);
    
    
    try {
        const userID = DataManager.shared.getCurrentUser().id;
        const favourites = DataManager.shared.getFavoriteItems(); //[{"id": <userID>, "items": [[Object]]}]

        if (favourites.length === 0)  {
            //add
            favourites.push({id: userID, items: [item]});
            console.log('items', favourites[0].items);
            setList(favourites[0].items);
            await addFavouriteItem(userID, favourites[0].items)
        } else {
            if (isFavourite) {
                //remove
                favourites[0].items = favourites[0].items.filter(fav => fav.id !== item.id);
                setList(favourites[0].items);
                await updateFavouriteItems(userID, favourites[0].items);
            } else {
                //update
                favourites[0].items.push(item);
                setList(favourites[0].items);
                await updateFavouriteItems(userID, favourites[0].items);
            }
            
        }

    } catch (error) {
        console.error('Error:', error);
    }
};

  const getFavouritesList = async () => {
    const favourites = DataManager.shared.getFavoriteItems()
    const favoriteItems = favourites ? favourites[0].items : []
    setList(favoriteItems);
  }


  return (
    <View style={st.container}>
      <Header customStyle={st.header} title={'Favourite'} rightIcon={require('../../assets/ic_avatar.png')} onLeftPress={onNavigateToSetting} />
      <FlatList
        data={list}
        renderItem={({ item }) => <FavouriteItem item={item} onPress={toggleFavourite} />}
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

export default FavouriteScreen

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