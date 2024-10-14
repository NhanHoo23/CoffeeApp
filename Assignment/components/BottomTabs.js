import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/mainScreens/HomeScreen'
import CartScreen from '../screens/mainScreens/CartScreen'
import FavouriteScreen from '../screens/mainScreens/FavouriteScreen'
import HistoryScreen from '../screens/mainScreens/HistoryScreen'
import { COLORS } from '../src/constants'

const Tab = createBottomTabNavigator()

const HomeWrapper = (props) => {
    return <HomeScreen {...props} />;
};

const CartWrapper = (props) => {
    return <CartScreen {...props} />;
};

const FavouriteWrapper = (props) => {
    return <FavouriteScreen {...props} />;
};

const HistoryWrapper = (props) => {
    return <HistoryScreen {...props} />;
};
const BottomTabs = ({ onNavigateToSetting }) => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? require('../assets/ic_home.png')
                            : require('../assets/ic_home_selected.png');
                    } else if (route.name === 'Cart') {
                        iconName = focused
                            ? require('../assets/ic_cart.png')
                            : require('../assets/ic_cart_selected.png');
                    } else if (route.name === 'Favourite') {
                        iconName = focused
                            ? require('../assets/ic_favourite.png')
                            : require('../assets/ic_favourite_selected.png');
                    } else if (route.name === 'History') {
                        iconName = focused
                            ? require('../assets/ic_history.png')
                            : require('../assets/ic_history_selected.png');
                    }
                    return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />
                },
                tabBarActiveTintColor: '#D17842',
                tabBarInactiveTintColor: '#4E5053',
                tabBarStyle: {
                    backgroundColor: COLORS.mainBackgroundColor,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderTopWidth: 0,
                    height: 70
                }
            })}

        >

            <Tab.Screen
                name="Home"
                component={HomeWrapper}
                initialParams={{ onNavigateToSetting }}
            />
            <Tab.Screen
                name="Cart"
                component={CartWrapper}
                initialParams={{ onNavigateToSetting }}
            />
            <Tab.Screen
                name="Favourite"
                component={FavouriteWrapper}
                initialParams={{ onNavigateToSetting }}
            />
            <Tab.Screen
                name="History"
                component={HistoryWrapper}
                initialParams={{ onNavigateToSetting }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabs