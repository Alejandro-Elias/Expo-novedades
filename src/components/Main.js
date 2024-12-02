import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fecha } from './Fecha';
import { Hora } from './Hora';
import { View, Text } from 'react-native';

export const Main = () => {
  const inset = useSafeAreaInsets();
  const [selectedTimeIn, setSelectedTimeIn] = useState(null);
  const [selectedTimeOut, setSelectedTimeOut] = useState(null);
  const [difference, setDifference] = useState("")

  const calculateTimeDifference = () => {
    if (selectedTimeIn && selectedTimeOut) {
      const diffInMs = selectedTimeOut.getTime() - selectedTimeIn.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      setDifference(`${hours} horas y ${minutes} minutos`);
    } else {
      setDifference("No hay suficiente información para calcular la diferencia");
    }
  };

  useEffect(() => {
    calculateTimeDifference();
  }, [selectedTimeIn, selectedTimeOut])
  
  
  return (
    <View style={{ paddingTop: inset.top, flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Fecha></Fecha>      
      <Hora selector='Entrada' setTime={setSelectedTimeIn} ></Hora>
      <Hora selector='Salida' setTime={setSelectedTimeOut} ></Hora>
       <Text style={{ textAlign: 'center' }} >{difference}</Text>
      
    </View>
  );
}
