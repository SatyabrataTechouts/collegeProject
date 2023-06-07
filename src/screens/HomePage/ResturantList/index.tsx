import {View, Text} from 'react-native';
import React from 'react';
import CText from '../../../components/Ctext';
import {theme} from '../../../utils/theme';
import {FlatList} from 'react-native-gesture-handler';
import Data from '../../../../Json/AllProduct.json';
import {useAppSelector} from '../../../components/redux/hook';
import BoxShadow from '../../../components/BoxShadow';
import {getResponsiveGenHP, getResponsiveGenWP} from '../../../utils';
const RestrurantList = () => {
  const selectedData = useAppSelector(state => state.data.selectedDate);
  console.log('selectedData.length', selectedData.length);
  console.log('selectedData4', selectedData);
  return (
    <View style={{flex: 1}}>
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
const RenderItem = item => {
  // console.log('item', item)
  return (
    <View style={{padding: 10, alignItems: 'center'}}>
      <BoxShadow>
        <View
          style={{
            width: getResponsiveGenWP({p: 80}),
            height: getResponsiveGenHP({p: 20}),

            backgroundColor: theme.colors.profileCard,
            borderRadius: 12,
          }}>
          <View>
            <View>
              <CText
                text={item.name}
                style={{
                  fontSize: 20,
                  fontWeight: '400',
                  color: theme.colors.primaryTextColor,
                padding:12
                  
                }}
              />
              <CText text={item.catagories} style={{
                  fontSize: 15,
                  fontWeight: '400',
                  color: theme.colors.secondaryTextColor,
                  marginLeft:12
              }}/>
            </View>
          </View>
        </View>
      </BoxShadow>
    </View>
  );
};
