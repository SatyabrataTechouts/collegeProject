import {View, Text, Image} from 'react-native';
import React from 'react';
import HeadProduct from '../HomePage/HeadProduct';
import {theme} from '../../utils/theme';

import { useAppSelector } from '../../components/redux/hook';
import RestrurantList from '../HomePage/ResturantList';

const Home = () => {
 
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.mainBg}}>
     
      <HeadProduct />
      <RestrurantList/>
    </View>
  );
};

export default Home;
