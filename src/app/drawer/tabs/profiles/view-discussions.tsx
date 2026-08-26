import StatusFilterDropdown, {
  StatusFilterValue,
} from "@/components/dropdown/status-dropdown";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { viewDiscussionStyles } from "@/styles/profile/profile-components-styles";
import { profileStyles } from "@/styles/profile/profile-styles";
import { icon, useResponsive } from "@/styles/responsive";

import { Ionicons } from "@expo/vector-icons";

import React, {
  useMemo,
  useState,
} from "react";

import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

type DiscussionType =
  | "Contributions"
  | "Misinformation";

type DiscussionStatus =
  | "Verified"
  | "Pending"
  | "Declined";

type Discussion = {
  id: number;
  title: string;
  desc: string;
  date: string;
  type: DiscussionType;
  status: DiscussionStatus;
};

const discussions: Discussion[] = [
  {
    id: 1,
    title: "Personal Experience",
    desc: "Sharing my experience on how regular testing helped me stay healthy...",
    date: "May 19, 2026",
    type: "Contributions",
    status: "Verified",
  },
  {
    id: 2,
    title: "Stigma or Discrimination",
    desc: "Stigma is still a big issue in our communities. Let's create...",
    date: "May 16, 2026",
    type: "Contributions",
    status: "Pending",
  },
  {
    id: 3,
    title: "HIV Resource Information",
    desc: "Here are simple prevention tips we should all keep in mind...",
    date: "May 12, 2026",
    type: "Contributions",
    status: "Verified",
  },
  {
    id: 4,
    title: "'HIV can spread through casual contact'",
    desc: "Flagged post claiming HIV spreads through sharing utensils...",
    date: "May 10, 2026",
    type: "Misinformation",
    status: "Declined",
  },
  {
    id: 5,
    title: "'Herbal cure fully removes HIV'",
    desc: "Flagged claim promoting unverified herbal treatment as a cure...",
    date: "May 6, 2026",
    type: "Misinformation",
    status: "Pending",
  },
];

const FILTERS: {
  label: string;
  value: "All" | DiscussionType;
}[] = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Contributions",
    value: "Contributions",
  },
  {
    label: "Misinformation",
    value: "Misinformation",
  },
];

const STATUS_STYLES: Record<
  DiscussionStatus,
  {
    bg: string;
    text: string;
    icon: keyof typeof Ionicons.glyphMap;
  }
> = {
  Verified: {
    bg: "#E6F6EC",
    text: "#1F9254",
    icon: "checkmark-circle",
  },

  Pending: {
    bg: "#FFF6E3",
    text: "#B8860B",
    icon: "time-outline",
  },

  Declined: {
    bg: "#FDEAEA",
    text: "#C0392B",
    icon: "close-circle-outline",
  },
};

