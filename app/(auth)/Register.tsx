import React, { useState } from "react";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
// Register.tsx
export const options = {
  headerShown: false,
};
import { useRouter } from "expo-router";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import { Image } from "expo-image";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const handleRegister = async () => {
    if (!phone || !password) {
      Alert.alert("Oops!", "Enter all the fields");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      Alert.alert("Invalid Phone Number", "Phone number must be 10 digits.");
      return;
    }

    const data = {
      name: name,
      phone: phone,
      password: password,
    };

    try {
      await axios.post(
        "http://192.168.1.9:3000/api/auth/register",
        data, // ✅ FIXED: remove extra `{ data }` wrapping
        { withCredentials: true }
      );
      router.push("/UserInfo"); // ✅ FIXED: working navigation
    } catch (error) {
      alert("Something went wrong. Try again!");
      console.log("Registration error:", error); // ✅ More useful logging
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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

        <TouchableOpacity onPress={() => router.push("/(auth)/Login")}>
          <Text style={styles.link}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
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
