import {View, Text, Image} from 'react-native';
import React from 'react';
import HeadProduct from '../HomePage/HeadProduct';
import {theme} from '../../utils/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../../components/redux/hook';
import RestrurantList from '../HomePage/ResturantList';

const Home = () => {
 
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.mainBg}}>
      <Header />
      <HeadProduct />
      <RestrurantList/>
    </View>
  );
};

export default Home;
const Header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        alignItems: 'center',
      }}>
      <Ionicons name="fast-food" size={50} color={theme.colors.iconHillight} />
      <Image
        source={{
          uri: 'https://cdn.esquimaltmfrc.com/wp-content/uploads/2015/09/flat-faces-icons-circle-man-6-940x940.png',
        }}
        style={{height: 50, width: 50}}
      />
    </View>
  );
};
