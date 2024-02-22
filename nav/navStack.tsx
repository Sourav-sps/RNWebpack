import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../app/Profile';
import Settings from '../app/Settings';
import Home from '../app/Home';

const Stack = createNativeStackNavigator();

const NavStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default NavStack;
