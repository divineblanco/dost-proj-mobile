import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { trendsCardStyles } from "@/styles/home-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";

type TrendItem = {
  id: number;
  title: string;
  description: string;
  percentage: string;
};

const trendsData: TrendItem[] = [
  {
    id: 1,
    title: "#HIVAwareness",
    description: "World AIDS Day campaign hashtag gaining traction",
    percentage: "+143%",
  },
  {
    id: 2,
    title: "HIV Treatment Access",
    description: "Discussions about accessibility of antiretroviral therapy",
    percentage: "+88%",
  },
  {
    id: 3,
    title: "Testing Centers",
    description: "Inquiries about HIV testing locations and procedures",
    percentage: "+62%",
  },
  {
    id: 4,
    title: "PrEP Awareness",
    description: "Information about PrEP and safe sex practices",
    percentage: "+47%",
  },
];

export function TrendsCard() {
  const r = useResponsive();
  const styles = useMemo(() => trendsCardStyles(r), [r]);

  return (
    <ThemedView style={styles.trendsContainer}>
      {trendsData.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.trendsBG}
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: "/drawer/tabs/trend/view-trendspost",
              params: { topic: item.title, percentage: item.percentage, description: item.description },
            })
          }
        >
          <ThemedView
            style={[styles.trendCircle, { backgroundColor: "#FF2A2A" }]}
          />

          <ThemedView style={styles.trendsInfo}>
            <ThemedText type="subtitleLight">{item.title}</ThemedText>
            <ThemedText style={styles.desc} numberOfLines={1} ellipsizeMode="tail">
              {item.description}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.trendRise}>
            <Ionicons name="arrow-up" size={icon(20)} color="#35408E" />
            <ThemedText type="subtitleItalic">{item.percentage}</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
}