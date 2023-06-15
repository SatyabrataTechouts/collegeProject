import {View, Text, Pressable, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from '../../utils/theme';
import CText from '../../components/Ctext';
import BoxShadow from '../../components/BoxShadow';
import {getResponsiveGenHP, getResponsiveGenWP} from '../../utils';
import {Image} from 'react-native-animatable';
import CustumButton from '../../components/CustumButton';
import RazorpayCheckout from 'react-native-razorpay';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '../../utils/configuration';
import firestore from '@react-native-firebase/firestore';
import {useAppDispatch, useAppSelector} from '../../components/redux/hook';
import {
  removeFromCart,
  removeFromCartAsync,
} from '../../components/redux/slice/cartSlice';
import { useFocusEffect } from '@react-navigation/native';
 const OrderPage = ({route, navigation}: any) => {
  const uid = useAppSelector(state => state.AuthData.uid);
  const isOrder = useAppSelector(state => state.AuthData.orderPaGe);
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState();
  const [selected, setSelected] = useState({addressId:0});
  const data = route.params.data.item;
  console.log('isOrder', isOrder)
  useFocusEffect(
    React.useCallback(() => {
      userAddress();
    }, [])
  );
  const userAddress = async () => {
    const user = await firestore().collection('user').doc(uid).get();
    setAddress(user._data.address);
  };
  console.log('userAdd', address);

  const handlePayment = data => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_2komcxJJszClad',
      amount: data.price * 100,
      name: data.name,
      order_id: '', //Replace this with an order_id created using Orders API.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar',
      },
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then(item => {
        // handle success
        Alert.alert(`Success: ${item.razorpay_payment_id}`);
        save(data);
      })
      .catch(error => {
        // handle failure
        Alert.alert(`Error: ${error.code} | ${error.description}`);
      });
    if (data.status_code == 200) {
      save(data);
    }
  };
  console.log('selected', selected)
  const save = async data => {
    const orderdata = [];
    orderdata.push({...data,address:selected});
    try {
      await setDoc(doc(db, 'order', uid), {
        orderdata,
      });
      dispatch(removeFromCartAsync(data.id, uid));
      navigation.navigate('BOTTOMTAB');
    } catch (e) {
      console.log('e', e);
    }
  };
  return (
    <View style={{justifyContent: 'space-between', flex: 1}}>
      <View>
        <View
          style={{
            height: 56,
            flexDirection: 'row',
            backgroundColor: '#fff',
            alignItems: 'center',
          }}>
          <Pressable
            style={{marginHorizontal: 12}}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={25}
              color={theme.colors.secondaryTextColor}
            />
          </Pressable>
          <View style={{}}>
            <CText
              text="Checkout"
              style={{
                color: theme.colors.secondaryTextColor,
                fontWeight: '600',
                fontSize: 18,
                marginHorizontal: 17,
              }}
            />
          </View>
        </View>
        <View>
          <BoxShadow>
            <View
              style={{
                width: getResponsiveGenWP({p: 90}),
                height: getResponsiveGenHP({p: 17}),
                backgroundColor: '#fff',
                alignSelf: 'center',
                borderRadius: 12,
                marginVertical: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: data.image}}
                style={{height: getResponsiveGenHP({p: 15}), width: 120}}
              />
              <View style={{marginHorizontal: 12,width:120}}>
                <CText text={`Name:${data.name}`} style={style.primeryStyle} />
                <CText
                  text={`Unit Price:${data.unitPrice}`}
                  style={style.secondaryStyle}
                />
                <CText
                  text={`Total Price:${data.price}`}
                  style={style.secondaryStyle}
                />
              </View>
              <View style={{justifyContent: 'flex-end', marginHorizontal: 12}}>
                <CText text={`Qty:${data.qty}`} style={style.secondaryStyle} />
              </View>
            </View>
          </BoxShadow>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 17,
          }}>
          <CText text={'Total'} style={style.primeryStyle} />
          <CText text={`Rs ${data.price}`} style={style.primeryStyle} />
        </View>
        <View
          style={{
            marginHorizontal: 18,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <CText text="Selected Address" style={[style.secondaryStyle]} />
            {address?.map(item => {
              return (
                <Pressable onPress={() => setSelected(item)}>
                  <CText
                    text={`${item.street},${item.city},${item.pincode},${item.mobile}`}
                    style={{
                      fontSize: 16,
                      color:
                        selected.addressId== item.addressId
                          ? 'green'
                          : theme.colors.secondaryTextColor,
                      marginVertical: 9,
                    }}
                  />
                </Pressable>
              );
            })}
          </View>
          <Pressable onPress={() => navigation.navigate('ADDRESS')}>
            <CText
              text="Change Address"
              style={[
                style.secondaryStyle,
                {color: '#72bcd4', textDecorationLine: 'underline',marginRight:15},
              ]}
            />
          </Pressable>
        </View>
      </View>
      <View style={{alignItems: 'center', marginVertical: 12}}>
        <CustumButton
          buttonName={`Pay Now Rs ${data.price}`}
          width={300}
          height={50}
          color="#fff"
          backgroundColor="green"
          onPress={() => handlePayment(data)}
        />
      </View>
    </View>
  );
};

export default OrderPage;
const style = StyleSheet.create({
  primeryStyle: {
    color: theme.colors.secondaryTextColor,
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryStyle: {
    color: theme.colors.secondaryTextColor,
    fontSize: 15,
    fontWeight: '400',

  },
});
