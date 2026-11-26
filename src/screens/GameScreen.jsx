import { StyleSheet, Text, View, Image } from 'react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MathProblem from '../components/MathProblem'
import AnswerButton from '../components/AnswerButton'
import answerChoices from '../constants/answerChoices'
import TurkeyAnimation from '../components/TurkeyAnimation'
import CountdownTimer from '../components/CountdownTimer'
import EndRoundModal from '../components/EndRoundModal'
import OptionsScreen from './OptionsScreen'
import { COLORS } from '../constants/theme'
import { getDifficultyTargets } from '../constants/savedOptions'


const GameScreen = () => {
  const [operation, setOperation] = useState('addition');
  const [difficulty, setDifficulty] = useState('medium');
  const [targetNumber, setTargetNumber] = useState(15);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [roundResult, setRoundResult] = useState(null);

  const generateNewProblem = (selectedAnswer) => {
    setQuestionCount((prev) => prev + 1);
    if (selectedAnswer === answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  //When settings change:
  useEffect(() => {
    setTargetNumber(getDifficultyTargets(operation)[difficulty]);
  }, [difficulty, operation]);

  // When player wins:
  useEffect(() => {
    if (correctAnswers === targetNumber && targetNumber > 0) {
      setRoundResult('win');
    }
  }, [correctAnswers, targetNumber]);

  // When time runs out:
  useEffect(() => {
    if (isTimeUp) {
      setRoundResult('lose');
    }
  }, [isTimeUp]);

  const handlePlayAgain = () => {
    setCorrectAnswers(0);
    setIsTimeUp(false);
    setRoundResult(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <EndRoundModal
          visible={roundResult !== null}
          roundResult={roundResult}
          correctAnswers={correctAnswers}
          onPlayAgain={handlePlayAgain}
        // onExit={() => navigation?.goBack()}
        />
        {isRunning ?
          <View>
            <TurkeyAnimation
              correctAnswers={correctAnswers}
              targetNumber={targetNumber}
            />
            <View>
              <MathProblem
                setAnswer={setAnswer}
                questionCount={questionCount}
                operation={operation}
              />
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
          </View>
          :
          <View>
            <Image
              source={require('../assets/turkey_start.png')}
              style={styles.turkeyImage}
              resizeMode="contain"
            />
            <OptionsScreen
              setOperation={setOperation}
              setDifficulty={setDifficulty}
            />
          </View>
        }

        <CountdownTimer
          isTimeUp={isTimeUp}
          setIsTimeUp={setIsTimeUp}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          correctAnswers={correctAnswers}
          setCorrectAnswers={setCorrectAnswers}
          targetNumber={targetNumber}
        />

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
    justifyContent: 'space-between',
    alignItems: 'center',     // Centers all children horizontally
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  turkeyImage: {
    flex: 1,
    width: '95%',
    height: undefined, // Overrides the image's small native pixel height so it scales up
    aspectRatio: 1,    // Adjust if your image isn't square (e.g., 3 / 4 or 4 / 3)
    maxHeight: '65%',  // Prevents it from squeezing CountdownTimer at the bottom
    alignSelf: 'center',
    padding: 24,
  },
  choicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    width: '100%',                     // Controls how wide the horizontal divider lines stretch
    alignSelf: 'center',              // Centers the container and lines on the screen
    paddingVertical: 8,              // Space between the top/bottom lines and the buttons
    paddingHorizontal: 8,
    // borderTopWidth: 1,                // Thin horizontal line above (or use StyleSheet.hairlineWidth)
    // borderBottomWidth: 1,             // Thin horizontal line below
    // borderColor: COLORS.textSecondary // Adjust to match your theme (e.g., COLORS.textSecondary)
  },

})