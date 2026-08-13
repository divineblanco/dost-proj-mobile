import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { trendingTopicsStyles } from "@/styles/trends/trends-components-styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";

type TrendingTopic = {
  id: number;
  title: string;
  percentage: string;
   description: string;
};

const trendingTopics: TrendingTopic[] = [
  { id: 1, title: "#HIVAwareness",       percentage: "+143%", description: "World AIDS Day campaign hashtag gaining traction" },
  { id: 2, title: "HIV Treatment Access", percentage: "+88%",  description: "Discussions about accessibility of antiretroviral therapy" },
  { id: 3, title: "Testing Centers",      percentage: "+62%",  description: "Inquiries about HIV testing locations and procedures" },
  { id: 4, title: "Prevention Methods",   percentage: "+47%",  description: "Information about PrEP and safe sex practices" },
];

export function TrendingTopics() {

  const r = useResponsive();
      
  const styles = useMemo(() => trendingTopicsStyles(r), [r]);
  
  return (
    <ThemedView style={styles.summaryContainer2}>
      {trendingTopics.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.trendsBox}
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: "/drawer/tabs/trend/view-trendspost",
              params: { topic: item.title, percentage: item.percentage,  description: item.description,},
            })
          }
        >
          <ThemedView style={styles.box}>
            <ThemedView style={styles.iconBG}>
              <Ionicons name="trending-up" size={icon(25)} color="#FF2A2A" />
            </ThemedView>

            <ThemedView style={styles.boxInfo}>
              <ThemedText type="trendCard" style={styles.boxTitle}>
                {item.title}
              </ThemedText>

              <ThemedView style={styles.trendRise}>
                <Ionicons name="arrow-up" size={icon(15)} color="#35408E" />
                <ThemedText style={styles.boxMore}>{item.percentage}</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
}