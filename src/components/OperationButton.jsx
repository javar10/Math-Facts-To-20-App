import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { operations } from '../constants/savedOptions'

const OperationButton = ({ label, setOperation }) => {

    return (
        <TouchableOpacity onPress={() => setOperation(label)}>
            <Text>{label}</Text>
        </TouchableOpacity>
    )
}

export default OperationButton

const styles = StyleSheet.create({

})