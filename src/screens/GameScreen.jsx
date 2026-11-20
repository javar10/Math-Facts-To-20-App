import { StyleSheet, Text, View, Image } from 'react-native'
import { useState, useEffect } from 'react'
import AnswerButton from '../components/AnswerButton'
import answerChoices from '../constants/answerChoices'

const GameScreen = () => {
  const maxSum = 10;
  const operation = 'both';
  const difficulty = 'medium';
  const [answer, setAnswer] = useState(null);
  const [problemText, setProblemText] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

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

  const generateNewProblem = (selectedAnswer) => {
    setQuestionCount((prev) => prev + 1);
    if (selectedAnswer === answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  return (
    <View>
      <Text>
        {problemText}
      </Text>
      <Text>Answer: {answer}</Text>
      <Text>Question Count: {questionCount}</Text>
      <Text>Correct Answers: {correctAnswers}</Text>
      <View>
        {answerChoices.map((choice) => (
          <AnswerButton
            key={choice}
            label={choice}
            answer={answer}
            onPress={() => { generateNewProblem(choice) }}
          />
        ))}
      </View>
      <View>
        <Image
          source={require('../assets/turkey.jpeg')}
          style={styles.turkeyImage}
        />
      </View>
      <Text>timer</Text>
      <Text>pause button</Text>
      {/* 
      -math problem, randomly generated based on settings
      -array of numbers as answer choices, based on settings
      -turkey image that tries to excape and moves with each correct answer
      -timer that counts down from 60 seconds, or until the turkey escapes
      -pause button that pauses the game and opens a menu with options to resume, restart, or go back to the main menu
      ----can only be paused once per game or the timer will continue to run in the background

      */}
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({})