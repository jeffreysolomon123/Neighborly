import React from "react-native";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { useRouter } from "expo-router";
import { useState } from "react";

export default function UserInfo() {
  const [area, setArea] = useState();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Area / Locality</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={area}
          onValueChange={(itemValue) => setArea(itemValue)}
          style={styles.input}
          dropdownIconColor="#666"
        >
          <Picker.Item label="Choose your area" value="" />
          <Picker.Item label="Thoraipakkam" value="thoraipakkam" />
          <Picker.Item label="Perungudi" value="perungudi" />
        </Picker>
      </View>
      <Pressable>
        <Text style={styles.button}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 250,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    fontFamily: "Inter_400Regular",
    color: "black",
  },
  title: {
    fontFamily: "Inter_700Bold",
    alignSelf: "center",
    fontSize: 25,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#1e5cff",
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 16,
    color: "white",
    width: "50%",
    textAlign: "center",
    marginTop: 30,
    alignSelf: "center",
    fontFamily: "Inter_700Bold",
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: "#dfdfdf",
    borderRadius: 30,
    overflow: "hidden",
    width: 300,
    alignSelf: "center",
    paddingLeft: 20,
    marginTop: 20,
  },
});
