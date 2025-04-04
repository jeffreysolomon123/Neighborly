import { Text, View, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_300Light,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

type Props = {
  content: string;
  img?: string;
  date: string;
  numofcom: string;
  name: string;
  place: string;
};

export default function FeedPost({
  content,
  img,
  name,
  place,
  date,
  numofcom,
}: Props) {
  return (
    <View style={styles.postContainer}>
      <Text>{name}</Text>
      <Text>{place}</Text>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.innerContainer}>
        <Pressable>
          <AntDesign name="hearto" size={24} color="black" />
        </Pressable>
        <Pressable>
          <Text>Add a comment</Text>
        </Pressable>
      </View>

      <Text>{date}</Text>

      <Pressable>
        <Text>{numofcom}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    padding: 20,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 10,
    margin: 10,
  },
  content: {
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
  },
  innerContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
