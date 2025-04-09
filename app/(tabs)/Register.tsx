import React, { useState } from "react";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Image } from "expo-image";

export default function Register({ navigation }: any) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const handleRegister = () => {
    if (!phone || !password) {
      Alert.alert("Oops!", "Enter all the fields");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      Alert.alert("Invalid Phone Number", "Phone number must be 10 digits.");
      return;
    }

    // Add register logic here
    Alert.alert("Register pressed", `Phone: ${phone}`);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/signupimage.png")}
        contentFit="cover"
        transition={1000}
      />
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%", // or a fixed value like 300
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center", // center the image
  },
  title: {
    fontSize: 28,
    fontFamily: "Inter_700Bold", // 🔥 bold title font
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#ececec",
    paddingLeft: 20,
    fontFamily: "Inter_400Regular", // ✅ set here
  },
  button: {
    backgroundColor: "#1e5cff",
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 16,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Inter_700Bold", // ✅ set here
  },
  link: {
    color: "#007bff",
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
    fontFamily: "Inter_400Regular", // ✅ set here
  },
});
