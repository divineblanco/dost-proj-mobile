import { Language, LanguageFilter } from "@/components/filters/language-filter-trends";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { viewTrendsStyles } from "@/styles/trends/trends-styles";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";

// ── Types ─────────────────────────────────────────────────────────
type Platform = "All" | "X" | "Reddit" | "Facebook" | "TikTok";

// ── Platform config ───────────────────────────────────────────────
const PLATFORMS: { key: Platform; icons: keyof typeof FontAwesome6.glyphMap; color: string; bg: string }[] = [
  { key: "All",      icons: "bars",         color: "#35408E", bg: "#EEF0FA" },
  { key: "Facebook", icons: "facebook",     color: "#1877F2", bg: "#E8F0FE" },
  { key: "X",        icons: "x-twitter",    color: "#14171A", bg: "#F0F0F0" },
  { key: "Reddit",   icons: "reddit-alien", color: "#FF4500", bg: "#FFF0EB" },
  { key: "TikTok",   icons: "tiktok",       color: "#FE2C55", bg: "#F3F0F7" },
];

// ── Mock post data ────────────────────────────────────────────────
type Post = {
  id: number;
  platform: Exclude<Platform, "All">;
  language: Exclude<Language, "All">;
  content: string;
  date: string;
};

const MOCK_POSTS: Post[] = [
  { id: 1, platform: "Facebook", language: "English",    content: "Let's break the stigma. Regular testing is the first step toward a healthier community. Know your status today. 💙 #HIVAwareness", date: "May 20, 2026" },
  { id: 2, platform: "X",        language: "Filipino",   content: "Ang mga kaso ng HIV ay tumataas — ngunit tumataas din ang kamalayan. Ang edukasyon at pagsubok ay aming pinakamalakas na kagamitan. #HIVAwareness", date: "May 19, 2026" },
  { id: 3, platform: "Reddit",   language: "English",    content: "PSA: Free HIV testing is available at most public health centers nationwide. No appointment needed. Please share this.", date: "May 18, 2026" },
  { id: 4, platform: "TikTok",   language: "Cebuano",    content: "Nahibal-an ba nimo? Ang sayo nga pag-detect sa HIV mosangpot sa mas maayong kahimsog. Magpatest, magpahibalo. 💪 #HIVAwareness", date: "May 17, 2026" },
  { id: 5, platform: "Facebook", language: "Filipino",   content: "Ipinaalala ng Kagawaran ng Kalusugan: Napipigilan ang HIV. Ang paggamit ng condom, PrEP, at regular na pagsubok ay nagliligtas ng buhay.", date: "May 16, 2026" },
  { id: 6, platform: "X",        language: "English",    content: "1 in 4 people living with HIV don't know their status. Let's change that. Normalize testing. #HIVAwareness", date: "May 15, 2026" },
  { id: 7, platform: "Facebook", language: "Ilocano",    content: "Adda libre nga HIV testing iti kaaduan a public health centers. Saan a masapul ti appointment. Ibaga iti sabali.", date: "May 14, 2026" },
  { id: 8, platform: "Reddit",   language: "Hiligaynon", content: "Hibal-i ang imo kahimtangan. Regular nga pagtindog sang HIV test ang una nga tikang para sa mas maayo nga komunidad.", date: "May 13, 2026" },
];

const PLATFORM_MAP: Record<Exclude<Platform, "All">, { color: string; bg: string; icons: keyof typeof FontAwesome6.glyphMap }> = {
  Facebook: { color: "#1877F2", bg: "#E8F0FE", icons: "facebook" },
  X:        { color: "#14171A", bg: "#F0F0F0", icons: "x-twitter" },
  Reddit:   { color: "#FF4500", bg: "#FFF0EB", icons: "reddit-alien" },
  TikTok:   { color: "#FE2C55", bg: "#F3F0F7", icons: "tiktok" },
};

// ── Screen ────────────────────────────────────────────────────────
export default function ViewTrendsPost() {
  const { topic, percentage, description } = useLocalSearchParams<{
    topic: string;
    percentage: string;
    description: string;
  }>();

  const [activeFilter,   setActiveFilter]   = useState<Platform>("All");
  const [activeLanguage, setActiveLanguage] = useState<Language>("All");

  const filtered = useMemo(() => {
    return MOCK_POSTS.filter((p) => {
      const matchPlatform = activeFilter === "All" || p.platform === activeFilter;
      const matchLanguage = activeLanguage === "All" || p.language === activeLanguage;
      return matchPlatform && matchLanguage;
    });
  }, [activeFilter, activeLanguage]);

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

          {description ? (
            <ThemedText style={styles.topicDescription}>{description}</ThemedText>
          ) : null}

          <ThemedView style={styles.trendRise}>
            <FontAwesome6 name="arrow-trend-up" size={icon(12)} color="#2E9E3A" />
            <ThemedText style={styles.trendPct}>{percentage} this week</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* ── Filter row ── */}
      <View style={styles.filterRow}>
        {/* Platform tabs — scrolls horizontally */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
          style={styles.platformScrollView}
        >
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

        {/* Vertical separator */}
        <View style={styles.separator} />

        {/* Language filter — fixed, never scrolls */}
        <LanguageFilter selected={activeLanguage} onChange={setActiveLanguage} />
      </View>

      {/* Posts list */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={36} color="#D1D5E8" />
            <ThemedText style={styles.emptyTxt}>No posts match your filters</ThemedText>
            <TouchableOpacity
              onPress={() => { setActiveFilter("All"); setActiveLanguage("All"); }}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.clearAllTxt}>Clear all filters</ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          filtered.map((post) => {
            const p = PLATFORM_MAP[post.platform];
            return (
              <ThemedView key={post.id} style={styles.postCard}>
                <View style={[styles.cardAccent, { backgroundColor: p.color }]} />

                <ThemedView style={styles.cardBody}>
                  <ThemedView style={styles.postHeader}>
                    {/* Platform pill */}
                    <ThemedView style={[styles.platformPill, { backgroundColor: p.bg }]}>
                      <FontAwesome6 name={p.icons} size={icon(12)} color={p.color} />
                      <ThemedText style={[styles.platformLabel, { color: p.color }]}>
                        {post.platform}
                      </ThemedText>
                    </ThemedView>

                    {/* Language pill */}
                    <ThemedView style={styles.langPill}>
                      <Ionicons name="language-outline" size={icon(12)} color="#9BA8C0" />
                      <ThemedText style={styles.langPillTxt}>{post.language}</ThemedText>
                    </ThemedView>
                  </ThemedView>

                  <ThemedText style={styles.postContent}>{post.content}</ThemedText>

                  <ThemedView style={styles.postFooter}>
                    <ThemedView style={styles.dateRow}>
                      <FontAwesome6 name="calendar-alt" size={icon(12)} color="#9BA8C0" />
                      <ThemedText style={styles.postDate}>{post.date}</ThemedText>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}