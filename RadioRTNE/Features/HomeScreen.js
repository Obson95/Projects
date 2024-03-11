import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const handleRadioPress = () => {
    // Navigate to the radio screen
    navigation.navigate('Radio');
  };

  const handleVideoPress = () => {
    // Navigate to the live stream video screen
    navigation.navigate('VideoPlayer');
  };

  const handleYouTubePress = () => {
    // Open the YouTube channel link
    // You can use Linking API to open external links
    // Example: Linking.openURL('https://www.youtube.com/channel/YOUR_CHANNEL_ID');
  };

  const handleFourthCardPress = () => {
    // Handle the press action for the fourth card (undecided)
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <TouchableOpacity onPress={handleRadioPress} style={styles.card}>
        <Ionicons name={Platform.OS === 'ios' ? 'radio-outline' : 'radio-button-on'} size={100} color="red" />

        </TouchableOpacity>

        <TouchableOpacity onPress={handleVideoPress} style={styles.card}>
          <Ionicons name={Platform.OS === 'ios' ? 'videocam-outline' : 'videocam'} size={100} color="blue" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleYouTubePress} style={styles.card}>
          <Ionicons name={Platform.OS === 'ios' ? 'logo-youtube' : 'md-logo-youtube'} size={100} color="red" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFourthCardPress} style={styles.card}>
          <Ionicons name={Platform.OS === 'ios' ? 'card-outline' : 'card'} size={100} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: 'row', // Arrange cards horizontally
    flexWrap: 'wrap', // Wrap cards to next line if needed
    justifyContent: 'center', // Center cards horizontally
    alignItems: 'center', // Center cards vertically
  },
  card: {
    width: 150,
    height: 150,
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
    marginHorizontal: 10, // Add spacing between cards
  },
});

export default HomeScreen;
