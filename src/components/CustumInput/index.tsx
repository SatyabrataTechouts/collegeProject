import {View, Text, TextInput} from 'react-native';
import React from 'react';
import CText from '../Ctext';
import {theme} from '../../utils/theme';
import {Neomorph} from 'react-native-neomorph-shadows';
interface CustumInputProps {
  placeHolder?: string;
  onHandleChange?: any;
  prefix?: boolean;
  maxChar?: number;
  keyboardType?: any;
  width: number;
  height: number;
  color: string;
}
const CustumInput = ({
  placeHolder,
  onHandleChange,
  prefix,
  maxChar,
  keyboardType,
  width,
  height,
  color,
}: CustumInputProps) => {
  return (
    <Neomorph
      inner={true} // <- enable shadow inside of neomorph
      swapShadows // <- change zIndex of each shadow color
      darkShadowColor="#3636363D"
      lightShadowColor="#e7e8e9"
      style={{
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: "rgba(125, 125, 125, 0.6)",
        width: width,
        height: height,
      }}>
      <View
        style={{
          width: width,
          alignSelf: 'center',
          backgroundColor: color,
          borderRadius: 12,
          height: height,

          borderColor: '#FFFF',
        }}>
        {prefix && (
          <View style={{position: 'absolute', left: 5, top: 14}}>
            <CText
              text="+91"
              style={{color: theme.colors.primaryTextColor, fontSize: 14}}
            />
          </View>
        )}
        <TextInput
          style={[prefix && {marginLeft: 40}, {borderRadius: 12}]}
          placeholder={placeHolder}
          onChangeText={onHandleChange}
          maxLength={maxChar}
          keyboardType={keyboardType}
        />
      </View>
    </Neomorph>
  );
};

export default CustumInput;
