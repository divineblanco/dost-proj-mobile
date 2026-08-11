import { ThemedView } from "@/components/themed-view";
import { resourcesCardStyles } from "@/styles/resources/resources-components-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { downloadResourcePDF } from "@/utils/download-resource";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";

export type ResourceItem = {
  id: string;
  icon: string;
  title: string;
  label: string;
  description: string;
  content: string;
  labelBg: string;
  labelColor: string;
  accentColor: string;
  materialType: string;
};

type ResourcesCardProps = {
  data: ResourceItem[];
};

export function ResourcesCard({ data }: ResourcesCardProps) {

  const r = useResponsive();
        
  const styles = useMemo(() => resourcesCardStyles(r), [r]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    >
      {data.map((item) => (
        <ThemedView key={item.id} style={styles.cardShadow}>
          <ThemedView style={styles.card}>
            {/* Left Accent Bar */}
            <ThemedView
              style={[
                styles.cardAccentBar,
                {
                  backgroundColor: item.accentColor,
                },
              ]}
            />

            <ThemedView style={styles.cardContent}>
              {/* Header */}
              <ThemedView style={styles.headerRow}>
                <ThemedView
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: item.labelBg,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={icon(22)}
                    color={item.accentColor}
                  />
                </ThemedView>

                <ThemedView
                  style={[
                    styles.cardlabelPill,
                    {
                      backgroundColor: item.labelBg,
                    },
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.cardlabelText,
                      {
                        color: item.labelColor,
                      },
                    ]}
                  >
                    {item.label}  |  {item.materialType}
                  </ThemedText>
                </ThemedView>
              </ThemedView>

              {/* Title */}

              <ThemedText style={styles.cardtitle}>
                {item.title}
              </ThemedText>

              {/* Description */}

              <ThemedText style={styles.carddescription}>
                {item.description}
              </ThemedText>

              {/* Divider */}

              <ThemedView style={styles.carddivider} />

              {/* Buttons */}

              <ThemedView style={styles.cardbuttonRow}>
                <TouchableOpacity
                  style={[
                    styles.readMoreBtn,
                    {
                      backgroundColor: item.accentColor,
                    },
                  ]}
                  onPress={() =>
                    router.push({
                      pathname:
                        "/drawer/tabs/learn/resources-details",
                      params: {
                        id: item.id,
                      },
                    })
                  }
                >
                  <ThemedText
                    style={styles.readMoreText}
                  >
                    Read More
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.downloadBtn}
                  onPress={() => downloadResourcePDF(item)}
                >
                  <MaterialCommunityIcons
                    name="download-outline"
                    size={icon(16)}
                    color="#35408E"
                  />

                  <ThemedText
                    style={styles.downloadText}
                  >
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