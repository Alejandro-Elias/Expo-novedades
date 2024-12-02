import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { Main } from './src/components/Main';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Main />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

