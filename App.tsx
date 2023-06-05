import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import SpalshScreen from './src/screens/SpalshScreen'
import Navigation from './src/navigations'
import { useAppDispatch } from './src/components/redux/hook'
import { checkLogin } from './src/components/redux/slice/AuthSlice'

const App = () => {
  const dispatch=useAppDispatch();
  useEffect(() => {
    dispatch(checkLogin())
  }, )
  
  return (
   
    <Navigation/>
  
  )
}

export default App