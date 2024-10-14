import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../src/constants'
import Header from '../../components/Header'
import SettingItem from '../ItemFlatList/SettingItem'
import { FlatList } from 'react-native-gesture-handler'

const SettingScreen = ({ navigation }) => {
    const goBack = () => {
        navigation.goBack();
    };
    const data = [
        {
            id: 'personalDetail',
            icon: require('../../assets/ic_personalDetail.png'),
            title: 'Personal Detail',
        },
        {
            id: 'payment',
            icon: require('../../assets/ic_payment.png'),
            title: 'Payment Method',
        },
        {
            id: 'about',
            icon: require('../../assets/ic_about.png'),
            title: 'About',
        },
        {
            id: 'help',
            icon: require('../../assets/ic_help.png'),
            title: 'Help',
        },
        {
            id: 'logout',
            icon: require('../../assets/ic_logout.png'),
            title: 'Logout',
        },
        
    ];

    return (
        <View style={st.container}>
            <Header customStyle={st.header} leftIcon={require('../../assets/bt_back.png')} title={'Settings'} onLeftPress={goBack} />
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <SettingItem item={item} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}  // Correct case
                    contentContainerStyle={{
                        paddingLeft: 30,
                        paddingRight: 30,
                    }}
                />
            </View>
        </View>
    )
}

export default SettingScreen

const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.mainBackgroundColor
    },
    header: {
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
})