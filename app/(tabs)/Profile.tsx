import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

import PersonalPost from "@/components/personalPost";

export default function Profile() {
  const router = useRouter();

  const [name, setName] = useState("Rahul Kumar");
  const [number, setNumber] = useState(9976529092);
  const [image, setImage] = useState(
    "https://static.thenounproject.com/png/3039079-200.png"
  );
  const [address, setAddress] = useState("Anna Nagar, Chennai");

  const handleLogOut = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("userId");
      await SecureStore.deleteItemAsync("area"); // ✅ Correct method

      // Do any other cleanup like navigation
      router.replace("/(auth)/Login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: image }} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.address}>{address}</Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Pressable onPress={() => router.push("/EditProfile")}>
            <Text style={styles.editButton}>Edit</Text>
          </Pressable>
          <Pressable onPress={() => "logout"}>
            <Text style={styles.logOutButton} onPress={handleLogOut}>
              Log Out
            </Text>
          </Pressable>
        </View>
        <Text style={styles.myposttext}>My posts</Text>

        <PersonalPost
          content="Can anyone recommend a reliable electrician around Perungudi? Need to fix some wiring issues ASAP."
          date="April 13, 2025"
          commentCount={3}
        />
        <PersonalPost
          content="Had a great time at the neighborhood potluck! Met so many new people and the food was great"
          date="April 14, 2025"
          commentCount={9}
        />

        <PersonalPost
          content="Finally finished setting up my little balcony garden 🌱🪴! Watching these grow is so calming."
          date="April 12, 2025"
          commentCount={7}
        />
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
    margin: 0,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 75, // circular
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  myposttext: {
    fontFamily: "Inter_700Bold",
    color: "black",
    fontSize: 20,
    paddingTop: 30,
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
