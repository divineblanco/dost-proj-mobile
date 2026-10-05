import { MisinformationFilters } from "@/components/filters/misinformation-filter";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { colors } from "@/styles/contribute/contribute-colors";
import { misinformationPostStyles, sharedCardStyles } from "@/styles/contribute/contribute-component-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { Image, ImageSourcePropType, Linking, ScrollView, TouchableOpacity } from "react-native";

type BackendContribution = {
  contribution_id: string;
  type: string;
  content: string;
  slug: string;
  classification: "PENDING" | "MISINFORMATION" | "FACTUAL";
  classification_method?: "MANUAL" | "AI" | "HYBRID" | null;
  status: "PENDING" | "APPROVED" | "DECLINED";
  is_deleted: boolean;
  image_url?: string | null;
  source_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  language?: string | null;
  barangay?: string | null;
  municipality?: string | null;
  province?: string | null;
  region?: string | null;
  sentiment?: "POSITIVE" | "NEGATIVE" | "NEUTRAL" | null;
};

type ContributionEdge = { node: BackendContribution | null; cursor?: string };

type ContributionsResponse = {
  meta?: { api_version?: string; status?: number };
  data?: {
    edges?: ContributionEdge[];
    pageInfo?: {
      startCursor?: string;
      endCursor?: string;
      hasNextPage?: boolean;
      hasPrevPage?: boolean;
    };
    totalCount?: number;
    timestamp?: string;
    success?: boolean;
  };
};

type MisinformationItem = {
  id: string;
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
  language?: string | null;
};

type Props = { filters: MisinformationFilters };

const ITEMS_PER_PAGE = 10;

