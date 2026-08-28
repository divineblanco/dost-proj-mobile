import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { settingsStyles } from "@/styles/settings/settings-styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  ScrollView,
  TouchableOpacity
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

    const r = useResponsive();
          
    const styles = useMemo(() => settingsStyles(r), [r]);

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView style={styles.aboutContainer}>
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
              size={icon(18)}
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