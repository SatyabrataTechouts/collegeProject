import {
  View,
  Text,
  Image,
  Pressable,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../components/redux/hook';
import {LogOut, checkLogin} from '../../components/redux/slice/AuthSlice';
import CustumButton from '../../components/CustumButton';
import {getResponsiveGenHP, getResponsiveGenWP, windowWidth} from '../../utils';
import {theme} from '../../utils/theme';
import storage from '@react-native-firebase/storage';
const Icon = '../../../Assets/cemarIcon.png';
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import {StackActions, useNavigation} from '@react-navigation/native';
import BoxShadow from '../../components/BoxShadow';

const themes = theme.colors;
const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const isLogged = useAppSelector(state => state.AuthData.isLogged);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    requestPermission();
  }, []);

  // const resetAction = StackActions.reset({
  //   key:null,
  //   index: 0, // Reset the stack to index 0 (first screen)
  //   routes: [{name: 'profile'}], // Replace all routes with the Home screen
  // });

  const requestPermission = async () => {
    try {
      if (Platform.OS == 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to select an image.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission denied');
          return;
        }
      } else if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        if (result !== 'granted') {
          console.log('Storage permission denied');
          return;
        }
      }

      // Permission granted, proceed with opening the image picker
      handleChoosePicture();
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };
  const handleChoosePicture = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        cropping: true,
      });

      if (image && image.path) {
        setProfilePicture(image.path);
      }
    } catch (error) {
      console.log('Error choosing picture:', error);
    }
  };

  const uploadProfilePicture = async ({imageUri}) => {
    try {
      const reference = storage().ref('profile_pictures/profile_picture.jpg');

      await reference.putFile(imageUri);

      const downloadURL = await reference.getDownloadURL();
      console.log('File available at', downloadURL);

      // Store the download URL in your database or use it as needed
    } catch (error) {
      console.log('Upload error:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: themes.profileMainBg}}>
      <Header />
      <BoxShadow>
      <View style={{marginTop: 40}}>
        <View
          style={{
            height: getResponsiveGenHP({p: 55}),
            width: getResponsiveGenWP({p: 77}),

            alignSelf: 'center',
            marginVertical: 46,
            backgroundColor: themes.profileCard,
            justifyContent: 'space-evenly',
            borderRadius:12
          }}>
          <View style={{marginTop: 120}}></View>
          <ProfileData data={'User Name'} value={'Satyabrata'} />
          <ProfileData data={'Phone Number'} value={'+917873537019'} />
          <ProfileData data={'Gander'} value={'Male'} />
          <ProfileData data={'Date of Birth'} value={'09-04-2000'} />
          <View style={{alignItems: 'center'}}>
            <CustumButton
              buttonName="Log Out"
              height={40}
              width={120}
              onPress={() => {
               navigation.canGoBack();
                navigation.navigate('LOGIN');
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: 140,
            height: 140,
            borderRadius: 70,
            backgroundColor: 'grey',
            position: 'absolute',
            left: windowWidth / 2 - 65,
            borderWidth: 4,
            borderColor: themes.profileNav,
          }}>
          <Pressable
            onPress={() => {
              handleChoosePicture();
            }}
            style={{position: 'absolute', bottom: 2, right: 7}}>
            <Image
              source={require(Icon)}
              style={{
                height: 30,
                width: 30,

                tintColor: themes.profileCemeraIcon,
              }}
            />
          </Pressable>
        </View>
        
      </View>
      </BoxShadow>
    </View>
  );
};

export default Profile;
const Header = () => {
  return (
    <View
      style={{
        height: getResponsiveGenHP({p: 9}),
        backgroundColor: themes.profileNav,
      }}></View>
  );
};
const ProfileData = ({data, value}: any) => {
  // // Call the uploadProfilePicture function with the image URI
  // const imageUri = ""; // Replace ... with the actual image URI
  // uploadProfilePicture(imageUri);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            // marginTop: 120,
            padding: 12,
            color: themes.secondaryTextColor,
            fontSize: 16,
          }}>
          {data}
        </Text>
        <Text
          style={{
            marginRight: 30,
            color: themes.secondaryTextColor,
            fontSize: 16,
          }}>
          {value}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 0.3,
          borderColor: 'grey',
          width: 280,
          alignSelf: 'center',
        }}></View>
    </View>
  );
};
