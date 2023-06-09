import {View, Text, Platform} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import Search from '../../screens/Search';
import Like from '../../screens/Like';
import Profile from '../../screens/Profile';
import {theme} from '../../utils/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Delevery from '../../screens/Delevery';
import Cart from '../../screens/Cart';
const BottomNavigation = () => {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          color: '#434343',
          fontSize: 12,
          fontFamily: 'Karla-Regular',
          textTransform: 'capitalize',
        },
        tabBarStyle: {
          backgroundColor: theme.colors.mainBg,
          borderTopColor: 'transparent',
          paddingVertical: 10,
          paddingBottom: 10,
          marginBottom: Platform.OS === 'ios' ? 10 : 0,
          height: 70,
        },
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome
                name="home"
                size={25}
                color={focused?theme.colors.iconHillight:theme.colors.primaryTextColor}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="DELEVERY"
        component={Delevery}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome
                name="gift"
                size={25}
                color={focused?theme.colors.iconHillight:theme.colors.primaryTextColor}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="CART"
        component={Cart}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome
                name="opencart"
                size={25}
                color={focused?theme.colors.iconHillight:theme.colors.primaryTextColor}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome
                name="user"
                size={25}
                color={focused?theme.colors.iconHillight:theme.colors.primaryTextColor}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigation;
