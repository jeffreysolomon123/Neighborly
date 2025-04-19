import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

type PostProps = {
  content: string;
  imageUrl?: string;
  date: string;
  commentCount: number;
};

export default function PersonalPost({
  content,
  imageUrl,
  date,
  commentCount,
}: PostProps) {
  return (
    <View style={styles.card}>
      {/* Top Row - Profile pic and name */}
      <View style={styles.topContainer}>
        <Image
          style={styles.profilePic}
          source={require("@/assets/images/noprofile.png")}
        />
        <Text style={styles.name}>You</Text>
      </View>

      {/* Post content */}
      <Text style={styles.content}>{content}</Text>

      {/* Image if available */}
      {imageUrl && (
        <Image
          style={styles.postImage}
          source={{ uri: imageUrl }}
          resizeMode="cover"
        />
      )}

      {/* Bottom row - Date and Comments */}
      <View style={styles.bottomRow}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.comments}>{commentCount} comments</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profilePic: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
  },
  name: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
  },
  content: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    marginBottom: 8,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 12,
    color: "#888",
    fontFamily: "Inter_400Regular",
  },
  comments: {
    fontSize: 12,
    color: "#888",
    fontFamily: "Inter_400Regular",
  },
});
