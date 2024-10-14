import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainContainer from '../screens/MainContainer';
import DetailScreen from '../screens/mainScreens/DetailScreen';
import SettingScreen from '../screens/settingScreens/SettingScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainContainer} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}

export default AppNavigator
