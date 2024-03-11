import React from 'react';
import { Video } from 'expo-av';
import { View, StyleSheet } from 'react-native';

export default function LiveStreamPlayer() {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: 'http://example.com/live/stream' }}
        style={styles.video}
        useNativeControls // Use native playback controls
        resizeMode="cover" // Video will cover the entire container
        isLive // Indicates that the video source is a live stream
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
