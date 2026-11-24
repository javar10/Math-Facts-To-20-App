import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const MAX_SIZE = 200; // Size at 0 correct answers

const TurkeyAnimation = ({ correctAnswers, difficulty }) => {
  // Calculate progress between 0 and 1
  const safeDifficulty = difficulty > 0 ? difficulty : 10;
  const progress = Math.min(Math.max(correctAnswers / safeDifficulty, 0), 1);

  // Shrink linearly from MAX_SIZE (200) down to 0
  const currentSize = MAX_SIZE * (1 - progress);

  return (
    <View style={styles.container}>
      {currentSize > 0 && (
        <Image
          source={require('../assets/turkey.jpeg')}
          style={{ width: currentSize, height: currentSize }}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default TurkeyAnimation;

const styles = StyleSheet.create({
  container: {
    width: MAX_SIZE,
    height: MAX_SIZE,
    justifyContent: 'center', // Keeps the shrinking image centered
    alignItems: 'center',
  },
});
