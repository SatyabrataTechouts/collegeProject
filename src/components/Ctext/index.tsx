import {View, Text} from 'react-native';
import React from 'react';
import {ResponsiveValue} from '@shopify/restyle';
import {StyleProp, TextStyle} from 'react-native/types';

interface CtextProps {
  type?: ResponsiveValue<
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h5Bold'
    | 'h6'
    | 'notificationCount'
    | 'bodyL'
    | 'bodyS'
    | 'legal'
    | 'description'
    | 'neuButtonTxt',
    {
      phone: number;
      tablet: number;
    }
  >;
  text?: string;
  style?: StyleProp<TextStyle>;
  rest?: any;
}
const CText = ({type, text = '', style = undefined, ...rest}: CtextProps) => {
  return (
    <Text variant={type} style={style} {...rest}>
			{text}
		</Text>
  )
};

export default CText;
