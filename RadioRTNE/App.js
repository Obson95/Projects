import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AudioPlayer from './AudioPlayer';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app959!</Text>
      <StatusBar style="auto" />
      <AudioPlayer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
