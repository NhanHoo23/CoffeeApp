import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../src/constants';
import { FONTS } from '../src/constants';

const CustomEditText = ({ placeholder, isPassword = false, customStyle, onChangeText }) => {
    const [showPassword, setShowPassword] = useState(false);

    let eyeIcon;
    if (isPassword) {
        eyeIcon = (
            <TouchableOpacity
                style={[styles.eyeIcon]}
                onPress={() => setShowPassword(!showPassword)}
            >
                <Image
                    source={showPassword ? require('../assets/ic_eye.png') : require('../assets/ic_eye.png')}
                    style={styles.icon}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        );
    }

    return (
        <View style={[styles.container, customStyle]}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={COLORS.secondTextColor}
                secureTextEntry={isPassword && !showPassword}
                onChangeText={onChangeText}
            />
            {eyeIcon}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#252A33',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 14,
        fontFamily: FONTS.regular,
        fontWeight: '400',
        letterSpacing: 0.5,
        color: COLORS.textColor,
        // backgroundColor: 'red'
    },
    eyeIcon: {
        height: 48,
        width: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'blue'
    },
    icon: {
        width: 30,
        height: 30,
    },
});

export default CustomEditText;
