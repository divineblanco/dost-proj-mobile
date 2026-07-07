import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ABOUT = [
  {
    title: "About AdvocAid PH",
    route: "/drawer/tabs/setting/abouts/about-advocaid",
  },
  {
    title: "Privacy Policy",
    route: "/drawer/tabs/setting/abouts/privacy-policy",
  },
  {
    title: "Terms of Use",
    route: "/drawer/tabs/setting/abouts/terms",
  },
];

export default function About() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView style={styles.container}>
        {ABOUT.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.tabContainer}
            activeOpacity={0.7}
            onPress={() => router.push(item.route as any)}
          >
            <ThemedText style={styles.tabText}>
              {item.title}
            </ThemedText>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#35408E"
              style={styles.tabIcon}
            />
          </TouchableOpacity>
        ))}
        <ThemedView style={styles.tabContainer}>
          <ThemedText style={styles.tabText}>App Version</ThemedText>
          <ThemedText style={styles.versionTxt}>Version 1.0.0</ThemedText>
        </ThemedView>
        
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  },

  scrollContent: {
    paddingBottom: 90,
  },

  container: {
    paddingVertical: 10,
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  tabText: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 30,
  },

  tabIcon: {
    paddingRight: 10,
  },

  versionTxt: {
    color: "grey"
  }
});