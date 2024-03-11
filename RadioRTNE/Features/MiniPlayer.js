import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MiniPlayer = ({ isPlaying, onPause, onClose }) => {
  const handlePlayPause = () => {
    onPause(); // Call the onPause function from props
  };

  const handleClose = () => {
    onClose(); // Call the onClose function from props
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePlayPause} style={styles.button}>
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="black" />
      </TouchableOpacity>
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
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    marginHorizontal: 10,
  },
});

export default MiniPlayer;
