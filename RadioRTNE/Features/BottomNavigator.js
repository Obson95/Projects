// BottomNavigator.js
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native'; // Import Platform from react-native
import HomeScreen from './HomeScreen';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';


const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
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
        tabBarActiveTintColor: 'tomato', // Migrated from tabBarOptions
        tabBarInactiveTintColor: 'gray', // Migrated from tabBarOptions
        tabBarStyle: [
          { display: 'flex' }, // Migrated from tabBarOptions
          null // Migrated from tabBarOptions
        ]
      })}
    >

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Radio" component={AudioPlayer} />
      <Tab.Screen name="VideoPlayer" component={VideoPlayer} />
     
    </Tab.Navigator>
  );
}
