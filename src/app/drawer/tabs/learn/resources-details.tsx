import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { resourceDetailsStyles } from "@/styles/resources/resources-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { downloadResourcePDF } from "@/utils/download-resource";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { ScrollView, Share, TouchableOpacity } from "react-native";
import { resourcesData } from "./resource-data";

export default function ResourceDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const resource = resourcesData.find(
    (item) => item.id === id
  );

  if (!resource) {
    return (
      <ThemedView style={{flex: 1, backgroundColor: "white",}}>
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

  const r = useResponsive();
          
  const styles = useMemo(() => resourceDetailsStyles(r), [r]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Accent bar */}
      <ThemedView
        style={[styles.accentBar, { backgroundColor: resource.accentColor }]}
      />

      <ThemedView style={styles.pillContainer}>
        {/* Label pill */}
        <ThemedView style={[styles.labelPill, { backgroundColor: resource.labelBg }]}>
          <ThemedText style={[styles.labelText, { color: resource.labelColor }]}>
            {resource.label}
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.labelPill, {backgroundColor: resource.labelBg}]}>
          <ThemedText style={[styles.labelText, { color: resource.labelColor }]}>
            {resource.materialType}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedText style={styles.title}>{resource.title}</ThemedText>

      <ThemedText style={styles.description}>{resource.description}</ThemedText>

      <ThemedView style={styles.divider} />

      <ThemedText style={styles.contentText}>{resource.content}</ThemedText>

      {/* Last updated */}
      <ThemedView style={styles.updateRow}>
        <Ionicons name="time-outline" size={icon(13)} color="#9BA8C0" />
        <ThemedText style={styles.updateText}>Last updated: May 25, 2025</ThemedText>
      </ThemedView>

      {/* Action buttons */}
      <ThemedView style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.75} onPress={() => downloadResourcePDF(resource)}>
          <Ionicons name="download-outline" size={icon(18)} color="#35408E" />
          <ThemedText style={styles.actionBtnText}>Download</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.75} onPress={onShare}>
          <Ionicons name="share-social-outline" size={icon(18)} color="#35408E" />
          <ThemedText style={styles.actionBtnText}>Share</ThemedText>
        </TouchableOpacity>
      </ThemedView>

    </ScrollView>
  );
}