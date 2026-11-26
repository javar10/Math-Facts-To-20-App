import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { operations } from '../constants/savedOptions'
import { COLORS, FONTS } from '../constants/theme'

const OperationButton = ({ label, operation, setOperation }) => {

    const selectedButton = label === operation ? true : false
    const buttonText = label === 'addition' ? '+' : label === 'subtraction' ? '-' : '+ / -'

    return (
        <TouchableOpacity
            onPress={() => setOperation(label)}
            style={[styles.button, selectedButton ? styles.selectedButton : styles.button]}
        >
            <Text style={[styles.buttonText, selectedButton ? styles.selectedButtonText : styles.buttonText]}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export default OperationButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 24,
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

        // Bevel
        borderTopWidth: 2,
        borderLeftWidth: 1.5,
        borderBottomWidth: 1.5,
        borderRightWidth: 1,
        borderTopColor: 'rgba(15, 2, 0, 0.55)',       // Deep warm shadow along top edge
        borderLeftColor: 'rgba(15, 2, 0, 0.30)',      // Subtle left shadow
        borderBottomColor: 'rgba(255, 245, 235, 0.22)', // Soft warm bottom rim highlight
        borderRightColor: 'rgba(255, 245, 235, 0.12)',  // Subtle right highlight
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