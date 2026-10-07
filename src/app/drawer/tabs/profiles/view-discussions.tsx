// import StatusFilterDropdown, { StatusFilterValue } from "@/components/dropdown/status-dropdown";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { useAuth } from "@/lib/auth/AuthProvider";
// import useFormQuery from "@/lib/hooks/useFormQuery";
// import { viewDiscussionStyles } from "@/styles/profile/profile-components-styles";
// import { profileStyles } from "@/styles/profile/profile-styles";
// import { icon, scale, useResponsive } from "@/styles/responsive";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useMemo, useState } from "react";
// import { Image, Linking, ScrollView, TouchableOpacity, View } from "react-native";

// type DiscussionType = "Contributions" | "Misinformation";
// type DiscussionStatus = "Approved" | "Pending" | "Declined";

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
//   reviewed_by?: string | null;
//   reviewed_at?: string | null;
//   created_at?: string | null;
//   updated_at?: string | null;
//   confidence_score?: number | null;
//   barangay?: string | null;
//   municipality?: string | null;
//   province?: string | null;
//   region?: string | null;
//   sentiment?: "POSITIVE" | "NEGATIVE" | "NEUTRAL" | null;
// };

// type ContributionEdge = {
//   node: BackendContribution | null;
//   cursor?: string;
// };

// type ContributionsResponse = {
//   meta?: {
//     api_version?: string;
//     status?: number;
//   };
//   data?: {
//     edges?: ContributionEdge[];
//     pageInfo?: {
//       startCursor?: string;
//       endCursor?: string;
//       hasNextPage?: boolean;
//       hasPrevPage?: boolean;
//     };
//     totalCount?: number;
//     timestamp?: string;
//     success?: boolean;
//   };
// };

// type Discussion = {
//   id: string;
//   title: string;
//   desc: string;
//   date: string;
//   type: DiscussionType;
//   status: DiscussionStatus;
//   image_url?: string | null;
//   source_url?: string | null;
//   review_reason?: string | null;
// };

// const FILTERS: { label: string; value: "All" | DiscussionType }[] = [
//   { label: "All", value: "All" },
//   { label: "Contributions", value: "Contributions" },
//   { label: "Misinformation", value: "Misinformation" },
// ];

// const STATUS_STYLES: Record<
//   DiscussionStatus,
//   { bg: string; text: string; icon: keyof typeof Ionicons.glyphMap }
// > = {
//   Approved: {
//     bg: "#E6F6EC",
//     text: "#1F9254",
//     icon: "checkmark-circle",
//   },
//   Pending: {
//     bg: "#FFF6E3",
//     text: "#B8860B",
//     icon: "time-outline",
//   },
//   Declined: {
//     bg: "#FDEAEA",
//     text: "#C0392B",
//     icon: "close-circle-outline",
//   },
// };

// export default function ViewDiscussions() {
//   const { token, user, isLoading: authLoading } = useAuth();

//   const [activeFilter, setActiveFilter] =
//     useState<"All" | DiscussionType>("All");

//   const [statusFilter, setStatusFilter] =
//     useState<StatusFilterValue>("All");

//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   const currentUserId = String();


//   const { data: result, isLoading: loading } = useFormQuery<
//     ContributionsResponse
//   >({
//     key: ["my-contributions", currentUserId],
//     url: "/maintenance/contribution",
//     headers: {
//         Authorization: `Bearer ${token}`,
//         "x-api-key": "testing",
//         "x-api-version": "2026-02-26"
//       },
//     params: {
//       limit: 20,
//         orderBy: "created_at",
//         sortBy: "desc",
//         startCursor: "",
//         endCursor: "",
//     },
//   });

//   console.log("RESULT: ", result)

//   const discussions = useMemo<Discussion[]>(() => {
//     const edges = Array.isArray(result?.data?.edges)
//       ? result.data.edges
//       : [];

//     return edges
//       .map((edge) => edge.node)
//       .filter(
//         (node): node is BackendContribution => node !== null,
//       )
//       .filter((item) => !item.is_deleted)
//       .map((item) => ({
//         id: item.contribution_id,
//         title: item.type || item.slug || "Untitled Contribution",
//         desc: item.content || "No description available.",
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
//         review_reason: item.review_reason || null,
//       }));
//   }, [result]);

