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
    },
    selectedButton: {
        backgroundColor: COLORS.secondary
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