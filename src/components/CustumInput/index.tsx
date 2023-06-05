import {View, Text, TextInput} from 'react-native';
import React from 'react';
import CText from '../Ctext';
import {theme} from '../../utils/theme';
interface CustumInputProps {
  placeHolder?: string;
  onHandleChange?: any;
  prefix?: boolean;
  maxChar?:number;
  keyboardType?:any

}
const CustumInput = ({
  placeHolder,
  onHandleChange,
  prefix,
  maxChar,
  keyboardType
}: CustumInputProps) => {
  return (
    <View
      style={{
        width: 270,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        height: 50,
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
        style={[prefix&&{marginLeft:40},{borderRadius:12}]}
        placeholder={placeHolder}
        onChangeText={onHandleChange}
        maxLength={maxChar}
        keyboardType={ keyboardType}
      />
    </View>
  );
};

export default CustumInput;
