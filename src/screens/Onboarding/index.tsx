import {View, Text, Image, Pressable,StyleSheet} from 'react-native';
import React, { useState } from 'react';
import PagerView from 'react-native-pager-view';
import {theme} from '../../utils/theme';
import CText from '../../components/Ctext';
import {
  getResponsiveGenHP,
  getResponsiveGenWP,
  getResponsiveHP,
} from '../../utils';
import CustumButton from '../../components/CustumButton';
import {color} from '@shopify/restyle';
import { useNavigation } from '@react-navigation/native';
import { OnPageSelectedEventData } from 'react-native-pager-view/lib/typescript/PagerViewNativeComponent';
const data = [
  {
    image:
      'https://th.bing.com/th/id/OIP.sqlecwG-5pyUQc1oNFs32gHaFj?w=248&h=186&c=7&r=0&o=5&dpr=1.9&pid=1.7',
    heading: 'Eat Healthy',
    description:
      'Maintaining good health should be the primary focus of everyone.',
  },

  {
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    heading: 'Eat Healthy Recipes',
    description:
      'Browse thousands of healthy recipes from all over the world.',
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1682800179834-c05e7c7d0a09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    heading: 'Top Restaurants',
    description:
      'To inspire you and make you realize your health is all you have.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
    heading: 'Top Offers',
    description:
      'This is how you start to get respect, by offering something that you have.',
  },
];
const Onbording = () => {
  const [paginationIndex, setPaginationIndex] = useState(0);
  const onPageSelected=({
		nativeEvent
	}: {
		nativeEvent: OnPageSelectedEventData;
	})=>{
    setPaginationIndex(nativeEvent.position)
  }
  const navigation=useNavigation();
  console.log('paginationIndex', paginationIndex)
  const renderDots = ({ currIndex = 0 }) => {
		return (
			<View style={styles.pagination}>
				{data.map((_: any, index: number) => (
					<View
						key={index}
						style={[styles.dot, index === currIndex ? styles.activeDot : null]}
					/>
				))}
			</View>
		);
	};
  const ButtonTab=()=>{
    return<View style={{alignItems: 'center'}}>
    <CustumButton
      height={getResponsiveGenWP({p: 13})}
      width={getResponsiveGenWP({p: 33})}
      buttonName="Get Start"
      onPress={()=>navigation.navigate('BOTTOMTAB')}
    />
    <View style={{flexDirection: 'row', marginVertical: 16}}>
      <CText
        text="Already Have An Acount?"
        style={{fontSize: 15, color: theme.colors.secondaryTextColor}}
      />
      <Pressable onPress={()=>navigation.navigate('LOGIN')}>
        <CText
          text="Log In"
          style={{fontSize: 15, color: theme.colors.link}}
        />
      </Pressable>
    </View>
  </View>
  }
  return (
    <View style={{flex:1}}>
    <PagerView initialPage={0} style={{flex: 1}}onPageSelected={onPageSelected} >
      {data.map((value, index) => {
        return (
          <View
            key={index}
            style={{alignItems: 'center', justifyContent: 'space-around'}}>
            {/* <CText
              text="KCAL"
              style={{
                fontSize: 25,
                fontWeight: '900',
                color: theme.colors.primaryTextColor,
              }}
            /> */}
            <View></View>
            <View style={{alignItems: 'center'}}>
              <Image
                source={{uri: value.image}}
                style={{
                  height: getResponsiveGenHP({p: 30}),
                  width: getResponsiveGenWP({p: 60}),
                }}
              />
              {/* <Text style={{marginTop:23,color:theme.colors.primaryTextColor}}>{value.heading}</Text> */}
              <View style={{marginVertical: 12, alignItems: 'center'}}>
                <CText
                  text={value.heading}
                  type={'bodyL'}
                  style={{
                    color: theme.colors.primaryTextColor,
                    fontWeight: '800',
                    fontSize: 20,
                  }}
                />
                <View
                  style={{
                    width: getResponsiveGenWP({p: 60}),
                    marginVertical: 16,
                  }}>
                  <CText
                    text={value.description}
                    type={'h3'}
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      color: theme.colors.secondaryTextColor,
                    }}
                  />
                </View>
              </View>
            </View>
            <View>

            </View>
          </View>
        );
      })}
    </PagerView>
    {renderDots({ currIndex: paginationIndex })}
    {ButtonTab()}
    </View>
  );
};

export default Onbording;
const styles=StyleSheet.create({
  dot: {
		width: 12,
		height: 12,
		borderRadius: 14,
		marginHorizontal: 4,
		backgroundColor: '#ffffff'
	},
	activeDot: {
		backgroundColor: '#000000'
	},
  pagination: {
		flexDirection: 'row',
		alignSelf: 'center',
		position: 'absolute',
		bottom: 200
	},
})