import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { viewTrendsStyles } from "@/styles/trends/trends-styles";
import { FontAwesome6 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";

// ── Platform config ──────────────────────────────────────────────
type Platform = "All" | "X" | "Reddit" | "Facebook" | "TikTok";

const PLATFORMS: { key: Platform; icons: keyof typeof FontAwesome6.glyphMap; color: string; bg: string }[] = [
  { key: "All",      icons: "bars",  color: "#35408E", bg: "#EEF0FA" },
  { key: "Facebook", icons: "facebook", color: "#1877F2", bg: "#E8F0FE" },
  { key: "X",        icons: "x-twitter",  color: "#14171A", bg: "#F0F0F0" },
  { key: "Reddit",   icons: "reddit-alien",   color: "#FF4500", bg: "#FFF0EB" },
  { key: "TikTok",   icons: "tiktok", color: "#FE2C55", bg: "#F3F0F7" },
];

// ── Mock post data ────────────────────────────────────────────────
type Post = {
  id: number;
  platform: Exclude<Platform, "All">;
  content: string;
  date: string;
};

const MOCK_POSTS: Post[] = [
  {
    id: 1, platform: "Facebook",
    content: "Let's break the stigma. Regular testing is the first step toward a healthier community. Know your status today. 💙 #HIVAwareness",
    date: "May 20, 2026"
  },
  {
    id: 2, platform: "X",
    content: "HIV cases are rising — but so is awareness. Education and testing remain our strongest tools. #HIVAwareness #EndStigma",
    date: "May 19, 2026"
  },
  {
    id: 3, platform: "Reddit",
    content: "PSA: Free HIV testing is available at most public health centers nationwide. No appointment needed. Please share this with friends.",
    date: "May 18, 2026"
  },
  {
    id: 4, platform: "TikTok",
    content: "Did you know? Early detection of HIV leads to better health outcomes. Get tested, get informed. 💪 #HIVAwareness #GetTested",
    date: "May 17, 2026"
  },
  {
    id: 5, platform: "Facebook",
    content: "The Department of Health reminds everyone: HIV is preventable. Condom use, PrEP, and regular testing save lives. #HIVAwareness",
    date: "May 16, 2026"
  },
  {
    id: 6, platform: "X",
    content: "1 in 4 people living with HIV don't know their status. Let's change that. Normalize testing. #HIVAwareness",
    date: "May 15, 2026"
  },
];

// ── Platform badge colors ─────────────────────────────────────────
const PLATFORM_MAP: Record<Exclude<Platform,"All">, { color: string; bg: string; icons: keyof typeof FontAwesome6.glyphMap }> = {
  Facebook: { color: "#1877F2", bg: "#E8F0FE", icons: "facebook" },
  X:        { color: "#14171A", bg: "#F0F0F0", icons: "x-twitter"  },
  Reddit:   { color: "#FF4500", bg: "#FFF0EB", icons: "reddit-alien"   },
  TikTok:   { color: "#FE2C55", bg: "#F3F0F7", icons: "tiktok" },
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

  const r = useResponsive();
      
  const styles = useMemo(() => viewTrendsStyles(r), [r]);

  return (
    <View style={styles.pageContainer}>
      {/* Topic hero */}
      <ThemedView style={styles.topicHero}>
        <ThemedView style={styles.trendIconBubble}>
          <FontAwesome6 name="arrow-trend-up" size={icon(20)} color="#FF2A2A" />
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
            <FontAwesome6 name="arrow-trend-up" size={icon(12)} color="#2E9E3A" />
            <ThemedText style={styles.trendPct}>{percentage} this week</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Platform filter tabs */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {PLATFORMS.map(({ key, icons, color, bg }) => {
            const isActive = activeFilter === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.filterTab, isActive && { backgroundColor: bg, borderColor: color }]}
                onPress={() => setActiveFilter(key)}
                activeOpacity={0.8}
              >
                <FontAwesome6 name={icons} size={icon(14)} color={isActive ? color : "#9BA8C0"} />
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
                    <FontAwesome6 name={p.icons} size={icon(12)} color={p.color} />
                    <ThemedText style={[styles.platformLabel, { color: p.color }]}>{post.platform}</ThemedText>
                  </ThemedView>
                </ThemedView>

                {/* Content */}
                <ThemedText style={styles.postContent}>{post.content}</ThemedText>

                {/* Footer */}
                <ThemedView style={styles.postFooter}>
                  <ThemedView style={styles.dateRow}>
                    <FontAwesome6 name="calendar-alt" size={icon(12)} color="#9BA8C0" />
                    <ThemedText style={styles.postDate}>{post.date}</ThemedText>
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