import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../constants/theme';

const BACKGROUND_IMAGE = require('../assets/background.png');

const TurkeyAnimation = ({ correctAnswers, targetNumber }) => {
  const [availableSize, setAvailableSize] = useState({ width: 0, height: 0 });

  const { width: imgW, height: imgH } = Image.resolveAssetSource(BACKGROUND_IMAGE);
  const aspectRatio = imgW / imgH;

  // Fill as much of the available space as possible without overflowing width or height
  let frameWidth = availableSize.width;
  let frameHeight = frameWidth / aspectRatio;

  if (frameHeight > availableSize.height) {
    frameHeight = availableSize.height;
    frameWidth = frameHeight * aspectRatio;
  }

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
    inputRange:[0, 1],
    outputRange: [START_TURKEY_SIZE, 0],
  });

  const animatedBottom = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [START_BOTTOM, END_BOTTOM],
  });

  return (
    <View
      style={styles.flexWrapper}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setAvailableSize({ width, height });
      }}
    >
      {frameWidth > 0 && frameHeight > 0 && (
        <View
          style={[
            styles.container,
            { width: frameWidth, height: frameHeight },
          ]}
        >
          <Image
            source={BACKGROUND_IMAGE}
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
      )}
    </View>
  );
};

export default TurkeyAnimation;

const styles = StyleSheet.create({
  flexWrapper: {
    flex: 1,                  // Takes up ALL leftover vertical space—maximizing the image
    minHeight: 0,             // Allows shrinking on short screens so bottom buttons never clip
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,        // Small clean breathing room above and below the frame
  },
  container: {
    alignItems: 'center',
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
