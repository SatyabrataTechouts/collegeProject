import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {theme} from '../utils/theme';
import * as Animatable from 'react-native-animatable';

const SpalshScreen = () => {
  const themes = theme.colors;
  return (
    <View
      style={{
        backgroundColor: themes.spalshScreen,
        flex: 1,
        justifyContent: 'center',
      }}>
      <View>
        <Animatable.View animation="fadeIn" duration={1500} style={styles.ladderContainer}>
          
          <Text
            style={{
              alignSelf: 'center',
              color: themes.styleTextColor,
              fontSize: 24,
            }}>
            Kcal
          </Text>
        </Animatable.View>
      </View>
    </View>
  );
};

export default SpalshScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700', // Use the Dominus gold color
    justifyContent: 'center',
    alignItems: 'center',
  },
  ladderContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
});