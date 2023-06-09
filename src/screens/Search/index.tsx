import {View, Text, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import {getResponsiveGenHP, windowWidth} from '../../utils';
import CustumInput from '../../components/CustumInput';
import details from '../../../Json/AllProduct.json';
import { FlatList } from 'react-native-gesture-handler';
const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const allProduct: any = [];
  details.forEach(restaurant =>
    restaurant.product.forEach(food => allProduct.push(food)),
  );
  const filterData = allProduct.filter(
    foodItem =>
      foodItem.Pname.toLowerCase().includes(searchValue.toLowerCase()) ||
      foodItem.title.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const handleChange = value => {
    setSearchValue(value);
  };
  return (
    <View>
      <ImageBackground
        source={require('../../../Assets/searchbackgroundpic.jpg')}
        style={{
          width: windowWidth,
          height: getResponsiveGenHP({p: 37}),
        }}>
        <View style={{justifyContent: 'flex-end', flex: 1, marginVertical: 12}}>
          <CustumInput onHandleChange={handleChange} />
        </View>
      </ImageBackground>
      <FlatList
             showsVerticalScrollIndicator={false}
            data={filterData ? filterData : allProduct}
            renderItem={itemRender}
          />
    </View>
  );
};

export default Search;
const itemRender=({item}:any)=>{
  return <View>
    
  </View>
}