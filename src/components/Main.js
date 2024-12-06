import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fecha } from './Fecha';
import { Hora } from './Hora';
import { View, Text, TextInput, Image } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { Button } from 'react-native-elements';

export const Main = () => {
  const inset = useSafeAreaInsets();
  const [selectedTimeIn, setSelectedTimeIn] = useState(null);
  const [selectedTimeOut, setSelectedTimeOut] = useState(null);
  const [difference, setDifference] = useState("")
  const [compra, setCompra] = useState(0);
  const [selectedValue, setSelectedValue] = useState("Mañana")  
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState(null);

  const calculateTimeDifference = () => {
    if (selectedTimeIn && selectedTimeOut) {
      const diffInMs = selectedTimeOut.getTime() - selectedTimeIn.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      setDifference(`${hours} horas y ${minutes} minutos`);
    } else {
      setDifference(" Sin Resultado ");
    }
  };

  useEffect(() => {
    calculateTimeDifference();
  }, [selectedTimeIn, selectedTimeOut]) 

  
  
  return (
    <View style={{ paddingTop: inset.top, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 0 }}>

    <Image source={require('../../assets/banner.jpeg')} />

     <Text style={{ marginTop: 18 }} > Ingrese turno </Text>

      <View style={{  borderWidth: 1, borderColor: 'black', marginBottom: 18, marginTop: 18 }} >
         <Picker style={{ height: 60, width: 220, color: 'gray' }} selectedValue={selectedValue} onValueChange={(value) => setSelectedValue(value)}  >
        <Picker.Item label='Mañana' Value='mañana' />
        <Picker.Item label='Tarde' Value='tarde' />
      </Picker>
      </View>
     

      <Fecha setSelectedDate={setSelectedDate} setDayOfWeek={setDayOfWeek}  ></Fecha>     

      <View style={{ flex: 1, flexDirection: 'row', gap: 20 }} >
        <Hora selector='Entrada' setTime={setSelectedTimeIn} ></Hora>
        <Hora selector='Salida' setTime={setSelectedTimeOut} ></Hora>
      </View>
       
       <TextInput
       style={{
        width: 220,
        height: 60,
        borderWidth: 1,
        borderColor: 'black',
        color: 'black',
        padding: 8
        }}
      keyboardType="numeric" 
      placeholder="Ingrese Compra"
      placeholderTextColor="gray" 
      onChangeText={(value) => setCompra(value)}
      value={compra}
      textAlign='center'
       />
      

       <Text style={{fontSize: 18, marginBottom: 10, textAlign: 'center', marginTop: 20}}>
         Fecha: {selectedDate ? ' ' + dayOfWeek + ' ' + selectedDate.toLocaleDateString()+ ' ' : 'No hay fecha seleccionada'}
        </Text>

        <Text style={{ fontSize: 18, marginBottom: 10, textAlign: "center",}}>
        {selectedTimeIn
          ? 'Entrada: ' + selectedTimeIn.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) + ' ' 
          : "No hay hora seleccionada"}
      </Text>

      <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 10}}>
        {selectedTimeOut
          ? 'Salida:' + ' ' + selectedTimeOut.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) + ' '
          : "No hay hora seleccionada"}
      </Text>

      <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 10 }} >{difference}</Text>

      <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 10}}> $ {compra} </Text>

      <Button title='Enciar datos' buttonStyle={{ width: 220, marginBottom: 30 }} />
    </View>
  );
}
