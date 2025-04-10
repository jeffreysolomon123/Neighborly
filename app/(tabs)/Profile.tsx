import React, { useState } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Profile() {
  const router = useRouter();

  const [name, setName] = useState("Jeffrey Solomon");
  const [number, setNumber] = useState(9348577844);
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [address, setAddress] = useState("Kamarajar Nagar Perungudi");

  const handleLogOut = async () => {
    await SecureStore.deleteItemAsync("token");
    router.replace("/(auth)/Login");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.address}>{address}</Text>
      <Pressable onPress={() => router.push("/EditProfile")}>
        <Text style={styles.editButton}>Edit</Text>
      </Pressable>
      <Pressable onPress={() => "logout"}>
        <Text style={styles.logOutButton} onPress={handleLogOut}>
          Log Out
        </Text>
      </Pressable>
      <Text style={styles.name}>Feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75, // circular
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  number: {
    fontSize: 17,
    fontFamily: "Inter_400Regular",
    marginTop: 12,
  },
  address: {
    fontSize: 17,
    fontFamily: "Inter_400Regular",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#1e5cff",
    width: 150,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    color: "white",
    marginTop: 22,
    borderRadius: 30,
  },
  logOutButton: {
    backgroundColor: "#ff4444",
    width: 150,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    color: "white",
    marginTop: 22,
    borderRadius: 30,
  },
});
