import React, { useState } from 'react'
import { Text,  View, StyleSheet, Image } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button } from 'react-native-elements';

export const Fecha = ({setSelectedDate, setDayOfWeek} ) => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    const showDatePicker = () => setDatePickerVisibility(true);

    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirmDate = (date) => {
        setSelectedDate(date);
    
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        setDayOfWeek(days[date.getDay()]);
    
        hideDatePicker();
      };

  return (
    <View style={styles.pickerContainer}>

        
        
        <Button title="Seleccionar Fecha" onPress={showDatePicker} buttonStyle={{ width: 220, backgroundColor: '#1199ff' }} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
      </View>
  )
}

const styles = StyleSheet.create({
    pickerContainer: {
      marginBottom: 18,
      alignItems: 'center',
      width: 220,
    },
  });