export function MisinformationPost({ filters }: Props) {
  const r = useResponsive();
  const sharedStyles = useMemo(() => sharedCardStyles(r), [r]);
  const styles = useMemo(() => misinformationPostStyles(r), [r]);
  const { token, isLoading: authLoading } = useAuth();

  const [allMisinformation, setAllMisinformation] = useState<MisinformationItem[]>([]);
  const [cursor, setCursor] = useState("");
  const [loadingAll, setLoadingAll] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: result, isLoading: queryLoading } = useFormQuery<ContributionsResponse>({
    key: ["approved-misinformation", cursor],
    url: "/maintenance/contribution",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-api-key": "testing",
      "x-api-version": "2026-02-26",
    },
    params: {
      limit: 100,
      orderBy: "created_at",
      sortBy: "desc",
      startCursor: "",
      endCursor: cursor,
    },
    enabled: !!token && !authLoading,
  });

  const mapMisinformation = (response?: ContributionsResponse): MisinformationItem[] => {
    const edges = Array.isArray(response?.data?.edges) ? response.data.edges : [];

    return edges
      .map((edge) => edge?.node)
      .filter((node): node is BackendContribution => !!node)
      .filter((item) => !item.is_deleted && item.status === "APPROVED" && item.classification === "MISINFORMATION")
      .map((item) => ({
        id: item.contribution_id,
        icon: require("@/assets/images/profile.jpg"),
        name: "Anonymous User",
        type: item.type || "Misinformation",
        typeBg: colors.dangerBg,
        image: item.image_url || null,
        date: item.created_at ? formatDate(item.created_at) : "Date unavailable",
        createdAt: item.created_at || null,
        sourceUrl: item.source_url || null,
        title: item.type || "Misinformation",
        post: item.content || "No content available.",
        language: item.language || null,
      }));
  };

  useEffect(() => {
    if (authLoading) return;

    if (!token) {
      setAllMisinformation([]);
      setCursor("");
      setCurrentPage(1);
      setLoadingAll(false);
      return;
    }

    setAllMisinformation([]);
    setCursor("");
    setCurrentPage(1);
    setLoadingAll(true);
  }, [token, authLoading]);

  useEffect(() => {
    if (authLoading || !token || queryLoading) return;

    const pageItems = mapMisinformation(result);

    setAllMisinformation((previous) => {
      if (!cursor) return pageItems;

      const existingIds = new Set(previous.map((item) => item.id));
      const newItems = pageItems.filter((item) => !existingIds.has(item.id));

      return [...previous, ...newItems];
    });

    const pageInfo = result?.data?.pageInfo;

    if (pageInfo?.hasNextPage && pageInfo.endCursor && pageInfo.endCursor !== cursor) {
      setCursor(pageInfo.endCursor);
    } else {
      setLoadingAll(false);
    }
  }, [result, queryLoading, cursor, token, authLoading]);

  const filteredData = useMemo(() => {
    return allMisinformation.filter((item) => {
      if (filters.selectedType !== "All Types") {
        const selectedType = filters.selectedType.trim().toLowerCase();
        const itemType = item.type.trim().toLowerCase();
        if (itemType !== selectedType) return false;
      }

      if (filters.selectedLanguage !== "All Languages") {
        const selectedLanguage = filters.selectedLanguage.trim().toLowerCase();
        const itemLanguage = item.language?.trim().toLowerCase() || "";

        if (!itemLanguage || itemLanguage !== selectedLanguage) return false;
      }

      if (!item.createdAt) return false;

      const contributionDate = new Date(item.createdAt);
      if (Number.isNaN(contributionDate.getTime())) return false;

      if (filters.selectedDate === "Custom Range") {
        if (!filters.startDate || !filters.endDate) return true;

        const start = getStartOfDay(filters.startDate);
        const end = getEndOfDay(filters.endDate);
        const time = contributionDate.getTime();

        return time >= start.getTime() && time <= end.getTime();
      }

      if (filters.selectedDate === "Last 7 Days") {
        return contributionDate.getTime() >= subtractDays(new Date(), 7).getTime();
      }

      if (filters.selectedDate === "Last 30 Days") {
        return contributionDate.getTime() >= subtractDays(new Date(), 30).getTime();
      }

      if (filters.selectedDate === "Last 90 Days") {
        return contributionDate.getTime() >= subtractDays(new Date(), 90).getTime();
      }

      return true;
    });
  }, [allMisinformation, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const goToPreviousPage = () => {
    setCurrentPage((previous) => Math.max(previous - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((previous) => Math.min(previous + 1, totalPages));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {loadingAll ? (
        <ThemedText style={styles.postText}>Loading all approved misinformation...</ThemedText>
      ) : filteredData.length === 0 ? (
        <ThemedText style={styles.postText}>No misinformation matches the selected filters.</ThemedText>
      ) : (
        <>
          {paginatedData.map((item) => (
            <ThemedView key={item.id} style={styles.cardShadow}>
              <ThemedView style={styles.card}>
                <ThemedView style={styles.alertBar} />

                <ThemedView style={styles.headerRow}>
                  <ThemedView style={sharedStyles.cardUserRow}>
                    <Image source={item.icon} style={sharedStyles.cardAvatar} />

                    <ThemedView style={{ backgroundColor: "transparent" }}>
                      <ThemedText style={styles.nameText}>{item.name}</ThemedText>

                      <ThemedView style={[styles.typePill, { backgroundColor: item.typeBg }]}>
                        <ThemedText style={styles.typeText}>{item.type}</ThemedText>
                      </ThemedView>
                    </ThemedView>
                  </ThemedView>

                  <ThemedView style={styles.warnBadge}>
                    <Ionicons name="warning-outline" size={icon(16)} color={colors.danger} />
                  </ThemedView>
                </ThemedView>

                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.postImage} resizeMode="cover" />
                ) : null}

                <ThemedView style={styles.titlePostWrap}>
                  <ThemedText style={styles.postText}>{item.post}</ThemedText>
                </ThemedView>

                <ThemedView style={styles.divider} />

                <ThemedView style={styles.metaRow}>
                  <ThemedView style={styles.metaItem}>
                    <Ionicons name="calendar-outline" size={icon(13)} color={colors.metaBlue} />
                    <ThemedText style={styles.metaText}>{item.date}</ThemedText>
                  </ThemedView>

                  <ThemedView style={sharedStyles.cardMetaDivider} />

                  {item.sourceUrl ? (
                    <TouchableOpacity
                      style={styles.metaItem}
                      activeOpacity={0.7}
                      onPress={async () => {
                        try {
                          const url = item.sourceUrl?.trim();
                          if (!url) return;

                          if (!/^https?:\/\//i.test(url)) {
                            console.error("[MISINFORMATION POST] Invalid source URL:", url);
                            return;
                          }

                          const supported = await Linking.canOpenURL(url);
                          if (supported) await Linking.openURL(url);
                        } catch (error) {
                          console.error("[MISINFORMATION POST] Failed to open source:", error);
                        }
                      }}
                    >
                      <Ionicons name="open-outline" size={icon(13)} color={colors.metaBlue} />
                      <ThemedText style={[styles.metaText, { color: colors.metaBlue }]}>Source</ThemedText>
                    </TouchableOpacity>
                  ) : null}
                </ThemedView>
              </ThemedView>
            </ThemedView>
          ))}

          {totalPages > 1 && (
            <ThemedView style={sharedStyles.paginationContainer}>
              <TouchableOpacity
                style={[
                  sharedStyles.paginationButton,
                  currentPage === 1 && sharedStyles.paginationButtonDisabled,
                ]}
                disabled={currentPage === 1}
                onPress={goToPreviousPage}
              >
                <Ionicons
                  name="chevron-back"
                  size={icon(18)}
                  color={currentPage === 1 ? "#A0A0A0" : colors.primary}
                />
              </TouchableOpacity>

              <ThemedText style={sharedStyles.paginationText}>
                Page {currentPage} of {totalPages}
              </ThemedText>

              <TouchableOpacity
                style={[
                  sharedStyles.paginationButton,
                  currentPage === totalPages && sharedStyles.paginationButtonDisabled,
                ]}
                disabled={currentPage === totalPages}
                onPress={goToNextPage}
              >
                <Ionicons
                  name="chevron-forward"
                  size={icon(18)}
                  color={currentPage === totalPages ? "#A0A0A0" : colors.primary}
                />
              </TouchableOpacity>
            </ThemedView>
          )}
        </>
      )}
    </ScrollView>
  );
}

function getStartOfDay(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

function getEndOfDay(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 23, 59, 59, 999);
}

function subtractDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

