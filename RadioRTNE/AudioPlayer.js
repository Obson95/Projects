import React, { useEffect, useState } from 'react';
import { View,Image,TouchableOpacity, StyleSheet, Button,Text  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

export default function App() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [liveIndicatorColor, setLiveIndicatorColor] = useState('gray');
  const [isLoading, setIsLoading] = useState(false);
  const radioUri = 'http://radio.newedensda.org:8000/_a';

  useEffect(() => {
    enableSoundInSilentMode(); // Call the function when the component mounts

    return () => {
      if (sound) {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
    };
  }, []);

  const enableSoundInSilentMode = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
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
      await setSound(newSound); // Await the setSound function call
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

    if (!sound) {
      await loadSound();
    }

    if (sound && sound._loaded) {
      await sound.playAsync();
      setIsPlaying(true);
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
    } else {
      console.log('Sound is not loaded yet');
    }
  };

  const handleVolumeChange = async (value) => {
    if (sound) {
      await sound.setVolumeAsync(value / 100);
      setVolume(value);
    }
  };

  return (
    <View style={styles.container}> 
    <View style={styles.card}>
      <Image
        source={require('./assets/images/RadioLogo.png')}
        style={styles.logo}
        resizeMode="cover"
      />
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
            onValueChange={handleVolumeChange}
          />
          <Icon name="volume-up" size={24} color="black" />
        </View>

        <Text style={[styles.liveText, { color: liveIndicatorColor }]}>Live</Text>
      </View>



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

