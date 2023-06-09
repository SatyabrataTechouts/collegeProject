import {View, Text, Pressable, Image, FlatList} from 'react-native';
import React, {useCallback,useRef} from 'react';
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
const Plp = ({route, navigation}: any) => {
  const data = route.params.data;
  const refRBSheet = useRef();
  console.log('data', data);
  const cardHeight = 300;
  const handlePickUser = useCallback(
    (item: any) => {
      magicSheet.show(() => <BottomSheet item={item} />, {
        snapPoints: [cardHeight, '80%'],
        backgroundStyle: {backgroundColor: '#E7E8E9'},
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
                    onPress={()=>handlePickUser(item)}
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
