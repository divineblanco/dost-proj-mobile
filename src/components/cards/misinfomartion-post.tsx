import { MisinformationFilters } from "@/components/filters/misinformation-filter";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  API_KEY_VALUE,
  API_URL,
} from "@/lib/services/api";
import { colors } from "@/styles/contribute/contribute-colors";
import {
  misinformationPostStyles,
  sharedCardStyles,
} from "@/styles/contribute/contribute-component-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Image,
  ImageSourcePropType,
  Linking,
  ScrollView,
  TouchableOpacity,
} from "react-native";

type BackendContribution = {
  contribution_id: string;
  type: string;
  content: string;
  slug: string;
  classification: "PENDING" | "MISINFORMATION" | "FACTUAL";
  status: "PENDING" | "APPROVED" | "DECLINED";
  is_deleted: boolean;
  image_url?: string | null;
  source_url?: string | null;
  created_at?: string | null;
  barangay?: string | null;
  municipality?: string | null;
  province?: string | null;
  region?: string | null;
};

type MisinformationItem = {
  icon: ImageSourcePropType;
  name: string;
  type: string;
  typeBg: string;
  image?: string | null;
  date: string;
  createdAt?: string | null;
  sourceUrl?: string | null;
  title: string;
  post: string;
};

type Props = {
  filters: MisinformationFilters;
};

