import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SpalshScreen from '../screens/SpalshScreen';
// import { NativeScreenNavigationContainer } from 'react-native-screens';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import StackNavigation from './StackNavigation';
const Navigation = () => {
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    useEffect(() => {
		setTimeout(() => {
			setShowSplashScreen(false);
		}, 1000);
	}, []);
    if(showSplashScreen){
        return <SpalshScreen/>
    }
  return (
   <NavigationContainer>
     <StackNavigation/>
   </NavigationContainer>
  )
}

export default Navigation