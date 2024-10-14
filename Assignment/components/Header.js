import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../src/constants'

const Header = ({ customStyle, title, leftIcon, rightIcon, onLeftPress, onRightPress }) => {
  let leftIC = leftIcon ? leftIcon : require('../assets/ic_drawer.png');
  let rightIC = rightIcon ? rightIcon : require('../assets/img_default.png');

  return (
    <View style={[styles.headerContainer, customStyle]}>
      <TouchableOpacity style={styles.leftIcon} onPress={onLeftPress}>
        <Image
          source={leftIC}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {title && <Text style={{ color: COLORS.textColor, fontSize: 16, fontWeight: 'bold' }}>{title}</Text>}

      <TouchableOpacity style={styles.rightIcon} onPress={onRightPress}>
          <Image
            source={rightIC}
            style={styles.avatar}
            resizeMode="contain"
          />
        </TouchableOpacity>
        
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.mainBackgroundColor
  },
  title: {
    color: COLORS.textColor,
    fontSize: 20,
    fontFamily: FONTS.regular,
    fontWeight: '600',
    lineHeight: 36,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    padding: 5,
  },
  rightIcon: {
    padding: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 16,
  }
});