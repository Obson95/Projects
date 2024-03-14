import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Features/HomeScreen';
import AudioPlayer from './Features/AudioPlayer';
import BottomNavigator from './Features/BottomNavigator';
import VideoPlayer from './Features/VideoPlayer';
import MiniPlayer from './Features/MiniPlayer';
import { pauseSound, handleClose, handleTogglePlayPause, playSound } from './Features/AudioPlayer';
import { handlePlayPause,isPlaying, onPause, onClose, onTogglePlayPause, volume, onVolumeChange, liveIndicatorColor } from './Features/MiniPlayer';


const Stack = createStackNavigator();

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [liveIndicatorColor, setLiveIndicatorColor] = useState('gray');
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomNavigator" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Radio" component={AudioPlayer} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
      </Stack.Navigator>

    
      {
        <MiniPlayer 
        isPlaying={isPlaying} 
        onPause={pauseSound} 
        onClose={handleClose} 
        onTogglePlayPause={handleTogglePlayPause}
        liveIndicatorColor={liveIndicatorColor} />}

    </NavigationContainer>
  );
}
