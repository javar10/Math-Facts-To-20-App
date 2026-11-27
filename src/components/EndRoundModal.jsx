import React, { useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {COLORS, FONTS} from '../constants/theme';

const EndRoundModal = ({ visible, roundResult, correctAnswers, onPlayAgain, onExit }) => {


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
            ? <View>
              <Text style={styles.title}>
                You saved the turkey!
              </Text>
              <Image
                source={require('../assets/turkey_happy.png')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            :
            <View>
              <Text style={styles.title}>
                Oh no! {'\n'}
                Looks like it's turkey for dinner.{'\n'}
                {/* Try again! */}
              </Text>
              <Image
                source={require('../assets/turkey_dinner.png')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
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
    fontFamily: FONTS.bold,
    fontSize: 28,
    // fontWeight: '800',
    color: COLORS.textPrimary,
    // marginBottom: 24,
    textAlign: 'center',
    lineHeight: 36,
  },
  // scoreLabel: {
  //   fontSize: 16,
  //   color: '#6B7280',
  // },
  // scoreValue: {
  //   fontSize: 48,
  //   fontWeight: '700',
  //   color: '#3B82F6',
  //   marginVertical: 16,
  // },
  image: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: 24,
  },

  primaryButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    fontFamily: FONTS.bold,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.secondary,
    fontFamily: FONTS.bold,
    fontSize: 20,
    // fontWeight: '600',
  },
  // secondaryButton: {
  //   width: '100%',
  //   paddingVertical: 12,
  //   alignItems: 'center',
  // },
  // secondaryButtonText: {
  //   color: '#6B7280',
  //   fontSize: 16,
  //   fontWeight: '600',
  // },
});


