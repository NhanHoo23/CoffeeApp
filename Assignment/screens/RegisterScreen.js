import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomEditText from '../components/CustomEditText'
import { COLORS, FONTS } from '../src/constants'
import CustomButton from '../components/CustomButton'
import { validateEmail } from '../utils/Validation'
import { createUser } from '../api/userApi'
import DataManager from '../utils/DataManager'

const RegisterScreen = ({ navigation }) => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')    
    const [retypePassword, setretypePassword] = useState('')
    const [nameError, setnameError] = useState('')
    const [emailError, setemailError] = useState('')
    const [passwordError, setpasswordError] = useState('')
    const [retypePasswordError, setretypePasswordError] = useState('')

    const goToSignIn = () => {
        navigation.goBack();
    };

    const handleRegister = async () => {
        setnameError('')
        setemailError('')
        setpasswordError('')
        setretypePasswordError('')

        if (name === '') {
            setnameError('Please enter your name')
            return
        } else {
            setnameError('')
        }

        if (email === '') {
            setemailError('Please enter your email')
            return
        } else {
            setemailError('')
        }

        if (!validateEmail(email)) {
            setemailError('Please enter a valid email address')
            return
        } else {
            setemailError('')
        }

        if (password === '') {
            setpasswordError('Please enter your password')
            return
        } else {
            setpasswordError('')
        }

        if (retypePassword === '') {
            setretypePasswordError('Please retype your password')
            return
        } else {
            setretypePasswordError('')
        }

        if (password !== retypePassword) {
            setretypePasswordError('Password does not match')
            return
        } else {
            setretypePasswordError('')
        }

        const newUser = {
            name,
            email,
            password
        }
        const user = await createUser(newUser)
        DataManager.shared.pushUser(user)
        Alert.alert('Register Success', 'You have successfully registered', [
            {
                text: 'OK',
                onPress: goToSignIn,
            }   
        ])
    }

    return (
        <View style={st.parent}>
            <SafeAreaView style={st.container}>
                <Image source={require('../assets/logo.png')} resizeMode='contain' style={st.logo} />

                <Text style={st.welcomeLbl}>Welcome to Lungo!!!</Text>
                <Text style={[st.smallLbl, { marginTop: 16 }]}>Register to Continue</Text>

                <CustomEditText customStyle={{ ...st.input, marginTop: 32, borderColor: nameError ? 'red' : '#252A33'  }} placeholder='Name' onChangeText={setname}/>
                {nameError ? <Text style={st.errorText}>{nameError}</Text> : null}
                <CustomEditText customStyle={{...st.input, borderColor: emailError ? 'red' : '#252A33' }} placeholder='Email' onChangeText={setemail} />
                {emailError ? <Text style={st.errorText}>{emailError}</Text> : null}
                <CustomEditText customStyle={{...st.input, borderColor: passwordError ? 'red' : '#252A33' }} placeholder='Password' isPassword={true} onChangeText={setpassword}/>
                {passwordError ? <Text style={st.errorText}>{passwordError}</Text> : null}
                <CustomEditText customStyle={{...st.input, borderColor: retypePasswordError ? 'red' : '#252A33' }} placeholder='Re-type password' isPassword={true} onChangeText={setretypePassword} />
                {retypePasswordError ? <Text style={st.errorText}>{retypePasswordError}</Text> : null}

                <CustomButton title='Register' bgColor={{ backgroundColor: '#D17842' }} textColor={{ color: COLORS.textColor }} customStyle={st.button} onPress={handleRegister} />
 
                <View style={{ flexDirection: 'row', marginTop: 32 }}>
                    <Text style={st.smallLbl}>You have an account? Click{' '}</Text>
                    <TouchableOpacity onPress={goToSignIn}>
                        <Text style={[st.smallLbl, { color: '#D17842' }]}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default RegisterScreen

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
})