import {View, Text, ImageBackground, Modal} from 'react-native';
import React, {useState} from 'react';
import CustumInput from '../../components/CustumInput';
import CText from '../../components/Ctext';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

import {Button} from 'react-native';
import DOBPicker from '../../components/DobPicker';
import CustumButton from '../../components/CustumButton';
import {firebase} from '@react-native-firebase/auth';
import OtpVerify from '../OtpVerify';
import {KeyboardAvoidingView} from 'react-native';

const SignUp = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const [verificationId, setVerificationId] = useState('');
  const signUpWithPhoneNumber = async () => {
    try {
      const confirmation = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmation.verificationId);
      console.log('please enter otp');
      setModal(true);
    } catch (error) {
      console.log('Sign-up error:', error);
    }
  };
  const handleGenderSelect = gender => {
    setSelectedGender(gender);
  };
  const confirmVerificationCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode,
      );

      const randomPassword = Math.random().toString(36).substring(2, 10); // Generate a random password
      const currentUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, randomPassword);
      //   await firebase.auth().signInWithCredential(credential);

      // User is signed in, you can proceed with additional steps or navigate to the next screen
      //   const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        let cartData = [];
        await currentUser.updateProfile({
          displayName: name,
        });

        // Additional steps: Save age and DOB to a user profile collection
        // const userCollection = firebase.firestore().collection('users');
        // await userCollection.doc(currentUser.uid).set({
        //   name,
        // });
        setModal(false);
      }
    } catch (error) {
      console.log('Verification code confirmation error:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../../Assets/loginbackground1.jpg')}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <KeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginVertical: 23}}>
            <CText text="Enter your name" style={style.lebleText} />

            <CustumInput
              color="#ffff"
              height={50}
              width={270}
              onHandleChange={val => setName(val)}
            />
          </View>
          <View style={{marginVertical: 23}}>
            <CText text="Enter Mobile number" style={style.lebleText} />
            <CustumInput
              color="#ffff"
              height={50}
              width={270}
              onHandleChange={val => setPhoneNumber(`+91${val}`)}
            />
          </View>

          <View style={{marginVertical: 23, width: 270}}>
            <CText text="Select Gander" style={style.lebleText} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity onPress={() => handleGenderSelect('male')}>
                <Text
                  style={{
                    color: selectedGender === 'male' ? '#fff' : 'black',
                    fontSize: 19,
                  }}>
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleGenderSelect('female')}>
                <Text
                  style={{
                    color: selectedGender === 'female' ? '#fff' : 'black',
                    fontSize: 19,
                  }}>
                  Female
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleGenderSelect('other')}>
                <Text
                  style={{
                    color: selectedGender === 'other' ? '#fff' : 'black',
                    fontSize: 19,
                  }}>
                  Other
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginVertical: 25, width: 270, height: 90}}>
            <CText text="Enter Email/gmail" style={style.lebleText} />
            <CustumInput
              color="#ffff"
              height={50}
              width={270}
              onHandleChange={val => setEmail(val)}
            />
          </View>

          <View style={{alignItems: 'center', marginVertical: 27}}>
            <CustumButton
              height={45}
              width={120}
              backgroundColor="red"
              buttonName="sign up"
              color={theme.colors.primaryTextColor}
              onPress={signUpWithPhoneNumber}
            />
            <CText
              text="do you have an account?go login"
              style={{
                marginVertical: 27,
                textDecorationLine: 'underline',
                color: 'blue',
                fontSize: 12,
              }}
            />
          </View>

          <Modal
            visible={modal}
            transparent
            animationType="fade"
            style={{opacity: 0.25}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <View
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                }}>
                <TextInput
                  placeholder="Verification code"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                />
                <CustumButton
                  height={40}
                  width={110}
                  color="black"
                  buttonName="verify"
                  onPress={confirmVerificationCode}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignUp;
const style = StyleSheet.create({
  lebleText: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.34,
    color: theme.colors.primaryTextColor,
    marginTop: 12,
  },
});
