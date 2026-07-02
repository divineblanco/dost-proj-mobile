import BadgeCard from "@/components/cards/badge-card";
import ResourcesDownload from "@/components/cards/downloaded-resources";
import MyDiscussions from "@/components/cards/my-discussions";
import { SurveyCard } from "@/components/cards/profile-survey";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";

export default function Profile() {
  
  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.push("/drawer/tabs/setting/settings")}>
            <Feather
            name="settings"
            size={20}
            color="#35408E"
            style={styles.settings}
          />
          </TouchableOpacity>

          <ThemedView style={styles.profileContainer}>
            <ThemedView style={styles.imageShadow}>
               <Image
                source={require("@/assets/images/profile.jpg")}
                style={styles.profileImg}
              />
            </ThemedView>

            <ThemedView style={styles.profileInfo}>
              <ThemedView style={styles.nameRow}>
                <ThemedText style={styles.userName}>
                  User Name
                </ThemedText>

                <ThemedView style={styles.levelBadge}>
                  <ThemedText style={styles.levelText}>
                    Advocate
                  </ThemedText>
                </ThemedView>
              </ThemedView>

              <ThemedText style={styles.email}>
                usersname@email.com
              </ThemedText>

              <ThemedView style={styles.infoRow}>
                <Ionicons
                  name="location-outline"
                  size={15}
                  color="#6a6a6dd6"
                />
                <ThemedText style={styles.infoText}>
                  Calamba, Laguna
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.infoRow}>
                <Ionicons
                  name="calendar-clear-outline"
                  size={15}
                  color="#6a6a6dd6"
                />
                <ThemedText style={styles.infoText}>
                  Member since May 25, 2026
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>


        <ThemedView style={styles.moreContainer}>
          <BadgeCard/>
          <ResourcesDownload/>
          <MyDiscussions/>
          <SurveyCard/>

          <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace("/")}>
            <Ionicons name="exit-outline" size={25} color="white"/>
            <ThemedText style={styles.logoutTxt}>Log Out</ThemedText>
          </TouchableOpacity>
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
    paddingBottom: 95,
  },

  headerContainer: {
    padding: 10,
  },

  settings: {
    alignSelf: "flex-end"
  },

  profileContainer: {
    flexDirection: "row", 
    justifyContent: "center",
    gap: 20,
    alignItems: "center"
  },

  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 999,
  },

  imageShadow: {
    elevation: 3,
    shadowColor: '#1A1F5E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    borderRadius: 999
  },

  profileInfo: {
    flexDirection: "column",
    gap: 5,
    padding: 10,
    backgroundColor: "transparent",
  },

  nameRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: "transparent",
  },

  userName: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 25,
  },

  levelBadge: {
    backgroundColor: "#FFB633",
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 80,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#1A1F5E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  levelText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },

  email: {
    fontSize: 15,
    fontWeight: "600",
  },

  infoRow: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    backgroundColor: "transparent",
  },

  infoText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6a6a6dd6",  
  },

  moreContainer: {
    padding: 10,
    gap: 10
  },

  logoutBtn: {
    backgroundColor: "#c91010c6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "40%",
    borderRadius: 8,
    alignSelf: "center",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    elevation: 8,

    // iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  logoutTxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    lineHeight: 25,
  }
});