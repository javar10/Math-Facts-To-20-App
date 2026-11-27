import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import {COLORS, FONTS} from '../constants/theme'; 

const NumberButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
    >
      
      <LinearGradient
        colors={[
          COLORS.gradientStart,
          COLORS.gradientMiddle,
          COLORS.gradientEnd,
          COLORS.gradientMiddle,
          COLORS.gradientStart
        ]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}
      >
        <View style={styles.innerButton}>
          <Text style={styles.buttonText}>{label}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default NumberButton;

const styles = StyleSheet.create({
  gradientBorder: {
    width: 76, 
    height: 76, 
    borderRadius: 16,
    padding: 5, 
  },
  innerButton: {
    flex: 1,
    backgroundColor: COLORS.buttonBackground,
    borderRadius: 11, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
    fontSize: 36,
    fontVariant: ['tabular-nums'],
  },
});
