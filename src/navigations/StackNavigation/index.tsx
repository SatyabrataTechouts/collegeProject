import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SpalshScreen from '../../screens/SpalshScreen';
import { ROUTES } from '../routes';
import Onbording from '../../screens/Onboarding';
import { useAppSelector } from '../../components/redux/hook';


const StackNavigation = () => {
    const stack=createStackNavigator();
    const isLogged=useAppSelector(state=>state.AuthData.isLogged)
  return (
   <stack.Navigator initialRouteName={isLogged?'BOTTOMTAB':'ONBOARDING'}>
     {
        Object.keys(ROUTES).map((name)=>{
            return(
                <stack.Screen
                key={name}
                name={name}
                options={{
                    title: ROUTES[name]?.title,
                    headerShown: false
                }}
                getComponent={() => ROUTES[name]?.component}
            />

        )})

        
     }
     
   </stack.Navigator>
  )
}

export default StackNavigation