//   const filteredDiscussions = useMemo(() => {
//     let filtered =
//       activeFilter === "All"
//         ? discussions
//         : discussions.filter(
//             (item) => item.type === activeFilter,
//           );

//     if (statusFilter !== "All") {
//       filtered = filtered.filter(
//         (item) => item.status === statusFilter,
//       );
//     }

//     return filtered;
//   }, [discussions, activeFilter, statusFilter]);

//   const r = useResponsive();
//   const styles = useMemo(() => profileStyles(r), [r]);
//   const discussion = useMemo(() => viewDiscussionStyles(r), [r]);

//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//     >
//       <ThemedView style={discussion.headerBlock}>
//         <ThemedText style={discussion.pageTitle}>
//           My HIV Discussions
//         </ThemedText>

//         <ThemedText style={discussion.pageSubtitle}>
//           Track the status of your contributions and reported misinformation.
//         </ThemedText>
//       </ThemedView>

//       <ThemedView
//         style={[
//           discussion.filter,
//           { zIndex: 1000, elevation: 1000 },
//         ]}
//       >
//         <ThemedView style={discussion.filterRow}>
//           {FILTERS.map((filter) => {
//             const active = activeFilter === filter.value;

//             return (
//               <TouchableOpacity
//                 key={filter.value}
//                 activeOpacity={0.75}
//                 onPress={() => setActiveFilter(filter.value)}
//                 style={[
//                   discussion.filterChip,
//                   active && discussion.filterChipActive,
//                 ]}
//               >
//                 <ThemedText
//                   style={[
//                     discussion.filterChipText,
//                     active && discussion.filterChipTextActive,
//                   ]}
//                 >
//                   {filter.label}
//                 </ThemedText>
//               </TouchableOpacity>
//             );
//           })}
//         </ThemedView>

//         <View
//           style={{
//             position: "relative",
//             zIndex: 9999,
//             elevation: 9999,
//           }}
//         >
//           <TouchableOpacity
//             style={[
//               discussion.filterStatus,
//               statusFilter !== "All" &&
//                 discussion.filterStatusActive,
//             ]}
//             activeOpacity={0.8}
//             onPress={() =>
//               setDropdownVisible((value) => !value)
//             }
//           >
//             <Ionicons
//               name="filter"
//               size={15}
//               color="white"
//             />

//             {statusFilter !== "All" && (
//               <ThemedView
//                 style={discussion.filterStatusDot}
//               />
//             )}
//           </TouchableOpacity>

//           <StatusFilterDropdown
//             visible={dropdownVisible}
//             onClose={() => setDropdownVisible(false)}
//             selected={statusFilter}
//             onSelect={setStatusFilter}
//           />
//         </View>
//       </ThemedView>

//       <ThemedView style={discussion.listCard}>
//         {loading ? (
//           <ThemedView style={discussion.emptyState}>
//             <Ionicons
//               name="sync-outline"
//               size={icon(28)}
//               color="#B7C0D6"
//             />

//             <ThemedText style={discussion.emptyText}>
//               Loading your discussions...
//             </ThemedText>
//           </ThemedView>
//         ) : filteredDiscussions.length === 0 ? (
//           <ThemedView style={discussion.emptyState}>
//             <Ionicons
//               name="chatbubbles-outline"
//               size={icon(28)}
//               color="#B7C0D6"
//             />

//             <ThemedText style={discussion.emptyText}>
//               No entries found in this category.
//             </ThemedText>
//           </ThemedView>
//         ) : (
//           filteredDiscussions.map((item, index) => {
//             const statusStyle = STATUS_STYLES[item.status];
//             const isMisinformation =
//               item.type === "Misinformation";

//             return (
//               <ThemedView key={item.id}>
//                 <ThemedView style={discussion.row}>
//                   <ThemedView
//                     style={discussion.contentContainer}
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

//                     <ThemedView style={discussion.textCol}>
//                       <ThemedText
//                         style={discussion.itemTitle}
//                         numberOfLines={1}
//                       >
//                         {item.title}
//                       </ThemedText>