export default function ViewDiscussions() {
  /*
   * Main category filter
   */
  const [
    activeFilter,
    setActiveFilter,
  ] = useState<
    "All" | DiscussionType
  >("All");

  /*
   * Status filter
   */
  const [
    statusFilter,
    setStatusFilter,
  ] = useState<StatusFilterValue>(
    "All"
  );

  /*
   * Dropdown visibility
   */
  const [
    dropdownVisible,
    setDropdownVisible,
  ] = useState(false);

  /*
   * Toggle dropdown.
   *
   * No measuring is required because the dropdown
   * is positioned relative to the button wrapper.
   */
  const toggleStatusDropdown = () => {
    setDropdownVisible(
      (previous) => !previous
    );
  };

  /*
   * Filter discussions
   */
  const filteredDiscussions =
    useMemo(() => {
      let filtered =
        activeFilter === "All"
          ? discussions
          : discussions.filter(
              (d) =>
                d.type ===
                activeFilter
            );

      if (
        statusFilter !== "All"
      ) {
        filtered =
          filtered.filter(
            (d) =>
              d.status ===
              statusFilter
          );
      }

      return filtered;
    }, [
      activeFilter,
      statusFilter,
    ]);

  /*
   * Status button active state
   */
  const isStatusFilterActive =
    statusFilter !== "All";

  /*
   * Responsive styles
   */
  const r = useResponsive();

  const styles = useMemo(
    () => profileStyles(r),
    [r]
  );

  const discussion =
    useMemo(
      () =>
        viewDiscussionStyles(r),
      [r]
    );

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={
        styles.scrollContent
      }
    >
      {/* ==================================================
          HEADER
      ================================================== */}

      <ThemedView
        style={discussion.headerBlock}
      >
        <ThemedText
          style={discussion.pageTitle}
        >
          My HIV Discussions
        </ThemedText>

        <ThemedText
          style={
            discussion.pageSubtitle
          }
        >
          Track the status of your
          contributions and reported
          misinformation.
        </ThemedText>
      </ThemedView>

      {/* ==================================================
          FILTER SECTION
      ================================================== */}

      <ThemedView
        style={[
          discussion.filter,

          /*
           * IMPORTANT:
           *
           * Allow the dropdown to extend outside
           * the filter container.
           */
          {
            zIndex: 1000,
            elevation: 1000,
          },
        ]}
      >
        {/* ------------------------------------------------
            CATEGORY FILTER TABS
        ------------------------------------------------ */}

        <ThemedView
          style={
            discussion.filterRow
          }
        >
          {FILTERS.map(
            (filter) => {
              const active =
                activeFilter ===
                filter.value;

              return (
                <TouchableOpacity
                  key={
                    filter.value
                  }
                  activeOpacity={0.75}
                  onPress={() =>
                    setActiveFilter(
                      filter.value
                    )
                  }
                  style={[
                    discussion.filterChip,

                    active &&
                      discussion.filterChipActive,
                  ]}
                >
                  <ThemedText
                    style={[
                      discussion.filterChipText,

                      active &&
                        discussion.filterChipTextActive,
                    ]}
                  >
                    {
                      filter.label
                    }
                  </ThemedText>
                </TouchableOpacity>
              );
            }
          )}
        </ThemedView>

        {/* ------------------------------------------------
            STATUS FILTER BUTTON + DROPDOWN
        ------------------------------------------------ */}

        <View
          style={{
            position: "relative",

            /*
             * Very important.
             *
             * The dropdown's top: "100%" is calculated
             * relative to THIS View.
             */
            zIndex: 9999,
            elevation: 9999,
          }}
        >
          {/* STATUS BUTTON */}

          <TouchableOpacity
            style={[
              discussion.filterStatus,

              isStatusFilterActive &&
                discussion.filterStatusActive,
            ]}
            activeOpacity={0.8}
            onPress={
              toggleStatusDropdown
            }
          >
            <Ionicons
              name="filter"
              size={15}
              color="white"
            />

            {isStatusFilterActive && (
              <ThemedView
                style={
                  discussion.filterStatusDot
                }
              />
            )}
          </TouchableOpacity>

          {/* DROPDOWN */}

          <StatusFilterDropdown
            visible={
              dropdownVisible
            }
            onClose={() =>
              setDropdownVisible(
                false
              )
            }
            selected={
              statusFilter
            }
            onSelect={
              setStatusFilter
            }
          />
        </View>
      </ThemedView>

      {/* ==================================================
          DISCUSSION LIST
      ================================================== */}

      <ThemedView
        style={
          discussion.listCard
        }
      >
        {filteredDiscussions.length ===
        0 ? (
          /* ------------------------------------------------
             EMPTY STATE
          ------------------------------------------------ */

          <ThemedView
            style={
              discussion.emptyState
            }
          >
            <Ionicons
              name="chatbubbles-outline"
              size={icon(28)}
              color="#B7C0D6"
            />

            <ThemedText
              style={
                discussion.emptyText
              }
            >
              No entries found in
              this category.
            </ThemedText>
          </ThemedView>
        ) : (
          /* ------------------------------------------------
             DISCUSSION ITEMS
          ------------------------------------------------ */

          filteredDiscussions.map(
            (
              item,
              index
            ) => {
              const statusStyle =
                STATUS_STYLES[
                  item.status
                ];

              return (
                <ThemedView
                  key={item.id}
                >
                  {/* DISCUSSION ROW */}

                  <ThemedView
                    style={
                      discussion.row
                    }
                  >
                    {/* LEFT SIDE */}

                    <ThemedView
                      style={
                        discussion.contentContainer
                      }
                    >
                      {/* TYPE ICON */}

                      <ThemedView
                        style={[
                          discussion.iconBubble,

                          item.type ===
                          "Misinformation"
                            ? discussion.iconBubbleMis
                            : discussion.iconBubbleContrib,
                        ]}
                      >
                        <Ionicons
                          name={
                            item.type ===
                            "Misinformation"
                              ? "warning-outline"
                              : "chatbubble-outline"
                          }
                          size={icon(
                            18
                          )}
                          color={
                            item.type ===
                            "Misinformation"
                              ? "#C0392B"
                              : "#35408E"
                          }
                        />
                      </ThemedView>

                      {/* TEXT */}

                      <ThemedView
                        style={
                          discussion.textCol
                        }
                      >
                        {/* TITLE */}

                        <ThemedText
                          style={
                            discussion.itemTitle
                          }
                          numberOfLines={
                            1
                          }
                        >
                          {
                            item.title
                          }
                        </ThemedText>

                        {/* DESCRIPTION */}

                        <ThemedText
                          style={
                            discussion.itemDesc
                          }
                          numberOfLines={
                            2
                          }
                        >
                          {
                            item.desc
                          }
                        </ThemedText>

                        {/* META */}

                        <ThemedView
                          style={
                            discussion.metaRow
                          }
                        >
                          {/* STATUS */}

                          <ThemedView
                            style={[
                              discussion.statusPill,

                              {
                                backgroundColor:
                                  statusStyle.bg,
                              },
                            ]}
                          >
                            <Ionicons
                              name={
                                statusStyle.icon
                              }
                              size={icon(
                                11
                              )}
                              color={
                                statusStyle.text
                              }
                            />

                            <ThemedText
                              style={[
                                discussion.statusPillText,

                                {
                                  color:
                                    statusStyle.text,
                                },
                              ]}
                            >
                              {
                                item.status
                              }
                            </ThemedText>
                          </ThemedView>

                          {/* DATE */}

                          <ThemedView
                            style={
                              discussion.dateRow
                            }
                          >
                            <Ionicons
                              name="calendar-outline"
                              size={icon(
                                11
                              )}
                              color="#9BA8C0"
                            />

                            <ThemedText
                              style={
                                discussion.itemDate
                              }
                            >
                              {
                                item.date
                              }
                            </ThemedText>
                          </ThemedView>
                        </ThemedView>
                      </ThemedView>
                    </ThemedView>

                    {/* THUMBNAIL */}

                    <Image
                      source={require("@/assets/images/social-media.jpg")}
                      style={
                        discussion.thumbnail
                      }
                      resizeMode="cover"
                    />
                  </ThemedView>

                  {/* DIVIDER */}

                  {index <
                    filteredDiscussions.length -
                      1 && (
                    <ThemedView
                      style={
                        discussion.rowDivider
                      }
                    />
                  )}
                </ThemedView>
              );
            }
          )
        )}
      </ThemedView>
    </ScrollView>
  );
}
