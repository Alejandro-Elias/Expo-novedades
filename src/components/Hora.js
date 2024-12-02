import { StyleSheet, Text, View, Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useEffect, useState } from "react";

export const Hora = ({ selector, setTime }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleConfirmTime = (time) => {
    setSelectedTime(time);
    setTime(time);
    hideTimePicker()
;  };

  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.text}>
        {selectedTime
          ? `${selector}: ${selectedTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`
          : "No hay hora seleccionada"}
      </Text>
      <Button title={`Seleccionar Hora de ${selector}`} onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
        is24Hour={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
});
