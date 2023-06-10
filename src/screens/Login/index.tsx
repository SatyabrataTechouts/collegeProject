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

import {getApps, initializeApp} from 'firebase/app';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

import * as Animatable from 'react-native-animatable';

const thems = theme.colors;
const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmation, setConfirmation] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  console.log('phoneNumber', phoneNumber);
  //   if (getApps().length === 0) {
  //     const firebaseConfig = {
  //       apiKey: 'AIzaSyCXqdu2nhRE6FGVuprD1glbCJS_Xcvw90k',
  //       authDomain:
  //         '498449385469-on8ib26v0lpvj2latsc3arsnib2hs49g.apps.googleusercontent.com',
  //       projectId: 'foodapp-db4be',
  //       storageBucket: 'foodapp-db4be.appspot.com',
  //       messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  //       appId: '1:498449385469:android:51a87ddac61e7ad4883b94',
  //       measurementId: 'YOUR_MEASUREMENT_ID', // Optional: if you have enabled Firebase Analytics
  //     };

  //     const app = initializeApp(firebaseConfig);
  //   }
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const confirmationResult = await auth().signInWithPhoneNumber(
        phoneNumber,
      );
      setConfirmation(confirmationResult);

      Alert.alert('OTP Sent!', 'Please check your phone for the OTP.');
      navigation.navigate('OTPVERIFY', {phoneNumber: phoneNumber});
      setLoading(false);
    } catch (error) {
      console.log('Sign-in error:', error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: thems.profileColor,
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View style={{padding: 23}}>
        <Pressable onPress={() => navigation.navigate('BOTTOMTAB')}>
          <Ionicons
            name="ios-chevron-back-circle-sharp"
            color={thems.backIcon}
            size={30}
          />
        </Pressable>
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
        <View style={{alignItems: 'center'}}>
          <CustumInput
            prefix={true}
            maxChar={10}
            keyboardType={'phone-pad'}
            width={270}
            height={50}
            color={'#FFFF'}
            onHandleChange={val => setPhoneNumber(`+91${val}`)}
          />
        </View>
      </View>
      <View style={{alignItems: 'center', marginBottom: 25}}>
        <CustumButton
          buttonName="Otp Verify"
          height={60}
          width={150}
          color={theme.colors.signInButton}
          onPress={handleSignIn}
        />
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
              style={{height: 180, width: 190}}
            />
          </Animatable.View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:300,
    height:120
  },
  carContainer: {
    width: 300,
    height: 50,
   
  },
});
