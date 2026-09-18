// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { profileStyles } from "@/styles/profile/profile-styles";
// import { icon, useResponsive } from "@/styles/responsive";

// import { DownloadedResource, getDownloadedResources } from "@/utils/resource-downloaded";

// import { Feather, Ionicons } from "@expo/vector-icons";
// import { router, useFocusEffect } from "expo-router";
// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import {
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";

// export default function ResourcesDownload() {
//   const r = useResponsive();

//   const styles = useMemo(
//     () => profileStyles(r),
//     [r]
//   );

//   const [
//     resources,
//     setResources,
//   ] = useState<DownloadedResource[]>([]);

//   const [
//     loading,
//     setLoading,
//   ] = useState(true);

//   const loadDownloadedResources =
//     useCallback(async () => {
//       try {
//         setLoading(true);

//         const downloaded =
//           await getDownloadedResources();

//         setResources(downloaded.slice(0, 3));
//       } catch (error) {
//         console.error(
//           "[RESOURCE DOWNLOAD] Failed to load:",
//           error
//         );
//       } finally {
//         setLoading(false);
//       }
//     }, []);

//   useEffect(() => {
//     loadDownloadedResources();
//   }, [loadDownloadedResources]);

//   /*
//    * Reload whenever the user comes back to the
//    * profile page after downloading a resource.
//    */
//   useFocusEffect(
//     useCallback(() => {
//       loadDownloadedResources();
//     }, [loadDownloadedResources])
//   );

//   return (
//     <ThemedView style={styles.drCard}>
//       {/* Header */}
//       <ThemedView style={styles.drHeader}>
//         <ThemedView style={styles.drHeaderLeft}>
//           <ThemedText style={styles.drSectionTitle}>
//             Downloaded Resources
//           </ThemedText>
//         </ThemedView>

//         <TouchableOpacity
//           activeOpacity={0.7}
//           onPress={() =>
//             router.push(
//               "/drawer/tabs/profiles/view-resources"
//             )
//           }
//         >
//           <ThemedText style={styles.drViewAll}>
//             View All
//           </ThemedText>
//         </TouchableOpacity>
//       </ThemedView>

//       <ThemedView style={styles.drDivider} />

//       {/* List */}
//       <ThemedView style={styles.drList}>
//         {loading ? (
//           <ThemedView
//             style={{
//               paddingVertical: 24,
//               alignItems: "center",
//             }}
//           >
//             <ActivityIndicator
//               size="small"
//               color="#35408E"
//             />
//           </ThemedView>
//         ) : resources.length === 0 ? (
//           <ThemedView
//             style={{
//               paddingVertical: 24,
//               alignItems: "center",
//             }}
//           >
//             <Feather
//               name="inbox"
//               size={icon(24)}
//               color="#B7C0D6"
//             />

//             <ThemedText
//               style={{
//                 marginTop: 8,
//                 color: "#9BA8C0",
//               }}
//             >
//               No downloaded resources yet.
//             </ThemedText>
//           </ThemedView>
//         ) : (
//           resources.map((item, index) => (
//             <ThemedView key={item.id}>
//               <TouchableOpacity
//                 activeOpacity={0.75}
//                 onPress={() => {
//                   router.push({
//                     pathname:
//                       "/drawer/tabs/profiles/view-resources",
//                   });
//                 }}
//               >
//                 <ThemedView style={styles.drRow}>
//                   {/* LEFT SIDE */}
//                   <ThemedView
//                     style={styles.drContentContainer}
//                   >
//                     <ThemedView
//                       style={styles.drIconBubble}
//                     >
//                       <Feather
//                         name={
//                           item.category === "Reports"
//                             ? "bar-chart-2"
//                             : "book"
//                         }
//                         size={icon(20)}
//                         color={
//                           item.category === "Reports"
//                             ? "#35408E"
//                             : "#FFB633"
//                         }
//                       />
//                     </ThemedView>

//                     <ThemedView style={styles.drTextCol}>
//                       <ThemedText
//                         style={styles.drItemTitle}
//                         numberOfLines={1}
//                       >
//                         {item.title}
//                       </ThemedText>

//                       <ThemedText
//                         style={styles.drItemDesc}
//                         numberOfLines={1}
//                       >
//                         {item.description}
//                       </ThemedText>

