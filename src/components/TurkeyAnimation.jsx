import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { COLORS } from '../constants/theme';

const BACKGROUND_IMAGE = require('../assets/background.png');

const TurkeyAnimation = ({ correctAnswers, targetNumber }) => {
  const { width, height } = useWindowDimensions();

  // Scale dynamically: 80% of screen width, capped so MathProblem & Timer still fit comfortably
  const CONTAINER_SIZE = Math.min(width * 0.8, height * 0.42, 360);

  // Match the frame dimensions to the image's natural aspect ratio
  const { width: imgW, height: imgH } = Image.resolveAssetSource(BACKGROUND_IMAGE);
  const aspectRatio = imgW / imgH;

  const frameWidth = aspectRatio >= 1 ? CONTAINER_SIZE : CONTAINER_SIZE * aspectRatio;
  const frameHeight = aspectRatio >= 1 ? CONTAINER_SIZE / aspectRatio : CONTAINER_SIZE;

  const START_BOTTOM = frameHeight * 0.2;      // 20% up from the bottom
  const END_BOTTOM = frameHeight * 0.76;       // Stops at 76% up from the bottom
  const START_TURKEY_SIZE = frameWidth * 0.8;  // Keeps the head inside the frame at start

  const safeDifficulty = targetNumber > 0 ? targetNumber : 10;
  const targetProgress = Math.min(Math.max(correctAnswers / safeDifficulty, 0), 1);

  const animatedProgress = useRef(new Animated.Value(targetProgress)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: targetProgress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [targetProgress]);

  const animatedSize = animatedProgress.interpolate({
    inputRange: [0,1],
    outputRange: [START_TURKEY_SIZE, 0],
  });

  const animatedBottom = animatedProgress.interpolate({
    inputRange:[0,1],
    outputRange: [START_BOTTOM, END_BOTTOM],
  });

  return (
    <View
      style={[
        styles.container,
        { width: frameWidth, height: frameHeight },
      ]}
    >
      <Image
        source={require('../assets/background.png')}
        resizeMode="cover"
        style={[
          styles.background,
          { width: frameWidth, height: frameHeight },
        ]}
      />
      <Animated.Image
        source={require('../assets/turkey_back.png')}
        resizeMode="contain"
        style={[
          styles.turkey,
          {
            width: animatedSize,
            height: animatedSize,
            bottom: animatedBottom,
          },
        ]}
      />
    </View>
  );
};

export default TurkeyAnimation;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center', // Centers the frame horizontally in its parent
    alignItems: 'center',
    marginVertical: 8,
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: COLORS.accent,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  turkey: {
    position: 'absolute',
  },
});
