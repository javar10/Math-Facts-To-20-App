import { Platform } from 'react-native';

export const COLORS = {
    // Primary Colors
    background: '#F0E9DB',
    primary: '#FFD4A1',
    secondary: '#580b02',
    accent: '#FFB347',

    // Text
    textPrimary: '#471f01',
    textSecondary: '#a2815b',

    // Buttons
    buttonBackground: '#FFD4A1',
    gradientStart: '#FFB347',
    gradientMiddle: '#580b02',
    gradientEnd: '#fee55f',
   
};

export const FONTS = {
  regular: Platform.select({
    ios: 'Avenir-Medium',
    android: 'sans-serif',
  }),
  bold: Platform.select({
    ios: 'AvenirNext-Bold',
    android: 'sans-serif-medium',
  }),
  playful: Platform.select({
    ios: 'ChalkboardSE-Bold',
    android: 'casual',
  }),
};

