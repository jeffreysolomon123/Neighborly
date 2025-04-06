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
import AppLoading from "expo-app-loading";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_100Thin,
  });

  const [name, setName] = useState("Jeffrey Solomon");
  const [number, setNumber] = useState(9348577844);
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [address, setAddress] = useState("Kamarajar Nagar Perungudi");
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.address}>{address}</Text>
      <Pressable onPress={() => router.push("/EditProfile")}>
        <Text style={styles.editButton}>Edit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75, // circular
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    marginBottom: 5,
    fontFamily: "Poppins_400Regular",
  },
  number: {
    fontSize: 17,
    fontFamily: "Poppins_300Light", // or any other variant you want
  },
  address: {
    fontSize: 17,
    fontFamily: "Poppins_300Light",
  },
  editButton: {
    backgroundColor: "grey",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: "white",
    marginTop: 10,
  },
});
