import { View, Text, Platform } from 'react-native'
import React from 'react'

import DropShadow from 'react-native-drop-shadow';
const getShadowOpacity = Platform.select({
    android: {
      shadowOpacity: 0.25
    },
    ios: {
      shadowOpacity: 0.5
    }
  })
  interface CustomShadowProps {
    children: JSX.Element;
    shadowRadius?: Number
  }
const BoxShadow = ({children, shadowRadius = 4}:CustomShadowProps) => {
  return (
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <DropShadow style={[{
        shadowColor: "rgba(54, 54, 54, 0.16)",
        shadowRadius: shadowRadius,
  
        shadowOffset: {
          width: 0,
          height: 0,
        }
      },
        getShadowOpacity
      ]} >
        {children}
      </DropShadow>
);
  
}

export default BoxShadow