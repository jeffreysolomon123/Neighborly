import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Page() {
  const [content, setContent] = useState("");
  const [warning, setWarning] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [inputHeight, setInputHeight] = useState(120);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ Use this instead
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = async () => {
    setImage(null);
  };

  const submitHandle = async () => {
    if (content === "") {
      setWarning("Field cannot be blank!");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Share something with your neighbors..."
        value={content}
        multiline
        onChangeText={setContent}
        onContentSizeChange={(event) => {
          setInputHeight(event.nativeEvent.contentSize.height);
        }}
        style={[styles.textContainer, { height: Math.max(120, inputHeight) }]}
      />
      <Text>{warning}</Text>

      {!image && (
        <Pressable onPress={pickImage}>
          <Text style={styles.uploadButton}>Upload Image</Text>
        </Pressable>
      )}

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      {image && (
        <Pressable onPress={removeImage}>
          <Text style={styles.removeButton}>Remove Image</Text>
        </Pressable>
      )}
      <Pressable onPress={submitHandle}>
        <Text style={styles.submitButton}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "#fff",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
  textContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "grey",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: "white",
    marginTop: 10,
    width: 100,
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "blue",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: "white",
    marginTop: 10,
    width: 200,
    textAlign: "center",
  },
  uploadButton: {
    backgroundColor: "blue",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: "white",
    marginTop: 10,
    width: 200,
    textAlign: "center",
  },
});
