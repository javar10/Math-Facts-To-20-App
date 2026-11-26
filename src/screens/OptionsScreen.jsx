import { StyleSheet, Text, View } from 'react-native'
import OperationButton from '../components/OperationButton'
import { getDifficultyTargets, operationOptions, difficultyOptions } from '../constants/savedOptions'
import DifficultyButton from '../components/DifficultyButton'
import { useEffect } from 'react'
// import { getDifficultyTargets } from '../constants/savedOptions'

const OptionsScreen = ({ setOperation, setDifficulty }) => {
  // useEffect(() => {
  //   getDifficultyTargets(operation);
  // }, [operation]);

  return (
    <View>
      {operationOptions.map((operation) => (
        <OperationButton
          key={operation}
          label={operation}
          setOperation={setOperation}
        />
      ))}

      {difficultyOptions.map((difficulty) => (
        <DifficultyButton
          key={difficulty}
          label={difficulty}
          setDifficulty={setDifficulty}
        />
      ))}


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

const styles = StyleSheet.create({})