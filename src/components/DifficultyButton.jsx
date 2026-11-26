import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../constants/theme'

const DifficultyButton = ({ label, difficulty, setDifficulty }) => {
    const selectedButton = label === difficulty ? true : false

    return (
        <TouchableOpacity
            onPress={() => setDifficulty(label)}
            style={[styles.button, selectedButton ? styles.selectedButton : styles.button]}
        >
            <Text style={[styles.buttonText, selectedButton ? styles.selectedButtonText : styles.buttonText]}>{label}</Text>
        </TouchableOpacity>
    )
}

export default DifficultyButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,

        // Shadow
        // shadowColor: '#3E2723',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.18,
        // shadowRadius: 3,

        // // Subtle drop shadow (Android)
        // elevation: 3,

         // Raised (convex) bevel for #FFD4A1: bright top/left highlight, warm caramel bottom/right edge
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

        // Optional: flatten out any outer drop shadow when selected so it feels truly recessed
        shadowOpacity: 0,
        elevation: 0,
    },
    buttonText: {
        color: COLORS.textPrimary,
        fontFamily: FONTS.bold,
        fontSize: 20,
    },
    selectedButtonText: {
        color: COLORS.textSecondary
    }
})