import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {transformer} from '../../../metro.config';
import CText from '../../components/Ctext';
import {theme} from '../../utils/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Rating } from 'react-native-rating-component';

const ProductDescription = ({route, navigation}: any) => {
  const item = route.params.item;
  const handleSubmit = item => {
    item = {
      id: item.id,
      name: item.Pname,
      price: item.Price,
      image: item.image,
      qty: 1,
      unitPrice: item.Price,
    };
    navigation.navigate('ORDER', {item});
  };
  console.log('item', item);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <View
        style={{
          height: 30,
          marginTop: 12,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
        }}>
        <Pressable
          style={{
            marginHorizontal: 17,
            height: 30,
            width: 30,
            backgroundColor: '#FCD228',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={22} color={'#fff'} />
        </Pressable>
        <CText text={item.catagories} style={[styles.text, {marginLeft: 100}]} />
      </View>
      <View style={{marginVertical: 90}}>
        <Pressable style={styles.container} onPress={() => handleSubmit(item)}>
          <View style={styles.trapezoid}>
            <Image
              source={{uri: item.image}}
              style={{
                height: 150,
                width: 150,
                borderRadius: 75,
                position: 'absolute',
                left: 65,
              }}
            />
          </View>
          <Rating customHeight={40} fillColorActive='red'  />
          <CText text={item.Pname} style={styles.text} />
          <CText text={item.catagories} style={styles.text} />
          <CText text={`Rs:${item.Price}`} style={styles.text} />
          <CText
            text={`Click here to Buy`}
            style={{
              fontSize: 18,
              color: 'green',
              fontWeight: '500',
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ProductDescription;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 450,
    backgroundColor: '#FCD228',
    borderRadius: 30,
  },
  trapezoid: {
    width: 200,
    height: 0,
    alignItems: 'flex-start',
    borderBottomWidth: 100,
    borderBottomColor: '#FFFFFF',
    borderLeftWidth: 0,
    borderLeftColor: 'transparent',
    borderRightWidth: 300,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
    position: 'absolute',
    top: 0,
    transform: [{rotate: '540deg'}],
  },
  text: {
    fontSize: 18,
    color: theme.colors.primaryTextColor,
    fontWeight: '600',
  },
});
