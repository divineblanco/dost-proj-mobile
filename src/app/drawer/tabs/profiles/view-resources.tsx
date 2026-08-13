import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { viewResourceStyles as resource } from "@/styles/profile/profile-components-styles";
import { profileStyles as styles } from "@/styles/profile/profile-styles";
import { icon } from "@/styles/responsive";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    ScrollView,
    TouchableOpacity
} from "react-native";

type ResourceCategory = "Reports" | "Educational Materials";

type Resource = {
  id: number;
  title: string;
  desc: string;
  date: string;
  timestamp: number;
  category: ResourceCategory;
};

const resources: Resource[] = [
  {
    id: 1,
    title: "HIV Prevention Guide",
    desc: "Prevention methods and safer practices.",
    date: "May 20, 2026",
    timestamp: new Date(2026, 4, 20).getTime(),
    category: "Educational Materials",
  },
  {
    id: 2,
    title: "Understanding PrEP",
    desc: "A guide to Pre-Exposure Prophylaxis.",
    date: "May 18, 2026",
    timestamp: new Date(2026, 4, 18).getTime(),
    category: "Educational Materials",
  },
  {
    id: 3,
    title: "HIV Testing Centers Directory",
    desc: "Verified testing sites in the Philippines.",
    date: "May 15, 2026",
    timestamp: new Date(2026, 4, 15).getTime(),
    category: "Reports",
  },
  {
    id: 4,
    title: "Q1 2026 Community Outreach Report",
    desc: "Summary of outreach activities and reach.",
    date: "Apr 30, 2026",
    timestamp: new Date(2026, 3, 30).getTime(),
    category: "Reports",
  },
  {
    id: 5,
    title: "Living Positively: A Guide",
    desc: "Support resources for newly diagnosed individuals.",
    date: "Apr 22, 2026",
    timestamp: new Date(2026, 3, 22).getTime(),
    category: "Educational Materials",
  },
];

const FILTERS: { label: string; value: "All" | ResourceCategory }[] = [
  { label: "All", value: "All" },
  { label: "Reports", value: "Reports" },
  { label: "Educational Materials", value: "Educational Materials" },
];

export default function ViewResources() {
    const [activeFilter, setActiveFilter] = useState<"All" | ResourceCategory>("All");
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

    const filteredResources = useMemo(() => {
    const filtered =
        activeFilter === "All"
        ? resources
        : resources.filter(
            (resource) => resource.category === activeFilter
            );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.timestamp - a.timestamp;
    }

    return a.timestamp - b.timestamp;
  });

  return sorted;
}, [activeFilter, sortOrder]);

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView style={resource.headerBlock}>
        <ThemedText style={resource.pageTitle}>Downloaded Resources</ThemedText>
        <ThemedText style={resource.pageSubtitle}>
          Reports and educational materials you've saved for offline access.
        </ThemedText>
      </ThemedView>

      {/* Filter Tabs + Sort */}
      <ThemedView style={resource.filterSortRow}>
        <ThemedView style={resource.filterRow}>
          {FILTERS.map((filter) => {
            const active = activeFilter === filter.value;
            return (
              <TouchableOpacity
                key={filter.value}
                activeOpacity={0.75}
                onPress={() => setActiveFilter(filter.value)}
                style={[resource.filterChip, active && resource.filterChipActive]}
              >
                <ThemedText
                  style={[
                    resource.filterChipText,
                    active && resource.filterChipTextActive,
                  ]}
                >
                  {filter.label}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </ThemedView>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
                setSortOrder((current) =>
                current === "newest" ? "oldest" : "newest"
                );
            }}
          style={resource.sortBtn}
        >
          <Feather
            name={sortOrder === "newest" ? "arrow-down" : "arrow-up"}
            size={icon(14)}
            color="#ffffff"
          />
        </TouchableOpacity>
      </ThemedView>

      {/* Resource List */}
      <ThemedView style={resource.listCard}>
        {filteredResources.length === 0 ? (
          <ThemedView style={resource.emptyState}>
            <Feather name="inbox" size={icon(28)} color="#B7C0D6" />
            <ThemedText style={resource.emptyText}>
              No resources found in this category.
            </ThemedText>
          </ThemedView>
        ) : (
          filteredResources.map((item, index) => (
            <ThemedView key={item.id}>
              <ThemedView style={resource.row}>
                {/* LEFT SIDE */}
                <ThemedView style={resource.contentContainer}>
                  <ThemedView
                    style={[
                      resource.iconBubble,
                      item.category === "Reports"
                        ? resource.iconBubbleReport
                        : resource.iconBubbleEdu,
                    ]}
                  >
                    <Feather
                      name={item.category === "Reports" ? "bar-chart-2" : "book"}
                      size={icon(18)}
                      color={item.category === "Reports" ? "#35408E" : "#FFB633"}
                    />
                  </ThemedView>

                  <ThemedView style={resource.textCol}>
                    <ThemedText style={resource.itemTitle} numberOfLines={1}>
                      {item.title}
                    </ThemedText>

                    <ThemedText style={resource.itemDesc} numberOfLines={2}>
                      {item.desc}
                    </ThemedText>

                    <ThemedView style={resource.metaRow}>
                      <ThemedView style={resource.categoryPill}>
                        <ThemedText style={resource.categoryPillText}>
                          {item.category}
                        </ThemedText>
                      </ThemedView>

                      <ThemedView style={resource.dateRow}>
                        <Ionicons
                          name="calendar-outline"
                          size={icon(11)}
                          color="#9BA8C0"
                        />
                        <ThemedText style={resource.itemDate}>
                          {item.date}
                        </ThemedText>
                      </ThemedView>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>

                {/* DOWNLOAD BUTTON */}
                <TouchableOpacity
                  style={resource.downloadBtn}
                  activeOpacity={0.75}
                >
                  <Feather name="download" size={icon(15)} color="#35408E" />
                </TouchableOpacity>
              </ThemedView>

              {index < filteredResources.length - 1 && (
                <ThemedView style={resource.rowDivider} />
              )}
            </ThemedView>
          ))
        )}
      </ThemedView>
    </ScrollView>
  );
}