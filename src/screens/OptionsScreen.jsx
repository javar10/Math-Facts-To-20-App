import { StyleSheet, Text, View } from 'react-native'
import OperationButton from '../components/OperationButton'
import { getDifficultyTargets, operationOptions, difficultyOptions } from '../constants/savedOptions'
import DifficultyButton from '../components/DifficultyButton'
import { useEffect } from 'react'
import { COLORS, FONTS } from '../constants/theme'
// import { getDifficultyTargets } from '../constants/savedOptions'

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



      {/* <Text>Difficulty</Text> */}
      {/* <DifficultyButton /> */}


      {/* game settings menu
      -difficulty level
      -5, 10, or 20
      -addition, subtraction, or both
      -start game button
      */}
    </View>
  )
}

export default OptionsScreen

const styles = StyleSheet.create({
   optionsContainer: {
    alignSelf: 'center',
    maxWidth: '85%',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    // marginVertical: 8,
    // iOS drop shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    // Android drop shadow
    elevation: 5,
    gap: 12,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    // marginBottom: 24,
    textAlign: 'center',
    lineHeight: 36,
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centers the row horizontally
    alignItems: 'center',
    flexWrap: 'wrap',         // Wraps to a second line if buttons overflow narrow screens
    gap: 10,                  // Adds even spacing between buttons
    marginBottom: 8,
  },
})