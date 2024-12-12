import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { Main } from './src/components/Main';
export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <Main />
      </ScrollView>      
      <StatusBar style="inverted" backgroundColor='#1199ff' />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

