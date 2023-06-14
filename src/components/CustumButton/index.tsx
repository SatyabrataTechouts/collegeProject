import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {Neomorph} from 'react-native-neomorph-shadows';
import CText from '../Ctext';
import {ColorProps} from '@shopify/restyle';
interface CustumButtonProps {
  buttonName: string;
  onPress?: any;
  height: number;
  width: number;
  color?: string;
  backgroundColor?: string;

}
const CustumButton = ({
  buttonName,
  onPress,
  height,
  width,
  color,
  backgroundColor,
}: CustumButtonProps) => {
  const [inner, setInner] = useState(false);
 
  return (
    <Neomorph
      inner={inner} // <- enable shadow inside of neomorph
      swapShadows // <- change zIndex of each shadow color
      style={{
        shadowRadius: 3,
        borderRadius: 8,
        backgroundColor: backgroundColor?backgroundColor:'#FFFF',
        width: width,
        height: height,
      }}>
      <Pressable
        style={{justifyContent: 'center', flex: 1}}
        onPress={onPress}
        onPressOut={() => setInner(false)}
        onPressIn={() => setInner(true)}>
        <CText
          text={buttonName}
          style={{textAlign: 'center', color: color, fontSize: 16}}
        />
      </Pressable>
    </Neomorph>
  );
};

export default CustumButton;
