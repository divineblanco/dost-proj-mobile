// import StatusFilterDropdown, {
//   StatusFilterValue,
// } from "@/components/dropdown/status-dropdown";

// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";

// import { viewDiscussionStyles } from "@/styles/profile/profile-components-styles";
// import { profileStyles } from "@/styles/profile/profile-styles";
// import { icon, useResponsive } from "@/styles/responsive";

// import { Ionicons } from "@expo/vector-icons";

// import React, {
//   useMemo,
//   useState,
// } from "react";

// import {
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   View,
// } from "react-native";

// type DiscussionType =
//   | "Contributions"
//   | "Misinformation";

// type DiscussionStatus =
//   | "Verified"
//   | "Pending"
//   | "Declined";

// type Discussion = {
//   id: number;
//   title: string;
//   desc: string;
//   date: string;
//   type: DiscussionType;
//   status: DiscussionStatus;
// };

// const discussions: Discussion[] = [
//   {
//     id: 1,
//     title: "Personal Experience",
//     desc: "Sharing my experience on how regular testing helped me stay healthy...",
//     date: "May 19, 2026",
//     type: "Contributions",
//     status: "Verified",
//   },
//   {
//     id: 2,
//     title: "Stigma or Discrimination",
//     desc: "Stigma is still a big issue in our communities. Let's create...",
//     date: "May 16, 2026",
//     type: "Contributions",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     title: "HIV Resource Information",
//     desc: "Here are simple prevention tips we should all keep in mind...",
//     date: "May 12, 2026",
//     type: "Contributions",
//     status: "Verified",
//   },
//   {
//     id: 4,
//     title: "'HIV can spread through casual contact'",
//     desc: "Flagged post claiming HIV spreads through sharing utensils...",
//     date: "May 10, 2026",
//     type: "Misinformation",
//     status: "Declined",
//   },
//   {
//     id: 5,
//     title: "'Herbal cure fully removes HIV'",
//     desc: "Flagged claim promoting unverified herbal treatment as a cure...",
//     date: "May 6, 2026",
//     type: "Misinformation",
//     status: "Pending",
//   },
// ];

// const FILTERS: {
//   label: string;
//   value: "All" | DiscussionType;
// }[] = [
//   {
//     label: "All",
//     value: "All",
//   },
//   {
//     label: "Contributions",
//     value: "Contributions",
//   },
//   {
//     label: "Misinformation",
//     value: "Misinformation",
//   },
// ];

// const STATUS_STYLES: Record<
//   DiscussionStatus,
//   {
//     bg: string;
//     text: string;
//     icon: keyof typeof Ionicons.glyphMap;
//   }
// > = {
//   Verified: {
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
//   /*
//    * Main category filter
//    */
//   const [
//     activeFilter,
//     setActiveFilter,
//   ] = useState<
//     "All" | DiscussionType
//   >("All");

//   /*
//    * Status filter
//    */
//   const [
//     statusFilter,
//     setStatusFilter,
//   ] = useState<StatusFilterValue>(
//     "All"
//   );

//   /*
//    * Dropdown visibility
//    */
//   const [
//     dropdownVisible,
//     setDropdownVisible,
//   ] = useState(false);

//   /*
//    * Toggle dropdown.
//    *
//    * No measuring is required because the dropdown
//    * is positioned relative to the button wrapper.
//    */
//   const toggleStatusDropdown = () => {
//     setDropdownVisible(
//       (previous) => !previous
//     );
//   };

//   /*
//    * Filter discussions
//    */
//   const filteredDiscussions =
//     useMemo(() => {
//       let filtered =
//         activeFilter === "All"
//           ? discussions
//           : discussions.filter(
//               (d) =>
//                 d.type ===
//                 activeFilter
//             );

//       if (
//         statusFilter !== "All"
//       ) {
//         filtered =
//           filtered.filter(
//             (d) =>
//               d.status ===
//               statusFilter
//           );
//       }

//       return filtered;
//     }, [
//       activeFilter,
//       statusFilter,
//     ]);

//   /*
//    * Status button active state
//    */
//   const isStatusFilterActive =
//     statusFilter !== "All";

//   /*
//    * Responsive styles
//    */
//   const r = useResponsive();

