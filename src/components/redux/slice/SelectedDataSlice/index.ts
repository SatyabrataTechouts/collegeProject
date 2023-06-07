import { View, Text } from 'react-native'
import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import Data from '../../../../../Json/AllProduct.json'
import { InitialState } from '@react-navigation/native'
interface  initialStateProp{
    selectedDate:Array<any>
}
const initialState:initialStateProp={
    selectedDate:[]
}
const SelectedDataSlice = createSlice({
    name:'data',
    initialState,
    reducers:{
        AddToSelected:(state,actions)=>{
            
            const check=Data.filter((value)=>value.fkey==actions.payload);
            
             state.selectedDate=check
          
        }
    }
})
export  const {AddToSelected}=SelectedDataSlice.actions
export default SelectedDataSlice.reducer;