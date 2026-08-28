import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { settingsStyles } from "@/styles/settings/settings-styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  ScrollView,
  TouchableOpacity
} from "react-native";

const ACTIVITYLOG = [
  {
    icon: "person-outline",
    title: "Name",
    desc: "You changed your name to name.",
    date: "1 yr",
    route: "/drawer/tabs/setting/profile-settings",
  },
  {
    icon: "mail-outline",
    title: "Email",
    desc: "You changed your email address to new@email.com.",
    date: "2 yrs",
    route: "/drawer/tabs/setting/profile-settings",
  },
  {
    icon: "information-circle-outline",
    title: "Account Created",
    desc: "You created your account on March 1, 2023",
    date: "3 yrs",
    route: "/drawer/tabs/profiles/profile",
  },
];

export default function ActivityLog() {

      const r = useResponsive();
            
      const styles = useMemo(() => settingsStyles(r), [r]);
      
  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <ThemedText style={styles.headerTxt}>
            Review changes you’ve made to your account since you created it.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.dividerLine}></ThemedView>

        {ACTIVITYLOG.map((item, index) => (
          <React.Fragment key={index}>
            <ThemedView style={styles.row}>
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={icon(20)}
                color="#35408E"
              />

              <ThemedView style={styles.column}>
                <ThemedText style={styles.title}>
                  {item.title}
                </ThemedText>

                <ThemedText style={styles.desc}>
                  {item.desc}
                </ThemedText>

                <ThemedText style={styles.date}>
                  {item.date}
                </ThemedText>
              </ThemedView>

              <TouchableOpacity onPress={() => router.push(item.route as any)}>
                <Ionicons
                  name="chevron-forward"
                  size={icon(20)}
                  color="#35408E"
                />
              </TouchableOpacity>
            </ThemedView>

            
          </React.Fragment>
        ))}
        

      </ThemedView>
    </ScrollView>
  );
}