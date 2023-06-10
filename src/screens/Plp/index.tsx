import {View, Text, Pressable, Image, FlatList} from 'react-native';
import React, {useCallback, useRef} from 'react';
import ProductIterable from '../../components/ProductIterable';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ratting from '../../components/Ratting';
import CText from '../../components/Ctext';
import NeuButton from '../../components/NeuButton';
import {theme} from '../../utils/theme';
import {getResponsiveGenHP, getResponsiveGenWP} from '../../utils';
import BoxShadow from '../../components/BoxShadow';
import {magicSheet} from 'react-native-magic-sheet';
import BottomSheet from '../../components/BottomSheet';
import CustumButton from '../../components/CustumButton';

// import { Firestore } from 'firebase/firestore';
// import firestore from '@react-native-firebase/firestore'
// import { firebase } from '@react-native-firebase/auth';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
import firebase from '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';


import { firestore } from '../../../App';
import { db } from '../../components/configuration';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useAppSelector } from '../../components/redux/hook';
const Plp = ({route, navigation}: any) => {
 
    // console.log('uid===', uid)
  const data = route.params.data;
  const refRBSheet = useRef();
  console.log('data', data);
  const cardHeight = 347;
  const handlePickUser = useCallback(
    (item: any) => {
      magicSheet.show(() => <Bottom item={item} />, {
        snapPoints: [cardHeight, '45%'],
        backgroundStyle: {backgroundColor: theme.colors.iconHillight},
      });
    },

    [],
  );

  const iteratePage = (item: any) => {
    console.log('item', item);
    return (
      <View style={{alignItems: 'center'}}>
        <BoxShadow>
          <View
            style={{
              width: getResponsiveGenWP({p: 85}),
              height: getResponsiveGenHP({p: 18}),

              backgroundColor: theme.colors.profileCard,
              borderRadius: 12,
              marginVertical: 17,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <CText
                  text={item.Pname}
                  style={{
                    fontSize: 20,
                    fontWeight: '400',
                    color: theme.colors.primaryTextColor,
                    padding: 12,
                  }}
                />
                <CText
                  text={item.catagories}
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color: theme.colors.secondaryTextColor,
                    marginLeft: 12,
                  }}
                />
                <View style={{marginLeft: 12}}>
                  <Ratting />
                </View>
                <View style={{padding: 9}}>
                  <NeuButton
                    buttonName="ADD"
                    height={30}
                    width={60}
                    onPress={() => handlePickUser(item)}
                  />
                </View>
              </View>
              <View style={{}}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    height: '100%',
                    width: 130,
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                  }}
                />
              </View>
            </View>
          </View>
        </BoxShadow>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{padding: 15}}>
            <AntDesign name="left" size={20} color={'black'} />
          </Text>
        </Pressable>
        <Text style={{color: 'black', marginLeft: 95}}>Product List </Text>
      </View>

      <FlatList
        data={data}
        renderItem={({item}) => iteratePage(item)}
        key={item => item.id}
      />
    </View>
  );
};

export default Plp;
const Bottom = (item) => {
  const uid=useAppSelector(state=>state.AuthData.uid);
  console.log('hii', uid)
  const AddToCart=async(item:any)=>{
    let cartData= [];
    
   let data= {
      id:item.id,
      name:item.Pname,
      price:item.Price,
      image:item.image,
      qty:1,

   }
   
   const docRef =await getDoc(doc(db, "cart", uid)) ;
      cartData= docRef.data().cartData;
  
  
  console.log('cartData', docRef.data().cartData.length)
  if(cartData.length==0){
   
    cartData.push(data)
    console.log('====',cartData )
    try{
      await  setDoc(doc(db,'cart',uid),{
        cartData
      }
      )
    
      }
     catch(e){
     console.log('e', e)
     }
  }
  else{
    const existingItem = cartData.find(food => food.id == data.id);
   if (existingItem) {
      
       cartData=( cartData.map(existingFood =>
          existingFood.id === item.id
            ? {...existingFood, qty: existingFood.qty + 1}
            : existingFood,
        )
       )
    }
     else {
     cartData.push(data);
    }
   try{
    await  updateDoc(doc(db,'cart',uid),{
      cartData
    }
    )
  
    }
   catch(e){
   console.log('e', e)
   }
  }
}
  return (
    <View style={{justifyContent:'space-around',flex:1}}>
      <CText
        text="Never order food in excess of your body weight "
        style={{
            fontSize:17,
            fontWeight:'600',
            color:'#800020',
            alignSelf:'center'
        }}
      />
      
      <View style={{alignItems:'center'}}>
      <View
            style={{
              width: getResponsiveGenWP({p: 85}),
              height: getResponsiveGenHP({p: 18}),

              backgroundColor: theme.colors.profileCard,
              borderRadius: 12,
              marginVertical: 17,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <CText
                  text={item.item.Pname}
                  style={{
                    fontSize: 20,
                    fontWeight: '400',
                    color: theme.colors.primaryTextColor,
                    padding: 12,
                  }}
                />
                <CText
                  text={item.item.catagories}
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color: theme.colors.secondaryTextColor,
                    marginLeft: 12,
                  }}
                />
                <View style={{marginLeft: 12}}>
                  <Ratting />
                </View>
               
              </View>
              <View style={{}}>
                <Image
                  source={{uri:item.item.image}}
                  style={{
                    height: '100%',
                    width: 130,
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                  }}
                />
              </View>
            </View>
          </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
        }}>
        <CustumButton buttonName="Add to Cart" height={46} width={120} color='green' onPress={()=>AddToCart(item.item)}/>
        <CustumButton buttonName="Cancel" height={46} width={120} color='red' />
      </View>
    </View>
  );
};
