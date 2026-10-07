// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { useAuth } from "@/lib/auth/AuthProvider";
// import useFormQuery from "@/lib/hooks/useFormQuery";
// import { viewDiscussionStyles } from "@/styles/profile/profile-components-styles";
// import { profileStyles } from "@/styles/profile/profile-styles";
// import { icon, scale, useResponsive } from "@/styles/responsive";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React, { useMemo } from "react";
// import {
//   ActivityIndicator,
//   Image,
//   Linking,
//   TouchableOpacity,
// } from "react-native";

// type BackendContribution = {
//   contribution_id: string;
//   type: string;
//   content: string;
//   slug: string;
//   classification: "PENDING" | "MISINFORMATION" | "FACTUAL";
//   classification_method: "MANUAL" | "AI" | "HYBRID";
//   status: "PENDING" | "APPROVED" | "DECLINED";
//   is_deleted: boolean;
//   image_url?: string | null;
//   source_url?: string | null;
//   review_reason?: string | null;
//   created_at?: string | null;
// };

// type ContributionEdge = {
//   node: BackendContribution | null;
//   cursor?: string;
// };

// type ContributionsResponse = {
//   data?: {
//     edges?: ContributionEdge[];
//     pageInfo?: {
//       startCursor?: string;
//       endCursor?: string;
//       hasNextPage?: boolean;
//       hasPrevPage?: boolean;
//     };
//     totalCount?: number;
//   };
// };

// type DiscussionStatus = "Approved" | "Pending" | "Declined";
// type DiscussionType = "Contributions" | "Misinformation";

// type Discussion = {
//   id: string;
//   title: string;
//   desc: string;
//   date: string;
//   type: DiscussionType;
//   status: DiscussionStatus;
//   image_url?: string | null;
//   source_url?: string | null;
// };

// const STATUS_STYLES: Record<
//   DiscussionStatus,
//   {
//     backgroundColor: string;
//     color: string;
//     icon: keyof typeof Ionicons.glyphMap;
//   }
// > = {
//   Approved: {
//     backgroundColor: "#E6F6EC",
//     color: "#1F9254",
//     icon: "checkmark-circle",
//   },
//   Pending: {
//     backgroundColor: "#FFF6E3",
//     color: "#B8860B",
//     icon: "time-outline",
//   },
//   Declined: {
//     backgroundColor: "#FDEAEA",
//     color: "#C0392B",
//     icon: "close-circle-outline",
//   },
// };

// export default function MyDiscussions() {
//   const r = useResponsive();

//   const styles = useMemo(
//     () => profileStyles(r),
//     [r],
//   );

//   const discussion = useMemo(
//     () => viewDiscussionStyles(r),
//     [r],
//   );

//   const { token, user, isLoading: authLoading } =
//     useAuth();

//   const currentUserId = String(
//     user?.user_id ?? "",
//   ).trim();

//   const { data: result, isLoading: loading } =
//     useFormQuery<
//       ContributionsResponse
//     >({
//       key: ["my-discussions", currentUserId],
//       url: `maintenance/contribution`,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "x-api-key": "testing",
//         "x-api-version": "2026-02-26"
//       },
//       params: {
//         limit: 10,
//         orderBy: "created_at",
//         sortBy: "desc",
//         startCursor: "",
//         endCursor: "",
//         // user_id: "cmthzhxx00001riv3e19xpig0"
//       }
//     });
//     console.log("RESULT: ", result)

//   const discussions = useMemo<Discussion[]>(() => {
//     const edges = Array.isArray(result?.data?.edges)
//       ? result.data.edges
//       : [];

//     return edges
//       .map((edge) => edge.node)
//       .filter(
//         (node): node is BackendContribution =>
//           node !== null,
//       )
//       .filter((item) => !item.is_deleted)
//       .map((item) => ({
//         id: item.contribution_id,
//         title:
//           item.type ||
//           item.slug ||
//           "Untitled Contribution",
//         desc:
//           item.content ||
//           "No description available.",
//         date: item.created_at
//           ? formatDate(item.created_at)
//           : "Date unavailable",
//         type:
//           item.classification === "MISINFORMATION"
//             ? "Misinformation"
//             : "Contributions",
//         status:
//           item.status === "APPROVED"
//             ? "Approved"
//             : item.status === "DECLINED"
//               ? "Declined"
//               : "Pending",
//         image_url: item.image_url || null,
//         source_url: item.source_url || null,
//       }));
//   }, [result]);

