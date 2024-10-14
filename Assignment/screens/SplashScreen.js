import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS } from '../src/constants'
import { useNavigation } from '@react-navigation/native';
import DataManager from '../utils/DataManager';
import { fetchUsers } from '../api/userApi';
import { fetchCategories } from '../api/productApi';


const SplashScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [initialTimeout, setInitialTimeout] = useState(true);
    const [loadingText, setLoadingText] = useState('Loading...');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLoadingText(prev => {
                switch (prev) {
                    case 'Loading':
                        return 'Loading.';
                    case 'Loading.':
                        return 'Loading..';
                    case 'Loading..':
                        return 'Loading...';
                    default:
                        return 'Loading';
                }
            });
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                const users = await fetchUsers();
                DataManager.shared.setUsers(users);
                console.log('Users:', users);

                const categories = await fetchCategories()
                DataManager.shared.setCategories(categories)

                

                

                navigation.replace('Login');
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            setInitialTimeout(false);
            setLoading(true);
            fetchApiData();
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} resizeMode='contain' style={styles.logo} />
            {!initialTimeout && loading && (
                <View >
                    <Text style={{color: COLORS.textColor, fontFamily: FONTS.bold, fontSize: 18}}>{loadingText}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.mainBackgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '50%',
        height: undefined,
        aspectRatio: 1,
    },
})

export default SplashScreen

