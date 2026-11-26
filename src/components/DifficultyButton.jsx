import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../constants/theme'

const DifficultyButton = ({ label, setDifficulty }) => {

    return (
        <TouchableOpacity
            onPress={() => setDifficulty(label)}
            style={styles.button}
        >
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    )
}

export default DifficultyButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.accent,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    selectedButton: {
        backgroundColor: COLORS.secondary
    },
    buttonText: {
        color: COLORS.textSecondary,
        fontFamily: FONTS.bold,
        fontSize: 20,
    }
})