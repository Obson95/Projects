// BottomNavigator.js
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';

const Tab = createBottomTabNavigator();

export default function BottomNavigator({ setShowMiniPlayer }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Radio') {
            iconName = focused ? 'radio' : 'radio-outline';
          } else if (route.name === 'VideoPlayer') {
            iconName = focused ? 'videocam' : 'videocam-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Radio"
        component={AudioPlayer}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            // Show MiniPlayer when navigating to Radio screen
            setShowMiniPlayer(true);
          },
        })}
      />
      <Tab.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            // Show MiniPlayer when navigating to VideoPlayer screen
            setShowMiniPlayer(true);
          },
        })}
      />
    </Tab.Navigator>
  );
}