//                       <ThemedText
//                         style={discussion.itemDesc}
//                         numberOfLines={2}
//                       >
//                         {item.desc}
//                       </ThemedText>

//                       <ThemedView style={discussion.metaRow}>
//                         <ThemedView
//                           style={[
//                             discussion.statusPill,
//                             {
//                               backgroundColor:
//                                 statusStyle.bg,
//                             },
//                           ]}
//                         >
//                           <Ionicons
//                             name={statusStyle.icon}
//                             size={icon(11)}
//                             color={statusStyle.text}
//                           />

//                           <ThemedText
//                             style={[
//                               discussion.statusPillText,
//                               {
//                                 color: statusStyle.text,
//                               },
//                             ]}
//                           >
//                             {item.status}
//                           </ThemedText>
//                         </ThemedView>

//                         <ThemedView
//                           style={discussion.dateRow}
//                         >
//                           <Ionicons
//                             name="calendar-outline"
//                             size={icon(11)}
//                             color="#9BA8C0"
//                           />

//                           <ThemedText
//                             style={discussion.itemDate}
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
//                             style={{
//                               flexDirection: "row",
//                               alignItems: "center",
//                             }}
//                           >
//                             <Ionicons
//                               name="link-outline"
//                               size={icon(11)}
//                               color="#35408E"
//                             />

//                             <ThemedText
//                               style={[
//                                 discussion.itemDate,
//                                 {
//                                   marginLeft: scale(4),
//                                   color: "#35408E",
//                                 },
//                               ]}
//                             >
//                               Link
//                             </ThemedText>
//                           </TouchableOpacity>
//                         ) : null}
//                       </ThemedView>

//                       {item.status === "Declined" &&
//                       item.review_reason ? (
//                         <ThemedView style={styles.declineRow}>
//                            <Ionicons
//                             name="information-circle-outline"
//                             size={icon(13)}
//                             color="#C0392B"
//                           />
//                           <ThemedText
//                             style={[
//                               styles.itemDesc,
//                               { marginLeft: scale(4), color: "#C0392B" },
//                             ]}
//                             numberOfLines={2}
//                           >
//                             {item.review_reason}
//                           </ThemedText>
//                         </ThemedView>
//                       ) : null}
//                     </ThemedView>
//                   </ThemedView>

//                   {item.image_url ? (
//                     <Image
//                       source={{ uri: item.image_url }}
//                       style={discussion.thumbnail}
//                       resizeMode="cover"
//                     />
//                   ) : null}
//                 </ThemedView>

//                 {index <
//                   filteredDiscussions.length - 1 && (
//                   <ThemedView
//                     style={discussion.rowDivider}
//                   />
//                 )}
//               </ThemedView>
//             );
//           })
//         )}
//       </ThemedView>
//     </ScrollView>
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

import StatusFilterDropdown, { StatusFilterValue } from "@/components/dropdown/status-dropdown";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { viewDiscussionStyles } from "@/styles/profile/profile-components-styles";
import { profileStyles } from "@/styles/profile/profile-styles";
import { icon, scale, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Image, Linking, ScrollView, TouchableOpacity, View } from "react-native";

type DiscussionType = "Contributions" | "Misinformation";
type DiscussionStatus = "Approved" | "Pending" | "Declined";

type BackendContribution = {
  contribution_id: string;
  user_id?: string;
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
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  confidence_score?: number | null;
  barangay?: string | null;
  municipality?: string | null;
  province?: string | null;
  region?: string | null;
  sentiment?: "POSITIVE" | "NEGATIVE" | "NEUTRAL" | null;
};

type ContributionEdge = {
  node: BackendContribution | null;
  cursor?: string;
};