//   const styles = useMemo(
//     () => profileStyles(r),
//     [r]
//   );

//   const discussion =
//     useMemo(
//       () =>
//         viewDiscussionStyles(r),
//       [r]
//     );

//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={
//         styles.scrollContent
//       }
//     >
//       {/* ==================================================
//           HEADER
//       ================================================== */}

//       <ThemedView
//         style={discussion.headerBlock}
//       >
//         <ThemedText
//           style={discussion.pageTitle}
//         >
//           My HIV Discussions
//         </ThemedText>

//         <ThemedText
//           style={
//             discussion.pageSubtitle
//           }
//         >
//           Track the status of your
//           contributions and reported
//           misinformation.
//         </ThemedText>
//       </ThemedView>

//       {/* ==================================================
//           FILTER SECTION
//       ================================================== */}

//       <ThemedView
//         style={[
//           discussion.filter,

//           /*
//            * IMPORTANT:
//            *
//            * Allow the dropdown to extend outside
//            * the filter container.
//            */
//           {
//             zIndex: 1000,
//             elevation: 1000,
//           },
//         ]}
//       >
//         {/* ------------------------------------------------
//             CATEGORY FILTER TABS
//         ------------------------------------------------ */}

//         <ThemedView
//           style={
//             discussion.filterRow
//           }
//         >
//           {FILTERS.map(
//             (filter) => {
//               const active =
//                 activeFilter ===
//                 filter.value;

//               return (
//                 <TouchableOpacity
//                   key={
//                     filter.value
//                   }
//                   activeOpacity={0.75}
//                   onPress={() =>
//                     setActiveFilter(
//                       filter.value
//                     )
//                   }
//                   style={[
//                     discussion.filterChip,

//                     active &&
//                       discussion.filterChipActive,
//                   ]}
//                 >
//                   <ThemedText
//                     style={[
//                       discussion.filterChipText,

//                       active &&
//                         discussion.filterChipTextActive,
//                     ]}
//                   >
//                     {
//                       filter.label
//                     }
//                   </ThemedText>
//                 </TouchableOpacity>
//               );
//             }
//           )}
//         </ThemedView>

//         {/* ------------------------------------------------
//             STATUS FILTER BUTTON + DROPDOWN
//         ------------------------------------------------ */}

//         <View
//           style={{
//             position: "relative",

//             /*
//              * Very important.
//              *
//              * The dropdown's top: "100%" is calculated
//              * relative to THIS View.
//              */
//             zIndex: 9999,
//             elevation: 9999,
//           }}
//         >
//           {/* STATUS BUTTON */}

//           <TouchableOpacity
//             style={[
//               discussion.filterStatus,

//               isStatusFilterActive &&
//                 discussion.filterStatusActive,
//             ]}
//             activeOpacity={0.8}
//             onPress={
//               toggleStatusDropdown
//             }
//           >
//             <Ionicons
//               name="filter"
//               size={15}
//               color="white"
//             />

//             {isStatusFilterActive && (
//               <ThemedView
//                 style={
//                   discussion.filterStatusDot
//                 }
//               />
//             )}
//           </TouchableOpacity>

//           {/* DROPDOWN */}

//           <StatusFilterDropdown
//             visible={
//               dropdownVisible
//             }
//             onClose={() =>
//               setDropdownVisible(
//                 false
//               )
//             }
//             selected={
//               statusFilter
//             }
//             onSelect={
//               setStatusFilter
//             }
//           />
//         </View>
//       </ThemedView>

//       {/* ==================================================
//           DISCUSSION LIST
//       ================================================== */}

//       <ThemedView
//         style={
//           discussion.listCard
//         }
//       >
//         {filteredDiscussions.length ===
//         0 ? (
//           /* ------------------------------------------------
//              EMPTY STATE
//           ------------------------------------------------ */

//           <ThemedView
//             style={
//               discussion.emptyState
//             }
//           >
//             <Ionicons
//               name="chatbubbles-outline"
//               size={icon(28)}
//               color="#B7C0D6"
//             />

//             <ThemedText
//               style={
//                 discussion.emptyText
//               }
//             >
//               No entries found in
//               this category.
//             </ThemedText>
//           </ThemedView>
//         ) : (
//           /* ------------------------------------------------
//              DISCUSSION ITEMS
//           ------------------------------------------------ */

