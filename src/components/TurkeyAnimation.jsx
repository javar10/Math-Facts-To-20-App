import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const FRAME_INNER_TRIM = '#D97706'; // Warm orange/amber border

const TurkeyAnimation = ({ correctAnswers, difficulty }) => {
  const { width, height } = useWindowDimensions();

  // Scale dynamically: 80% of screen width, capped so MathProblem & Timer still fit comfortably
  const CONTAINER_SIZE = Math.min(width * 0.8, height * 0.42, 360);

  const START_BOTTOM = CONTAINER_SIZE * 0.2;      // 20% up from the bottom
  const END_BOTTOM = CONTAINER_SIZE * 0.77;       // Stops at 77% up from the bottom
  const START_TURKEY_SIZE = CONTAINER_SIZE * 0.8; // Keeps the head inside the frame at start

  const safeDifficulty = difficulty > 0 ? difficulty : 10;
  const targetProgress = Math.min(Math.max(correctAnswers / safeDifficulty, 0), 1);

  const animatedProgress = useRef(new Animated.Value(targetProgress)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: targetProgress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [targetProgress]);

  // Shrink smoothly from START_TURKEY_SIZE down to 0px
  const animatedSize = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [START_TURKEY_SIZE, 0],
  });

  // Move from 20% up to 80% up
  const animatedBottom = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [START_BOTTOM, END_BOTTOM],
  });

  return (
    <View style={styles.shadowWrapper}>
      <View
        style={[
          styles.container,
          { width: CONTAINER_SIZE, height: CONTAINER_SIZE },
        ]}
      >
        <Image
          style={[
            styles.background,
            { width: CONTAINER_SIZE, height: CONTAINER_SIZE },
          ]}
          source={require('../assets/background.png')}
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
    </View>
  );
};

export default TurkeyAnimation;

const styles = StyleSheet.create({
  shadowWrapper: {
    // marginTop: 36,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    // Standard clean drop shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 6,
  },
  container: {
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: FRAME_INNER_TRIM,
  },
  background: {
    position: 'absolute',
  },
  turkey: {
    position: 'absolute',
  },
});
