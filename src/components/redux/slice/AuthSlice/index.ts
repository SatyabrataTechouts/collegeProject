import { createSlice } from "@reduxjs/toolkit";
import auth from '@react-native-firebase/auth'; 
export interface isLoggedState{
    isLogged:boolean;
    uid:string;
    orderPaGe:boolean;
}
 const initialState:isLoggedState={
    isLogged:false,
    uid:'',
    orderPaGe:true,
 }
const AuthSlice=createSlice({
    name:'AuthData',
    initialState,
    reducers:{
       checkLogin:(state)=>{
        const unsubscribe = auth().onAuthStateChanged(user => {
            if (user) {
              // User is logged in
              console.log('User is logged in:', user.uid);
             initialState.isLogged=true;
             initialState.uid=user.uid;
            } else {
              // User is not logged in
              console.log('User is not logged in');
            }
          });
        
          // To stop listening for authentication state changes, call the unsubscribe function
          // For example, you can unsubscribe when the component unmounts
        //   return unsubscribe;
        console.log(unsubscribe);
       },
       LogOut:() =>{
        try {
            auth().signOut();
            // User logged out successfully
            initialState.isLogged=false
          } catch (error) {
            console.log(error);
            // Handle any errors that occur during logout
          }
       },
       isOrderPage:()=>{
        initialState.orderPaGe=!initialState.orderPaGe;
       }
    }
})
export  const {checkLogin,LogOut,isOrderPage}=AuthSlice.actions
export default AuthSlice.reducer;