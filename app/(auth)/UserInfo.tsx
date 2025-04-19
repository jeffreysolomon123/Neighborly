import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "@/utils/supabase";
import { getToken, getUserId } from "@/utils/auth";
import * as SecureStore from "expo-secure-store";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { useRouter } from "expo-router";

export default function UserInfo() {
  const [area, setArea] = useState("");
  const [areas, setAreas] = useState([]);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const { data, error } = await supabase.from("areas").select("areaName");
        if (error) {
          console.log("Selecting areas from db error", error);
          return;
        }

        const areaNames = data.map((item) => item.areaName);
        setAreas(areaNames);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = async () => {
      const token = await getToken();
      const userId = await getUserId();
      setUserId(userId);
    };

    fetchData();

    fetchAreas();
  }, []);

  const handleNext = async () => {
    console.log("Selected area:", area);

    const { error } = await supabase
      .from("users")
      .update({ area: area }) // 👈 this updates the area column
      .eq("id", userId); // 👈 only for the current user

    if (error) {
      console.log("Error updating user area:", error);
      return;
    }

    await SecureStore.setItemAsync("area", area);
    router.replace("/"); // navigate to home or wherever
  };

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
          {areas.map((areaName) => (
            <Picker.Item key={areaName} label={areaName} value={areaName} />
          ))}
        </Picker>
      </View>
      <Pressable onPress={handleNext}>
        <Text style={styles.button}>Next</Text>
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
