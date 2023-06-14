import { View, Text, ImageBackground } from 'react-native'
import React, { Children } from 'react'

const CustumBackground = ({Children}) => {
  return (
    <ImageBackground
    source={require('../../../Assets/loginbackground1.jpg')}
      style={{flex: 1}}>
        {
            Children
        }
      </ImageBackground>
  )
}

export default CustumBackground