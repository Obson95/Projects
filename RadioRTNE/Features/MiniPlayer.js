import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MiniPlayer = ({ isPlaying, onPause, onClose, onTogglePlayPause, volume, onVolumeChange, liveIndicatorColor }) => {
 
   const  handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onTogglePlayPause(); // Play the audio when the button is pressed
    }
  };

  const handleClose = () => {
    onTogglePlayPause();
    onClose();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePlayPause} style={styles.button}>
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="black" />
      </TouchableOpacity>
      <Text style={[styles.liveText, { color: liveIndicatorColor }]}>Live</Text>
      <TouchableOpacity onPress={handleClose} style={styles.button}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    marginHorizontal: 10,
  },
  liveText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
});

export default MiniPlayer;


