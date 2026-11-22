import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';

const DURATION_SECONDS = 60;

export default function CountdownTimer() {
  const [secondsLeft, setSecondsLeft] = useState(DURATION_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  // Animated value ranging from 1 (100% full) down to 0 (0% empty)
  const progress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let interval = null;

    if (isRunning && secondsLeft > 0) {
      // Animate the bar smoothly over the remaining duration
      Animated.timing(progress, {
        toValue: 0,
        duration: secondsLeft * 1000,
        easing: Easing.linear,
        useNativeDriver: false, // Required because we are animating 'width'
      }).start();

      // Update the numeric text every second
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
      // Pause the bar animation where it currently is
      progress.stopAnimation();
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartPause = () => {
    if (secondsLeft === 0) {
      handleReset();
      setIsRunning(true);
    } else {
      setIsRunning((prev) => !prev);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(DURATION_SECONDS);
    progress.setValue(1);
  };

  // Interpolate the 1 -> 0 value into a '100%' -> '0%' width string
  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Shift bar color to red when under 10 seconds
  const barColor = secondsLeft <= 10 ? '#EF4444' : '#3B82F6';

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{secondsLeft}s</Text>

      {/* Progress Bar Track */}
      <View style={styles.track}>
        {/* Animated Fill Bar */}
        <Animated.View
          style={[
            styles.bar,
            { width: barWidth, backgroundColor: barColor },
          ]}
        />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handleStartPause}>
          <Text style={styles.buttonText}>
            {isRunning ? 'Pause' : secondsLeft === 0 ? 'Restart' : 'Start'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  timerText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    fontVariant: ['tabular-nums'], // Prevents text jitter as numbers change
  },
  track: {
    width: '100%',
    height: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 28,
  },
  bar: {
    height: '100%',
    borderRadius: 10,
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  resetButton: {
    backgroundColor: '#6B7280',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
