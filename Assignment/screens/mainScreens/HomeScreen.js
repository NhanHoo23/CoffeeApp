import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS } from '../../src/constants'
import CoffeeItem from '../ItemFlatList/CoffeeItem'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../../components/Header'
import DataManager from '../../utils/DataManager'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const CoffeeType = {
    Coffee: 'Coffee',
    CoffeeBeans: 'CoffeeBeans',
}



const HomeScreen = ({ route }) => {
    const { onNavigateToSetting } = route.params;
    const [categories, setCategories] = useState(DataManager.shared.getCategories().filter(category => category.id !== 'coffeeBeans'));
    const [coffees, setCoffees] = useState([]);
    const [coffeeBeans, setCoffeeBeans] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [allProducts, setAllProducts] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        let products = [];
        categories.forEach(category => {
            if (category.id !== 'all') {
                products = products.concat(category.products); 
            }
        });
        setAllProducts(products);
        setCoffees(products);

        let coffeeBeans = DataManager.shared.getCategories().find(category => category.id === 'coffeeBeans').products;
        setCoffeeBeans(coffeeBeans);
    }, []);

    const handleSelectedCategory = (name) => {
        setSelectedCategory(name);

        if (name === 'All') {
            setCoffees(allProducts);
        } else {
            let selectedProducts = categories.find(category => category.name === name).products;
            setCoffees(selectedProducts);
        }
    }

    const goToDetail = (item) => {
        const currentType = item.name.includes('Beans') ? CoffeeType.CoffeeBeans : CoffeeType.Coffee; 

        navigation.navigate('Detail', { item, type: currentType });
    }

    return (
        <View style={st.container}>
            <Header customStyle={st.header} rightIcon={require('../../assets/ic_avatar.png')} onLeftPress={onNavigateToSetting} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={st.tagline}>Find the best {'\n'}coffee for you</Text>

                <View style={st.searchView}>
                    <Image
                        source={require('../../assets/ic_search.png')}
                        style={{ width: 20, height: 20 }}
                        resizeMode='contain'
                    />
                    <TextInput
                        placeholder='Find Your Coffee'
                        placeholderTextColor='#52555A'
                        style={{ color: COLORS.textColor, fontSize: 12, fontFamily: FONTS.regular, flex: 1, height: 30, padding: 0, marginStart: 16 }}
                    />
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: 16, paddingHorizontal: 22 }}>
                    {categories.map(category => (
                        <TouchableOpacity key={category.name} onPress={() => handleSelectedCategory(category.name)} style={st.menuItem}>
                            <Text style={[st.menuText, selectedCategory === category.name ? st.selectedMenuText : null]}>
                                {category.name}
                            </Text>
                            <View style={{ height: 8, width: 8, backgroundColor: selectedCategory === category.name ? '#D17842' : 'transparent', marginTop: 8, borderRadius: 4 }} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={{ height: 260 }}>
                    <FlatList
                        data={coffees}
                        renderItem={({ item }) => <CoffeeItem item={item} onPress={goToDetail} />}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingLeft: 30,
                            paddingRight: 30,
                        }}
                        style={st.listView}
                    />
                </View>

                <Text style={{ color: COLORS.textColor, fontSize: 16, fontFamily: FONTS.regular, marginStart: 30, marginTop: 32 }}>Coffee Beans</Text>

                <View style={{ height: 260, marginBottom: 30 }}>
                    <FlatList
                        data={coffeeBeans}
                        renderItem={({ item }) => <CoffeeItem item={item} onPress={goToDetail} />}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingLeft: 30,
                            paddingRight: 30,
                        }}
                        style={st.listView}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const st = StyleSheet.create({
    header: {
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.mainBackgroundColor,
    },
    tagline: {
        fontSize: 28,
        fontWeight: '600',
        fontFamily: FONTS.regular,
        lineHeight: 36,
        color: COLORS.textColor,
        marginStart: 30
    },
    searchView: {
        flexDirection: 'row',
        backgroundColor: '#141921',
        borderRadius: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginHorizontal: 30,
        marginTop: 20,
        height: 50
    },
    menuContainer: {
        marginTop: 16,
        paddingHorizontal: 60,
    },
    menuItem: {
        padding: 8,
        alignItems: 'center',
        // backgroundColor: 'green'
    },
    menuText: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        lineHeight: 20,
        fontWeight: '600',
        color: '#52555A',
    },
    selectedMenuText: {
        color: '#D17842',
    },
    listView: {
        marginTop: 20,
    }
})

