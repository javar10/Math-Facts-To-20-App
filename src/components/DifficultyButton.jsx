import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const DifficultyButton = ({ label, setDifficulty }) => {
    return (
        <TouchableOpacity onPress={() => setDifficulty(label)}>
            <Text>{label}</Text>
        </TouchableOpacity>
    )
}

export default DifficultyButton

const styles = StyleSheet.create({})