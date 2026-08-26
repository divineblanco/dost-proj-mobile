import BadgeCard from "@/components/cards/badge-card";
import ResourcesDownload from "@/components/cards/downloaded-resources";
import MyDiscussions from "@/components/cards/my-discussions";
import { SurveyCard } from "@/components/cards/profile-survey";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { profileStyles } from "@/styles/profile/profile-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";

export default function Profile() {

  const r = useResponsive();
        
  const styles = useMemo(() => profileStyles(r), [r]);
  
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
            size={icon(20)}
            color="#35408E"
            style={styles.settings}
          />
          </TouchableOpacity>

          <ThemedView style={styles.profileContainer}>
            
            <ThemedView style={{alignItems: "center"}}>
              <ThemedView style={styles.imageShadow}>
               <Image
                source={require("@/assets/images/profile.jpg")}
                style={styles.profileImg}
              />
              </ThemedView>
              <ThemedView style={styles.levelBadge}>
                  <ThemedText style={styles.levelText}>
                    Advocate
                  </ThemedText>
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.profileInfo}>
              <ThemedView style={styles.nameRow}>
                <ThemedText style={styles.userName}>
                  First Name
                </ThemedText>
              </ThemedView>

              {/* Fix this when Organization is the Role, show the name of Org "(Name of Org)" */}
              <ThemedText style={styles.role}>
                General Public
              </ThemedText>

              <ThemedView style={styles.infoRow}>
                <Ionicons
                  name="location-outline"
                  size={icon(15)}
                  color="#6a6a6dd6"
                />
                <ThemedText style={styles.infoText}>
                  Calamba, Laguna
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.infoRow}>
                <Ionicons
                  name="calendar-clear-outline"
                  size={icon(15)}
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
          <BadgeCard returnTo="/drawer/tabs/profiles/profile" />
          <ResourcesDownload/>
          <MyDiscussions/>
          <SurveyCard/>

          <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace("/")}>
            <Ionicons name="exit-outline" size={icon(25)} color="white"/>
            <ThemedText style={styles.logoutTxt}>Log Out</ThemedText>
          </TouchableOpacity>
        </ThemedView>

      </ThemedView>
    </ScrollView>
  );
}