import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet, } from 'react-native';
import COLORS from '../constants/colors';


const DURATION_SECONDS = 300;

const CountdownTimer = ({
  isTimeUp,
  setIsTimeUp,
  isRunning,
  setIsRunning,
  correctAnswers,
  setCorrectAnswers,
  difficulty,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(DURATION_SECONDS);
  const [hasStarted, setHasStarted] = useState(false);

  // updating the pause/resume instead of pause/start. 

  const progress = useRef(new Animated.Value(1)).current;

  // 1. Stop the timer immediately when the player wins the round
  useEffect(() => {
    if (correctAnswers === difficulty && difficulty > 0) {
      setIsRunning(false);
    }
  }, [correctAnswers, difficulty]);

  // 2. Reset the timer back to 60s (paused) whenever a new round starts ("Play Again")
  useEffect(() => {
    if (!isTimeUp && correctAnswers === 0) {
      handleReset();
    }
  }, [isTimeUp, correctAnswers]);

  // 3. Handle countdown interval and smooth bar animation
  useEffect(() => {
    let interval = null;

    if (isRunning && secondsLeft > 0) {
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
            setIsRunning(false);
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

  // 4. Safely notify GameScreen after secondsLeft hits 0
  useEffect(() => {
    if (secondsLeft === 0 && setIsTimeUp) {
      setIsTimeUp(true);
    }
  }, [secondsLeft]);

  const handleStartPause = () => {
    if (secondsLeft === 0) {
      handleReset();
      setIsRunning(true);
    } else {
      setIsRunning((prev) => !prev);
      setHasStarted(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(DURATION_SECONDS);
    setCorrectAnswers(0);
    setHasStarted(false);
    if (setIsTimeUp) {
      setIsTimeUp(false);
    }
    progress.setValue(1);
  };

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const barColor = secondsLeft <= 10 ? COLORS.secondary : COLORS.primary;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.timerText}>{secondsLeft}s</Text> */}

      {isRunning && (
        <View style={styles.track}>
          <Animated.View
            style={[
              styles.bar,
              { width: barWidth, backgroundColor: barColor },
            ]}
          />
        </View>)}

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handleStartPause}>
          <Text style={styles.buttonText}>
            {isRunning ? 'Pause' : hasStarted ? 'Resume' : 'Start'}
          </Text>
        </TouchableOpacity>

        {isRunning || hasStarted ? (
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        ): null}
      </View>
    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 16,
  },
  timerText: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
    fontVariant: ['tabular-nums'],
  },
  track: {
    width: '100%',
    height: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  bar: {
    height: '100%',
    borderRadius: 8,
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  resetButton: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
