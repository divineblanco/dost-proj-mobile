// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { viewResourceStyles } from "@/styles/profile/profile-components-styles";
// import { profileStyles } from "@/styles/profile/profile-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import {
//   DownloadedResource,
//   getDownloadedResources,
// } from "@/utils/resource-downloaded";

// import { Feather, Ionicons } from "@expo/vector-icons";
// import { useFocusEffect } from "expo-router";
// import React, {
//   useCallback,
//   useMemo,
//   useState,
// } from "react";

// import {
//   Alert,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";

// import * as Sharing from "expo-sharing";

// type ResourceCategory =
//   | "Reports"
//   | "Educational Materials";

// const FILTERS: {
//   label: string;
//   value: "All" | ResourceCategory;
// }[] = [
//   {
//     label: "All",
//     value: "All",
//   },
//   {
//     label: "Reports",
//     value: "Reports",
//   },
//   {
//     label: "Educational Materials",
//     value: "Educational Materials",
//   },
// ];

// export default function ViewResources() {
//   /**
//    * ============================================================
//    * STATE
//    * ============================================================
//    */

//   const [resources, setResources] =
//     useState<DownloadedResource[]>([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [activeFilter, setActiveFilter] = useState<
//     "All" | ResourceCategory
//   >("All");

//   const [sortOrder, setSortOrder] = useState<
//     "newest" | "oldest"
//   >("newest");

//   /**
//    * ============================================================
//    * RESPONSIVE STYLES
//    * ============================================================
//    */

//   const r = useResponsive();

//   const styles = useMemo(
//     () => profileStyles(r),
//     [r]
//   );

//   const resource = useMemo(
//     () => viewResourceStyles(r),
//     [r]
//   );

//   /**
//    * ============================================================
//    * LOAD DOWNLOADED RESOURCES
//    * ============================================================
//    *
//    * Resources are stored locally after the user downloads them.
//    *
//    * We reload them whenever this screen gets focus so that:
//    *
//    * Learn
//    *   ↓
//    * Download
//    *   ↓
//    * ResourceDownloaded
//    *   ↓
//    * View Resources
//    *
//    * always shows the latest downloaded resources.
//    */

//   const loadResources = useCallback(async () => {
//     try {
//       setLoading(true);

//       const downloaded =
//         await getDownloadedResources();

//       setResources(downloaded);
//     } catch (error) {
//       console.error(
//         "[VIEW RESOURCES] Failed to load downloaded resources:",
//         error
//       );

//       setResources([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   /**
//    * Reload every time the screen becomes active.
//    */
//   useFocusEffect(
//     useCallback(() => {
//       loadResources();
//     }, [loadResources])
//   );

//   /**
//    * ============================================================
//    * FILTER + SORT
//    * ============================================================
//    */

//   const filteredResources = useMemo(() => {
//     const filtered =
//       activeFilter === "All"
//         ? resources
//         : resources.filter(
//             (item) =>
//               item.category === activeFilter
//           );

//     return [...filtered].sort((a, b) => {
//       const dateA =
//         new Date(
//           a.downloadedAt
//         ).getTime();

//       const dateB =
//         new Date(
//           b.downloadedAt
//         ).getTime();

//       return sortOrder === "newest"
//         ? dateB - dateA
//         : dateA - dateB;
//     });
//   }, [
//     resources,
//     activeFilter,
//     sortOrder,
//   ]);

//   /**
//    * ============================================================
//    * OPEN DOWNLOADED RESOURCE
//    * ============================================================
//    *
//    * IMPORTANT:
//    * We do NOT call downloadResourcePDF() here.
//    *
//    * The file has already been downloaded.
//    * We simply open/share the locally saved file.
//    */

//   const handleOpenResource = async (
//     item: DownloadedResource
//   ) => {
//     try {
//       if (!item.fileUri) {
//         Alert.alert(
//           "File Not Found",
//           "The downloaded file could not be found on this device."
//         );

//         return;
//       }

//       const canShare =
//         await Sharing.isAvailableAsync();

//       if (!canShare) {
//         Alert.alert(
//           "Unable to Open",
//           "Opening downloaded files is not available on this device."
//         );

//         return;
//       }

//       await Sharing.shareAsync(
//         item.fileUri,
//         {
//           mimeType: "application/pdf",
//           dialogTitle: item.title,
//         }
//       );
//     } catch (error) {
//       console.error(
//         "[VIEW RESOURCES] Failed to open resource:",
//         error
//       );

//       Alert.alert(
//         "Unable to Open",
//         "The downloaded resource could not be opened."
//       );
//     }
//   };