type ContributionsResponse = {
  meta?: {
    api_version?: string;
    status?: number;
  };
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

type Discussion = {
  id: string;
  title: string;
  desc: string;
  date: string;
  type: DiscussionType;
  status: DiscussionStatus;
  image_url?: string | null;
  source_url?: string | null;
  review_reason?: string | null;
};

const FILTERS: { label: string; value: "All" | DiscussionType }[] = [
  { label: "All", value: "All" },
  { label: "Contributions", value: "Contributions" },
  { label: "Misinformation", value: "Misinformation" },
];

const STATUS_STYLES: Record<
  DiscussionStatus,
  { bg: string; text: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  Approved: {
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
  const { token, user, isLoading: authLoading } = useAuth();
  const r = useResponsive();
  const styles = useMemo(() => profileStyles(r), [r]);
  const discussion = useMemo(() => viewDiscussionStyles(r), [r]);

  const [activeFilter, setActiveFilter] = useState<"All" | DiscussionType>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>("All");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const currentUserId = String(user?.user_id ?? "").trim();

  const { data: result, isLoading: loading } =
    useFormQuery<ContributionsResponse>({
      key: ["my-contributions", currentUserId],
      url: "maintenance/contribution",
      enabled: Boolean(token && currentUserId),
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": "testing",
        "x-api-version": "2026-02-26",
      },
      params: {
        limit: 20,
        orderBy: "created_at",
        sortBy: "desc",
        startCursor: "",
        endCursor: "",
        user_id: currentUserId,
      },
    });

  console.log("[VIEW DISCUSSIONS] Logged-in user ID:", currentUserId);
  console.log("[VIEW DISCUSSIONS] Result:", result);

  const discussions = useMemo<Discussion[]>(() => {
    const edges = Array.isArray(result?.data?.edges)
      ? result.data.edges
      : [];

    return edges
      .map((edge) => edge.node)
      .filter(
        (node): node is BackendContribution =>
          node !== null
      )
      .filter((item) => !item.is_deleted)
      .map((item) => ({
        id: item.contribution_id,
        title:
          item.type ||
          item.slug ||
          "Untitled Contribution",
        desc:
          item.content ||
          "No description available.",
        date: item.created_at
          ? formatDate(item.created_at)
          : "Date unavailable",
        type:
          item.classification === "MISINFORMATION"
            ? "Misinformation"
            : "Contributions",
        status:
          item.status === "APPROVED"
            ? "Approved"
            : item.status === "DECLINED"
              ? "Declined"
              : "Pending",
        image_url: item.image_url || null,
        source_url: item.source_url || null,
        review_reason: item.review_reason || null,
      }));
  }, [result]);

  const filteredDiscussions = useMemo(() => {
    let filtered =
      activeFilter === "All"
        ? discussions
        : discussions.filter(
            (item) => item.type === activeFilter
          );

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (item) => item.status === statusFilter
      );
    }

    return filtered;
  }, [discussions, activeFilter, statusFilter]);

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView style={discussion.headerBlock}>
        <ThemedText style={discussion.pageTitle}>
          My HIV Discussions
        </ThemedText>

        <ThemedText style={discussion.pageSubtitle}>
          Track the status of your contributions and reported misinformation.
        </ThemedText>
      </ThemedView>

      <ThemedView
        style={[
          discussion.filter,
          {
            zIndex: 1000,
            elevation: 1000,
          },
        ]}
      >
        <ThemedView style={discussion.filterRow}>
          {FILTERS.map((filter) => {
            const active = activeFilter === filter.value;

            return (
              <TouchableOpacity
                key={filter.value}
                activeOpacity={0.75}
                onPress={() =>
                  setActiveFilter(filter.value)
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
                  {filter.label}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </ThemedView>

        <View
          style={{
            position: "relative",
            zIndex: 9999,
            elevation: 9999,
          }}
        >
          <TouchableOpacity
            style={[
              discussion.filterStatus,
              statusFilter !== "All" &&
                discussion.filterStatusActive,
            ]}
            activeOpacity={0.8}
            onPress={() =>
              setDropdownVisible((value) => !value)
            }
          >
            <Ionicons
              name="filter"
              size={15}
              color="white"
            />

            {statusFilter !== "All" && (
              <ThemedView
                style={discussion.filterStatusDot}
              />
            )}
          </TouchableOpacity>

          <StatusFilterDropdown
            visible={dropdownVisible}
            onClose={() =>
              setDropdownVisible(false)
            }
            selected={statusFilter}
            onSelect={setStatusFilter}
          />
        </View>
      </ThemedView>

      <ThemedView style={discussion.listCard}>
        {authLoading || loading ? (
          <ThemedView style={discussion.emptyState}>
            <Ionicons
              name="sync-outline"
              size={icon(28)}
              color="#B7C0D6"
            />

            <ThemedText style={discussion.emptyText}>
              Loading your discussions...
            </ThemedText>
          </ThemedView>
        ) : filteredDiscussions.length === 0 ? (
          <ThemedView style={discussion.emptyState}>
            <Ionicons
              name="chatbubbles-outline"
              size={icon(28)}
              color="#B7C0D6"
            />

            <ThemedText style={discussion.emptyText}>
              No entries found in this category.
            </ThemedText>
          </ThemedView>
        ) : (
          filteredDiscussions.map((item, index) => {
            const statusStyle =
              STATUS_STYLES[item.status];

            const isMisinformation =
              item.type === "Misinformation";

            return (
              <ThemedView key={item.id}>
                <ThemedView style={discussion.row}>
                  <ThemedView
                    style={
                      discussion.contentContainer
                    }
                  >
                    <ThemedView
                      style={[
                        discussion.iconBubble,
                        isMisinformation
                          ? discussion.iconBubbleMis
                          : discussion.iconBubbleContrib,
                      ]}
                    >
                      <Ionicons
                        name={
                          isMisinformation
                            ? "warning-outline"
                            : "chatbubble-outline"
                        }
                        size={icon(18)}
                        color={
                          isMisinformation
                            ? "#C0392B"
                            : "#35408E"
                        }
                      />
                    </ThemedView>

                    <ThemedView
                      style={discussion.textCol}
                    >
                      <ThemedText
                        style={discussion.itemTitle}
                        numberOfLines={1}
                      >
                        {item.title}
                      </ThemedText>

                      <ThemedText
                        style={discussion.itemDesc}
                        numberOfLines={2}
                      >
                        {item.desc}
                      </ThemedText>

                      <ThemedView
                        style={discussion.metaRow}
                      >
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
                            name={statusStyle.icon}
                            size={icon(11)}
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
                            {item.status}
                          </ThemedText>
                        </ThemedView>

                        <ThemedView
                          style={discussion.dateRow}
                        >
                          <Ionicons
                            name="calendar-outline"
                            size={icon(11)}
                            color="#9BA8C0"
                          />

                          <ThemedText
                            style={discussion.itemDate}
                          >
                            {item.date}
                          </ThemedText>
                        </ThemedView>

                        {item.source_url ? (
                          <TouchableOpacity
                            onPress={() =>
                              Linking.openURL(
                                item.source_url!
                              )
                            }
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Ionicons
                              name="link-outline"
                              size={icon(11)}
                              color="#35408E"
                            />

                            <ThemedText
                              style={[
                                discussion.itemDate,
                                {
                                  marginLeft:
                                    scale(4),
                                  color: "#35408E",
                                },
                              ]}
                            >
                              Link
                            </ThemedText>
                          </TouchableOpacity>
                        ) : null}
                      </ThemedView>

                      {item.status === "Declined" &&
                      item.review_reason ? (
                        <ThemedView
                          style={styles.declineRow}
                        >
                          <Ionicons
                            name="information-circle-outline"
                            size={icon(13)}
                            color="#C0392B"
                          />

                          <ThemedText
                            style={[
                              styles.itemDesc,
                              {
                                marginLeft:
                                  scale(4),
                                color: "#C0392B",
                              },
                            ]}
                            numberOfLines={2}
                          >
                            {item.review_reason}
                          </ThemedText>
                        </ThemedView>
                      ) : null}
                    </ThemedView>
                  </ThemedView>

                  {item.image_url ? (
                    <Image
                      source={{
                        uri: item.image_url,
                      }}
                      style={
                        discussion.thumbnail
                      }
                      resizeMode="cover"
                    />
                  ) : null}
                </ThemedView>

                {index <
                  filteredDiscussions.length - 1 && (
                  <ThemedView
                    style={
                      discussion.rowDivider
                    }
                  />
                )}
              </ThemedView>
            );
          })
        )}
      </ThemedView>
    </ScrollView>
  );
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
