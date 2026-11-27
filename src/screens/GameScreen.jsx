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
import { COLORS, FONTS } from '../constants/theme'
import { getDifficultyTargets } from '../constants/savedOptions'
import PlayButtons from '../components/PlayButtons'
import DURATION_SECONDS from '../constants/gameDuration'


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
  const [hasStarted, setHasStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(DURATION_SECONDS);

  const generateNewProblem = (selectedAnswer) => {
    setQuestionCount((prev) => prev + 1);
    if (selectedAnswer === answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  // When settings change:
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

  // When restarting game:
  const handlePlayAgain = () => {
    setCorrectAnswers(0);
    setIsTimeUp(false);
    setRoundResult(null);
    setIsRunning(false);
    setHasStarted(false);
    setSecondsLeft(DURATION_SECONDS);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <EndRoundModal
          visible={roundResult !== null}
          roundResult={roundResult}
          correctAnswers={correctAnswers}
          onPlayAgain={handlePlayAgain}
        />
        {isRunning ?
          <View style={styles.gamePlayContainer}>
            <TurkeyAnimation
              correctAnswers={correctAnswers}
              targetNumber={targetNumber}
            />
            <View style={{ width: '100%', alignItems: 'center' }}>
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

              <CountdownTimer
                setIsTimeUp={setIsTimeUp}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                correctAnswers={correctAnswers}
                targetNumber={targetNumber}
                secondsLeft={secondsLeft}
                setSecondsLeft={setSecondsLeft}
              />

              <PlayButtons
                operation={operation}
                setOperation={setOperation}
                setIsTimeUp={setIsTimeUp}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                setCorrectAnswers={setCorrectAnswers}
                hasStarted={hasStarted}
                setHasStarted={setHasStarted}
                secondsLeft={secondsLeft}
                setSecondsLeft={setSecondsLeft}
              />
            </View>

          </View>
          :
          <View style={styles.startScreenContainer}>

            <Image
              source={require('../assets/turkey_start.png')}
              style={styles.turkeyImage}
              resizeMode="contain"
            />
            <PlayButtons
              style={!hasStarted && styles.homePlayControls}
              buttonStyle={!hasStarted && styles.homeStartButton}
              textStyle={!hasStarted && styles.homeStartButtonText}
              operation={operation}
              setOperation={setOperation}
              setIsTimeUp={setIsTimeUp}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              setCorrectAnswers={setCorrectAnswers}
              hasStarted={hasStarted}
              setHasStarted={setHasStarted}
              secondsLeft={secondsLeft}
              setSecondsLeft={setSecondsLeft}
            />
            <Text style={styles.title}>Hurry! Hurry! Save the turkey!</Text>
            {!hasStarted ?
              <OptionsScreen
                operation={operation}
                setOperation={setOperation}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
              />
              : null}
          </View>
        }
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
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  startScreenContainer: {
    flex: 1, 
    minHeight: 0, 
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  homePlayControls: {
    // marginBottom: 20, // Extra space separating the button from OptionsScreen below it
  },
  homeStartButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 4,
    paddingHorizontal: 72,
    borderRadius: 12,
  },
  homeStartButtonText: {
    fontSize: 48,
  },
  gamePlayContainer: {
    flex: 1,  
    minHeight: 0, 
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 8, 
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginVertical: 16,
  },
  turkeyImage: {
    flex: 1,
    width: '100%',
    height: undefined,
    aspectRatio: 1, 
    maxHeight: '65%', 
    alignSelf: 'center',
    padding: 24,
  },
  choicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    width: '100%', 
    alignSelf: 'center',
    paddingVertical: 8, 
    paddingHorizontal: 8,
  },

})