import React, { useState } from 'react'
import { Text, Button, View, StyleSheet } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const Fecha = () => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dayOfWeek, setDayOfWeek] = useState(null);
    
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
        <Text style={styles.text}>
          {selectedDate ? ' ' + dayOfWeek + ' ' + selectedDate.toLocaleDateString()+ ' ' : 'No hay fecha seleccionada'}
        </Text>
        <Button title="Seleccionar Fecha" onPress={showDatePicker} />
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
      marginBottom: 40,
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
    },
  });