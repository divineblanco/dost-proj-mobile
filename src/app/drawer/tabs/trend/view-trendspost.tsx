import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { FontAwesome6 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

// ── Platform config ──────────────────────────────────────────────
type Platform = "All" | "X" | "Reddit" | "Facebook" | "TikTok";

const PLATFORMS: { key: Platform; icon: keyof typeof FontAwesome6.glyphMap; color: string; bg: string }[] = [
  { key: "All",      icon: "bars",  color: "#35408E", bg: "#EEF0FA" },
  { key: "Facebook", icon: "facebook", color: "#1877F2", bg: "#E8F0FE" },
  { key: "X",        icon: "x-twitter",  color: "#14171A", bg: "#F0F0F0" },
  { key: "Reddit",   icon: "reddit-alien",   color: "#FF4500", bg: "#FFF0EB" },
  { key: "TikTok",   icon: "tiktok", color: "#FE2C55", bg: "#F3F0F7" },
];

// ── Mock post data ────────────────────────────────────────────────
type Post = {
  id: number;
  platform: Exclude<Platform, "All">;
  content: string;
  date: string;
  likes: string;
  comments: string;
  shares: string;
};

const MOCK_POSTS: Post[] = [
  {
    id: 1, platform: "Facebook",
    content: "Let's break the stigma. Regular testing is the first step toward a healthier community. Know your status today. 💙 #HIVAwareness",
    date: "May 20, 2026", likes: "1.2k", comments: "84", shares: "320",
  },
  {
    id: 2, platform: "X",
    content: "HIV cases are rising — but so is awareness. Education and testing remain our strongest tools. #HIVAwareness #EndStigma",
    date: "May 19, 2026", likes: "872", comments: "41", shares: "215",
  },
  {
    id: 3, platform: "Reddit",
    content: "PSA: Free HIV testing is available at most public health centers nationwide. No appointment needed. Please share this with friends.",
    date: "May 18, 2026", likes: "634", comments: "59", shares: "88",
  },
  {
    id: 4, platform: "TikTok",
    content: "Did you know? Early detection of HIV leads to better health outcomes. Get tested, get informed. 💪 #HIVAwareness #GetTested",
    date: "May 17, 2026", likes: "4.7k", comments: "213", shares: "890",
  },
  {
    id: 5, platform: "Facebook",
    content: "The Department of Health reminds everyone: HIV is preventable. Condom use, PrEP, and regular testing save lives. #HIVAwareness",
    date: "May 16, 2026", likes: "2.1k", comments: "157", shares: "540",
  },
  {
    id: 6, platform: "X",
    content: "1 in 4 people living with HIV don't know their status. Let's change that. Normalize testing. #HIVAwareness",
    date: "May 15, 2026", likes: "511", comments: "29", shares: "143",
  },
];

// ── Platform badge colors ─────────────────────────────────────────
const PLATFORM_MAP: Record<Exclude<Platform,"All">, { color: string; bg: string; icon: keyof typeof FontAwesome6.glyphMap }> = {
  Facebook: { color: "#1877F2", bg: "#E8F0FE", icon: "facebook" },
  X:        { color: "#14171A", bg: "#F0F0F0", icon: "x-twitter"  },
  Reddit:   { color: "#FF4500", bg: "#FFF0EB", icon: "reddit-alien"   },
  TikTok:   { color: "#FE2C55", bg: "#F3F0F7", icon: "tiktok" },
};

// ── Screen ────────────────────────────────────────────────────────
export default function ViewTrendsPost() {
  const { topic, percentage, description } = useLocalSearchParams<{
    topic: string;
    percentage: string;
    description: string;
  }>();
  const [activeFilter, setActiveFilter] = useState<Platform>("All");

  const filtered = activeFilter === "All"
    ? MOCK_POSTS
    : MOCK_POSTS.filter((p) => p.platform === activeFilter);

  return (
    <View style={styles.pageContainer}>
      {/* Topic hero */}
      <ThemedView style={styles.topicHero}>
        <ThemedView style={styles.trendIconBubble}>
          <FontAwesome6 name="arrow-trend-up" size={20} color="#FF2A2A" />
        </ThemedView>
 
        <ThemedView style={styles.topicInfo}>
          <ThemedView style={styles.topicTitleRow}>
            <ThemedText style={styles.topicTitle} numberOfLines={1}>{topic}</ThemedText>
            <ThemedView style={styles.postCountPill}>
              <ThemedText style={styles.postCountTxt}>{filtered.length} posts</ThemedText>
            </ThemedView>
          </ThemedView>
 
          {/* Description shown here */}
          {description ? (
            <ThemedText style={styles.topicDescription}>{description}</ThemedText>
          ) : null}
 
          <ThemedView style={styles.trendRise}>
            <FontAwesome6 name="arrow-trend-up" size={12} color="#2E9E3A" />
            <ThemedText style={styles.trendPct}>{percentage} this week</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Platform filter tabs */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {PLATFORMS.map(({ key, icon, color, bg }) => {
            const isActive = activeFilter === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.filterTab, isActive && { backgroundColor: bg, borderColor: color }]}
                onPress={() => setActiveFilter(key)}
                activeOpacity={0.8}
              >
                <FontAwesome6 name={icon} size={14} color={isActive ? color : "#9BA8C0"} />
                <ThemedText style={[styles.filterLabel, isActive && { color, fontWeight: "700" }]}>
                  {key}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Posts list */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((post, index) => {
          const p = PLATFORM_MAP[post.platform];
          return (
            <ThemedView key={post.id} style={styles.postCard}>

              {/* Card top accent */}
              <View style={[styles.cardAccent, { backgroundColor: p.color }]} />

              <ThemedView style={styles.cardBody}>
                {/* Header */}
                <ThemedView style={styles.postHeader}>
                  <ThemedView style={[styles.platformPill, { backgroundColor: p.bg }]}>
                    <FontAwesome6 name={p.icon} size={12} color={p.color} />
                    <ThemedText style={[styles.platformLabel, { color: p.color }]}>{post.platform}</ThemedText>
                  </ThemedView>
                </ThemedView>

                {/* Content */}
                <ThemedText style={styles.postContent}>{post.content}</ThemedText>

                {/* Footer */}
                <ThemedView style={styles.postFooter}>
                  <ThemedView style={styles.dateRow}>
                    <FontAwesome6 name="calendar-alt" size={12} color="#9BA8C0" />
                    <ThemedText style={styles.postDate}>{post.date}</ThemedText>
                  </ThemedView>

                  <ThemedView style={styles.statsRow}>
                    <ThemedView style={styles.stat}>
                      <FontAwesome6 name="heart" size={13} color="#9BA8C0" />
                      <ThemedText style={styles.statTxt}>{post.likes}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.stat}>
                      <FontAwesome6 name="comment" size={13} color="#9BA8C0" />
                      <ThemedText style={styles.statTxt}>{post.comments}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.stat}>
                      <FontAwesome6 name="share" size={13} color="#9BA8C0" />
                      <ThemedText style={styles.statTxt}>{post.shares}</ThemedText>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          );
        })}
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#F8F9FD",
    paddingTop: 15,
  },

  // Back button
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    paddingRight: 10,
  },

  backText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#35408E",
  },

  // Topic hero
    topicHero: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    padding: 14,
    shadowColor: "#35408E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },

  topicLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "transparent",
    flex: 1,
  },

  trendIconBubble: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
  },

  topicInfo: { 
    flex: 1, 
    gap: 2, 
    backgroundColor: "transparent" 
  },

  topicTitleRow: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", gap: 8,
    backgroundColor: "transparent",
  },
  topicTitle: { 
    fontSize: 15, 
    fontWeight: "700",
    color: "#35408E", 
    flex: 1 
  },

  topicDescription: { 
    fontSize: 11, 
    color: "#35408E", 
    lineHeight: 17 
  },

  trendRise: {
    flexDirection: "row", 
    alignItems: "center",
    gap: 3, 
    backgroundColor: "transparent",
  },

  trendPct: { 
    fontSize: 11, 
    color: "#2E9E3A", 
    fontWeight: "600",
    fontStyle: "italic"
  },

  postCountPill: {
    backgroundColor: "#EEF0FA", paddingHorizontal: 10,
    paddingVertical: 3, borderRadius: 20,
  },
  postCountTxt: { fontSize: 11, fontWeight: "600", color: "#35408E" },


  // Filter bar
  filterBar: {
    marginTop: 12,
    paddingLeft: 16,
  },

  filterScroll: {
    gap: 8,
    paddingRight: 16,
  },

  filterTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    backgroundColor: "#FFFFFF",
  },

  filterLabel: {
    fontSize: 12,
    color: "#9BA8C0",
    fontWeight: "500",
  },

  // Posts
  scroll: {
    flex: 1,
    marginTop: 12,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    gap: 12,
  },

  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    overflow: "hidden",
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  cardAccent: {
    height: 3,
    width: "100%",
  },

  cardBody: {
    padding: 14,
    gap: 10,
    backgroundColor: "transparent",
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "transparent",
  },

  platformPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },

  platformLabel: {
    fontSize: 11,
    fontWeight: "600",
  },

  postContent: {
    fontSize: 13,
    color: "#35408E",
    lineHeight: 20,
  },

  postFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "transparent",
  },

  postDate: {
    fontSize: 11,
    color: "#9BA8C0",
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "transparent",
  },

  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "transparent",
  },

  statTxt: {
    fontSize: 11,
    color: "#9BA8C0",
    fontWeight: "500",
  },
});