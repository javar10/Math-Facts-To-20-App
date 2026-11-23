import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OptionsScreen from './src/screens/OptionsScreen';
import GameScreen from './src/screens/GameScreen';
import COLORS from './src/constants/colors';


export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      {/* <OptionsScreen /> */}
      <GameScreen />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
