import { ContributionFilters } from "@/components/filters/contributions-filter";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  API_KEY_VALUE,
  API_URL,
} from "@/lib/services/api";
import { colors } from "@/styles/contribute/contribute-colors";
import {
  contributionsCardStyles,
  sharedCardStyles,
} from "@/styles/contribute/contribute-component-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
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
  sentiment?: "POSITIVE" | "NEGATIVE" | "NEUTRAL" | null;
  created_at?: string | null;
  barangay?: string | null;
  municipality?: string | null;
  province?: string | null;
  region?: string | null;
};

type ContributionsItem = {
  icon: ImageSourcePropType;
  name: string;
  type: string;
  sentiment: string;
  sentimentColor: string;
  sentimentBg: string;
  image?: string | null;
  date: string;
  createdAt?: string | null;
  location: string;
  region?: string | null;
  regionCode?: string | null;
  post: string;
  sourceUrl?: string | null;
};

type Props = {
  filters: ContributionFilters;
};

export function ContributionsCard({ filters }: Props) {
  const r = useResponsive();

  const sharedStyles = useMemo(
    () => sharedCardStyles(r),
    [r]
  );

  const styles = useMemo(
    () => contributionsCardStyles(r),
    [r]
  );

  // const API_URL = process.env.EXPO_PUBLIC_API_URL;
  // const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

  const { token, isLoading: authLoading } = useAuth();

  const [allContributions, setAllContributions] = useState<
    ContributionsItem[]
  >([]);

  const [loading, setLoading] = useState(true);

  const loadContributions = useCallback(async () => {
    if (authLoading) return;

    if (!token) {
      setAllContributions([]);
      setLoading(false);
      return;
    }

    if (!API_URL || !API_KEY_VALUE) {
      console.error(
        "[CONTRIBUTIONS CARD] Missing API configuration"
      );
      setAllContributions([]);
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
        console.error(
          "[CONTRIBUTIONS CARD] API error:",
          result
        );
        setAllContributions([]);
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
          ): node is BackendContribution => Boolean(node)
        );

      const approvedFactual = rawData.filter(
        (item) =>
          !item.is_deleted &&
          item.classification === "FACTUAL" &&
          item.status === "APPROVED"
      );

      const mapped: ContributionsItem[] =
        approvedFactual.map((item) => {
          const sentiment = item.sentiment ?? "NEUTRAL";

          let sentimentColor = colors.warning;
          let sentimentBg = colors.warningBg;

          if (sentiment === "POSITIVE") {
            sentimentColor = colors.success;
            sentimentBg = colors.successBg;
          }

          if (sentiment === "NEGATIVE") {
            sentimentColor = colors.danger;
            sentimentBg = colors.dangerBg;
          }

          return {
            icon: require("@/assets/images/profile.jpg"),
            name: "Anonymous User",
            type: item.type || "Public Discussion",

            sentiment:
              sentiment.charAt(0) +
              sentiment.slice(1).toLowerCase(),

            sentimentColor,
            sentimentBg,

            image: item.image_url || null,
            sourceUrl: item.source_url || null,
            createdAt: item.created_at || null,

            date: item.created_at
              ? formatDate(item.created_at)
              : "Date unavailable",

            location:
              [
                item.barangay,
                item.municipality,
                item.province,
                item.region,
              ]
                .filter(Boolean)
                .join(", ") ||
              "Location unavailable",

            region: item.region || null,

            /*
             * If your contribution API eventually provides
             * region_code, you can map it here.
             */
            regionCode: null,

            post:
              item.content ||
              "No content available.",
          };
        });

      setAllContributions(mapped);
    } catch (error) {
      console.error(
        "[CONTRIBUTIONS CARD] Failed to load:",
        error
      );

      setAllContributions([]);
    } finally {
      setLoading(false);
    }
  }, [
    // API_URL,
    // API_KEY,
    token,
    authLoading,
  ]);

  useEffect(() => {
    loadContributions();
  }, [loadContributions]);

  const filteredContributions = useMemo(() => {
    return allContributions.filter((item) => {
      /*
       * =====================================================
       * REGION
       * =====================================================
       */

      if (
        filters.selectedRegion !== "All Regions"
      ) {
        const selectedRegion =
          filters.selectedRegion
            .trim()
            .toLowerCase();

        const itemRegion =
          item.region
            ?.trim()
            .toLowerCase() || "";

        if (!itemRegion) {
          return false;
        }

        if (
          itemRegion !== selectedRegion &&
          !itemRegion.includes(selectedRegion) &&
          !selectedRegion.includes(itemRegion)
        ) {
          return false;
        }
      }

      /*
       * =====================================================
       * CATEGORY
       * =====================================================
       */

      if (
        filters.selectedCategories !==
        "All Categories"
      ) {
        const selectedCategory =
          filters.selectedCategories
            .trim()
            .toLowerCase();

        const itemCategory =
          item.type
            .trim()
            .toLowerCase();

        if (
          itemCategory !== selectedCategory
        ) {
          return false;
        }
      }

      /*
       * =====================================================
       * SENTIMENT
       * =====================================================
       */

      if (
        filters.selectedSentiment !==
        "All Sentiment"
      ) {
        const selectedSentiment =
          filters.selectedSentiment
            .trim()
            .toLowerCase();

        const itemSentiment =
          item.sentiment
            .trim()
            .toLowerCase();

        if (
          itemSentiment !==
          selectedSentiment
        ) {
          return false;
        }
      }

      /*
       * =====================================================
       * DATE
       * =====================================================
       */

      if (!item.createdAt) {
        return false;
      }

      const contributionDate =
        new Date(item.createdAt);

      if (
        Number.isNaN(
          contributionDate.getTime()
        )
      ) {
        return false;
      }

      /*
       * -----------------------------------------------------
       * CUSTOM RANGE
       * -----------------------------------------------------
       */

      if (
        filters.selectedDate ===
        "Custom Range"
      ) {
        /*
         * Do not filter until both dates have
         * actually been selected.
         */
        if (
          !filters.startDate ||
          !filters.endDate
        ) {
          return true;
        }

        const start =
          getStartOfDay(
            filters.startDate
          );

        const end =
          getEndOfDay(
            filters.endDate
          );

        const time =
          contributionDate.getTime();

        return (
          time >= start.getTime() &&
          time <= end.getTime()
        );
      }

      /*
       * -----------------------------------------------------
       * LAST 7 DAYS
       * -----------------------------------------------------
       */

      if (
        filters.selectedDate ===
        "Last 7 Days"
      ) {
        const start =
          subtractDays(
            new Date(),
            7
          );

        return (
          contributionDate.getTime() >=
          start.getTime()
        );
      }

      /*
       * -----------------------------------------------------
       * LAST 30 DAYS
       * -----------------------------------------------------
       */

      if (
        filters.selectedDate ===
        "Last 30 Days"
      ) {
        const start =
          subtractDays(
            new Date(),
            30
          );

        return (
          contributionDate.getTime() >=
          start.getTime()
        );
      }

      /*
       * -----------------------------------------------------
       * LAST 90 DAYS
       * -----------------------------------------------------
       */

      if (
        filters.selectedDate ===
        "Last 90 Days"
      ) {
        const start =
          subtractDays(
            new Date(),
            90
          );

        return (
          contributionDate.getTime() >=
          start.getTime()
        );
      }

      /*
       * Unknown date filter.
       *
       * Do not accidentally hide everything.
       */
      return true;
    });
  }, [
    allContributions,
    filters,
  ]);

  return (
    <ScrollView
      contentContainerStyle={
        styles.scrollContainer
      }
      showsVerticalScrollIndicator={false}
    >
      {loading ? (
        <ThemedText
          style={styles.postText}
        >
          Loading contributions...
        </ThemedText>
      ) : filteredContributions.length === 0 ? (
        <ThemedText
          style={styles.postText}
        >
          No contributions match the selected
          filters.
        </ThemedText>
      ) : (
        filteredContributions.map(
          (item, index) => (
            <ThemedView
              key={
                item.createdAt
                  ? `${item.createdAt}-${index}`
                  : String(index)
              }
              style={styles.card}
            >
              {/* HEADER */}

              <ThemedView
                style={styles.headerRow}
              >
                <ThemedView
                  style={
                    sharedStyles.cardUserRow
                  }
                >
                  <Image
                    source={item.icon}
                    style={
                      sharedStyles.cardAvatar
                    }
                  />

                  <ThemedView
                    style={{
                      backgroundColor:
                        "transparent",
                    }}
                  >
                    <ThemedText
                      style={styles.nameText}
                    >
                      {item.name}
                    </ThemedText>

                    <ThemedText
                      style={styles.typeText}
                    >
                      {item.type}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>

                {/* SENTIMENT */}

                <ThemedView
                  style={[
                    styles.sentimentPill,
                    {
                      backgroundColor:
                        item.sentimentBg,
                    },
                  ]}
                >
                  <ThemedView
                    style={[
                      styles.sentimentDot,
                      {
                        backgroundColor:
                          item.sentimentColor,
                      },
                    ]}
                  />

                  <ThemedText
                    style={[
                      styles.sentimentText,
                      {
                        color:
                          item.sentimentColor,
                      },
                    ]}
                  >
                    {item.sentiment}
                  </ThemedText>
                </ThemedView>
              </ThemedView>

              {/* IMAGE */}

              {item.image ? (
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              ) : null}

              {/* CONTENT */}

              <ThemedText
                style={styles.postText}
              >
                {item.post}
              </ThemedText>

              <ThemedView
                style={styles.divider}
              />

              {/* META */}

              <ThemedView
                style={styles.metaRow}
              >
                <ThemedView
                  style={styles.metaItem}
                >
                  <Ionicons
                    name="calendar-outline"
                    size={icon(13)}
                    color={
                      colors.metaBlue
                    }
                  />

                  <ThemedText
                    style={styles.metaText}
                  >
                    {item.date}
                  </ThemedText>
                </ThemedView>

                <ThemedView
                  style={
                    sharedStyles.cardMetaDivider
                  }
                />

                <ThemedView
                  style={[
                    styles.metaItem,
                    styles.metaItemShrink,
                  ]}
                >
                  <Ionicons
                    name="location-outline"
                    size={icon(13)}
                    color={
                      colors.metaBlue
                    }
                  />

                  <TouchableOpacity
                    style={
                      styles.metaItemShrink
                    }
                    onPress={() =>
                      Alert.alert(
                        "Location",
                        item.location
                      )
                    }
                  >
                    <ThemedText
                      style={
                        styles.metaText
                      }
                      numberOfLines={1}
                    >
                      {item.location}
                    </ThemedText>
                  </TouchableOpacity>
                </ThemedView>

                {item.sourceUrl ? (
                  <>
                    <ThemedView
                      style={
                        sharedStyles.cardMetaDivider
                      }
                    />

                    <TouchableOpacity
                      style={
                        styles.metaItem
                      }
                      onPress={() =>
                        Linking.openURL(
                          item.sourceUrl!
                        )
                      }
                    >
                      <Ionicons
                        name="open-outline"
                        size={icon(13)}
                        color={
                          colors.metaBlue
                        }
                      />

                      <ThemedText
                        style={
                          styles.metaText
                        }
                      >
                        Source
                      </ThemedText>
                    </TouchableOpacity>
                  </>
                ) : null}
              </ThemedView>
            </ThemedView>
          )
        )
      )}
    </ScrollView>
  );
}

/*
 * =========================================================
 * DATE HELPERS
 * =========================================================
 */

function getStartOfDay(
  value: string
): Date {
  const [year, month, day] =
    value.split("-").map(Number);

  return new Date(
    year,
    month - 1,
    day,
    0,
    0,
    0,
    0
  );
}

function getEndOfDay(
  value: string
): Date {
  const [year, month, day] =
    value.split("-").map(Number);

  return new Date(
    year,
    month - 1,
    day,
    23,
    59,
    59,
    999
  );
}

function subtractDays(
  date: Date,
  days: number
): Date {
  const result = new Date(date);

  result.setDate(
    result.getDate() - days
  );

  return result;
}

function formatDate(
  value: string
): string {
  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Date unavailable";
  }

  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}
