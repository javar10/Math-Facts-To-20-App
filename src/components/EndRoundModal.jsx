import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

const EndRoundModal = ({ visible, roundResult, onPlayAgain }) => {

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
                Too slow! {'\n'}
                Looks like it's turkey for dinner.{'\n'}
              </Text>
              <Image
                source={require('../assets/turkey_dinner.png')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          }

          <TouchableOpacity style={styles.primaryButton} onPress={onPlayAgain}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
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
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 36,
  },
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
  },
});


