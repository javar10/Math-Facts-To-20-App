import { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet, } from 'react-native';
import { COLORS } from '../constants/theme';
import DURATION_SECONDS from '../constants/gameDuration';


const CountdownTimer = ({ setIsTimeUp, isRunning, setIsRunning, correctAnswers, targetNumber, secondsLeft, setSecondsLeft }) => {

  const progress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (correctAnswers === targetNumber && targetNumber > 0) {
      setIsRunning(false);
    }
  }, [correctAnswers, targetNumber]);


  useEffect(() => {
    let interval = null;

    if (isRunning && secondsLeft > 0) {
      progress.setValue(secondsLeft / DURATION_SECONDS);
      Animated.timing(progress, {
        toValue: 0,
        duration: secondsLeft * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      progress.stopAnimation();
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsRunning(false);
      if (setIsTimeUp) {
        setIsTimeUp(true);
      }
    }
  }, [secondsLeft]);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const barColor = secondsLeft <= 10 ? COLORS.secondary : COLORS.primary;

  return (
    <View style={styles.container}>

      {isRunning && (
        <View style={styles.track}>
          <Animated.View
            style={[
              styles.bar,
              { width: barWidth, backgroundColor: barColor },
            ]}
          />
        </View>)}

    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignItems: 'center',
    padding: 16,
    marginTop: 8,
  },
  track: {
    width: '100%',
    height: 24,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: .5,
    borderColor: COLORS.primary,
  },
  bar: {
    height: '100%',
    borderRadius: 8,
  },
});
