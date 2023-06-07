import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';

import {FlatList} from 'react-native-gesture-handler';
import CText from '../../../components/Ctext';
import {theme} from '../../../utils/theme';
import BoxShadow from '../../../components/BoxShadow';
import {useAppDispatch} from '../../../components/redux/hook';
import {AddToSelected} from '../../../components/redux/slice/SelectedDataSlice';
const colorTheme = theme.colors;
const data = [
  {key: 1, image: require('../../../../Assets/dogs.png'), name: 'Hot Dogs'},
  {key: 2, image: require('../../../../Assets/salad.png'), name: 'Salads'},
  {key: 3, image: require('../../../../Assets/burger.png'), name: 'Burger'},
  {key: 4, image: require('../../../../Assets/pizza.png'), name: 'Pizza'},
  {key: 5, image: require('../../../../Assets/snacs.png'), name: 'Snacks'},
  {key: 6, image: require('../../../../Assets/sushi.png'), name: 'Sushi'},
  {key: 7, image: require('../../../../Assets/drink.png'), name: 'Drink'},
];

const HeadProduct = () => {
  const [selectedId, setSelectedId] = useState();
  const dispatch = useAppDispatch();
  const RenderItem = (item: any) => {
   
    return (
      <View>
        <View style={{padding: 17, alignItems: 'center',marginLeft:5}}>
          <BoxShadow>
            <Pressable
              style={{
                height: 100,
                width: 120,
                backgroundColor:
                  selectedId == item.key
                    ? theme.colors.selectedCetagory
                    : theme.colors.profileCard,
                borderRadius: 12,
              }}
              onPress={() => {
                dispatch(AddToSelected(item.key)), setSelectedId(item.key);
              }}></Pressable>
          </BoxShadow>
          <View style={{position: 'absolute'}}>
            <Image source={item.image} style={{height: 50, width: 70}} />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={{padding: 34}}>
        <CText
          text="Food"
          style={{
            fontSize: 19,
            color: colorTheme.secondaryTextColor,
            fontWeight: '500',
          }}
        />
        <CText
          text="At Your Doorstep"
          style={{
            fontSize: 30,
            fontWeight: '700',
            color: colorTheme.primaryTextColor,
            letterSpacing: 0.7,
          }}
        />
      </View>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          key={({item}: {item: any}) => item.id}
          renderItem={({item}) => RenderItem(item)}
        />
      </View>
    </View>
  );
};

export default HeadProduct;
