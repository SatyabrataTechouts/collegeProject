import {createTheme} from '@shopify/restyle';
import {getResponsiveHP, getResponsiveWP} from '..';
const palette = {
  lightGreen: '#91C788',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#808080',
  RoyalBlue: '#4169e1',
  WhiteSmoke: '#F5F5F5',
  carrot: '#FA5',
  Azure: '#1520A6',
  cobalt: '#1338be',
  WebSafeOrange: '#ff9900',
  indgoWhite: '#F7F8FA',
  Cultured:'##F7F7F7',
  lightOrange:'#F7DB91',
};
const theme = createTheme({
  colors: {
    spalshScreen: palette.lightGreen,
    styleTextColor: palette.white,
    primaryTextColor: palette.black,
    secondaryTextColor: palette.grey,
    link: palette.RoyalBlue,
    mainBg: palette.WhiteSmoke,
    iconHillight: palette.carrot,
    profileColor: palette.WebSafeOrange,
    backIcon: palette.Cultured,
    signInButton: palette.Azure,
    profileMainBg: palette.indgoWhite,
    profileNav: palette.white,
    profileCard: palette.white,
    profileCemeraIcon: palette.cobalt,
    selectedCetagory:palette.lightOrange,

  

	
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    defaults: {
      fontFamily: 'Lato-Regular',
      color: 'foreground',
    },
    h1: {
      fontSize: getResponsiveWP({px: 36}),
      lineHeight: getResponsiveHP({px: 43}),
      fontWeight: 400,
    },
    h2: {
      fontSize: getResponsiveWP({px: 28}),
      lineHeight: getResponsiveHP({px: 33}),
      fontFamily: 'Lato-Bold',
    },
    h3: {
      fontSize: getResponsiveWP({px: 20}),
      lineHeight: getResponsiveHP({px: 30}),
      fontFamily: 'Lato-Bold',
    },
    h4: {
      fontSize: getResponsiveWP({px: 16}),
      lineHeight: getResponsiveHP({px: 24}),
      fontFamily: 'Lato-Bold',
    },
    h5: {
      fontSize: getResponsiveWP({px: 14}),
      lineHeight: getResponsiveHP({px: 21}),
      fontWeight: 400,
    },
    h5Bold: {
      fontSize: getResponsiveWP({px: 14}),
      lineHeight: getResponsiveHP({px: 21}),
      fontFamily: 'Lato-Bold',
    },
    h6: {
      fontSize: getResponsiveWP({px: 12}),
      lineHeight: getResponsiveHP({px: 18}),
      fontWeight: 400,
    },
    notificationCount: {
      fontSize: getResponsiveWP({px: 10}),
      fontWeight: 400,
    },
    bodyL: {
      fontFamily: 'Karla-Regular',
      fontSize: getResponsiveWP({px: 16}),
      lineHeight: getResponsiveHP({px: 24}),
      fontWeight: 400,
    },
    bodyS: {
      fontFamily: 'Karla-Regular',
      fontSize: getResponsiveWP({px: 14}),
      lineHeight: getResponsiveHP({px: 18}),
      fontWeight: 400,
    },
    legal: {
      fontSize: getResponsiveWP({px: 10}),
      lineHeight: getResponsiveHP({px: 15}),
      fontWeight: 400,
    },
    description: {
      fontFamily: 'Karla-Regular',
      fontSize: getResponsiveWP({px: 12}),
      lineHeight: getResponsiveHP({px: 14}),
      fontWeight: 400,
      color: 'subText',
    },
    neuButtonTxt: {
      fontSize: getResponsiveWP({px: 14}),
      lineHeight: getResponsiveHP({px: 18}),
      fontFamily: 'Lato-Bold',
    },
  },
});
export type ThemeType = typeof theme;
export {theme};
