import React from 'react'
import BottomTabs from '../components/BottomTabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { StyleSheet } from 'react-native';

const MainContainer = ({ navigation }) => {
    const handleNavigateToSetting = () => {
        navigation.navigate('Setting');
      };

    return (
        <SafeAreaView style={{flex: 1}}>
            <BottomTabs onNavigateToSetting={handleNavigateToSetting}/>
        </SafeAreaView>
    )
}

export default MainContainer

const st = StyleSheet.create({
    
})