//   /**
//    * ============================================================
//    * RENDER
//    * ============================================================
//    */

//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={
//         styles.scrollContent
//       }
//       showsVerticalScrollIndicator={false}
//     >
//       {/* ======================================================
//           HEADER
//       ======================================================= */}

//       <ThemedView
//         style={resource.headerBlock}
//       >
//         <ThemedText
//           style={resource.pageTitle}
//         >
//           Downloaded Resources
//         </ThemedText>

//         <ThemedText
//           style={resource.pageSubtitle}
//         >
//           Reports and educational materials
//           you've saved for offline access.
//         </ThemedText>
//       </ThemedView>

//       {/* ======================================================
//           FILTER TABS + SORT
//       ======================================================= */}

//       <ThemedView
//         style={resource.filterSortRow}
//       >
//         {/* FILTERS */}

//         <ThemedView
//           style={resource.filterRow}
//         >
//           {FILTERS.map((filter) => {
//             const active =
//               activeFilter ===
//               filter.value;

//             return (
//               <TouchableOpacity
//                 key={filter.value}
//                 activeOpacity={0.75}
//                 onPress={() =>
//                   setActiveFilter(
//                     filter.value
//                   )
//                 }
//                 style={[
//                   resource.filterChip,
//                   active &&
//                     resource.filterChipActive,
//                 ]}
//               >
//                 <ThemedText
//                   style={[
//                     resource.filterChipText,
//                     active &&
//                       resource.filterChipTextActive,
//                   ]}
//                 >
//                   {filter.label}
//                 </ThemedText>
//               </TouchableOpacity>
//             );
//           })}
//         </ThemedView>

//         {/* SORT */}

//         <TouchableOpacity
//           activeOpacity={0.75}
//           onPress={() => {
//             setSortOrder(
//               (current) =>
//                 current === "newest"
//                   ? "oldest"
//                   : "newest"
//             );
//           }}
//           style={resource.sortBtn}
//         >
//           <Feather
//             name={
//               sortOrder === "newest"
//                 ? "arrow-down"
//                 : "arrow-up"
//             }
//             size={icon(14)}
//             color="#ffffff"
//           />
//         </TouchableOpacity>
//       </ThemedView>

//       {/* ======================================================
//           RESOURCE LIST
//       ======================================================= */}

//       <ThemedView
//         style={resource.listCard}
//       >
//         {/* ====================================================
//             LOADING
//         ===================================================== */}

//         {loading ? (
//           <ThemedView
//             style={resource.emptyState}
//           >
//             <Feather
//               name="loader"
//               size={icon(28)}
//               color="#B7C0D6"
//             />

//             <ThemedText
//               style={resource.emptyText}
//             >
//               Loading downloaded resources...
//             </ThemedText>
//           </ThemedView>
//         ) : filteredResources.length ===
//           0 ? (
//           /* ==================================================
//              EMPTY STATE
//           =================================================== */

//           <ThemedView
//             style={resource.emptyState}
//           >
//             <Feather
//               name="inbox"
//               size={icon(28)}
//               color="#B7C0D6"
//             />

//             <ThemedText
//               style={resource.emptyText}
//             >
//               {activeFilter === "All"
//                 ? "No downloaded resources yet."
//                 : "No resources found in this category."}
//             </ThemedText>
//           </ThemedView>
//         ) : (
//           /* ==================================================
//              RESOURCE ITEMS
//           =================================================== */

//           filteredResources.map(
//             (item, index) => {
//               return (
//                 <ThemedView
//                   key={item.id}
//                 >
//                   <ThemedView
//                     style={resource.row}
//                   >
//                     {/* ========================================
//                         LEFT SIDE
//                     ========================================= */}

//                     <ThemedView
//                       style={
//                         resource.contentContainer
//                       }
//                     >
//                       {/* RESOURCE ICON */}

//                       <ThemedView
//                         style={[
//                           resource.iconBubble,
//                           item.category ===
//                             "Reports"
//                             ? resource.iconBubbleReport
//                             : resource.iconBubbleEdu,
//                         ]}
//                       >
//                         <Feather
//                           name={
//                             item.category ===
//                             "Reports"
//                               ? "bar-chart-2"
//                               : "book"
//                           }
//                           size={icon(18)}
//                           color={
//                             item.category ===
//                             "Reports"
//                               ? "#35408E"
//                               : "#FFB633"
//                           }
//                         />
//                       </ThemedView>

//                       {/* RESOURCE INFORMATION */}

//                       <ThemedView
//                         style={resource.textCol}
//                       >
//                         {/* TITLE */}

