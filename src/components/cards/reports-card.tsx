import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { reportStyles } from "@/styles/reports-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";

type ReportCategory =
  | "Sentiment"
  | "Demographic"
  | "Regional"
  | "Trends";

type ReportsCardProps = {
  title: string;
  description: string;
  date: string;
  category: ReportCategory;
};

type CategoryStyle = {
  pillBackground: string;
  pillText: string;
  accent: string;
  iconBackground: string;
  iconColor: string;
};

const CATEGORY_STYLES: Record<
  ReportCategory,
  CategoryStyle
> = {
  Sentiment: {
    pillBackground: "#EEE9FA",
    pillText: "#7057A8",
    accent: "#7057A8",
    iconBackground: "#F3EFFB",
    iconColor: "#7057A8",
  },

  Demographic: {
    pillBackground: "#E8F3FD",
    pillText: "#3781C1",
    accent: "#3781C1",
    iconBackground: "#EEF6FC",
    iconColor: "#3781C1",
  },

  Regional: {
    pillBackground: "#E7F5EC",
    pillText: "#328456",
    accent: "#328456",
    iconBackground: "#EEF9F2",
    iconColor: "#328456",
  },

  Trends: {
    pillBackground: "#FFF4D9",
    pillText: "#B8860B",
    accent: "#B8860B",
    iconBackground: "#FFF8E8",
    iconColor: "#B8860B",
  },
};

export function ReportsCard({
  title,
  description,
  date,
  category,
}: ReportsCardProps) {

  const r = useResponsive();
            
    const styles = useMemo(() => reportStyles(r), [r]);

  const categoryStyle =
    CATEGORY_STYLES[category];

  return (
    <ThemedView style={styles.shadowWrapper}>

      <ThemedView style={styles.card}>

        {/* ================= ACCENT BAR ================= */}

        <ThemedView
          style={[
            styles.accentBar,
            {
              backgroundColor:
                categoryStyle.accent,
            },
          ]}
        />

        {/* ================= LEFT COLUMN ================= */}

        <ThemedView style={styles.leftCol}>

          {/* ICON */}

          <ThemedView
            style={[
              styles.iconContainer,
              {
                backgroundColor:
                  categoryStyle.iconBackground,
              },
            ]}
          >
            <Ionicons
              name="document-text-outline"
              size={icon(24)}
              color={categoryStyle.iconColor}
            />
          </ThemedView>

          {/* CATEGORY */}

          <ThemedView
            style={[
              styles.labelPill,
              {
                backgroundColor:
                  categoryStyle.pillBackground,
              },
            ]}
          >
            <ThemedText
              style={[
                styles.labelText,
                {
                  color:
                    categoryStyle.pillText,
                },
              ]}
            >
              {category}
            </ThemedText>
          </ThemedView>

        </ThemedView>

        {/* ================= VERTICAL DIVIDER ================= */}

        <ThemedView
          style={styles.verticalDivider}
        />

        {/* ================= CONTENT ================= */}

        <ThemedView style={styles.content}>

          {/* TITLE + DOWNLOAD */}

          <ThemedView style={styles.titleRow}>

            <ThemedText
              style={styles.title}
              numberOfLines={2}
            >
              {title}
            </ThemedText>

            <TouchableOpacity
              style={styles.downloadBtn}
              activeOpacity={0.7}
              onPress={() => {
                console.log(
                  `Download report: ${title}`
                );
              }}
            >
              <Ionicons
                name="download-outline"
                size={icon(16)}
                color="#35408E"
              />
            </TouchableOpacity>

          </ThemedView>

          {/* DATE */}

          <ThemedView style={styles.dateRow}>

            <Ionicons
              name="calendar-outline"
              size={icon(13)}
              color={categoryStyle.accent}
            />

            <ThemedText
              style={[
                styles.cardDateText,
                {
                  color:
                    categoryStyle.accent,
                },
              ]}
            >
              {date}
            </ThemedText>

          </ThemedView>

          {/* DIVIDER */}

          <ThemedView
            style={styles.horizontalDivider}
          />

          {/* DESCRIPTION */}

          <ThemedText
            style={styles.description}
            numberOfLines={2}
          >
            {description}
          </ThemedText>

        </ThemedView>

      </ThemedView>

    </ThemedView>
  );
}