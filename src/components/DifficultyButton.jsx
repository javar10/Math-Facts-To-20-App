import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { COLORS, FONTS } from '../constants/theme';

const FEATHER_COUNTS = {
    beginner: 1,
    easy: 2,
    medium: 3,
    hard: 4,
    expert: 5,
};

const DifficultyButton = ({ label, difficulty, setDifficulty }) => {
    const isSelected = label === difficulty;
    const featherCount = FEATHER_COUNTS[label] || 1;
    const iconColor = isSelected ? COLORS.primary : COLORS.secondary; // Flips color when selected

    return (
        <TouchableOpacity
            onPress={() => setDifficulty(label)}
            style={[styles.button, isSelected && styles.selectedButton]}
        >
            <View style={styles.featherRow}>
                {Array.from({ length: featherCount }).map((_, index) => (
                    <FontAwesome5
                        key={index}
                        name="feather-alt"
                        size={14}
                        color={iconColor}
                    />
                ))}
            </View>
        </TouchableOpacity>
    );
};

export default DifficultyButton;


const styles = StyleSheet.create({
    button: {
        width: 96,                    // Fits up to 5 feathers comfortably; keeps all 5 buttons identical
        height: 40,                   // Consistent height across every button
        justifyContent: 'center',     // Centers the feather row vertically
        alignItems: 'center',         // Centers the feather row horizontally
        backgroundColor: COLORS.primary,
        borderRadius: 8,

        // Bevel
        borderTopWidth: 2,
        borderLeftWidth: 1.5,
        borderBottomWidth: 2,
        borderRightWidth: 1.5,
        borderTopColor: '#FFF6EB',    // Soft warm-cream top highlight
        borderLeftColor: '#FFECD6',   // Subtle left highlight
        borderBottomColor: '#D69F63', // Warm toasted-caramel bottom lip
        borderRightColor: '#E3B27B',  // Subtle right edge
    },
    selectedButton: {
        backgroundColor: COLORS.secondary,

        // Subtle pressed-in bevel for dark burgundy/brown (#580b02)
        borderTopWidth: 2,
        borderLeftWidth: 1.5,
        borderBottomWidth: 1.5,
        borderRightWidth: 1,
        borderTopColor: 'rgba(15, 2, 0, 0.55)',       // Deep warm shadow along top edge
        borderLeftColor: 'rgba(15, 2, 0, 0.30)',      // Subtle left shadow
        borderBottomColor: 'rgba(255, 245, 235, 0.22)', // Soft warm bottom rim highlight
        borderRightColor: 'rgba(255, 245, 235, 0.12)',  // Subtle right highlight

        shadowOpacity: 0,
        elevation: 0,
    },
    featherRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
    },
});
