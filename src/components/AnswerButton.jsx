import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'

const AnswerButton = ({ label, onPress }) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
  )
}

export default AnswerButton

const styles = StyleSheet.create({})