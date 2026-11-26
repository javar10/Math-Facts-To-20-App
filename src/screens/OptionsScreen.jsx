import { StyleSheet, Text, View } from 'react-native'

const OptionsScreen = () => {
  return (
    <View>
      <Text>Operation</Text>
      <OperationButton/>
      <Text>Difficulty</Text>
      <DifficultButton/>
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