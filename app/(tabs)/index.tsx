import { Text, View, ScrollView } from "react-native";
import FeedPost from "@/components/FeedPost";

export default function Index() {
  return (
    <ScrollView>
      <FeedPost
        content="Hey everyone! I just moved into Orchid Apartments, flat 203. Excited to be part of the community!"
        date="2d"
        numofcom="3"
        name="Jeffrey"
        place="Perungudi"
      />
      <FeedPost
        content="Lost dog alert 🐶 — brown lab seen near Perungudi Bus Depot this morning. DM if spotted"
        date="2d"
        numofcom="3"
        name="Robert"
        place="Perungudi"
      />
      <FeedPost
        content="Thinking of starting a weekend running group at 6 AM near the lake. Who's in? "
        date="2d"
        numofcom="3"
        name="Rahul"
        place="Perungudi"
      />
      <FeedPost
        content="Hey everyone! I just moved into Orchid Apartments, flat 203. Excited to be part of the community!"
        date="2d"
        numofcom="3"
        name="Jeffrey"
        place="Perungudi"
      />
    </ScrollView>
  );
}
