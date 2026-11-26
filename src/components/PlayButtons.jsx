import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import { useRef } from 'react'
import { COLORS, FONTS } from '../constants/theme'
import DURATION_SECONDS from '../constants/gameDuration'

const PlayButtons = ({ style, buttonStyle, textStyle, setIsTimeUp, isRunning, setIsRunning, setCorrectAnswers, hasStarted, setHasStarted, secondsLeft, setSecondsLeft }) => {
    const progress = useRef(new Animated.Value(1)).current;

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

    return (
        <View style={[styles.controls, style]}>
            <TouchableOpacity
                style={[styles.button, buttonStyle]}
                onPress={handleStartPause}
            >
                <Text style={[styles.buttonText, textStyle]}>
                    {isRunning ? 'Pause' : hasStarted ? 'Resume' : 'Start'}
                </Text>
            </TouchableOpacity>

            {isRunning || hasStarted ? (
                <TouchableOpacity
                    style={[styles.button, styles.resetButton, buttonStyle]}
                    onPress={handleReset}
                >
                    <Text style={[styles.buttonText, textStyle]}>Reset</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

export default PlayButtons

const styles = StyleSheet.create({
    container: {
        width: '80%',
        alignItems: 'center',
        padding: 16,
        marginTop: 8,
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
        color: COLORS.textSecondary,
        fontFamily: FONTS.bold,
        fontSize: 20,
    },
});