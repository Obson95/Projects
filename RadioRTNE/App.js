import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Features/HomeScreen';
import AudioPlayer from './Features/AudioPlayer';
import BottomNavigator from './Features/BottomNavigator';
import VideoPlayer from './Features/VideoPlayer';
import MiniPlayer from './Features/MiniPlayer'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomNavigator" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Radio" component={AudioPlayer} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        {/* Render MiniPlayer as a screen within the stack navigator */}
       
      </Stack.Navigator>
      <MiniPlayer   />
    </NavigationContainer>
  );
}
