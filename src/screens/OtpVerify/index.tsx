import { View, Text ,StyleSheet,Alert} from 'react-native'
import React,{useState,useRef} from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { theme } from '../../utils/theme';
import CustumButton from '../../components/CustumButton';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
const OtpVerify = ({navigation,route}:any) => {
    const {phoneNumber}=route.params;
    const [otpDigits, setOtpDigits] = useState('');
      console.log('otpDigits', phoneNumber)
    const refs = Array.from({ length: 6 }, () => useRef(null));
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
            
           

          
            try {
                const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
                const credential = auth.PhoneAuthProvider.credential(
                  confirmation.verificationId,
                  otpDigits
                );
                await auth().signInWithCredential(credential);
                console.log('OTP verification successful');
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
    <View style={{backgroundColor:theme.colors.profileColor,flex:1,justifyContent:'center'}}>
    <View style={styles.otpContainer}>
    {Array.from({ length: 6 }, (_, index) => (
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
  <View style={{alignItems:'center',marginVertical:20}}>
  <CustumButton buttonName='Verify' height={50} width={120} onPress={handleOTPVerification}/>
  </View>
  </View>
  
   
  )
}


const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding:30,

  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor:'white'
  },
});

export default OtpVerify