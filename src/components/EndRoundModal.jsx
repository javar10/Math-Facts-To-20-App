import React, { useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';

const EndRoundModal = ({ visible, roundResult, correctAnswers, difficulty, onPlayAgain, onExit }) => {
  
  
  // useEffect(() => {
  //   if (visible) {
  //     console.log('Round ended! Saving correct answers:', correctAnswers);
  //   }
  // }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>

          {roundResult === 'win'
            ? <Text style={styles.title}>You saved the turkey!</Text>
            : <Text style={styles.title}>Oh no! Looks like it's turkey for dinner. Try again!</Text>
          }

          {/* <Text style={styles.scoreLabel}>Final Score</Text>
          <Text style={styles.scoreValue}>{correctAnswers}</Text> */}

          <TouchableOpacity style={styles.primaryButton} onPress={onPlayAgain}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>

          {/* {onExit && (
            <TouchableOpacity style={styles.secondaryButton} onPress={onExit}>
              <Text style={styles.secondaryButtonText}>Back to Menu</Text>
            </TouchableOpacity>
          )} */}
        </View>
      </View>
    </Modal>
  );
};

export default EndRoundModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#3B82F6',
    marginVertical: 16,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
});


