import { StyleSheet, Text, View, Image } from 'react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MathProblem from '../components/MathProblem'
import AnswerButton from '../components/AnswerButton'
import answerChoices from '../constants/answerChoices'
import TurkeyAnimation from '../components/TurkeyAnimation'
import CountdownTimer from '../components/CountdownTimer'
import EndRoundModal from '../components/EndRoundModal'


const GameScreen = () => {
  const difficulty = 5;
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const generateNewProblem = (selectedAnswer) => {
    setQuestionCount((prev) => prev + 1);
    if (selectedAnswer === answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handlePlayAgain = () => {
    setCorrectAnswers(0);
    setIsTimeUp(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <EndRoundModal
          visible={isTimeUp || correctAnswers === difficulty}
          correctAnswers={correctAnswers}
          onPlayAgain={handlePlayAgain}
          onExit={() => navigation?.goBack()}
        />
        {isRunning ? <View>
          <MathProblem
            setAnswer={setAnswer}
            questionCount={questionCount}
          />
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
        </View> : null}
        <TurkeyAnimation />

        <CountdownTimer
          isTimeUp={isTimeUp}
          setIsTimeUp={setIsTimeUp}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          correctAnswers={correctAnswers}
          difficulty={difficulty}
        />
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
    </SafeAreaView>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: 'space-between', // Distributes top, middle, and bottom across full height
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

})