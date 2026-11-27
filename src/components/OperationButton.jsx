import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { COLORS } from '../constants/theme';

const OperationButton = ({ label, operation, setOperation }) => {
    const isSelected = operation === label || operation === 'both';
    const iconName = label === 'addition' ? 'plus' : 'minus';
    const iconColor = isSelected ? COLORS.primary : COLORS.secondary;
    const otherOperation = label === 'addition' ? 'subtraction' : 'addition';

    const handlePress = () => {
        if (isSelected) {
            // If both were active, keep the other one; if only this one was active, deselect all (null)
            setOperation(operation === 'both' ? otherOperation : null);
        } else {
            // If the other one was active, make it 'both'; otherwise select just this one
            setOperation(operation === otherOperation ? 'both' : label);
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[styles.button, isSelected && styles.selectedButton]}
        >
            <FontAwesome5 name={iconName} size={20} color={iconColor} />
        </TouchableOpacity>
    );
};

export default OperationButton;

const styles = StyleSheet.create({
    button: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
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
});
