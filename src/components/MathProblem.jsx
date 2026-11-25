import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import {COLORS, FONTS} from '../constants/theme'

const MathProblem = ({ setAnswer, questionCount }) => {
    const maxSum = 10;
    const operation = 'addition';
    const [problemText, setProblemText] = useState('');

    useEffect(() => {
        const currentOp =
            operation === 'both'
                ? Math.random() < 0.5
                    ? 'addition'
                    : 'subtraction'
                : operation;

        if (currentOp === 'addition') {
            const pairs = [];

            for (let num1 = 0; num1 <= maxSum; num1++) {
                for (let num2 = 0; num2 <= maxSum - num1; num2++) {
                    pairs.push([num1, num2]);
                }
            }
            const [num1, num2] = pairs[Math.floor(Math.random() * pairs.length)];

            setAnswer(num1 + num2);
            setProblemText(`${num1} + ${num2} = □`);
        } else if (currentOp === 'subtraction') {
            const pairs = [];

            for (let num1 = 0; num1 <= maxSum; num1++) {
                for (let num2 = 0; num2 <= num1; num2++) {
                    pairs.push([num1, num2]);
                }
            }
            const [num1, num2] = pairs[Math.floor(Math.random() * pairs.length)];

            setAnswer(num1 - num2);
            setProblemText(`${num1} - ${num2} = □`);
        }
    }, [questionCount]);

    return (
        <Text style={styles.text}>
            {problemText}
        </Text>
    )
}

export default MathProblem

const styles = StyleSheet.create({
    text: {
        fontFamily: FONTS.bold,
        fontSize: 64,
        color: COLORS.textPrimary,
        textAlign: 'center',
        letterSpacing: -0.5,
        marginVertical: 8,
    },
})