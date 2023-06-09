import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {Neomorph} from 'react-native-neomorph-shadows';
import CText from '../Ctext';
interface NeuButtonProps {
  buttonName: string;
  onPress?: any;
  height: number;
  width: number;
  color?: string;
  backgroundColor?: string;
}
const NeuButton = ({
  buttonName,
  onPress,
  height,
  width,
  color,
  backgroundColor,
}: NeuButtonProps) => {
  const [inner, setInner] = useState(false);
  return (
    <Neomorph
      inner={inner} // <- enable shadow inside of neomorph
      swapShadows // <- change zIndex of each shadow color
      style={{
        shadowRadius: 1,
        borderRadius: 12,
        backgroundColor: '#FFFF',
        width: width,
        height: height,
        borderWidth:0.4,
        borderColor:'grey'
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

export default NeuButton;
