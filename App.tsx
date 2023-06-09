import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import SpalshScreen from './src/screens/SpalshScreen'
import Navigation from './src/navigations'
import { useAppDispatch } from './src/components/redux/hook'
import { checkLogin } from './src/components/redux/slice/AuthSlice'
// import { GestureHandlerRootView} from 'react-native-gesture-handler'
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import { MagicSheetPortal } from 'react-native-magic-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
const App = () => {
  const dispatch=useAppDispatch();
  useEffect(() => {
    dispatch(checkLogin())
  }, )
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <BottomSheetModalProvider>
    <MagicSheetPortal /> 
    <Navigation/>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  
  )
}

export default App