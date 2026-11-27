import { StyleSheet, Text, View } from 'react-native'
import OperationButton from '../components/OperationButton'
import { operationOptions, difficultyOptions } from '../constants/savedOptions'
import DifficultyButton from '../components/DifficultyButton'
import { COLORS, FONTS } from '../constants/theme'

const OptionsScreen = ({ operation, setOperation, difficulty, setDifficulty }) => {

  return (
    <View style={styles.optionsContainer}>
      <Text style={styles.title}>Mode</Text>
      <View style={styles.buttonContainer}>
        {operationOptions.map((operationOption) => (
          <OperationButton
            key={operationOption}
            label={operationOption}
            operation={operation}
            setOperation={setOperation}
          />
        ))}
      </View>

      <Text style={styles.title}>Level</Text>
      <View style={styles.buttonContainer}>
        {difficultyOptions.map((difficultyOption) => (
          <DifficultyButton
            key={difficultyOption}
            label={difficultyOption}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        ))}
      </View>
    </View>
  )
}

export default OptionsScreen

const styles = StyleSheet.create({
  optionsContainer: {
    alignSelf: 'center',
    maxWidth: '95%',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    gap: 12,
    // iOS drop shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    // Android drop shadow
    elevation: 5,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 36,
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
})