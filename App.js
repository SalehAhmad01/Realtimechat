import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './src/core/fontawesome';


import SplashScreen from './src/screens/Splash';
import Home from './src/screens/Home';
import SignUp from './src/screens/SignUp';
import Message from './src/screens/Message';
import Search from './src/screens/Search';
import SignIn from './src/screens/SignIn';
import Requests from './src/screens/Requests';
import useGlobal from './src/core/global';

const LightTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: 'white' },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const initialized = useGlobal(state => state.initialized);

  const authenticated = useGlobal((state) => state.authenticated);
  
  const init = useGlobal(state => state.init)

	useEffect(() => {
		init()
	}, [])
 

  

  return (
    <NavigationContainer theme={LightTheme}>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!initialized ?(
          <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          </>
        )
        : !authenticated ? (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Message" component={Message} />
            <Stack.Screen name="Requests" component={Requests} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
