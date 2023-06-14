import {View, Text, StyleSheet, Alert, ImageBackground, Image, Modal} from 'react-native';
import React, {useState, useRef} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {theme} from '../../utils/theme';
import CustumButton from '../../components/CustumButton';
import {firebase} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';
const OtpVerify = ({navigation, route}: any) => {
  const {phoneNumber} = route.params;
  const [loading,setLoading]=useState(false);
  const [otpDigits, setOtpDigits] = useState('');
  console.log('otpDigits', phoneNumber);
  const refs = Array.from({length: 6}, () => useRef(null));
  const digitsArray = otpDigits.split('');
  // console.log('confirmation',confirmation )
  const handleOtpInputChange = (text, index) => {
    const newDigitsArray = otpDigits.split('');
    newDigitsArray[index] = text;
    setOtpDigits(newDigitsArray.join(''));

    if (text === '' && index > 0) {
      refs[index - 1].current.focus();
    } else if (text !== '' && index < 5) {
      refs[index + 1].current.focus();
    }
  };
  const handleOTPVerification = async () => {
    // setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      const credential = auth.PhoneAuthProvider.credential(
        confirmation.verificationId,
        otpDigits,
      );
      await auth().signInWithCredential(credential);
      console.log('OTP verification successful');
      // setLoading(false);
      // Handle successful verification, such as navigating to the next screen
      Alert.alert('Success', 'OTP verification successful');
      navigation.navigate('BOTTOMTAB');
    } catch (error) {
      console.log('OTP verification error:', error);
      // Handle verification error, such as displaying an error message
      Alert.alert('Error', 'OTP verification failed');
    }
  };
  return (
    <ImageBackground
    source={require('../../../Assets/loginbackground1.jpg')}
      style={{
        backgroundColor: theme.colors.profileColor,
        flex: 1,
        justifyContent: 'center',
      }}>
      <View style={styles.otpContainer}>
        {Array.from({length: 6}, (_, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={digitsArray[index] || ''}
            onChangeText={text => handleOtpInputChange(text, index)}
            ref={refs[index]}
          />
        ))}
      </View>
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <CustumButton
          buttonName="Verify"
          height={50}
          width={120}
          backgroundColor={theme.colors.signInButton}
          onPress={handleOTPVerification}
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 30,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth:0.45,
    borderColor:'#fff',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: theme.colors.signInButton,
  },
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

export default OtpVerify;