//           filteredDiscussions.map(
//             (
//               item,
//               index
//             ) => {
//               const statusStyle =
//                 STATUS_STYLES[
//                   item.status
//                 ];

//               return (
//                 <ThemedView
//                   key={item.id}
//                 >
//                   {/* DISCUSSION ROW */}

//                   <ThemedView
//                     style={
//                       discussion.row
//                     }
//                   >
//                     {/* LEFT SIDE */}

//                     <ThemedView
//                       style={
//                         discussion.contentContainer
//                       }
//                     >
//                       {/* TYPE ICON */}

//                       <ThemedView
//                         style={[
//                           discussion.iconBubble,

//                           item.type ===
//                           "Misinformation"
//                             ? discussion.iconBubbleMis
//                             : discussion.iconBubbleContrib,
//                         ]}
//                       >
//                         <Ionicons
//                           name={
//                             item.type ===
//                             "Misinformation"
//                               ? "warning-outline"
//                               : "chatbubble-outline"
//                           }
//                           size={icon(
//                             18
//                           )}
//                           color={
//                             item.type ===
//                             "Misinformation"
//                               ? "#C0392B"
//                               : "#35408E"
//                           }
//                         />
//                       </ThemedView>

//                       {/* TEXT */}

//                       <ThemedView
//                         style={
//                           discussion.textCol
//                         }
//                       >
//                         {/* TITLE */}

//                         <ThemedText
//                           style={
//                             discussion.itemTitle
//                           }
//                           numberOfLines={
//                             1
//                           }
//                         >
//                           {
//                             item.title
//                           }
//                         </ThemedText>

//                         {/* DESCRIPTION */}

//                         <ThemedText
//                           style={
//                             discussion.itemDesc
//                           }
//                           numberOfLines={
//                             2
//                           }
//                         >
//                           {
//                             item.desc
//                           }
//                         </ThemedText>

//                         {/* META */}

//                         <ThemedView
//                           style={
//                             discussion.metaRow
//                           }
//                         >
//                           {/* STATUS */}

//                           <ThemedView
//                             style={[
//                               discussion.statusPill,

//                               {
//                                 backgroundColor:
//                                   statusStyle.bg,
//                               },
//                             ]}
//                           >
//                             <Ionicons
//                               name={
//                                 statusStyle.icon
//                               }
//                               size={icon(
//                                 11
//                               )}
//                               color={
//                                 statusStyle.text
//                               }
//                             />

//                             <ThemedText
//                               style={[
//                                 discussion.statusPillText,

//                                 {
//                                   color:
//                                     statusStyle.text,
//                                 },
//                               ]}
//                             >
//                               {
//                                 item.status
//                               }
//                             </ThemedText>
//                           </ThemedView>

//                           {/* DATE */}

//                           <ThemedView
//                             style={
//                               discussion.dateRow
//                             }
//                           >
//                             <Ionicons
//                               name="calendar-outline"
//                               size={icon(
//                                 11
//                               )}
//                               color="#9BA8C0"
//                             />

//                             <ThemedText
//                               style={
//                                 discussion.itemDate
//                               }
//                             >
//                               {
//                                 item.date
//                               }
//                             </ThemedText>
//                           </ThemedView>
//                         </ThemedView>
//                       </ThemedView>
//                     </ThemedView>

//                     {/* THUMBNAIL */}

//                     <Image
//                       source={require("@/assets/images/social-media.jpg")}
//                       style={
//                         discussion.thumbnail
//                       }
//                       resizeMode="cover"
//                     />
//                   </ThemedView>

//                   {/* DIVIDER */}

//                   {index <
//                     filteredDiscussions.length -
//                       1 && (
//                     <ThemedView
//                       style={
//                         discussion.rowDivider
//                       }
//                     />
//                   )}
//                 </ThemedView>
//               );
//             }
//           )
//         )}
//       </ThemedView>
//     </ScrollView>
//   );
// }


import StatusFilterDropdown, {
  StatusFilterValue,
} from "@/components/dropdown/status-dropdown";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { viewDiscussionStyles } from "@/styles/profile/profile-components-styles";
import { profileStyles } from "@/styles/profile/profile-styles";
import { icon, scale, useResponsive } from "@/styles/responsive";

