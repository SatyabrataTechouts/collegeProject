import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import CText from '../../components/Ctext';
import {theme} from '../../utils/theme';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import BoxShadow from '../../components/BoxShadow';
import Feather from 'react-native-vector-icons/Feather';
import {getResponsiveGenHP, getResponsiveGenWP} from '../../utils';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../components/configuration';
import {useAppDispatch, useAppSelector} from '../../components/redux/hook';
import {
  decreaseQuantityAsync,
  increaseQuantityAsync,
  removeFromCartAsync,
} from '../../components/redux/slice/cartSlice';

import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import NeuButton from '../../components/NeuButton';
import {magicSheet} from 'react-native-magic-sheet';
import CustumButton from '../../components/CustumButton';
import Ratting from '../../components/Ratting';
import CustumInput from '../../components/CustumInput';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
var nav;
const Cart = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const uid = useAppSelector(state => state.AuthData.uid);
  const price = useAppSelector(state => state.cart.price);
  nav = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getData();
  });
   setTimeout(() => {
    setLoading(false);
   }, 3000);
  const getData = async () => {
    const docRef = await getDoc(doc(db, 'cart', uid));
    setData(docRef.data().cartData);
    setLoading(false);
  };
  const orderFood = useCallback(
    (item: any) => {
      magicSheet.show(() => <BottomSheet item={item} />, {
        snapPoints: [300, '32%'],
        backgroundStyle: {backgroundColor: theme.colors.iconHillight},
      });
    },

    [],
  );

  const renderData = ({item}: any) => {
    return (
      <View>
        <BoxShadow>
          <View
            style={{
              height: 120,
              width: 320,
              alignSelf: 'center',
              borderRadius: 12,
              marginBottom: 12,
              flexDirection: 'row',
              //   justifyContent: 'space-between',
              backgroundColor: '#FFFFFF',
            }}>
            <View style={{padding: 6}}>
              <Image
                source={{uri: item.image}}
                style={{height: 96, width: 80}}
              />
            </View>
            <View style={{marginVertical: 12, width: 90}}>
              <CText
                text={item.name}
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: theme.colors.primaryTextColor,
                }}
              />
              <CText
                text={item.price}
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: theme.colors.secondaryTextColor,
                }}
              />
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                // padding: 12,
                width: 130,
                // marginHorizontal: 23,
                marginVertical: 12,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Pressable
                  onPress={() => dispatch(removeFromCartAsync(item.id, uid))}>
                  <MaterialIcons
                    name="delete"
                    size={25}
                    color={theme.colors.signInButton}
                  />
                </Pressable>
                <NeuButton
                  buttonName="Order"
                  height={30}
                  width={80}
                  onPress={() => orderFood(item)}
                  color="black"
                />
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: 90,
                }}>
                <Pressable
                  onPress={() => dispatch(decreaseQuantityAsync(item.id, uid))}>
                  <Feather name="minus" size={18} color={'black'} />
                </Pressable>
                <CText
                  text={item.qty}
                  style={{color: theme.colors.primaryTextColor, fontSize: 15}}
                />
                <Pressable
                  onPress={() =>
                    dispatch(increaseQuantityAsync(item.id, uid, price))
                  }>
                  <Feather name="plus-circle" size={18} color={'black'} />
                </Pressable>
              </View>
            </View>
          </View>
        </BoxShadow>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F8F4F0'}}>
      <CText
        text="My Cart"
        style={{
          color: theme.colors.primaryTextColor,
          fontWeight: '700',
          fontSize: 22,
          letterSpacing: 0.1,
          marginVertical: 25,
          marginHorizontal: 16,
        }}
      />
      <ScrollView>
        <FlatList data={data} renderItem={renderData} key={item => item.id} />
        <CText
          text="Have a promo code?"
          style={{
            fontSize: 16,
            color: theme.colors.primaryTextColor,
            fontWeight: '700',
            marginHorizontal: 18,
            marginVertical: 9,
            letterSpacing: 0.3,
          }}
        />
        <View style={{padding: 8}}>
          <BoxShadow>
            <View
              style={{
                width: getResponsiveGenHP({p: 39}),
                height: getResponsiveGenHP({p: 6}),
                alignSelf: 'center',
                borderRadius: 22,
                backgroundColor: '#FFFFFF',
                padding: 12,
              }}>
              <View>
                <CText
                  text="DISCOUNT"
                  style={{color: '#D5A19B', fontSize: 15, fontWeight: '700'}}
                />
              </View>
            </View>
          </BoxShadow>
        </View>
      </ScrollView>
      <Modal
        visible={loading}
        transparent={true}
        animationType="fade"
        style={{opacity: 0}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              height: 40,
              width: 60,
              backgroundColor: theme.colors.signInButton,
              justifyContent: 'center',
              borderRadius: 6,
            }}>
            <ActivityIndicator color={'#ffff'} size={25} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Cart;
const BottomSheet = item => {
  const [oderNumber, setOrderNUmber] = useState();

  console.log('item', item);

  const uid = useAppSelector(state => state.AuthData.uid);
  const dispatch = useAppDispatch();
  console.log('hii', uid);
  const handleOrder = item => {
    if (oderNumber != null) {
      nav?.navigate('ORDER', {item: item.item});
    }
  };
  return (
    <BottomSheetScrollView>
      <KeyboardAvoidingView behavior="padding">
        <View>
          <View style={{marginHorizontal: 25}}>
            <CText
              text="Almost there!"
              style={{
                color: theme.colors.styleTextColor,
                fontSize: 18,
                fontWeight: '600',
                letterSpacing: 0.75,
              }}
            />
            <CText
              text="Enter mobile number to continue"
              style={{
                marginVertical: 23,
                color: theme.colors.styleTextColor,
                fontSize: 14,
                fontWeight: '600',
                letterSpacing: 0.75,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: '#fff',
                height: 35,
                width: 80,
                marginHorizontal: 25,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../Assets/305271-P7U57F-958.jpg')}
                style={{height: 35, width: 40}}
              />
              <CText
                text="+91"
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  color: theme.colors.primaryTextColor,
                  marginHorizontal: 5,
                }}
              />
            </View>
            <CustumInput
              height={38}
              width={230}
              color="#fff"
              onHandleChange={val => setOrderNUmber(val)}
            />
          </View>

          <View style={{alignItems: 'center', marginVertical: 50}}>
            <CustumButton
              buttonName="Continue"
              width={290}
              height={40}
              backgroundColor={theme.colors.signInButton}
              onPress={() => handleOrder(item)}
              color="#fff"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </BottomSheetScrollView>
  );
};
