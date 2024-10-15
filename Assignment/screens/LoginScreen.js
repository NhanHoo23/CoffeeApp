import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS } from '../src/constants'
import CustomButton from '../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomEditText from '../components/CustomEditText'
import { validateEmail } from '../utils/Validation'
import DataManager from '../utils/DataManager'
import { fetchCartItems, fetchFavouriteItems } from '../api/productApi'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [users, setUsers] = useState(DataManager.shared.getUsers())
    const [loading, setLoading] = useState(false);

    const goToSignUp = () => {
        navigation.navigate('Register');
    };

    const goToMain = () => {
        navigation.navigate('Main');
    }

    const handleLogin = async () => {
        setEmailError('');
        setPasswordError('');

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        } else {
            setEmailError('');
        }


        if (users.length > 0 && users.find(user => user.email === email)) {
            if (users.find(user => user.password === password)) {
                DataManager.shared.setCurrentUser(users.find(user => user.email === email));

                setLoading(true);
                const favouriteItems = await fetchFavouriteItems(DataManager.shared.currentUser.id);
                DataManager.shared.setFavoriteItems(favouriteItems);
                const cartItems = await fetchCartItems(DataManager.shared.currentUser.id);
                DataManager.shared.setCartItems(cartItems);

                console.log('cartItems:', cartItems);
                
                setLoading(false);

                goToMain();
            } else {
                setPasswordError('Password is incorrect');
            }
        } else {
            setEmailError('Email is not registered');
        }
    };

    useEffect(() => {
        setUsers(DataManager.shared.getUsers());
    }, [navigation])


    return (
        <View style={st.parent}>
            <SafeAreaView style={st.container}>
                <Image source={require('../assets/logo.png')} resizeMode='contain' style={st.logo} />

                <Text style={st.welcomeLbl}>Welcome to Lungo!!!</Text>
                <Text style={[st.smallLbl, { marginTop: 16 }]}>Login to Continue</Text>

                <CustomEditText customStyle={{ ...st.input, marginTop: 32, borderColor: emailError ? 'red' : '#252A33' }} placeholder='Email Address' isPassword={false} onChangeText={setEmail} />
                {emailError ? <Text style={st.errorText}>{emailError}</Text> : null}
                <CustomEditText customStyle={{ ...st.input, borderColor: passwordError ? 'red' : '#252A33' }} placeholder='Password' isPassword={true} onChangeText={setPassword} />
                {passwordError ? <Text style={{ ...st.errorText }}>{passwordError}</Text> : null}

                <CustomButton title='Sign In' bgColor={{ backgroundColor: '#D17842' }} textColor={{ color: COLORS.textColor }} customStyle={st.button} onPress={handleLogin} />
                <CustomButton title='Sign in with Google' bgColor={{ backgroundColor: '#FFFFFF' }} textColor={{ color: '#000000' }} isShowIcon={true} customStyle={st.button} />

                <View style={{ flexDirection: 'row', marginTop: 32 }}>
                    <Text style={st.smallLbl}>Don't have an account? CLick{' '}</Text>
                    <TouchableOpacity onPress={goToSignUp}>
                        <Text style={[st.smallLbl, { color: '#D17842' }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 32 }}>
                    <Text style={st.smallLbl}>Forget Password? Click{' '}</Text>
                    <TouchableOpacity>
                        <Text style={[st.smallLbl, { color: '#D17842' }]}>Reset</Text>
                    </TouchableOpacity>
                </View>

                {loading &&
                    <View style={st.gradient}>
                        <ActivityIndicator style={st.indicator} size="large" color="#0000ff" />
                    </View>}
            </SafeAreaView>
        </View>
    )
}

export default LoginScreen

const st = StyleSheet.create({

    parent: {
        flex: 1,
        backgroundColor: COLORS.mainBackgroundColor,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    logo: {
        width: '38%',
        height: undefined,
        aspectRatio: 1,
    },
    welcomeLbl: {
        color: COLORS.textColor,
        fontFamily: FONTS.regular,
        fontWeight: '700',
        letterSpacing: 0.5,
        fontSize: 16,
        marginTop: 8,
    },
    smallLbl: {
        color: COLORS.secondTextColor,
        fontFamily: FONTS.regular,
        fontWeight: '700',
        letterSpacing: 0.5,
        fontSize: 12,
        // marginTop: 16,
    },
    input: {
        marginTop: 16,
    },
    button: {
        width: '100%',
        marginTop: 16,
    },
    errorText: {
        color: 'red',
        marginTop: 8,
        fontSize: 12,
        width: '100%',
    },
    gradient: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})