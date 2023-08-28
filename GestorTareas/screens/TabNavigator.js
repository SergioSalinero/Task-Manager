// TabNavigator.js file is dedicated to define basic screens Home and Profile navigation.

// React imports.
import * as React from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens components imports.
import Home from './Home'
import Profile from './Profile';

// Create bottom tab navigator component
const Tab = createBottomTabNavigator();

export default function Lobby() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.navigator
      }}
    >
      <Tab.Screen
        name="Tareas"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home" size={focused ? 29 : 24} color={focused ? '#0782F9' : 'black'} style={styles.iconStyle} />
          ),
          tabBarLabelStyle: styles.tabBarTextStyle
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="person" size={focused ? 29 : 24} color={focused ? '#0782F9' : 'black'} style={styles.iconStyle} />
          ),
          tabBarLabelStyle: styles.tabBarTextStyle
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navigator: {
    height: 70
  },
  tabBarTextStyle: {
    fontSize: 14,
    marginBottom: 5
  },
  iconStyle: {
    paddingTop: 10
  }
});