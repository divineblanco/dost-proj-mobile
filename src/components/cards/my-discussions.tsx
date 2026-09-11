// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { profileStyles } from "@/styles/profile/profile-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React, { useMemo } from "react";
// import {
//   Image,
//   TouchableOpacity
// } from "react-native";

// const discussions = [
//   {
//     id: 1,
//     title: "Personal Experience",
//     desc: "Sharing my experience on how regular testing helped me stay healthy...",
//     date: "May 19, 2026",
//   },
//   {
//     id: 2,
//     title: "Stigma or Discrimination",
//     desc: "Stigma is still a big issue in our communities. Let’s create...",
//     date: "May 16, 2026",
//   },
//   {
//     id: 3,
//     title: "HIV Resource Information",
//     desc: "Here are simple prevention tips we should all keep in mind...",
//     date: "May 12, 2026",
//   },
// ];

// export default function MyDiscussions() {
//   const r = useResponsive();
        
//           const styles = useMemo(() => profileStyles(r), [r]);
//   return (
//     <ThemedView style={styles.card}>
//       {/* Header */}
//       <ThemedView style={styles.discussionHeader}>
//         <ThemedView style={styles.headerLeft}>
//           <ThemedText style={styles.discSectionTitle}>
//             My HIV Discussions
//           </ThemedText>
//         </ThemedView>

//         <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/drawer/tabs/profiles/view-discussions")}>
//           <ThemedText style={styles.viewAll}>
//             View All
//           </ThemedText>
//         </TouchableOpacity>
//       </ThemedView>

//       <ThemedView style={styles.discDivider} />

//       {/* List */}
//       <ThemedView style={styles.discList}>
//         {discussions.map((item, index) => (
//           <ThemedView key={item.id}>
//             <ThemedView style={styles.row}>
//               {/* LEFT SIDE */}
//               <ThemedView style={styles.contentContainer}>
//                 <ThemedView style={styles.discIconBubble}>
//                   <Ionicons
//                     name="chatbubble-outline"
//                     size={icon(20)}
//                     color="#333333"
//                   />
//                 </ThemedView>

//                 <ThemedView style={styles.discTextCol}>
//                   <ThemedText
//                     style={styles.itemTitle}
//                     numberOfLines={1}
//                   >
//                     {item.title}
//                   </ThemedText>

//                   <ThemedText
//                     style={styles.itemDesc}
//                     numberOfLines={1}
//                   >
//                     {item.desc}
//                   </ThemedText>

//                   <ThemedView style={styles.dateRow}>
//                     <Ionicons
//                       name="calendar-outline"
//                       size={icon(11)}
//                       color="#9BA8C0"
//                     />
//                     <ThemedText style={styles.itemDate}>
//                       {item.date}
//                     </ThemedText>
//                   </ThemedView>
//                 </ThemedView>
//               </ThemedView>

//               {/* DOWNLOAD IMAGE BUTTON */}
//              <Image
//                   source={require("@/assets/images/social-media.jpg")}
//                   style={styles.image}
//                   resizeMode="cover"
//                 />
//             </ThemedView>

