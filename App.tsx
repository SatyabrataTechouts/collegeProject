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
import firebase, { getApps, initializeApp } from 'firebase/app';
import 'firebase/auth';
 import  'firebase/firestore';

// import other Firebase services if needed

const firebaseConfig = {
  apiKey: 'AIzaSyCXqdu2nhRE6FGVuprD1glbCJS_Xcvw90k',
  authDomain: '498449385469-on8ib26v0lpvj2latsc3arsnib2hs49g.apps.googleusercontent.com',
  projectId: 'foodapp-db4be',
  storageBucket: 'foodapp-db4be.appspot.com',
  messagingSenderId: '498449385469',
  appId: '1:498449385469:android:51a87ddac61e7ad4883b94',
};

if (!getApps().length) {
 initializeApp(firebaseConfig);
}
export const firestore = firebase.firestore();
// export const firestore = firebase.firestore();
// export const auth:any =firebase.auth();
// export const firestore = firebase.firestore();
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