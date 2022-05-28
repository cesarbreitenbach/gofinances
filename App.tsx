import React from 'react';
import {StatusBar} from 'react-native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
 } from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'; 
import { AppRoutes } from './src/Routes/app.routes';

import {Signin} from './src/screens/Signin';

import { AuthProvider } from './src/hooks/auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  }); 

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme} > 
      <StatusBar barStyle="light-content" translucent />
      <NavigationContainer>
        <AuthProvider> 
           <Signin />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  )
}

