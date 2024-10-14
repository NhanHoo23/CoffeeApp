import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../src/constants'
import Header from '../../components/Header'
import FavouriteItem from '../ItemFlatList/FavouriteItem'
import { FlatList } from 'react-native-gesture-handler'

const FavouriteScreen = ({ route }) => {
  const { onNavigateToSetting } = route.params;


  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Capuchino',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Capuchino2',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Capuchino3',
    },
  ];

  return (
    <View style={st.container}>
      <Header customStyle={st.header} title={'Favourite'} rightIcon={require('../../assets/ic_avatar.png')} onLeftPress={onNavigateToSetting}/>
      <FlatList
        data={data}
        renderItem={({ item }) => <FavouriteItem item={item} />}
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