//   const displayedDiscussions = discussions.slice(
//     0,
//     3,
//   );

//   return (
//     <ThemedView style={styles.card}>
//       <ThemedView style={styles.discussionHeader}>
//         <ThemedView style={styles.headerLeft}>
//           <ThemedText style={styles.discSectionTitle}>
//             My HIV Discussions
//           </ThemedText>
//         </ThemedView>

//         <TouchableOpacity
//           onPress={() =>
//             router.push(
//               "/drawer/tabs/profiles/view-discussions",
//             )
//           }
//         >
//           <ThemedText style={styles.viewAll}>
//             View All
//           </ThemedText>
//         </TouchableOpacity>
//       </ThemedView>

//       <ThemedView style={styles.discDivider} />

//       <ThemedView style={styles.discList}>
//         {loading ? (
//           <ThemedView style={styles.discLoad}>
//             <ActivityIndicator
//               size="small"
//               color="#35408E"
//             />
//           </ThemedView>
//         ) : displayedDiscussions.length === 0 ? (
//           <ThemedView style={styles.noDisc}>
//             <Ionicons
//               name="chatbubbles-outline"
//               size={icon(28)}
//               color="#B7C0D6"
//             />

//             <ThemedText
//               style={[
//                 styles.itemDesc,
//                 { marginTop: 8 },
//               ]}
//             >
//               No discussions yet.
//             </ThemedText>
//           </ThemedView>
//         ) : (
//           displayedDiscussions.map((item, index) => {
//             const statusStyle =
//               STATUS_STYLES[item.status];

//             const isMisinformation =
//               item.type === "Misinformation";

//             return (
//               <ThemedView key={item.id}>
//                 <ThemedView style={styles.row}>
//                   <ThemedView
//                     style={styles.contentContainer}
//                   >
//                     <ThemedView
//                       style={[
//                         discussion.iconBubble,
//                         isMisinformation
//                           ? discussion.iconBubbleMis
//                           : discussion.iconBubbleContrib,
//                       ]}
//                     >
//                       <Ionicons
//                         name={
//                           isMisinformation
//                             ? "warning-outline"
//                             : "chatbubble-outline"
//                         }
//                         size={icon(18)}
//                         color={
//                           isMisinformation
//                             ? "#C0392B"
//                             : "#35408E"
//                         }
//                       />
//                     </ThemedView>

//                     <ThemedView
//                       style={styles.discTextCol}
//                     >
//                       <ThemedText
//                         style={styles.itemTitle}
//                         numberOfLines={1}
//                       >
//                         {item.title}
//                       </ThemedText>

//                       <ThemedText
//                         style={styles.itemDesc}
//                         numberOfLines={1}
//                       >
//                         {item.desc}
//                       </ThemedText>

//                       <ThemedView
//                         style={styles.statDateRow}
//                       >
//                         <ThemedView
//                           style={[
//                             discussion.statusPill,
//                             {
//                               backgroundColor:
//                                 statusStyle.backgroundColor,
//                             },
//                           ]}
//                         >
//                           <Ionicons
//                             name={statusStyle.icon}
//                             size={icon(11)}
//                             color={statusStyle.color}
//                           />

//                           <ThemedText
//                             style={[
//                               discussion.statusPillText,
//                               {
//                                 color:
//                                   statusStyle.color,
//                               },
//                             ]}
//                           >
//                             {item.status}
//                           </ThemedText>
//                         </ThemedView>

//                         <ThemedView
//                           style={styles.dateRow}
//                         >
//                           <Ionicons
//                             name="calendar-outline"
//                             size={icon(11)}
//                             color="#9BA8C0"
//                           />

//                           <ThemedText
//                             style={[
//                               styles.itemDate,
//                               {
//                                 marginLeft: scale(4),
//                                 color: "#9BA8C0",
//                               },
//                             ]}
//                           >
//                             {item.date}
//                           </ThemedText>
//                         </ThemedView>

