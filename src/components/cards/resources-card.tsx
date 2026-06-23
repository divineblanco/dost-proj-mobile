import { ThemedView } from "@/components/themed-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";

type ResourceItem = {
  id: string;
  icon: string;
  title: string;
  label: string;
  description: string;
  labelBg: string;
  labelColor: string;
  accentColor: string;
};

export function ResourcesCard() {
  const resourcesData: ResourceItem[] = [
    {
      id: "prevention",
      icon: "shield-alert-outline",
      title: "HIV Prevention Guide",
      label: "Prevention",
      description: "Essential information about prevention methods.",
      labelBg: "#EEF0FA",
      labelColor: "#35408E",
      accentColor: "#35408E",
    },
    {
      id: "testing",
      icon: "stethoscope",
      title: "Understanding HIV Testing",
      label: "Testing",
      description: "Learn about different testing methods and what results mean.",
      labelBg: "#FFF0F0",
      labelColor: "#C62828",
      accentColor: "#E53935",
    },
    {
      id: "treatment",
      icon: "pill",
      title: "HIV Treatment Options",
      label: "Treatment",
      description: "Overview of current treatment approaches and medications.",
      labelBg: "#FFF4EC",
      labelColor: "#E65100",
      accentColor: "#FF9800",
    },
    {
      id: "support",
      icon: "hand-heart",
      title: "Living Positively with HIV",
      label: "Support",
      description: "Support resources and health management.",
      labelBg: "#F8F0FF",
      labelColor: "#6A1B9A",
      accentColor: "#9C27B0",
    },
    {
      id: "awareness",
      icon: "account-group",
      title: "HIV Awareness in Communities",
      label: "Awareness",
      description: "Educational materials for community outreach programs.",
      labelBg: "#F5EFE9",
      labelColor: "#5D4037",
      accentColor: "#8D6E63",
    },
    {
      id: "research",
      icon: "book-open-page-variant",
      title: "Latest HIV Research Findings",
      label: "Research",
      description: "Summary of recent scientific advances in HIV research.",
      labelBg: "#FFFCE8",
      labelColor: "#F57F17",
      accentColor: "#D4A000",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {resourcesData.map((item) => (
        <ThemedView key={item.id} style={styles.cardShadow}>
          <ThemedView style={styles.card}>
            <ThemedView
              style={[
                styles.accentBar,
                { backgroundColor: item.accentColor },
              ]}
            />

            <ThemedView style={styles.cardContent}>
              <ThemedView style={styles.headerRow}>
                <ThemedView
                  style={[
                    styles.iconContainer,
                    { backgroundColor: item.labelBg },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={22}
                    color={item.accentColor}
                  />
                </ThemedView>

                <ThemedView
                  style={[
                    styles.labelPill,
                    { backgroundColor: item.labelBg },
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.labelText,
                      { color: item.labelColor },
                    ]}
                  >
                    {item.label}
                  </ThemedText>
                </ThemedView>
              </ThemedView>

              <ThemedText style={styles.title}>
                {item.title}
              </ThemedText>

              <ThemedText style={styles.description}>
                {item.description}
              </ThemedText>

              <ThemedView style={styles.divider} />

              <ThemedView style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.readMoreBtn,
                    { backgroundColor: item.accentColor },
                  ]}
                  onPress={() =>
                    router.push({
                      pathname: "/drawer/tabs/learn/resources-details",
                      params: { id: item.id },
                    })
                  }
                >
                  <ThemedText style={styles.readMoreText}>
                    Read More
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.downloadBtn}>
                  <MaterialCommunityIcons
                    name="download-outline"
                    size={16}
                    color="#35408E"
                  />
                  <ThemedText style={styles.downloadText}>
                    Download
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { gap: 14, paddingVertical: 4 },

  cardShadow: {
    borderRadius: 12,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: "transparent",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },

  accentBar: { width: 4 },

  cardContent: {
    flex: 1,
    padding: 16,
    gap: 8,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  labelPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    justifyContent: "center"
  },

  labelText: {
    fontSize: 12,
    fontWeight: "600",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#35408E",
  },

  description: {
    fontSize: 13,
    color: "#7a7e96",
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F2F8",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },

  readMoreBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
  },

  readMoreText: {
    color: "white",
    fontWeight: "600",
  },

  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D1D5E8",
  },

  downloadText: {
    color: "#35408E",
    fontWeight: "600",
  },
});