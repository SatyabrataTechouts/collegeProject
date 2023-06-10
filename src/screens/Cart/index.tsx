import {View, Text, Image} from 'react-native';
import React,{useEffect,useState} from 'react';
import CText from '../../components/Ctext';
import {theme} from '../../utils/theme';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import BoxShadow from '../../components/BoxShadow';
import Feather from 'react-native-vector-icons/Feather';
import {getResponsiveGenHP} from '../../utils';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../components/configuration';
import { useAppSelector } from '../../components/redux/hook';

const Cart = () => {
  const [data,setData]=useState();
  const uid=useAppSelector(state=>state.AuthData.uid);
  useEffect(() => {
    getData();
  })
  
  const getData=async()=>{
    const docRef = await getDoc(doc(db, "cart",uid)) ;
   setData(docRef.data().cartData);
    
  }
 
 
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
            <View style={{marginVertical: 12,width:90}}>
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
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                padding: 12,
                width: 90,
                marginHorizontal: 23,
              }}>
              <Feather name="minus" size={18} color={'black'} />
              <CText
                text={item.qty}
                style={{color: theme.colors.primaryTextColor, fontSize: 15}}
              />
              <Feather name="plus-circle" size={18} color={'black'} />
            </View>
          </View>
        </BoxShadow>
      </View>
    );
  };
  return (
    data&&
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
        <View
          style={{
            height: 23,
            width: 23,
            borderRadius: 12,
            position: 'absolute',
            top: 15,
            left: 95,
            backgroundColor: 'green',
            alignItems: 'center',
          }}>
          <CText text="2" style={{color: theme.colors.styleTextColor}} />
        </View>

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
    </View>
  );
};

export default Cart;