//                         <ThemedText
//                           style={
//                             resource.itemTitle
//                           }
//                           numberOfLines={1}
//                         >
//                           {item.title}
//                         </ThemedText>

//                         {/* DESCRIPTION */}

//                         <ThemedText
//                           style={
//                             resource.itemDesc
//                           }
//                           numberOfLines={2}
//                         >
//                           {item.description}
//                         </ThemedText>

//                         {/* META */}

//                         <ThemedView
//                           style={
//                             resource.metaRow
//                           }
//                         >
//                           {/* CATEGORY */}

//                           <ThemedView
//                             style={
//                               resource.categoryPill
//                             }
//                           >
//                             <ThemedText
//                               style={
//                                 resource.categoryPillText
//                               }
//                             >
//                               {item.category}
//                             </ThemedText>
//                           </ThemedView>

//                           {/* DATE */}

//                           <ThemedView
//                             style={
//                               resource.dateRow
//                             }
//                           >
//                             <Ionicons
//                               name="calendar-outline"
//                               size={icon(11)}
//                               color="#9BA8C0"
//                             />

//                             <ThemedText
//                               style={
//                                 resource.itemDate
//                               }
//                             >
//                               {new Date(item.downloadedAt).toLocaleDateString()}
//                             </ThemedText>
//                           </ThemedView>
//                         </ThemedView>
//                       </ThemedView>
//                     </ThemedView>

//                     {/* ========================================
//                         OPEN RESOURCE BUTTON
//                     ========================================= */}

//                     <TouchableOpacity
//                       style={
//                         resource.downloadBtn
//                       }
//                       activeOpacity={0.75}
//                       onPress={() =>
//                         handleOpenResource(
//                           item
//                         )
//                       }
//                     >
//                       <Feather
//                         name="file-text"
//                         size={icon(15)}
//                         color="#35408E"
//                       />
//                     </TouchableOpacity>
//                   </ThemedView>

//                   {/* ========================================
//                       DIVIDER
//                   ========================================= */}

//                   {index <
//                     filteredResources.length -
//                       1 && (
//                     <ThemedView
//                       style={
//                         resource.rowDivider
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

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import { viewResourceStyles } from "@/styles/profile/profile-components-styles";
import { profileStyles } from "@/styles/profile/profile-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { DownloadedResource, getDownloadedResources } from "@/utils/resource-downloaded";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import { useFocusEffect } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useCallback, useMemo, useState } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";

type ResourceCategory = "Reports" | "Educational Materials";
const FILTERS: { label: string; value: "All" | ResourceCategory }[] = [
  { label: "All", value: "All" },
  { label: "Reports", value: "Reports" },
  { label: "Educational Materials", value: "Educational Materials" },
];

