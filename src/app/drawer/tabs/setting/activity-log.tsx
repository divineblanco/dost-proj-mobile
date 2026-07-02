import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";

const ACTIVITYLOG = [
  {
    icon: "person-outline",
    title: "Username",
    desc: "You changed your username to username.",
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
    route: "/drawer/tabs/profile",
  },
];

export default function ActivityLog() {
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

        <ThemedView style={styles.line}></ThemedView>

        {ACTIVITYLOG.map((item, index) => (
          <React.Fragment key={index}>
            <ThemedView style={styles.row}>
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={20}
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
                  size={20}
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

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  },
  scrollContent: {
    paddingBottom: 95,
  },

  headerContainer: {
    padding: 20,
  },

  headerTxt: {
    fontSize: 12, 
    fontWeight: "400",
    textAlign: "center"
  },

  line: {
    backgroundColor: "#c7c7c7",
    padding: 0.5,
    width: "85%",
    alignSelf: "center",
    marginBottom: 15
  },

  row: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
  },

  column: {
    flex: 1,
    gap: 2,
    backgroundColor: "transparent",
  },

  title: {
    fontSize: 17,
    fontWeight: "800"
  },

  desc: {
    fontSize: 11,
    fontWeight: "400",
    flexWrap: "wrap",
    paddingRight: 5
  },

  date: {
    fontSize: 12,
    fontWeight: "500",
    color: "#8d8c8c"
  }


});