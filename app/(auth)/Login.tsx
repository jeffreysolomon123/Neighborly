import React, { useState } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Image } from "expo-image";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert("Error", "Please enter both phone number and password.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      Alert.alert("Invalid Phone Number", "Phone number must be 10 digits.");
      return;
    }

    const data = {
      phone: phone,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://192.168.1.8:3000/api/auth/login",
        data,
        {
          withCredentials: true,
        }
      );
      const { token, userId, message, area } = response.data;
      // ✅ Store credentials securely
      await SecureStore.setItemAsync("token", token);
      await SecureStore.setItemAsync("userId", userId.toString());
      await SecureStore.setItemAsync("area", area);

      // ✅ Now navigate
      router.replace("/");
    } catch (error) {
      alert("Incorrect phone number or password!");
      if (axios.isAxiosError(error)) {
        console.log("Axios Error:", error.response?.data || error.message);
      } else {
        console.log("Unknown error:", error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/images/loginimage.png")}
          contentFit="cover"
          transition={1000}
        />
        <Text style={styles.title}>Login</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/Register")}>
          <Text style={styles.link}>Don't have an account? Register</Text>
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
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center", // center the image
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
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
    fontFamily: "Inter_400Regular",
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
