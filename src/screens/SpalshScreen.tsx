import {View, Text, StyleSheet,Animated} from 'react-native';
import React, { useEffect, useRef } from 'react';
import {theme} from '../utils/theme';
import * as Animatable from 'react-native-animatable';
import BoxShadow from '../components/BoxShadow';
import CText from '../components/Ctext';
import { Easing } from 'react-native-reanimated';


const SpalshScreen = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startSpinning();

    // Clean up the animation on unmount
    return () => {
      spinValue.stopAnimation();
    };
  }, []);

  const startSpinning = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1700,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const themes = theme.colors;
  return (
    <View
      style={{
        backgroundColor: themes.spalshScreen,
        flex: 1,
        justifyContent: 'center',
      }}>
      
      <View style={styles.container}>
      <Animated.View style={[styles.box, { transform: [{ rotate: spin }] }]}>
          <BoxShadow>
            <View
              style={{
                height: 90,
                width: 140,
                backgroundColor: theme.colors.signInButton,
                borderRadius:70,
                justifyContent: 'center',
              }}>
              <CText
                text="MY Food"
                style={{
                  alignSelf: 'center',
                  color: themes.styleTextColor,
                  fontSize: 24,
                }}
              />
            </View>
          </BoxShadow>
          </Animated.View>
    </View>
    </View>
  );
};

export default SpalshScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
