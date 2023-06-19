import {View, Text, Image,Pressable} from 'react-native';
import React from 'react';
import CText from '../../../components/Ctext';
import {theme} from '../../../utils/theme';
import {FlatList} from 'react-native-gesture-handler';
import Data from '../../../../Json/AllProduct.json';
import {useAppSelector} from '../../../components/redux/hook';
import BoxShadow from '../../../components/BoxShadow';
import {getResponsiveGenHP, getResponsiveGenWP} from '../../../utils';
import Ratting from '../../../components/Ratting';
import NeuButton from '../../../components/NeuButton';
import { useNavigation } from '@react-navigation/native';
const RestrurantList = () => {
  const selectedData = useAppSelector(state => state.data.selectedDate);
  const navigation=useNavigation();
  console.log('selectedData.length', selectedData.length);
  console.log('selectedData4', selectedData);
  const RenderItem = (item)=> {
  
    // console.log('item', item)
    return (
      <View style={{padding: 10, alignItems: 'center'}}>
        <BoxShadow>
          <Pressable
            style={{
              width: getResponsiveGenWP({p: 85}),
              height: getResponsiveGenHP({p: 18}),
  
              backgroundColor: theme.colors.profileCard,
              borderRadius: 12,
            }}
            onPress={()=>navigation.navigate('PLP',{data:item.product })}
            >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <CText
                  text={item.name}
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
                <View style={{padding:9}}>
                  {/* <NeuButton buttonName="ADD" height={30} width={60} /> */}
                </View>
              </View>
              <View style={{paddingHorizontal: 23}}>
                <Image
                  source={{uri: item.image}}
                  style={{height: 60, width: 95}}
                />
              </View>
            </View>
          </Pressable>
        </BoxShadow>
      </View>
    );
  };
  return (
    <View style={{flex: 1,marginVertical:30}}>
      <CText
        text="Papular"
        style={{
          fontSize: 23,
          color: theme.colors.primaryTextColor,
          fontVariant: 'h1',
          marginHorizontal: 27,
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={selectedData.length != 0 ? selectedData : Data}
        key={item => item.id}
        renderItem={({item}) => RenderItem(item)}
      />
    </View>
  );
};

export default RestrurantList;