//             {index < discussions.length - 1 && (
//               <ThemedView style={styles.discRowDivider} />
//             )}
//           </ThemedView>
//         ))}
//       </ThemedView>
//     </ThemedView>
//   );
// }

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { viewDiscussionStyles } from "@/styles/profile/profile-components-styles";
import { profileStyles } from "@/styles/profile/profile-styles";
import { icon, scale, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";

import { useAuth } from "@/lib/auth/AuthProvider";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type BackendContribution = {
  contribution_id: string;
  type: string;
  content: string;
  slug: string;
  classification:
    | "PENDING"
    | "MISINFORMATION"
    | "FACTUAL";
  classification_method:
    | "MANUAL"
    | "AI";
  status:
    | "PENDING"
    | "APPROVED"
    | "DECLINED";
  is_deleted: boolean;
  image_url?: string | null;
  source_url?: string | null;
  review_reason?: string | null;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  confidence_score?: number | null;
  barangay?: string | null;
  municipality?: string | null;
  province?: string | null;
  region?: string | null;
};

type DiscussionStatus =
  | "Verified"
  | "Pending"
  | "Declined";

type Discussion = {
  id: string;
  title: string;
  desc: string;
  date: string;
  status: DiscussionStatus;
  image_url?: string | null;
  source_url?: string | null;
};


/*
 * Status colors
 */
const STATUS_STYLES: Record<
  DiscussionStatus,
  {
    backgroundColor: string;
    color: string;
    icon: keyof typeof Ionicons.glyphMap;
  }
> = {
  Verified: {
    backgroundColor: "#E6F6EC",
    color: "#1F9254",
    icon: "checkmark-circle",
  },

  Pending: {
    backgroundColor: "#FFF6E3",
    color: "#B8860B",
    icon: "time-outline",
  },

  Declined: {
    backgroundColor: "#FDEAEA",
    color: "#C0392B",
    icon: "close-circle-outline",
  },
};

export default function MyDiscussions() {
  const r = useResponsive();

  const styles = useMemo(
    () => profileStyles(r),
    [r]
  );

  const discussion = useMemo(
  () => viewDiscussionStyles(r),
  [r]
  );

  const {
    token,
    isLoading: authLoading,
  } = useAuth();

  const [
    discussions,
    setDiscussions,
  ] = useState<Discussion[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /*
   * ==================================================
   * LOAD CONTRIBUTIONS
   * ==================================================
   */

  const loadContributions =
    useCallback(async () => {
      if (
        authLoading ||
        !token
      ) {
        return;
      }

      try {
        setLoading(true);

        if (!API_URL) {
          console.error(
            "[MY DISCUSSIONS] EXPO_PUBLIC_API_URL is not configured"
          );

          setDiscussions([]);
          return;
        }

        console.log(
          "[MY DISCUSSIONS] Loading contributions..."
        );

        const response =
          await fetch(
            `${API_URL}/maintenance/contribution`,
            {
              method: "GET",
              headers: {
                Accept:
                  "application/json",
                "Content-Type":
                  "application/json",
                Authorization:
                  `Bearer ${token}`,
                "X-API-Key":
                  process.env
                    .EXPO_PUBLIC_API_KEY ?? "",
              },
            }
          );

        const result =
          await response.json();

        console.log(
          "[MY DISCUSSIONS] HTTP status:",
          response.status
        );

        if (!response.ok) {
          console.error(
            "[MY DISCUSSIONS] API error:",
            result
          );

          setDiscussions([]);
          return;
        }

        /*
         * API response:
         *
         * data.edges[].node
         */

        const edges =
          Array.isArray(
            result?.data?.edges
          )
            ? result.data.edges
            : [];

        const nodes: BackendContribution[] =
          edges
            .map(
              (edge: {
                node?: BackendContribution;
              }) => edge.node
            )
            .filter(
              (
                node:
                  | BackendContribution
                  | undefined
              ): node is BackendContribution =>
                !!node
            );

        console.log(
          "[MY DISCUSSIONS] Number of contributions:",
          nodes.length
        );

        const mapped: Discussion[] =
          nodes
            .filter(
              (item) =>
                !item.is_deleted
            )
            .map((item) => {
              let status: DiscussionStatus;

              switch (
                item.status
              ) {
                case "APPROVED":
                  status =
                    "Verified";
                  break;

                case "DECLINED":
                  status =
                    "Declined";
                  break;

                case "PENDING":
                default:
                  status =
                    "Pending";
                  break;
              }

              return {
                id:
                  item.contribution_id,

                /*
                 * Contribution type
                 * displayed as title.
                 */
                title:
                  item.type ||
                  "Untitled Contribution",

                /*
                 * Actual contribution
                 * content.
                 */
                desc:
                  item.content ||
                  "No description available.",

                /*
                 * Always provide a date
                 * label.
                 */
                date:
                  item.reviewed_at
                    ? formatDate(
                        item.reviewed_at
                      )
                    : "Date Unavailable",

                status,

                /*
                 * Keep null when no
                 * image exists.
                 */
                image_url:
                  item.image_url ||
                  null,

                source_url:
                  item.source_url ||
                  null,
              };
            });

        console.log(
          "[MY DISCUSSIONS] Mapped discussions:",
          mapped
        );

        /*
         * Show only the latest 3
         * on the profile card.
         */
        setDiscussions(
          mapped.slice(0, 3)
        );
      } catch (error) {
        console.error(
          "[MY DISCUSSIONS] Error loading contributions:",
          error
        );

        setDiscussions([]);
      } finally {
        setLoading(false);

        console.log(
          "[MY DISCUSSIONS] Loading finished."
        );
      }
    }, [
      token,
      authLoading,
    ]);

  /*
   * ==================================================
   * INITIAL LOAD
   * ==================================================
   */

  useEffect(() => {
    loadContributions();
  }, [
    loadContributions,
  ]);

  /*
   * ==================================================
   * RENDER
   * ==================================================
   */

  return (
    <ThemedView
      style={styles.card}
    >
      {/* HEADER */}

      <ThemedView
        style={
          styles.discussionHeader
        }
      >
        <ThemedView
          style={
            styles.headerLeft
          }
        >
          <ThemedText
            style={
              styles.discSectionTitle
            }
          >
            My HIV Discussions
          </ThemedText>
        </ThemedView>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            router.push(
              "/drawer/tabs/profiles/view-discussions"
            )
          }
        >
          <ThemedText
            style={styles.viewAll}
          >
            View All
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView
        style={styles.discDivider}
      />

      {/* LIST */}

      <ThemedView
        style={styles.discList}
      >
        {loading ? (
          <ThemedView
            style={styles.discLoad}
          >
            <ActivityIndicator
              size="small"
              color="#35408E"
            />
          </ThemedView>
        ) : discussions.length ===
          0 ? (
          <ThemedView
            style={styles.noDisc}
          >
            <Ionicons
              name="chatbubbles-outline"
              size={icon(28)}
              color="#B7C0D6"
            />

            <ThemedText
              style={[
                styles.itemDesc,
                {
                  marginTop: 8,
                },
              ]}
            >
              No discussions yet.
            </ThemedText>
          </ThemedView>
        ) : (
          discussions.map(
            (item, index) => {
              const statusStyle =
                STATUS_STYLES[
                  item.status
                ];

              return (
                <ThemedView
                  key={item.id}
                >
                  <ThemedView
                    style={styles.row}
                  >
                    {/* LEFT CONTENT */}

                    <ThemedView
                      style={
                        styles.contentContainer
                      }
                    >
                      {/* ICON */}

                      <ThemedView
                        style={
                          styles.discIconBubble
                        }
                      >
                        <Ionicons
                          name="chatbubble-outline"
                          size={icon(
                            20
                          )}
                          color="#333333"
                        />
                      </ThemedView>

                      {/* TEXT */}

                      <ThemedView
                        style={
                          styles.discTextCol
                        }
                      >
                        {/* TITLE */}

                        <ThemedText
                          style={
                            styles.itemTitle
                          }
                          numberOfLines={
                            1
                          }
                        >
                          {item.title}
                        </ThemedText>

                        {/* DESCRIPTION */}

                        <ThemedText
                          style={
                            styles.itemDesc
                          }
                          numberOfLines={
                            1
                          }
                        >
                          {item.desc}
                        </ThemedText>

                        {/* STATUS + DATE */}

                        <ThemedView
                          style={styles.statDateRow}
                        >
                          {/* STATUS PILL */}

                          <ThemedView
                            style={[ discussion.statusPill, {
                              backgroundColor:
                                statusStyle.backgroundColor,
                            }]}
                          >
                            <Ionicons
                              name={
                                statusStyle.icon
                              }
                              size={icon(
                                11
                              )}
                              color={
                                statusStyle.color
                              }
                            />

                            <ThemedText
                              style={[ discussion.statusPillText, {
                                color:
                                  statusStyle.color,
                              }]}
                            >
                              {item.status}
                            </ThemedText>
                          </ThemedView>

                          {/* DATE */}

                          <ThemedView
                            style={styles.dateRow}
                          >
                            <Ionicons
                              name="calendar-outline"
                              size={icon(11)}
                              color="#9BA8C0"
                            />

                            <ThemedText
                              style={[
                                styles.itemDate,
                                {
                                  marginLeft: scale(4),
                                  color:
                                    "#9BA8C0",
                                },
                              ]}
                            >
                              {item.date}
                            </ThemedText>
                          </ThemedView>

                          {/* LINK */}

                          {item.source_url ? (
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() =>
                                Linking.openURL(
                                  item.source_url!
                                )
                              }
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: scale(8),
                              }}
                            >
                              <Ionicons
                                name="link-outline"
                                size={icon(11)}
                                color="#35408E"
                              />

                              <ThemedText
                                style={[
                                  styles.itemDate,
                                  {
                                    marginLeft: scale(4),
                                    color: "#35408E",
                                  },
                                ]}
                              >
                                Link
                              </ThemedText>
                            </TouchableOpacity>
                          ) : null}

                        </ThemedView>
                      </ThemedView>
                    </ThemedView>

                    {/* IMAGE */}

                    {item.image_url ? (
                      <Image
                        source={{
                          uri: item.image_url,
                        }}
                        style={
                          styles.image
                        }
                        resizeMode="cover"
                      />
                    ) : null}
                  </ThemedView>

                  {/* DIVIDER */}

                  {index <
                    discussions.length -
                      1 && (
                    <ThemedView
                      style={
                        styles.discRowDivider
                      }
                    />
                  )}
                </ThemedView>
              );
            }
          )
        )}
      </ThemedView>
    </ThemedView>
  );
}

/*
 * ==================================================
 * DATE FORMATTER
 * ==================================================
 */

function formatDate(
  value: string
): string {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Date Unavailable";
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

