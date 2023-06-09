import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Rating} from 'react-native-rating-component';

const Ratting: React.FC = () => {
  const [rate, setRate] = useState(3);

  return (
    <Rating
      initialValue={rate}
      onChangeValue={value => setRate(value)}
      customHeight={17}
      customWidth={17}
      fillColorActive='#B3564E'
    />
  );
};

export default Ratting;
