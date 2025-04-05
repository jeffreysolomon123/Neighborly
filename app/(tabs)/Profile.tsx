import React, { useState } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_100Thin,
} from "@expo-google-fonts/poppins";

export default function Profile() {
  const [name, setName] = useState("Jeffrey Solomon");
  const [number, setNumber] = useState(9348577844);
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.number}>{number}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 10,
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75, // circular
    marginBottom: 20,
  },
  name: {
    fontSize: 40,
    marginBottom: 10,
    fontFamily: "Poppins_400Regular",
  },
  number: {
    fontSize: 20,
  },
});
