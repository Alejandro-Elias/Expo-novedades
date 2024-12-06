import { StyleSheet, Text, View, Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useEffect, useState } from "react";

export const Hora = ({ selector, setTime }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleConfirmTime =  (time) => {
    setTime(time);
    hideTimePicker()
;  };

  return (
    <View style={styles.pickerContainer}>
      <Button title={` ${selector}`} onPress={showTimePicker} />
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
    width: 100,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
});
