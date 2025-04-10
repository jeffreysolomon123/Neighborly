import { useRouter, useNavigation } from "expo-router";
import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [warning, setWarning] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [inputHeight, setInputHeight] = useState(120);

  const router = useRouter();
  const navigation = useNavigation();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const submitHandle = () => {
    if (content.trim() === "") {
      setWarning("Field cannot be blank!");
      return;
    }

    Alert.alert("Posted!", content);
    router.back();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => router.back()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={submitHandle}>
          <Text style={styles.headerButton}>Post Feed</Text>
        </Pressable>
      ),
      title: "",
    });
  }, [navigation, content]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Share something with your neighbors..."
        value={content}
        multiline
        onChangeText={setContent}
        onContentSizeChange={(event) =>
          setInputHeight(event.nativeEvent.contentSize.height)
        }
        style={[styles.textContainer, { height: Math.max(120, inputHeight) }]}
      />
      <Text style={{ color: "red" }}>{warning}</Text>

      {!image && (
        <Pressable onPress={pickImage}>
          <Text style={styles.uploadButton}>Upload Image</Text>
        </Pressable>
      )}

      {image && (
        <Image
          source={{ uri: image }}
          resizeMode="contain"
          style={styles.imagePreview}
        />
      )}

      {image && (
        <Pressable onPress={removeImage}>
          <Text style={styles.removeButton}>Remove Image</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 50,
    backgroundColor: "#ffffff",
    flexGrow: 1,
  },
  imagePreview: {
    height: 200,
    borderRadius: 10,
    width: "100%",
    marginTop: 20,
  },
  textContainer: {
    padding: 20,
    textAlignVertical: "top",
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderColor: "#dadada",
    borderWidth: 2,
    borderRadius: 15,
    fontFamily: "Inter_400Regular",
  },
  uploadButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    marginTop: 10,
    width: 200,
    textAlign: "center",
    borderRadius: 30,
    alignSelf: "center",
    fontFamily: "Inter_400Regular",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: 10,
    marginTop: 10,
    width: 200,
    textAlign: "center",
    borderRadius: 30,
    alignSelf: "center",
    fontFamily: "Inter_400Regular",
  },
  headerButton: {
    color: "#007bff",
    fontSize: 18,
    marginHorizontal: 30,
    fontFamily: "Inter_700Bold",
  },
  cancelButton: {
    color: "black",
    fontSize: 18,
    marginHorizontal: 30,
    fontFamily: "Inter_700Bold",
  },
});
