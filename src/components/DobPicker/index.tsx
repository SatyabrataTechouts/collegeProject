import React, { useState } from 'react';
import { View, Platform, StyleSheet,Text,TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';



const DOBPicker = () => {
    const [dob, setDOB] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    const handleDOBChange = (event, selectedDate) => {
      const currentDate = selectedDate || dob;
      setShowDatePicker(Platform.OS === 'ios');
      setDOB(currentDate);
    };
  
    const showDatepicker = () => {
      setShowDatePicker(true);
    };
  
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={showDatepicker}>
            <Text style={styles.dateText}>{dob.getUTCDay()+"::"+dob.getMonth()+"::"+dob.getFullYear()}</Text>
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={handleDOBChange}
          />
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dateText: {
      fontSize: 20,
      marginBottom: 20,
      color: 'black',
    },
  });
  
  export default DOBPicker;
  