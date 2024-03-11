import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import { debounce } from 'lodash';
import { Audio } from 'expo-av';
import MiniPlayer from './MiniPlayer';

export default function App() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [liveIndicatorColor, setLiveIndicatorColor] = useState('gray');
  const [isLoading, setIsLoading] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const radioUri = 'http://radio.newedensda.org:8000/_a';

  // Define handleVolumeChange function
  const handleVolumeChange = async (value) => {
    if (sound) {
      await sound.setVolumeAsync(value / 100);
      setVolume(value);
    }
  };

  // Debounce handleVolumeChange function
  const debouncedHandleVolumeChange = debounce(handleVolumeChange, 0);

  useEffect(() => {
    enableSoundInSilentMode(); // Call the function when the component mounts

    // Cleanup function
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    // Load sound when component mounts
    loadSound();
  }, []);

  useEffect(() => {
    // Check if sound is loaded and automatically play it
    if (sound && sound._loaded) {
      playSound();
    }
  }, [sound]);

  const enableSoundInSilentMode = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX = 1,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX = 1,
      });
    } catch (error) {
      console.error('Error setting audio mode:', error);
    }
  };

  const loadSound = async () => {
    if (sound) {
      return; // If sound is already loaded, do nothing
    }

    try {
      setIsLoading(true);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: radioUri },
        { shouldPlay: false } // Don't auto-play the sound
      );
      setSound(newSound); // Set the sound
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading sound:', error);
      setIsLoading(false);
    }
  };

  const playSound = async () => {
    if (isLoading || isPlaying) {
      return; // If sound is currently loading or playing, do not proceed
    }

    if (sound && sound._loaded) {
      await sound.playAsync();
      setIsPlaying(true);
      setLiveIndicatorColor('red');
      setShowMiniPlayer(true); // Show MiniPlayer when sound starts playing
    } else {
      console.log('Sound is not loaded yet');
    }
  };

  const pauseSound = async () => {
    if (isLoading || !isPlaying) {
      return; // If sound is currently loading or not playing, do not proceed
    }

    if (sound && sound._loaded) {
      await sound.pauseAsync();
      setIsPlaying(false);
      setLiveIndicatorColor('gray');
    } else {
      console.log('Sound is not loaded yet');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../assets/images/RadioLogo.png')}
          style={styles.logo}
          resizeMode="cover"/>
      </View>

      <View style={styles.controlsContainer}>
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => (isPlaying ? pauseSound() : playSound())} style={styles.controlButton}>
            <Icon name={isPlaying ? 'pause' : 'play-arrow'} size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.volumeContainer}>
          <Icon name="volume-down" size={24} color="black" />
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={volume}
            onValueChange={debouncedHandleVolumeChange}
          />
          <Icon name="volume-up" size={24} color="black" />
        </View>

        <Text style={[styles.liveText, { color: liveIndicatorColor }]}>Live</Text>
        
      </View>
   
      {showMiniPlayer && <MiniPlayer isPlaying={isPlaying} onPause={pauseSound} onClose={() => setShowMiniPlayer(false)} />}

    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  card: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 20,
  },
  logo: {
    width: '80%',
    height: '80%',
    borderRadius: 15,
  },
  controlsContainer: {
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 10,
    elevation: 20,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  slider: {
    width: 250,
    height: 40,
    marginHorizontal: 10,
  },
  liveText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
});