export function MisinformationPost({ filters }: Props) {
  const r = useResponsive();
  const sharedStyles = useMemo(() => sharedCardStyles(r), [r]);
  const styles = useMemo(() => misinformationPostStyles(r), [r]);

  // const API_URL = process.env.EXPO_PUBLIC_API_URL;
  // const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

  const { token, isLoading: authLoading } = useAuth();

  const [misinformationData, setMisinformationData] = useState<
    MisinformationItem[]
  >([]);
  const [loading, setLoading] = useState(true);

  const loadMisinformation = useCallback(async () => {
    if (authLoading || !token) return;

    if (!API_URL || !API_KEY_VALUE) {
      console.error(
        "[MISINFORMATION POST] Missing API configuration"
      );
      setMisinformationData([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/maintenance/contribution`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-API-Key": API_KEY_VALUE,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("[MISINFORMATION POST] API error:", result);
        setMisinformationData([]);
        return;
      }

      const edges = Array.isArray(result?.data?.edges)
        ? result.data.edges
        : [];

      const rawData: BackendContribution[] = edges
        .map(
          (edge: { node?: BackendContribution }) =>
            edge?.node
        )
        .filter(
          (
            node: BackendContribution | undefined
          ): node is BackendContribution => !!node
        );

      const approvedMisinformation = rawData.filter(
        (item) =>
          !item.is_deleted &&
          item.classification === "MISINFORMATION" &&
          item.status === "APPROVED"
      );

      const mapped: MisinformationItem[] =
        approvedMisinformation.map((item) => ({
          icon: require("@/assets/images/profile.jpg"),
          name: "Anonymous User",
          type: item.type || "Misinformation",
          typeBg: colors.dangerBg,
          image: item.image_url || null,
          date: item.created_at
            ? formatDate(item.created_at)
            : "Date unavailable",
          createdAt: item.created_at || null,
          sourceUrl: item.source_url || null,
          title: item.type || "Misinformation",
          post: item.content || "No content available.",
        }));

      setMisinformationData(mapped);
    } catch (error) {
      console.error(
        "[MISINFORMATION POST] Failed to load:",
        error
      );
      setMisinformationData([]);
    } finally {
      setLoading(false);
    }
  }, [
    token, authLoading, 
    // API_URL, API_KEY
  ]);

  useEffect(() => {
    loadMisinformation();
  }, [loadMisinformation]);

  const filteredData = useMemo(() => {
    return misinformationData.filter((item) => {
      if (filters.selectedType !== "All Types") {
        if (
          item.type.trim().toLowerCase() !==
          filters.selectedType.trim().toLowerCase()
        ) {
          return false;
        }
      }

      if (!item.createdAt) return false;

      const contributionDate = new Date(item.createdAt);

      if (Number.isNaN(contributionDate.getTime())) {
        return false;
      }

      if (
        filters.selectedDate === "Custom Range" &&
        filters.startDate &&
        filters.endDate
      ) {
        const start = startOfDay(filters.startDate);
        const end = endOfDay(filters.endDate);

        return (
          contributionDate.getTime() >= start.getTime() &&
          contributionDate.getTime() <= end.getTime()
        );
      }

      if (
        filters.selectedDate === "Custom Range" &&
        filters.startDate &&
        !filters.endDate
      ) {
        return (
          contributionDate.getTime() >=
          startOfDay(filters.startDate).getTime()
        );
      }

      const now = new Date();

      if (filters.selectedDate === "Last 7 Days") {
        return (
          contributionDate.getTime() >=
          subtractDays(now, 7).getTime()
        );
      }

      if (filters.selectedDate === "Last 30 Days") {
        return (
          contributionDate.getTime() >=
          subtractDays(now, 30).getTime()
        );
      }

      if (filters.selectedDate === "Last 90 Days") {
        return (
          contributionDate.getTime() >=
          subtractDays(now, 90).getTime()
        );
      }

      return true;
    });
  }, [misinformationData, filters]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {loading ? (
        <ThemedText style={styles.postText}>
          Loading misinformation...
        </ThemedText>
      ) : filteredData.length === 0 ? (
        <ThemedText style={styles.postText}>
          No misinformation matches the selected filters.
        </ThemedText>
      ) : (
        filteredData.map((item, index) => (
          <ThemedView
            key={
              item.createdAt
                ? `${item.createdAt}-${index}`
                : index
            }
            style={styles.cardShadow}
          >
            <ThemedView style={styles.card}>
              <ThemedView style={styles.alertBar} />

              <ThemedView style={styles.headerRow}>
                <ThemedView style={sharedStyles.cardUserRow}>
                  <Image
                    source={item.icon}
                    style={sharedStyles.cardAvatar}
                  />

                  <ThemedView
                    style={{
                      backgroundColor: "transparent",
                    }}
                  >
                    <ThemedText style={styles.nameText}>
                      {item.name}
                    </ThemedText>

                    <ThemedView
                      style={[
                        styles.typePill,
                        {
                          backgroundColor: item.typeBg,
                        },
                      ]}
                    >
                      <ThemedText style={styles.typeText}>
                        {item.type}
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>

                <ThemedView style={styles.warnBadge}>
                  <Ionicons
                    name="warning-outline"
                    size={icon(16)}
                    color={colors.danger}
                  />
                </ThemedView>
              </ThemedView>

              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              ) : null}

              <ThemedView style={styles.titlePostWrap}>
                <ThemedText style={styles.postText}>
                  {item.post}
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.divider} />

              <ThemedView style={styles.metaRow}>
                <ThemedView style={styles.metaItem}>
                  <Ionicons
                    name="calendar-outline"
                    size={icon(13)}
                    color={colors.metaBlue}
                  />

                  <ThemedText style={styles.metaText}>
                    {item.date}
                  </ThemedText>
                </ThemedView>

                <ThemedView
                  style={sharedStyles.cardMetaDivider}
                />

                {item.sourceUrl ? (
                  <TouchableOpacity
                    style={styles.metaItem}
                    activeOpacity={0.7}
                    onPress={async () => {
                      try {
                        const url = item.sourceUrl?.trim();

                        if (!url) return;

                        if (!/^https?:\/\//i.test(url)) {
                          console.error(
                            "[MISINFORMATION POST] Invalid source URL:",
                            url
                          );
                          return;
                        }

                        const supported =
                          await Linking.canOpenURL(url);

                        if (supported) {
                          await Linking.openURL(url);
                        }
                      } catch (error) {
                        console.error(
                          "[MISINFORMATION POST] Failed to open source:",
                          error
                        );
                      }
                    }}
                  >
                    <Ionicons
                      name="open-outline"
                      size={icon(13)}
                      color={colors.metaBlue}
                    />

                    <ThemedText
                      style={[
                        styles.metaText,
                        { color: colors.metaBlue },
                      ]}
                    >
                      Source
                    </ThemedText>
                  </TouchableOpacity>
                ) : null}
              </ThemedView>
            </ThemedView>
          </ThemedView>
        ))
      )}
    </ScrollView>
  );
}

function startOfDay(value: string) {
  return new Date(`${value}T00:00:00`);
}

function endOfDay(value: string) {
  return new Date(`${value}T23:59:59.999`);
}

function subtractDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
