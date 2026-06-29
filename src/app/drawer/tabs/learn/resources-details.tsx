import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Share, StyleSheet, TouchableOpacity } from "react-native";

export default function ResourceDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const resourcesData = [
    {
      id: "prevention",
      title: "HIV Prevention Guide",
      label: "Prevention",
      description: "Essential information about prevention methods.",
      content:
        "HIV prevention includes condoms, PrEP, PEP, and regular testing...",
      accentColor: "#35408E",
      labelColor: "#35408E",
      labelBg: "#EEF0FA",
    },
    {
      id: "testing",
      title: "Understanding HIV Testing",
      label: "Testing",
      description: "Learn about HIV testing methods.",
      content: "Testing helps detect HIV early for better treatment...",
      accentColor: "#E53935",
      labelColor: "#C62828",
      labelBg: "#FFF0F0",
    },
    {
      id: "treatment",
      title: "HIV Treatment Options",
      label: "Treatment",
      description: "Overview of ART treatments.",
      content: "ART suppresses viral load and improves health...",
      accentColor: "#FF9800",
      labelColor: "#E65100",
      labelBg: "#FFF4EC",
    },
    {
      id: "support",
      title: "Living Positively with HIV",
      label: "Support",
      description: "Support and mental health resources.",
      content: "Support groups and healthy lifestyle are important...",
      accentColor: "#9C27B0",
      labelColor: "#6A1B9A",
      labelBg: "#F8F0FF",
    },
    {
      id: "awareness",
      title: "HIV Awareness in Communities",
      label: "Awareness",
      description: "Community education programs.",
      content: "Awareness reduces stigma and improves care access...",
      accentColor: "#8D6E63",
      labelColor: "#5D4037",
      labelBg: "#F5EFE9",
    },
    {
      id: "research",
      title: "Latest HIV Research Findings",
      label: "Research",
      description: "Scientific advances in HIV.",
      content: "Research focuses on vaccines and long-term cures...",
      accentColor: "#D4A000",
      labelColor: "#F57F17",
      labelBg: "#FFFCE8",
    },
  ];

  const resource = resourcesData.find((r) => r.id === id);

  if (!resource) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Resource not found</ThemedText>
      </ThemedView>
    );
  }

  const onShare = async () => {
  try {
    await Share.share({
      title: resource.title,
      message: `${resource.title}

  ${resource.description}

  Read more about HIV resources in the AdvocAid PH app.`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Accent bar */}
      <ThemedView
        style={[styles.accentBar, { backgroundColor: resource.accentColor }]}
      />

      {/* Label pill */}
      <ThemedView style={[styles.labelPill, { backgroundColor: resource.labelBg }]}>
        <ThemedText style={[styles.labelText, { color: resource.labelColor }]}>
          {resource.label}
        </ThemedText>
      </ThemedView>

      <ThemedText style={styles.title}>{resource.title}</ThemedText>

      <ThemedText style={styles.description}>{resource.description}</ThemedText>

      <ThemedView style={styles.divider} />

      <ThemedText style={styles.contentText}>{resource.content}</ThemedText>

      {/* Last updated */}
      <ThemedView style={styles.updateRow}>
        <Ionicons name="time-outline" size={13} color="#9BA8C0" />
        <ThemedText style={styles.updateText}>Last updated: May 25, 2025</ThemedText>
      </ThemedView>

      {/* Action buttons */}
      <ThemedView style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.75}>
          <Ionicons name="download-outline" size={18} color="#35408E" />
          <ThemedText style={styles.actionBtnText}>Download</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.75} onPress={onShare}>
          <Ionicons name="share-social-outline" size={18} color="#35408E" />
          <ThemedText style={styles.actionBtnText}>Share</ThemedText>
        </TouchableOpacity>
      </ThemedView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    padding: 20,
    paddingTop: 16,
  },

  // Back button — minimal, breadcrumb-style
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    alignSelf: "flex-start",
    marginBottom: 20,
    paddingVertical: 4,
    paddingRight: 8,
  },

  backText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#35408E",
  },

  accentBar: {
    height: 4,
    borderRadius: 999,
    marginBottom: 18,
  },

  labelPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },

  labelText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1F5E",
    lineHeight: 32,
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F2F8",
    marginVertical: 20,
  },

  contentText: {
    fontSize: 15,
    lineHeight: 26,
    color: "#374151",
  },

  updateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 20,
    backgroundColor: "transparent",
  },

  updateText: {
    fontSize: 12,
    color: "#9BA8C0",
    fontWeight: "500",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 24,
    backgroundColor: "transparent",
  },

  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 11,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#D1D5E8",
    backgroundColor: "#F8F9FD",
  },

  actionBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#35408E",
  },
});