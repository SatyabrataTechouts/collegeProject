import {View, Text} from 'react-native';
import React from 'react';
import { theme } from '../utils/theme';

const SpalshScreen = () => {
    const themes=theme.colors;
  return (
    <View
      style={{backgroundColor:themes .spalshScreen, flex: 1, justifyContent: 'center'}}>
      <View>
        <Text style={{alignSelf: 'center', color: themes.styleTextColor,fontSize:24}}>Kcal</Text>
      </View>
    </View>
  );
};

export default SpalshScreen;
