import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Use 'react-native-linear-gradient' if not using Expo
import {COLORS, FONTS} from '../constants/theme'; // Adjust path to match your project

const NumberButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      // style={styles.shadowWrapper}
    >
      {/* Outer Gradient Layer acts as the rounded border */}
      <LinearGradient
        colors={[
          COLORS.gradientStart,
          COLORS.gradientMiddle,
          COLORS.gradientEnd,
          COLORS.gradientMiddle,
          COLORS.gradientStart
        ]} // Gradient colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}
      >
        {/* Inner Solid Accent Fill */}
        <View style={styles.innerButton}>
          <Text style={styles.buttonText}>{label}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default NumberButton;

const styles = StyleSheet.create({
  // shadowWrapper: {
  //   // Drop shadow so the button stands out against the screen background
  //   shadowColor: '#000000',
  //   shadowOffset: { width: 0, height: 3 },
  //   shadowOpacity: 0.22,
  //   shadowRadius: 4,
  //   elevation: 5, // Required for shadow on Android
  //   borderRadius: 12,
  // },
  gradientBorder: {
    width: 76, // Fixed width keeps 1-digit and 2-digit buttons identical
    height: 76, // Reduced from 68 to make the button shorter
    borderRadius: 16,
    padding: 5, // Increased from 3 to make the gradient border wider
  },
  innerButton: {
    flex: 1,
    backgroundColor: COLORS.buttonBackground,
    borderRadius: 11, // Outer borderRadius (16) minus padding (5) for a crisp inner corner
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
    fontSize: 36,
    // fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
});
