import {View, Text, StyleSheet,Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import CText from '../../components/Ctext';
import firestore from '@react-native-firebase/firestore';
import {useAppSelector} from '../../components/redux/hook';
import BoxShadow from '../../components/BoxShadow';
import {getResponsiveGenHP, getResponsiveGenWP} from '../../utils';
import {Image} from 'react-native-animatable';
import {theme} from '../../utils/theme';
import {ScrollView} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Navigation from '../../navigations';

const Delevery = () => {
  const userId = useAppSelector(state => state.AuthData.uid);
  const [data, setData] = useState();
  const navigation=useNavigation();
  useEffect(() => {
    recoveryData();
  }, []);
  const recoveryData = async () => {
    const user = await firestore().collection('order').doc(userId).get();
    setData(user._data.orderdata);
  };
  // console.log('data====', data.id);
  return data ? (
    <View>
      <CText
        text="Order History"
        style={{fontSize: 19, marginHorizontal: 16, marginVertical: 18}}
      />
      <ScrollView>
        {data.map(data => {
          return (
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
                <View
                  style={{justifyContent: 'flex-end', marginHorizontal: 12}}>
                  <CText
                    text={`Qty:${data.qty}`}
                    style={style.secondaryStyle}
                  />
                </View>
              </View>
            </BoxShadow>
          );
        })}
      </ScrollView>
    </View>
  ) : (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Pressable onPress={()=>{ navigation.navigate("home")}}>
      <CText
        text="Order is Empty please Order"
        style={{
          fontSize: 18,
          alignSelf: 'center',
          color: 'blue',
           textDecorationLine:'underline'
        }}
      />
      </Pressable>
    </View>
  );
};

export default Delevery;
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
