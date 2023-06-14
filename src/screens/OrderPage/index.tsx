import {View, Text, Pressable, StyleSheet, Alert} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from '../../utils/theme';
import CText from '../../components/Ctext';
import BoxShadow from '../../components/BoxShadow';
import {getResponsiveGenHP, getResponsiveGenWP} from '../../utils';
import {Image} from 'react-native-animatable';
import CustumButton from '../../components/CustumButton';
import RazorpayCheckout from 'react-native-razorpay';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/configuration';
import { useAppDispatch, useAppSelector } from '../../components/redux/hook';
import { removeFromCart, removeFromCartAsync } from '../../components/redux/slice/cartSlice';
const OrderPage = ({route, navigation}: any) => {
    const uid=useAppSelector(state=>state.AuthData.uid);
  const dispatch=useAppDispatch();
  const data = route.params.data.item;
  console.log('data', data);
  const handlePayment=(data)=>{
    
   var options = {
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: 'INR',
        key: 'rzp_test_2komcxJJszClad',
        amount: data.price*100,
        name: data.name,
        order_id: '',//Replace this with an order_id created using Orders API.
        prefill: {
          email: 'gaurav.kumar@example.com',
          contact: '9191919191',
          name: 'Gaurav Kumar'
        },
        theme: {color: '#53a20e'}
      }
      RazorpayCheckout.open(options).then((item) => {
        // handle success
        Alert.alert(`Success: ${item.razorpay_payment_id}`);
        save(data);
      }).catch((error) => {
        // handle failure
        Alert.alert(`Error: ${error.code} | ${error.description}`);
      });
      if(data.status_code==200){
        save(data);
      }
  }
  const save=async(data)=>{
   const orderdata=[]
    orderdata.push(data);
    try{
        await setDoc(doc(db,'order',uid),{
            orderdata
         }
         )
         dispatch(removeFromCartAsync(data.id,uid))
         navigation.navigate('BOTTOMTAB');
         }
        catch(e){
        console.log('e', e)
        }
  }
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
              <View style={{marginHorizontal: 12}}>
                <CText
                  text={`Name:${data.name}`}
                  style={style.primeryStyle}
                />
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
                <CText
                  text={`Qty:${data.qty}`}
                  style={style.secondaryStyle}
                />
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
          <CText text="Selected Address" style={[style.secondaryStyle]} />
          <Pressable onPress={() => Alert.alert('change location')}>
            <CText
              text="Change Address"
              style={[
                style.secondaryStyle,
                {color: '#72bcd4', textDecorationLine: 'underline'},
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
