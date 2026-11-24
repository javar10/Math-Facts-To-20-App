import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MathProblem from '../components/MathProblem'
import AnswerButton from '../components/AnswerButton'
import answerChoices from '../constants/answerChoices'
import TurkeyAnimation from '../components/TurkeyAnimation'
import CountdownTimer from '../components/CountdownTimer'
import EndRoundModal from '../components/EndRoundModal'
import COLORS from '../constants/colors'


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
          difficulty={difficulty}
          onPlayAgain={handlePlayAgain}
          onExit={() => navigation?.goBack()}
        />
        <TurkeyAnimation
          correctAnswers={correctAnswers}
          difficulty={difficulty}
        />

        {isRunning ?
          <View>
            <MathProblem
              setAnswer={setAnswer}
              questionCount={questionCount}
            />
            {/* <Text>Answer: {answer}</Text>
          <Text>Question Count: {questionCount}</Text>
          <Text>Correct Answers: {correctAnswers}</Text> */}
            <View style={styles.choicesContainer}>
              {answerChoices.map((choice) => (
                <AnswerButton
                  key={choice}
                  label={choice}
                  answer={answer}
                  onPress={() => { generateNewProblem(choice) }}
                />
              ))}
            </View>
          </View>
          : null}


        <CountdownTimer
          isTimeUp={isTimeUp}
          setIsTimeUp={setIsTimeUp}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          correctAnswers={correctAnswers}
          setCorrectAnswers={setCorrectAnswers}
          difficulty={difficulty}
        />
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
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
    justifyContent: 'space-between', // Distributes top, middle, and bottom across full height
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  choicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    width: '100%',                     // Controls how wide the horizontal divider lines stretch
    alignSelf: 'center',              // Centers the container and lines on the screen
    paddingVertical: 16,              // Space between the top/bottom lines and the buttons
    paddingHorizontal: 8,
    borderTopWidth: 1,                // Thin horizontal line above (or use StyleSheet.hairlineWidth)
    borderBottomWidth: 1,             // Thin horizontal line below
    borderColor: COLORS.textSecondary // Adjust to match your theme (e.g., COLORS.textSecondary)
  },

})