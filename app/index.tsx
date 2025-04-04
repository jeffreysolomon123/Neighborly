import { Text, View } from "react-native";
import FeedPost from "@/components/FeedPost";

export default function Index() {
  return (
    <View>
      <FeedPost
        content="hello there i just joined"
        date="2d"
        numofcom="3"
        name="Jeffrey"
        place="Perungudi"
      />
    </View>
  );
}
