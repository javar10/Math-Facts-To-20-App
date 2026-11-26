import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { operations } from '../constants/savedOptions'
import { COLORS, FONTS } from '../constants/theme'

const OperationButton = ({ label, setOperation }) => {

    const buttonText = label === 'addition' ? '+' : label === 'subtraction' ? '-' : '+ / -'
     
     return (
         <TouchableOpacity
             onPress={() => setOperation(label)}
             style={styles.button}
         >
             <Text style={styles.buttonText}>{buttonText}</Text>
         </TouchableOpacity>
     )
 }

export default OperationButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.accent,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: COLORS.textSecondary,
        fontFamily: FONTS.bold,
        fontSize: 20,
    }
})