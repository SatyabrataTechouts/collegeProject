import {
  View,
  Text,
  Pressable,
  Alert,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../utils/theme';
import CText from '../../components/Ctext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import CustumInput from '../../components/CustumInput';
import CustumButton from '../../components/CustumButton';
import firestore from '@react-native-firebase/firestore';
import {getApps, initializeApp} from 'firebase/app';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

import * as Animatable from 'react-native-animatable';
import {ImageBackground} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../components/redux/hook';

const thems = theme.colors;
const Login = () => {
  // const  dispatch=useAppDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [confirmation, setConfirmation] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const uid=useAppSelector(state=>state.AuthData.uid);
 
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber); // Replace with the user's phone number
      // Save the confirmation object for later use
  
      // Navigate to the OTP verification screen
      // Pass the confirmation object as a parameter to the OTP verification screen
      console.log('confo', confirmation);
      Alert.alert(uid);
      const user = await firestore().collection('userAccount').doc(uid).get();
      console.log('==userssa', user);
      navigation.navigate('OTPVERIFY', {confirmation: confirmation });
      setLoading(false);
    } catch (error) {
      console.log('Mobile number sign-in error:', error);
      // Handle sign-in error, such as displaying an error message
    }
  };

  return (
    <ImageBackground
      source={require('../../../Assets/loginbackground1.jpg')}
      style={{
        backgroundColor: thems.profileColor,
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View style={{padding: 23}}>
        <Pressable onPress={() => navigation.navigate('BOTTOMTAB')}>
          <Ionicons
            name="ios-chevron-back-circle-sharp"
            color={'#fff'}
            size={30}
            
          />
        </Pressable>
      </View>
      <View style={{right: 0, position: 'absolute', top: 20}}>
        <Image
          source={require('../../../Assets/loginbackground-removebg-preview.png')}
          style={{
            // height: 300,
            // width: 240,
            borderTopLeftRadius: 80,
            borderBottomLeftRadius: 80,
          }}
        />
      </View>
      <View>
        <CText
          text="Enter Your Mobile Number"
          style={{
            alignSelf: 'center',
            color: theme.colors.styleTextColor,
            marginVertical: 24,
            fontSize: 17,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            borderWidth: 0.83,
            borderColor: '#fff',
            width: 270,
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <CustumInput
            prefix={true}
            maxChar={10}
            keyboardType={'phone-pad'}
            width={270}
            height={50}
            color={theme.colors.signInButton}
            onHandleChange={val => setPhoneNumber(`+91${val}`)}
          />
        </View>
      </View>
      <View style={{alignItems: 'center', marginBottom: 25}}>
        <CustumButton
          buttonName="Sign IN"
          height={50}
          width={150}
          color={theme.colors.styleTextColor}
          backgroundColor={theme.colors.signInButton}
          onPress={handleSignIn}
        />
        <Pressable onPress={()=>navigation.navigate('SIGNUP')}>
          <CText
            text="dont have an account create an account?"
            style={{
              textDecorationLine: 'underline',
              color: 'blue',
              marginVertical: 23,
              fontSize: 15,
              letterSpacing: 0.54,
            }}
          />
        </Pressable>
      </View>

      <Modal
        visible={loading}
        transparent={true}
        animationType="fade"
        style={{opacity: 0}}>
        <View style={styles.modalContainer}>
          <Animatable.View
            animation="slideInRight"
            duration={1000}
            iterationCount="infinite"
            style={styles.carContainer}>
            <Image
              source={{
                uri: 'https://www.pngarts.com/files/7/Food-Delivery-Service-PNG-Transparent-Image.png',
              }}
              style={{height: 90, width: 90}}
            />
          </Animatable.View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default Login;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 120,
  },
  carContainer: {
    width: 300,
    height: 50,
  },
});
