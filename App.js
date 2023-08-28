// App.js Main file dedicated to render app funcionality. 
//In particular, it create a stack navigation, allowing the initial navigation between screens.

// React imports.
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens components imports.
import Login from './screens/Login';
import Lobby from './screens/TabNavigator';
import Signup from './screens/Signup';

// Create stack navigation (react-navigation framework).
const Stack = createNativeStackNavigator();

export default function App() {

  // App view.
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Lobby" component={Lobby} />
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}