import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const TurkeyAnimation = () => {
  return (
        <View>
          <Image
            source={require('../assets/turkey.jpeg')}
            style={styles.turkeyImage}
          />
        </View>
  )
}

export default TurkeyAnimation

const styles = StyleSheet.create({
    turkeyImage: {
        width: 200,
        height: 200,
    }
})