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
            setOperation(operation === 'both' ? otherOperation : null);
        } else {
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
        borderTopColor: '#FFF6EB',
        borderLeftColor: '#FFECD6',
        borderBottomColor: '#D69F63',
        borderRightColor: '#E3B27B',
    },
    selectedButton: {
        backgroundColor: COLORS.secondary,

        // Bevel
        borderTopWidth: 2,
        borderLeftWidth: 1.5,
        borderBottomWidth: 1.5,
        borderRightWidth: 1,
        borderTopColor: 'rgba(15, 2, 0, 0.55)', 
        borderLeftColor: 'rgba(15, 2, 0, 0.30)', 
        borderBottomColor: 'rgba(255, 245, 235, 0.22)', 
        borderRightColor: 'rgba(255, 245, 235, 0.12)', 
    },
});