//                       <ThemedView
//                         style={styles.drDateRow}
//                       >
//                         <Ionicons
//                           name="calendar-outline"
//                           size={icon(11)}
//                           color="#9BA8C0"
//                         />

//                         <ThemedText
//                           style={styles.drItemDate}
//                         >
//                           {new Date(
//                             item.downloadedAt
//                           ).toLocaleDateString(
//                             "en-US",
//                             {
//                               month: "short",
//                               day: "numeric",
//                               year: "numeric",
//                             }
//                           )}
//                         </ThemedText>
//                       </ThemedView>
//                     </ThemedView>
//                   </ThemedView>

//                   <Feather
//                     name="chevron-right"
//                     size={icon(17)}
//                     color="#9BA8C0"
//                   />
//                 </ThemedView>
//               </TouchableOpacity>

//               {index < resources.length - 1 && (
//                 <ThemedView
//                   style={styles.drRowDivider}
//                 />
//               )}
//             </ThemedView>
//           ))
//         )}
//       </ThemedView>
//     </ThemedView>
//   );
// }

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import { profileStyles } from "@/styles/profile/profile-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { DownloadedResource, getDownloadedResources } from "@/utils/resource-downloaded";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";

export default function ResourcesDownload() {
  const { user } = useAuth();
  const r = useResponsive();
  const styles = useMemo(() => profileStyles(r), [r]);
  const [resources, setResources] = useState<DownloadedResource[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDownloadedResources = useCallback(async () => {
    try {
      setLoading(true);
      if (!user?.user_id) {
        setResources([]);
        return;
      }
      const downloaded = await getDownloadedResources(user.user_id);
      setResources(downloaded.slice(0, 3));
    } catch (error) {
      console.error("[RESOURCE DOWNLOAD] Failed to load:", error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  }, [user?.user_id]);

  useFocusEffect(useCallback(() => {
    loadDownloadedResources();
  }, [loadDownloadedResources]));

  return (
    <ThemedView style={styles.drCard}>
      <ThemedView style={styles.drHeader}>
        <ThemedView style={styles.drHeaderLeft}>
          <ThemedText style={styles.drSectionTitle}>Downloaded Resources</ThemedText>
        </ThemedView>

        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/drawer/tabs/profiles/view-resources")}>
          <ThemedText style={styles.drViewAll}>View All</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.drDivider} />

      <ThemedView style={styles.drList}>
        {loading ? (
          <ThemedView style={{ paddingVertical: 24, alignItems: "center" }}>
            <ActivityIndicator size="small" color="#35408E" />
          </ThemedView>
        ) : resources.length === 0 ? (
          <ThemedView style={{ paddingVertical: 24, alignItems: "center" }}>
            <Feather name="inbox" size={icon(24)} color="#B7C0D6" />
            <ThemedText style={{ marginTop: 8, color: "#9BA8C0" }}>No downloaded resources yet.</ThemedText>
          </ThemedView>
        ) : (
          resources.map((item, index) => (
            <ThemedView key={item.id}>
              <TouchableOpacity activeOpacity={0.75} onPress={() => router.push("/drawer/tabs/profiles/view-resources")}>
                <ThemedView style={styles.drRow}>
                  <ThemedView style={styles.drContentContainer}>
                    <ThemedView style={styles.drIconBubble}>
                      <Feather
                        name={item.category === "Reports" ? "bar-chart-2" : "book"}
                        size={icon(20)}
                        color={item.category === "Reports" ? "#35408E" : "#FFB633"}
                      />
                    </ThemedView>

                    <ThemedView style={styles.drTextCol}>
                      <ThemedText style={styles.drItemTitle} numberOfLines={1}>{item.title}</ThemedText>
                      <ThemedText style={styles.drItemDesc} numberOfLines={1}>{item.description}</ThemedText>

                      <ThemedView style={styles.drDateRow}>
                        <Ionicons name="calendar-outline" size={icon(11)} color="#9BA8C0" />
                        <ThemedText style={styles.drItemDate}>
                          {new Date(item.downloadedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </ThemedText>
                      </ThemedView>
                    </ThemedView>
                  </ThemedView>

                  <Feather name="chevron-right" size={icon(17)} color="#9BA8C0" />
                </ThemedView>
              </TouchableOpacity>

              {index < resources.length - 1 && <ThemedView style={styles.drRowDivider} />}
            </ThemedView>
          ))
        )}
      </ThemedView>
    </ThemedView>
  );
}