export default function ViewResources() {
  const { user } = useAuth();
  const r = useResponsive();
  const styles = useMemo(() => profileStyles(r), [r]);
  const resource = useMemo(() => viewResourceStyles(r), [r]);
  const [resources, setResources] = useState<DownloadedResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"All" | ResourceCategory>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const loadResources = useCallback(async () => {
    try {
      setLoading(true);
      if (!user?.user_id) {
        setResources([]);
        return;
      }
      setResources(await getDownloadedResources(user.user_id));
    } catch (error) {
      console.error("[VIEW RESOURCES] Failed to load:", error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  }, [user?.user_id]);

  useFocusEffect(useCallback(() => {
    loadResources();
  }, [loadResources]));

  const filteredResources = useMemo(() => {
    const filtered = activeFilter === "All" ? resources : resources.filter(item => item.category === activeFilter);
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.downloadedAt).getTime();
      const dateB = new Date(b.downloadedAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [resources, activeFilter, sortOrder]);

  const handleOpenResource = async (item: DownloadedResource) => {
  try {
    if (!item.fileUri) {
      Alert.alert(
        "File Not Found",
        "The downloaded file could not be found on this device."
      );
      return;
    }

    console.log("[VIEW RESOURCES] Opening:", item.fileUri);

    const canShare = await Sharing.isAvailableAsync();

    if (!canShare) {
      Alert.alert(
        "Unable to Open",
        "Opening downloaded files is not available on this device."
      );
      return;
    }

    let shareUri = item.fileUri;

    /**
     * Android may return a content:// URI.
     * expo-sharing requires a file:// URI.
     *
     * Copy the content URI into the app's local storage first.
     */
    if (item.fileUri.startsWith("content://")) {
      const safeFileName =
        item.title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".pdf";

      const localUri = `${FileSystem.cacheDirectory}${safeFileName}`;

      console.log(
        "[VIEW RESOURCES] Converting content URI to local file:",
        localUri
      );

      await FileSystem.copyAsync({
        from: item.fileUri,
        to: localUri,
      });

      shareUri = localUri;
    }

    /**
     * Make sure the resulting file actually exists.
     */
    const fileInfo = await FileSystem.getInfoAsync(shareUri);

    if (!fileInfo.exists) {
      Alert.alert(
        "File Not Found",
        "The downloaded resource is no longer available on this device."
      );
      return;
    }

    console.log("[VIEW RESOURCES] Sharing:", shareUri);

    await Sharing.shareAsync(shareUri, {
      mimeType: "application/pdf",
      dialogTitle: item.title,
      UTI: "com.adobe.pdf",
    });
  } catch (error) {
    console.error("[VIEW RESOURCES] Failed to open:", error);

    Alert.alert(
      "Unable to Open",
      "The downloaded resource could not be opened."
    );
  }
};


  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <ThemedView style={resource.headerBlock}>
        <ThemedText style={resource.pageTitle}>Downloaded Resources</ThemedText>
        <ThemedText style={resource.pageSubtitle}>Reports and educational materials you've saved for offline access.</ThemedText>
      </ThemedView>

      <ThemedView style={resource.filterSortRow}>
        <ThemedView style={resource.filterRow}>
          {FILTERS.map(filter => {
            const active = activeFilter === filter.value;
            return (
              <TouchableOpacity key={filter.value} activeOpacity={0.75} onPress={() => setActiveFilter(filter.value)} style={[resource.filterChip, active && resource.filterChipActive]}>
                <ThemedText style={[resource.filterChipText, active && resource.filterChipTextActive]}>{filter.label}</ThemedText>
              </TouchableOpacity>
            );
          })}
        </ThemedView>

        <TouchableOpacity activeOpacity={0.75} onPress={() => setSortOrder(current => current === "newest" ? "oldest" : "newest")} style={resource.sortBtn}>
          <Feather name={sortOrder === "newest" ? "arrow-down" : "arrow-up"} size={icon(14)} color="#ffffff" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={resource.listCard}>
        {loading ? (
          <ThemedView style={resource.emptyState}>
            <Feather name="loader" size={icon(28)} color="#B7C0D6" />
            <ThemedText style={resource.emptyText}>Loading downloaded resources...</ThemedText>
          </ThemedView>
        ) : filteredResources.length === 0 ? (
          <ThemedView style={resource.emptyState}>
            <Feather name="inbox" size={icon(28)} color="#B7C0D6" />
            <ThemedText style={resource.emptyText}>
              {activeFilter === "All" ? "No downloaded resources yet." : "No resources found in this category."}
            </ThemedText>
          </ThemedView>
        ) : (
          filteredResources.map((item, index) => (
            <ThemedView key={item.id}>
              <ThemedView style={resource.row}>
                <ThemedView style={resource.contentContainer}>
                  <ThemedView style={[resource.iconBubble, item.category === "Reports" ? resource.iconBubbleReport : resource.iconBubbleEdu]}>
                    <Feather name={item.category === "Reports" ? "bar-chart-2" : "book"} size={icon(18)} color={item.category === "Reports" ? "#35408E" : "#FFB633"} />
                  </ThemedView>

                  <ThemedView style={resource.textCol}>
                    <ThemedText style={resource.itemTitle} numberOfLines={1}>{item.title}</ThemedText>
                    <ThemedText style={resource.itemDesc} numberOfLines={2}>{item.description}</ThemedText>

                    <ThemedView style={resource.metaRow}>
                      <ThemedView style={resource.categoryPill}>
                        <ThemedText style={resource.categoryPillText}>{item.category}</ThemedText>
                      </ThemedView>

                      <ThemedView style={resource.dateRow}>
                        <Ionicons name="calendar-outline" size={icon(11)} color="#9BA8C0" />
                        <ThemedText style={resource.itemDate}>{new Date(item.downloadedAt).toLocaleDateString()}</ThemedText>
                      </ThemedView>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>

                <TouchableOpacity style={resource.downloadBtn} activeOpacity={0.75} onPress={() => handleOpenResource(item)}>
                  <Feather name="file-text" size={icon(15)} color="#35408E" />
                </TouchableOpacity>
              </ThemedView>

              {index < filteredResources.length - 1 && <ThemedView style={resource.rowDivider} />}
            </ThemedView>
          ))
        )}
      </ThemedView>
    </ScrollView>
  );
}
