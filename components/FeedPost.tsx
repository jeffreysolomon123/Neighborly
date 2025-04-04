import { Text, View, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_100Thin,
} from "@expo-google-fonts/poppins";
import { red } from "react-native-reanimated/lib/typescript/Colors";

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
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.place}>{place}</Text>
      </View>

      <Text style={styles.content}>{content}</Text>
      <View style={styles.innerContainer}>
        <Pressable>
          <AntDesign name="hearto" size={24} color="black" />
        </Pressable>
        <Pressable>
          <Text style={styles.comment}>Add a comment</Text>
        </Pressable>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable>
          <Text>{numofcom} comments</Text>
        </Pressable>
        <Text>{date}</Text>
      </View>
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
    color: "#888888",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  name: {
    color: "grey",
  },
  place: {
    color: "grey",
  },
  content: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    lineHeight: 25,
    color: "#333333",
  },
  innerContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    marginTop: 15,
  },
  comment: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: 300,
    textAlign: "left",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
});