import { Ionicons } from "@expo/vector-icons";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "@/lib/auth/AuthProvider";

type DiscussionType =
  | "Contributions"
  | "Misinformation";

type DiscussionStatus =
  | "Approved"
  | "Pending"
  | "Declined";

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

  created_at?: string | null;
  updated_at?: string | null;

  confidence_score?: number | null;

  barangay?: string | null;
  municipality?: string | null;
  province?: string | null;
  region?: string | null;
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

const API_URL =
  process.env.EXPO_PUBLIC_API_URL;

const API_KEY =
  process.env.EXPO_PUBLIC_API_KEY;

export default function ViewDiscussions() {
  /*
   * ==================================================
   * AUTH
   * ==================================================
   */

  const {
    token,
    user,
    isLoading: authLoading,
  } = useAuth();

  /*
   * ==================================================
   * STATE
   * ==================================================
   */

  const [
    activeFilter,
    setActiveFilter,
  ] = useState<
    "All" | DiscussionType
  >("All");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<StatusFilterValue>(
    "All"
  );

  const [
    dropdownVisible,
    setDropdownVisible,
  ] = useState(false);

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
      console.log(
        "[CONTRIBUTIONS] Loading contributions..."
      );

      console.log(
        "[CONTRIBUTIONS] Auth state:",
        {
          authLoading,
          hasToken: !!token,
          hasUser: !!user,
          userId: user?.user_id,
        }
      );

      /*
       * Wait until authentication
       * finishes loading.
       */

      if (authLoading) {
        console.log(
          "[CONTRIBUTIONS] Auth still loading..."
        );

        return;
      }

      /*
       * User must be authenticated.
       */

      if (!token) {
        console.log(
          "[CONTRIBUTIONS] No authentication token."
        );

        setLoading(false);
        setDiscussions([]);

        return;
      }

      /*
       * API URL check.
       */

      if (!API_URL) {
        console.error(
          "[CONTRIBUTIONS] EXPO_PUBLIC_API_URL is missing."
        );

        setLoading(false);
        setDiscussions([]);

        return;
      }

      /*
       * API key check.
       */

      if (!API_KEY) {
        console.error(
          "[CONTRIBUTIONS] EXPO_PUBLIC_API_KEY is missing."
        );

        setLoading(false);
        setDiscussions([]);

        return;
      }

      try {
        setLoading(true);

        const endpoint =
          `${API_URL}/maintenance/contribution`;

        console.log(
          "[CONTRIBUTIONS] GET:",
          endpoint
        );

        /*
         * IMPORTANT:
         *
         * Send BOTH:
         *
         * Authorization: Bearer <JWT>
         *
         * x-api-key: <API KEY>
         */

        const response =
          await fetch(
            endpoint,
            {
              method: "GET",

              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "X-API-Key": process.env.EXPO_PUBLIC_API_KEY ?? "",
              },

            }
          );

        console.log(
          "[CONTRIBUTIONS] HTTP status:",
          response.status
        );

        const result =
          await response.json();

        console.log(
          "[CONTRIBUTIONS] API response:",
          JSON.stringify(
            result,
            null,
            2
          )
        );

        /*
         * ==================================================
         * HANDLE HTTP ERROR
         * ==================================================
         */

        if (!response.ok) {
          console.error(
            "[CONTRIBUTIONS] API request failed:",
            result
          );

          setDiscussions([]);

          return;
        }

        /*
         * ==================================================
         * IMPORTANT RESPONSE STRUCTURE
         * ==================================================
         *
         * Your backend returns:
         *
         * {
         *   meta: {...},
         *
         *   data: {
         *     edges: [
         *       {
         *         node: {
         *           contribution_id: "...",
         *           ...
         *         },
         *         cursor: "..."
         *       }
         *     ],
         *
         *     pageInfo: {...},
         *
         *     totalCount: 1
         *   }
         * }
         *
         * Therefore:
         *
         * result.data.edges
         *
         * is the array.
         */

        const edges =
          Array.isArray(
            result?.data?.edges
          )
            ? result.data.edges
            : [];

        console.log(
          "[CONTRIBUTIONS] Number of edges:",
          edges.length
        );

        /*
         * Extract node from each edge.
         */

        const rawData: BackendContribution[] =
          edges
            .map(
              (
                edge: {
                  node?: BackendContribution;
                }
              ) => edge?.node
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
          "[CONTRIBUTIONS] Extracted nodes:",
          rawData
        );

        /*
         * ==================================================
         * MAP BACKEND DATA TO UI DATA
         * ==================================================
         */

        const mapped: Discussion[] =
          rawData
            .filter(
              (
                item
              ) =>
                !item.is_deleted
            )
            .map(
              (
                item
              ) => {
                /*
                 * ------------------------------------------
                 * CATEGORY
                 * ------------------------------------------
                 *
                 * MISINFORMATION
                 * -> Misinformation
                 *
                 * Everything else
                 * -> Contributions
                 */

                const type: DiscussionType =
                  item.classification ===
                  "MISINFORMATION"
                    ? "Misinformation"
                    : "Contributions";

                /*
                 * ------------------------------------------
                 * STATUS
                 * ------------------------------------------
                 *
                 * APPROVED
                 * -> Verified
                 *
                 * PENDING
                 * -> Pending
                 *
                 * DECLINED
                 * -> Declined
                 */

                let status: DiscussionStatus =
                  "Pending";

                switch (
                  item.status
                ) {
                  case "APPROVED":
                    status =
                      "Approved";
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

                /*
                 * ------------------------------------------
                 * TITLE
                 * ------------------------------------------
                 *
                 * Your current API response does not have
                 * a title field.
                 *
                 * Use slug as fallback.
                 */

                const title =
                  item.type ||
                  item.slug ||
                  "Untitled Contribution";

                /*
                 * ------------------------------------------
                 * DESCRIPTION
                 * ------------------------------------------
                 */

                const description =
                  item.content ||
                  "No description available.";

                /*
                 * ------------------------------------------
                 * DATE
                 * ------------------------------------------
                 *
                 * Your shown GET response does not contain
                 * created_at or updated_at.
                 *
                 * It only has reviewed_at, which is null
                 * for a pending contribution.
                 *
                 * Therefore display:
                 *
                 * reviewed_at
                 * OR "Date unavailable"
                 */

                


                return {
                  id:
                    item.contribution_id,

                  title,

                  desc:
                    description,

                  date: item.created_at
                  ? formatDate(item.created_at)
                  : "Date unavailable",

                  type,

                  status,

                  image_url:
                    item.image_url,

                  source_url:
                    item.source_url || null,

                  review_reason:
                    item.review_reason || null,
                };
              }
            );

        console.log(
          "[CONTRIBUTIONS] Mapped discussions:",
          mapped
        );

        setDiscussions(
          mapped
        );
      } catch (error) {
        console.error(
          "[CONTRIBUTIONS] Request error:",
          error
        );

        setDiscussions([]);
      } finally {
        setLoading(false);

        console.log(
          "[CONTRIBUTIONS] Loading finished."
        );
      }
    }, [
      token,
      user,
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
   * STATUS DROPDOWN
   * ==================================================
   */

  const toggleStatusDropdown =
    () => {
      setDropdownVisible(
        (previous) =>
          !previous
      );
    };

  /*
   * ==================================================
   * FILTER DISCUSSIONS
   * ==================================================
   */

  const filteredDiscussions =
    useMemo(() => {
      let filtered =
        activeFilter === "All"
          ? discussions
          : discussions.filter(
              (
                discussion
              ) =>
                discussion.type ===
                activeFilter
            );

      if (
        statusFilter !== "All"
      ) {
        filtered =
          filtered.filter(
            (
              discussion
            ) =>
              discussion.status ===
              statusFilter
          );
      }

      return filtered;
    }, [
      discussions,
      activeFilter,
      statusFilter,
    ]);

  /*
   * ==================================================
   * STATUS FILTER ACTIVE STATE
   * ==================================================
   */

  const isStatusFilterActive =
    statusFilter !== "All";

  /*
   * ==================================================
   * RESPONSIVE STYLES
   * ==================================================
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

  /*
   * ==================================================
   * RENDER
   * ==================================================
   */

  return (
    <ScrollView
      style={
        styles.pageContainer
      }
      contentContainerStyle={
        styles.scrollContent
      }
    >
      {/* ==================================================
          HEADER
      ================================================== */}

      <ThemedView
        style={
          discussion.headerBlock
        }
      >
        <ThemedText
          style={
            discussion.pageTitle
          }
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
          {
            zIndex: 1000,
            elevation: 1000,
          },
        ]}
      >
        {/* CATEGORY FILTER TABS */}

        <ThemedView
          style={
            discussion.filterRow
          }
        >
          {FILTERS.map(
            (
              filter
            ) => {
              const active =
                activeFilter ===
                filter.value;

              return (
                <TouchableOpacity
                  key={
                    filter.value
                  }
                  activeOpacity={
                    0.75
                  }
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

        {/* STATUS FILTER */}

        <View
          style={{
            position:
              "relative",

            zIndex: 9999,

            elevation: 9999,
          }}
        >
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
        {loading ? (
          <ThemedView
            style={
              discussion.emptyState
            }
          >
            <Ionicons
              name="sync-outline"
              size={icon(28)}
              color="#B7C0D6"
            />

            <ThemedText
              style={
                discussion.emptyText
              }
            >
              Loading your
              discussions...
            </ThemedText>
          </ThemedView>
        ) : filteredDiscussions.length ===
          0 ? (
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
              No entries found in this category.
            </ThemedText>
          </ThemedView>
        ) : (
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

                          {/* LINK */}

                          {/* {item.source_url ? (
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={async () => {
                                try {
                                  const url =
                                    item.source_url?.trim();

                                  if (!url) {
                                    return;
                                  }

                                  const supported =
                                    await Linking.canOpenURL(
                                      url
                                    );

                                  if (supported) {
                                    await Linking.openURL(
                                      url
                                    );
                                  } else {
                                    console.error(
                                      "[CONTRIBUTIONS] Cannot open URL:",
                                      url
                                    );
                                  }
                                } catch (error) {
                                  console.error(
                                    "[CONTRIBUTIONS] Failed to open source URL:",
                                    error
                                  );
                                }
                              }}
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
                          ) : null} */}

                          {/* LINK */}

                          {item.source_url ? (
                            (() => {
                              const source =
                                item.source_url.trim();

                              const isUrl =
                                /^https?:\/\//i.test(source);

                              if (!isUrl) {
                                return (
                                  <ThemedView
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Ionicons
                                      name="globe-outline"
                                      size={icon(11)}
                                      color="#9BA8C0"
                                    />

                                    <ThemedText
                                      style={[
                                        styles.itemDate,
                                        {
                                          marginLeft: scale(4),
                                          color: "#9BA8C0",
                                        },
                                      ]}
                                      numberOfLines={1}
                                    >
                                      {source}
                                    </ThemedText>
                                  </ThemedView>
                                );
                              }

                              return (
                                <TouchableOpacity
                                  activeOpacity={0.7}
                                  onPress={async () => {
                                    try {
                                      const supported =
                                        await Linking.canOpenURL(
                                          source
                                        );

                                      if (supported) {
                                        await Linking.openURL(
                                          source
                                        );
                                      } else {
                                        console.error(
                                          "[CONTRIBUTIONS] Cannot open URL:",
                                          source
                                        );
                                      }
                                    } catch (error) {
                                      console.error(
                                        "[CONTRIBUTIONS] Failed to open source URL:",
                                        error
                                      );
                                    }
                                  }}
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
                                      styles.itemDate,
                                      {
                                        marginLeft: scale(4),
                                        color: "#35408E",
                                        textDecorationLine:
                                          "underline",
                                      },
                                    ]}
                                  >
                                    Link
                                  </ThemedText>
                                </TouchableOpacity>
                              );
                            })()
                          ) : null}



                        </ThemedView>

                        {/* REVIEW REASON - DECLINED ONLY */}
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
                                    marginLeft: scale(4),
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

                    {/* THUMBNAIL */}

                    {item.image_url ? (
                      <Image
                        source={{
                          uri: item.image_url,
                        }}
                        style={discussion.thumbnail}
                        resizeMode="cover"
                      />
                    ) : null}

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

/*
 * ==================================================
 * DATE FORMATTER
 * ==================================================
 */

function formatDate(
  value: string
): string {
  try {
    const date =
      new Date(value);

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
  } catch {
    return "Date unavailable";
  }
}
