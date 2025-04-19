import { useRouter, useNavigation } from "expo-router";
import React, { useState, useLayoutEffect } from "react";
import { getUserId, getArea, getToken } from "@/utils/auth"; // Add getAuthToken
import * as FileSystem from "expo-file-system";
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
import * as mime from "react-native-mime-types";
import { supabase } from "@/utils/supabase";
import { decode as atob } from "base-64";

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
      quality: 0.8, // Slightly compressed for faster uploads
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const uploadToSupabaseBucket = async (uri: string) => {
    try {
      // Get your JWT token from storage
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Set the Supabase auth session with your JWT
      const { error: authError } = await supabase.auth.setSession({
        access_token: token,
        refresh_token: "", // Leave empty if you don't use refresh tokens
      });

      if (authError) throw authError;

      const fileExt = uri.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${Date.now()}.${fileExt}`;
      const path = `user-uploads/${fileName}`;

      // Read file as base64
      const base64File = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert to ArrayBuffer
      const arrayBuffer = Uint8Array.from(atob(base64File), (c) =>
        c.charCodeAt(0)
      );

      // Get MIME type
      const mimeType =
        mime.lookup(uri) || `image/${fileExt === "jpg" ? "jpeg" : fileExt}`;

      // Upload with custom JWT auth
      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(path, arrayBuffer, {
          contentType: mimeType,
          upsert: false,
          cacheControl: "3600",
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("post-images").getPublicUrl(path);

      return publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Upload failed", error.message);
      return null;
    }
  };

  const submitHandle = async () => {
    if (content.trim() === "") {
      setWarning("Field cannot be blank!");
      return;
    }

    let imageUrl = null;
    if (image) {
      imageUrl = await uploadToSupabaseBucket(image);
      if (!imageUrl) return;
    }

    try {
      const userId = await getUserId();
      const area = await getArea();

      const { error } = await supabase.from("posts").insert({
        content,
        userId,
        image_url: imageUrl,
        area,
      });

      if (error) throw error;

      Alert.alert("Posted!");
      router.back();
    } catch (err) {
      console.error("Posting error:", err);
      Alert.alert("Error", "Failed to create post");
    }
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
        <>
          <Image
            source={{ uri: image }}
            resizeMode="contain"
            style={styles.imagePreview}
          />
          <Pressable onPress={removeImage}>
            <Text style={styles.removeButton}>Remove Image</Text>
          </Pressable>
        </>
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
  },
  headerButton: {
    color: "#007bff",
    fontSize: 18,
    marginHorizontal: 30,
  },
  cancelButton: {
    color: "black",
    fontSize: 18,
    marginHorizontal: 30,
  },
});
