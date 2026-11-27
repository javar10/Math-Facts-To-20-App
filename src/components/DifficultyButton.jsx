import { TouchableOpacity, View, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { COLORS } from '../constants/theme';

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
    const iconColor = isSelected ? COLORS.primary : COLORS.secondary;

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
        width: 96, 
        height: 40,
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
    featherRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
    },
});
