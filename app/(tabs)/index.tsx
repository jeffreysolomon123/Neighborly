import { Text, View, ScrollView } from "react-native";
import FeedPost from "@/components/FeedPost";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { getToken, getUserId } from "@/utils/auth";
export default function Index() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    //this is used to get the saved token and userId from the auth.ts file
    const fetchData = async () => {
      const token = await getToken();
      const userId = await getUserId();
      setUserId(userId);
    };

    //this is used to check if the user's token is

    fetchData();
  }, []);

  return (
    <ScrollView>
      <Text>{userId}</Text>
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