//                         {item.source_url ? (
//                           <TouchableOpacity
//                             onPress={() =>
//                               Linking.openURL(
//                                 item.source_url!,
//                               )
//                             }
//                           >
//                             <Ionicons
//                               name="link-outline"
//                               size={icon(11)}
//                               color="#35408E"
//                             />
//                           </TouchableOpacity>
//                         ) : null}
//                       </ThemedView>
//                     </ThemedView>
//                   </ThemedView>

//                   {item.image_url ? (
//                     <Image
//                       source={{
//                         uri: item.image_url,
//                       }}
//                       style={styles.image}
//                       resizeMode="cover"
//                     />
//                   ) : null}
//                 </ThemedView>

//                 {index <
//                   displayedDiscussions.length - 1 && (
//                   <ThemedView
//                     style={styles.discRowDivider}
//                   />
//                 )}
//               </ThemedView>
//             );
//           })
//         )}
//       </ThemedView>
//     </ThemedView>
//   );
// }

// function formatDate(value: string) {
//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "Date unavailable";
//   }

//   return date.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// }


import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { viewDiscussionStyles } from "@/styles/profile/profile-components-styles";
import { profileStyles } from "@/styles/profile/profile-styles";
import { icon, scale, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, Image, Linking, TouchableOpacity } from "react-native";

type BackendContribution = {
  contribution_id: string;
  type: string;
  content: string;
  slug: string;
  classification: "PENDING" | "MISINFORMATION" | "FACTUAL";
  classification_method: "MANUAL" | "AI" | "HYBRID";
  status: "PENDING" | "APPROVED" | "DECLINED";
  is_deleted: boolean;
  image_url?: string | null;
  source_url?: string | null;
  review_reason?: string | null;
  created_at?: string | null;
};

type ContributionEdge = {
  node: BackendContribution | null;
  cursor?: string;
};

type ContributionsResponse = {
  data?: {
    edges?: ContributionEdge[];
    pageInfo?: {
      startCursor?: string;
      endCursor?: string;
      hasNextPage?: boolean;
      hasPrevPage?: boolean;
    };
    totalCount?: number;
  };
};

type DiscussionStatus = "Approved" | "Pending" | "Declined";
type DiscussionType = "Contributions" | "Misinformation";

type Discussion = {
  id: string;
  title: string;
  desc: string;
  date: string;
  type: DiscussionType;
  status: DiscussionStatus;
  image_url?: string | null;
  source_url?: string | null;
};

const STATUS_STYLES: Record<DiscussionStatus, { backgroundColor: string; color: string; icon: keyof typeof Ionicons.glyphMap }> = {
  Approved: { backgroundColor: "#E6F6EC", color: "#1F9254", icon: "checkmark-circle" },
  Pending: { backgroundColor: "#FFF6E3", color: "#B8860B", icon: "time-outline" },
  Declined: { backgroundColor: "#FDEAEA", color: "#C0392B", icon: "close-circle-outline" },
};

