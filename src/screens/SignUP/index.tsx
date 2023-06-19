import {View, Text, ImageBackground, Modal,Alert} from 'react-native';
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


import CustumButton from '../../components/CustumButton';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {KeyboardAvoidingView} from 'react-native';
import auth from '@react-native-firebase/auth'
import { db } from '../../components/configuration';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '../../components/redux/hook';
import { checkLogin } from '../../components/redux/slice/AuthSlice';
import { useNavigation } from '@react-navigation/native';
const SignUp = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  // const userId=useAppSelector(state=>state.AuthData.uid);
  const [verificationCode, setVerificationCode] = useState('');
    const uId=useAppSelector(state=>state.AuthData.uid);
    const navigation=useNavigation();
    const dispatch=useAppDispatch();
  const [verificationId, setVerificationId] = useState('');
  const [showError, setShowError] = useState<any>({
    FirstName: false,
    gender:false,
    email: false,
    phoneNumber: false,

    allAbove: false,
   
  });
  console.log('error', showError.allAbove);
 
  const  handleFirstName = (val: any) => {
    if (/^[a-zA-Z0-9_\s]{1,30}$/.test(val)) {
      setName(val);
      setShowError({...showError, FirstName: false, allAbove: false});
    } else {
      setShowError({...showError, FirstName: true, allAbove: true});
    }
  };
  const handlePhone = (val: any) => {
    if (/^[0-9]{0,}$/.test(val)) {
      setPhoneNumber(`+91${val}`);
      setShowError({...showError, phoneNumber: false, allAbove: false});
    } else if (val == '') {
      setShowError({...showError, phoneNumber: true, allAbove: true});
    } else {
      setShowError({...showError, phoneNumber: true, allAbove: true});
    }
  };
  const handleEmail = (val: any) => {
    if (/[\w\-\._]+@[\w\-\._]+\.\w{2,10}/.test(val)) {
      setEmail(val);
      setShowError({...showError, email: false, allAbove: false});
    } else {
      setShowError({...showError, email: true, allAbove: true});
    }
  };
  const signUpWithPhoneNumber = async () => {
    if(!(showError.allAbove)){
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
  }
  else{
    Alert.alert("Enter all field ");
  }
  };
  const handleGenderSelect = (gender:any) => {
    if(gender){
    setSelectedGender(gender);
    setShowError({...showError, gender: false, allAbove: false});
    }
    else{
      setShowError({...showError, gender: true, allAbove: true});
    }
  };
  const confirmVerificationCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode,
      );
      await auth().signInWithCredential(credential);
      dispatch(checkLogin());

      console.log(' verifyed' )
      const user = await firestore().collection('userAccount').doc(uId).get();
      let tempDart = [];
      console.log('user', user._data);

      if( user._data!=null){
      tempDart=user._data.userAccount;
      tempDart.push({phoneNumber,name,email,selectedGender,uId});
     
         await updateDoc(doc(db, 'userAccount', uId), {
          userAccount: tempDart,
          }).catch((e)=>console.log('first', e))
          ;
       
        }
        else{
          console.log('Hello')
  
           tempDart.push({phoneNumber,name,email,selectedGender,uId});
          await setDoc(doc(db, 'userAccount', uId), {
            userAccount: tempDart,
          }).catch((e)=>console.log('first', e),)
          navigation.navigate('home');
        }
      // const randomPassword = Math.random().toString(36).substring(2, 10); // Generate a random password
      // const currentUser = await firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(email, randomPassword);
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
      setModal(false);
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
              onHandleChange={val => handleFirstName(val)}
              showError={showError.FirstName}
            />
             {showError.FirstName && (
                <Text style={style.errorText}>Enter valid name</Text>
              )}
          </View>
          <View style={{marginVertical: 23}}>
            <CText text="Enter Mobile number" style={style.lebleText} />
            <CustumInput
              color="#ffff"
              height={50}
              width={270}
              onHandleChange={val => handlePhone(val)}
            />
             {showError.phoneNumber && (
                  <Text style={style.errorText}>Enter valid Phone Number</Text>
                )}
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
              onHandleChange={val => handleEmail(val)}
            />
             {showError.email && (
                  <Text style={style.errorText}>Enter valid Email</Text>
                )}
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
                  height: 150,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                }}>
                <TextInput
                  placeholder="Verification code"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  inputMode='numeric'
                  maxLength={6}
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
  errorText: {color: '#fff', position: 'absolute',bottom:-30},
});
