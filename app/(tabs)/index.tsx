import { Text, View, ScrollView } from "react-native";
import FeedPost from "@/components/FeedPost";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { getToken, getUserId, getArea } from "@/utils/auth";
export default function Index() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [area, setArea] = useState("");

  useEffect(() => {
    //this is used to get the saved token and userId from the auth.ts file
    const fetchData = async () => {
      const token = await getToken();
      const userId = await getUserId();
      const area = await getArea();
      setUserId(userId);
      setArea(area);
      if (userId === null) {
        router.replace("/(auth)/Login");
      }
    };

    //this is used to check if the user's token is

    fetchData();
  }, []);

  return (
    <ScrollView>
      <FeedPost
        name="Meera Iyer"
        content="Water supply will be interrupted in Perungudi from 10 AM to 2 PM tomorrow due to maintenance work. Please store water in advance."
        date="April 14, 2025"
        commentCount={12}
      />

      <FeedPost
        name="Ravi Narayanan"
        content="Just moved into 3rd Cross Street with my family. Would love to meet neighbors and know about local shops and services!"
        date="April 10, 2025"
        commentCount={5}
      />
      <FeedPost
        name="Ananya Sundar"
        content="We're organizing a community clean-up drive this Saturday at 6:30 AM. Gloves and garbage bags will be provided. Let's make Perungudi greener!"
        date="April 12, 2025"
        commentCount={18}
      />

      <FeedPost
        name="Shruti Bala"
        content="Found a wallet near the old post office. Has a few cards and cash inside. DM me with identification if it's yours."
        date="April 09, 2025"
        commentCount={9}
      />
    </ScrollView>
  );
}