export default function MyDiscussions() {
  const r = useResponsive();
  const styles = useMemo(() => profileStyles(r), [r]);
  const discussion = useMemo(() => viewDiscussionStyles(r), [r]);
  const { token, user, isLoading: authLoading } = useAuth();

  const currentUserId = String(user?.user_id ?? "").trim();

  const { data: result, isLoading: loading } = useFormQuery<ContributionsResponse>({
    key: ["my-discussions", currentUserId],
    url: "maintenance/contribution",
    enabled: Boolean(token && currentUserId),
    headers: {
      Authorization: `Bearer ${token}`,
      "x-api-key": "testing",
      "x-api-version": "2026-02-26",
    },
    params: {
      limit: 10,
      orderBy: "created_at",
      sortBy: "desc",
      startCursor: "",
      endCursor: "",
      user_id: currentUserId,
    },
  });

  console.log("[MY DISCUSSIONS] Logged-in user ID:", currentUserId);
  console.log("[MY DISCUSSIONS] Result:", result);

  const discussions = useMemo<Discussion[]>(() => {
    const edges = Array.isArray(result?.data?.edges) ? result.data.edges : [];

    return edges
      .map((edge) => edge.node)
      .filter((node): node is BackendContribution => node !== null)
      .filter((item) => !item.is_deleted)
      .map((item) => ({
        id: item.contribution_id,
        title: item.type || item.slug || "Untitled Contribution",
        desc: item.content || "No description available.",
        date: item.created_at ? formatDate(item.created_at) : "Date unavailable",
        type: item.classification === "MISINFORMATION" ? "Misinformation" : "Contributions",
        status: item.status === "APPROVED" ? "Approved" : item.status === "DECLINED" ? "Declined" : "Pending",
        image_url: item.image_url || null,
        source_url: item.source_url || null,
      }));
  }, [result]);

  const displayedDiscussions = discussions.slice(0, 3);

  if (authLoading) {
    return (
      <ThemedView style={styles.card}>
        <ThemedView style={styles.discLoad}>
          <ActivityIndicator size="small" color="#35408E" />
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.card}>
      <ThemedView style={styles.discussionHeader}>
        <ThemedView style={styles.headerLeft}>
          <ThemedText style={styles.discSectionTitle}>My HIV Discussions</ThemedText>
        </ThemedView>

        <TouchableOpacity onPress={() => router.push("/drawer/tabs/profiles/view-discussions")}>
          <ThemedText style={styles.viewAll}>View All</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.discDivider} />

      <ThemedView style={styles.discList}>
        {loading ? (
          <ThemedView style={styles.discLoad}>
            <ActivityIndicator size="small" color="#35408E" />
          </ThemedView>
        ) : displayedDiscussions.length === 0 ? (
          <ThemedView style={styles.noDisc}>
            <Ionicons name="chatbubbles-outline" size={icon(28)} color="#B7C0D6" />
            <ThemedText style={[styles.itemDesc, { marginTop: 8 }]}>No discussions yet.</ThemedText>
          </ThemedView>
        ) : (
          displayedDiscussions.map((item, index) => {
            const statusStyle = STATUS_STYLES[item.status];
            const isMisinformation = item.type === "Misinformation";

            return (
              <ThemedView key={item.id}>
                <ThemedView style={styles.row}>
                  <ThemedView style={styles.contentContainer}>
                    <ThemedView style={[discussion.iconBubble, isMisinformation ? discussion.iconBubbleMis : discussion.iconBubbleContrib]}>
                      <Ionicons
                        name={isMisinformation ? "warning-outline" : "chatbubble-outline"}
                        size={icon(18)}
                        color={isMisinformation ? "#C0392B" : "#35408E"}
                      />
                    </ThemedView>

                    <ThemedView style={styles.discTextCol}>
                      <ThemedText style={styles.itemTitle} numberOfLines={1}>{item.title}</ThemedText>
                      <ThemedText style={styles.itemDesc} numberOfLines={1}>{item.desc}</ThemedText>

                      <ThemedView style={styles.statDateRow}>
                        <ThemedView style={[discussion.statusPill, { backgroundColor: statusStyle.backgroundColor }]}>
                          <Ionicons name={statusStyle.icon} size={icon(11)} color={statusStyle.color} />
                          <ThemedText style={[discussion.statusPillText, { color: statusStyle.color }]}>{item.status}</ThemedText>
                        </ThemedView>

                        <ThemedView style={styles.dateRow}>
                          <Ionicons name="calendar-outline" size={icon(11)} color="#9BA8C0" />
                          <ThemedText style={[styles.itemDate, { marginLeft: scale(4), color: "#9BA8C0" }]}>{item.date}</ThemedText>
                        </ThemedView>

                        {item.source_url ? (
                          <TouchableOpacity onPress={() => Linking.openURL(item.source_url!)}>
                            <Ionicons name="link-outline" size={icon(11)} color="#35408E" />
                          </TouchableOpacity>
                        ) : null}
                      </ThemedView>
                    </ThemedView>
                  </ThemedView>

                  {item.image_url ? (
                    <Image source={{ uri: item.image_url }} style={styles.image} resizeMode="cover" />
                  ) : null}
                </ThemedView>

                {index < displayedDiscussions.length - 1 && <ThemedView style={styles.discRowDivider} />}
              </ThemedView>
            );
          })
        )}
      </ThemedView>
    </ThemedView>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

