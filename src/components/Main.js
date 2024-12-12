import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Fecha } from "./Fecha";
import { Hora } from "./Hora";
import { View, Text, TextInput, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Main = () => {
  const inset = useSafeAreaInsets();
  const [selectedTimeIn, setSelectedTimeIn] = useState(null);
  const [selectedTimeOut, setSelectedTimeOut] = useState(null);
  const [difference, setDifference] = useState("");
  const [compra, setCompra] = useState(0);
  const [turno, setTurno] = useState("Mañana");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState(null);

  const anio = selectedDate ? selectedDate.getFullYear() : null;
  const mes = selectedDate ? selectedDate.getMonth() : null;
  const dia = selectedDate ? selectedDate.getDate() : null;

  const entrada = selectedTimeIn
  ? selectedTimeIn.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
  : null;

  const salida = selectedTimeOut
  ? selectedTimeOut.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
  : null;

  const calculateTimeDifference = () => {
    if (selectedTimeIn && selectedTimeOut) {
      const diffInMs = selectedTimeOut.getTime() - selectedTimeIn.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      setDifference(minutes > 50 ? hours + 1 : hours);
    } else {
      setDifference(" Sin Resultado ");
    }
  };

  useEffect(() => {
    calculateTimeDifference();
  }, [selectedTimeIn, selectedTimeOut]);



  const sendData = async (anio, mes, dia, turno, entrada, salida, difference, compra, dayOfWeek) => {
    try {
      const data = await AsyncStorage.getItem("datos");
      const existingData = data ? JSON.parse(data) : {};
  
      // Combina los datos existentes con los nuevos datos
      const newData = {
        ...existingData,
        [anio]: {
          ...existingData[anio],
          [mes]: {
            ...existingData[anio]?.[mes],
            [dia]: {
              ...existingData[anio]?.[mes]?.[dia],
              [turno]: {
                dayOfWeek,
                entrada,
                salida,
                difference,
                compra
              }
            }
          }
        }
      };
  
      await AsyncStorage.setItem("datos", JSON.stringify(newData));
  
      alert("Datos guardados correctamente:\n" + JSON.stringify(newData, null, 2));
    } catch (error) {
      console.log(error);
      alert("Error al guardar los datos, intente nuevamente");
    }
  };
   

  return (
    <View
      style={{
        paddingTop: inset.top,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
      }}
    >
      <Image source={require("../../assets/banner.jpeg")} />

      <Text style={{ marginTop: 18 }}> Ingrese turno </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: "black",
          marginBottom: 18,
          marginTop: 18,
        }}
      >
        <Picker
          style={{ height: 60, width: 220, color: "gray" }}
          turno={turno}
          onValueChange={(value) => setTurno(value)}
        >
          <Picker.Item label="Mañana" Value="mañana" />
          <Picker.Item label="Tarde" Value="tarde" />
        </Picker>
      </View>

      <Fecha
        setSelectedDate={setSelectedDate}
        setDayOfWeek={setDayOfWeek}
      ></Fecha>

      <View style={{ flex: 1, flexDirection: "row", gap: 20 }}>
        <Hora selector="Entrada" setTime={setSelectedTimeIn}></Hora>
        <Hora selector="Salida" setTime={setSelectedTimeOut}></Hora>
      </View>

      <TextInput
        style={{
          width: 220,
          height: 60,
          borderWidth: 1,
          borderColor: "black",
          color: "black",
          padding: 8,
        }}
        keyboardType="numeric"
        placeholder="Ingrese Compra"
        placeholderTextColor="gray"
        onChangeText={(value) => setCompra(value)}
        value={compra}
        textAlign="center"
      />

      <Text
        style={{
          fontSize: 18,
          marginBottom: 10,
          textAlign: "center",
          marginTop: 20,
          width: 220,
        }}
      >
        Fecha:{" "}
        {selectedDate
          ? " " + dayOfWeek + " " + selectedDate.toLocaleDateString() + " "
          : "No hay fecha seleccionada"}
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}>
        {selectedTimeIn
          ? "Entrada: " +
            selectedTimeIn.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) +
            " "
          : "No hay hora seleccionada"}
      </Text>

      <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 10 }}>
        {selectedTimeOut
          ? "Salida:" +
            " " +
            selectedTimeOut.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) +
            " "
          : "No hay hora seleccionada"}
      </Text>

      <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 10 }}>
        {difference}
      </Text>

      <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 10 }}>
        {" "}
        $ {compra}{" "}
      </Text>

      <Button
        title="Enviar datos"
        buttonStyle={{ width: 220, marginBottom: 30 }}
        onPress={() => sendData(anio, mes, dia, turno, entrada, salida, difference, compra, dayOfWeek)}
      />
    </View>
  );
};
