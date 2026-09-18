// import { MaterialType } from "@/components/dropdown/material-dropdown";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { resourcesCardStyles } from "@/styles/resources/resources-components-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import { downloadResourcePDF } from "@/utils/download-resource";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useAuth } from "@/lib/auth/AuthProvider";
// import { router } from "expo-router";
// import { useMemo } from "react";
// import {
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";

// export type ResourceAttachment = {
//   education_attachment_id: string;
//   type: string;
//   file_name: string;
//   file_url: string;
//   mime_type?: string | null;
//   file_size?: number | null;
// };

// export type ResourceItem = {
//   id: string;
//   icon: string;
//   title: string;
//   label: string;
//   description: string;
//   content: string;
//   materialType: MaterialType;
//   labelBg: string;
//   labelColor: string;
//   accentColor: string;
//   externalLink?: string | null;
//   attachments?: ResourceAttachment[];
// };

// type ResourcesCardProps = {
//   data: ResourceItem[];
// };

// export function ResourcesCard({
//   data,
// }: ResourcesCardProps) {
//   const r = useResponsive();

//   const styles = useMemo(
//     () => resourcesCardStyles(r),
//     [r]
//   );

//   if (!Array.isArray(data) || data.length === 0) {
//     return (
//       <ThemedView
//         style={{
//           paddingVertical: 30,
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <ThemedText>
//           No educational resources available.
//         </ThemedText>
//       </ThemedView>
//     );
//   }

//   return (
//     <ScrollView
//       contentContainerStyle={styles.scrollContainer}
//       scrollEnabled={false}
//       showsVerticalScrollIndicator={false}
//     >
//       {data.map((item, index) => {
//         if (!item) {
//           return null;
//         }

//         const itemId = item.id || `resource-${index}`;
//         const title = item.title || "Untitled Resource";
//         const label = item.label || "Educational Resource";
//         const description =
//           item.description || "No description available.";

//         const materialType =
//           item.materialType || "ARTICLE";

//         const accentColor =
//           item.accentColor || "#35408E";

//         const labelBg =
//           item.labelBg || "#EEF0FF";

//         const labelColor =
//           item.labelColor || "#35408E";

//         const iconName =
//           item.icon || "book-open-page-variant";

//         const handleReadMore = () => {
//           router.push({
//             pathname:
//               "/drawer/tabs/learn/resources-details",
//             params: {
//               id: String(itemId),
//             },
//           });
//         };

//         const handleDownload = async () => {
//           try {
//             const downloadedFile =
//               await downloadResourcePDF({
//                 ...item,
//                 category:
//                   item.label === "Reports"
//                     ? "Reports"
//                     : "Educational Materials",
//               });

//             if (downloadedFile) {
//               console.log(
//                 "[RESOURCE] Successfully downloaded:",
//                 item.title
//               );
//             }
//           } catch (error) {
//             console.error(
//               "[RESOURCE] Download failed:",
//               error
//             );
//           }
//         };

//         return (
//           <ThemedView
//             key={itemId}
//             style={styles.cardShadow}
//           >
//             <ThemedView style={styles.card}>
//               <ThemedView
//                 style={[
//                   styles.cardAccentBar,
//                   {
//                     backgroundColor: accentColor,
//                   },
//                 ]}
//               />

//               <ThemedView style={styles.cardContent}>
//                 <ThemedView style={styles.headerRow}>
//                   <ThemedView
//                     style={[
//                       styles.iconContainer,
//                       {
//                         backgroundColor: labelBg,
//                       },
//                     ]}
//                   >
//                     <MaterialCommunityIcons
//                       name={iconName as any}
//                       size={icon(22)}
//                       color={accentColor}
//                     />
//                   </ThemedView>

//                   <ThemedView
//                     style={[
//                       styles.cardlabelPill,
//                       {
//                         backgroundColor: labelBg,
//                       },
//                     ]}
//                   >
//                     <ThemedText
//                       style={[
//                         styles.cardlabelText,
//                         {
//                           color: labelColor,
//                         },
//                       ]}
//                     >
//                       {label} | {materialType}
//                     </ThemedText>
//                   </ThemedView>
//                 </ThemedView>

//                 <ThemedText style={styles.cardtitle}>
//                   {title}
//                 </ThemedText>

//                 <ThemedText 
//                   style={styles.carddescription}
//                   numberOfLines={2}
//                   ellipsizeMode="tail">
//                   {description}
//                 </ThemedText>

//                 <ThemedView style={styles.carddivider} />

//                 <ThemedView style={styles.cardbuttonRow}>
//                   <TouchableOpacity
//                     style={[
//                       styles.readMoreBtn,
//                       {
//                         backgroundColor: accentColor,
//                       },
//                     ]}
//                     activeOpacity={0.75}
//                     onPress={handleReadMore}
//                   >
//                     <ThemedText style={styles.readMoreText}>
//                       Read More
//                     </ThemedText>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.downloadBtn}
//                     activeOpacity={0.75}
//                     onPress={handleDownload}
//                   >
//                     <MaterialCommunityIcons
//                       name="download-outline"
//                       size={icon(16)}
//                       color="#35408E"
//                     />

//                     <ThemedText style={styles.downloadText}>
//                       Download
//                     </ThemedText>
//                   </TouchableOpacity>
//                 </ThemedView>
//               </ThemedView>
//             </ThemedView>
//           </ThemedView>
//         );
//       })}
//     </ScrollView>
//   );
// }


import { MaterialType } from "@/components/dropdown/material-dropdown";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getEducationalResourceById } from "@/lib/services/educational-resources";
import { resourcesCardStyles } from "@/styles/resources/resources-components-styles";
import { icon, useResponsive } from "@/styles/responsive";
import {
  downloadResourcePDF,
  type DownloadResource
} from "@/utils/download-resource";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";

export type ResourceAttachment = {
  education_attachment_id: string;
  type: string;
  file_name: string;
  file_url: string;
  mime_type?: string | null;
  file_size?: number | null;
  order_index?: number;
};

export type ResourceItem = {
  id: string;
  icon: string;
  title: string;
  label: string;
  description: string;
  content: string;
  materialType: MaterialType;
  labelBg: string;
  labelColor: string;
  accentColor: string;
  externalLink?: string | null;
  attachments?: ResourceAttachment[];
};

export type ResourcesCardProps = { data: ResourceItem[] };

export function ResourcesCard({ data }: ResourcesCardProps) {
  const r = useResponsive();
  const styles = useMemo(() => resourcesCardStyles(r), [r]);
  const { user } = useAuth();

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <ThemedView style={{ paddingVertical: 30, alignItems: "center", justifyContent: "center" }}>
        <ThemedText>No educational resources available.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} scrollEnabled={false} showsVerticalScrollIndicator={false}>
      {data.map((item, index) => {
        if (!item) return null;

        const itemId = item.id || `resource-${index}`;
        const title = item.title || "Untitled Resource";
        const label = item.label || "Educational Resource";
        const description = item.description || "No description available.";
        const materialType = item.materialType || "ARTICLE";
        const accentColor = item.accentColor || "#35408E";
        const labelBg = item.labelBg || "#EEF0FF";
        const labelColor = item.labelColor || "#35408E";
        const iconName = item.icon || "book-open-page-variant";

        const handleReadMore = () => {
          router.push({
            pathname: "/drawer/tabs/learn/resources-details",
            params: { id: String(itemId) },
          });
        };

        const handleDownload = async () => {
          try {
            if (!user?.user_id) {
              Alert.alert("Not Signed In", "Please sign in before downloading a resource.");
              return;
            }

            console.log("[RESOURCE CARD] Loading full resource:", itemId);
            const apiResource = await getEducationalResourceById(String(itemId));

            const resourceType = String(apiResource?.type || item.materialType || "").trim().toUpperCase();
            const isCatalogue = resourceType === "CATALOGUE" || resourceType === "CATALOG";
            const isExternalLink = ["EXTERNAL_LINK", "EXTERNAL LINK", "EXTERNAL-LINK"].includes(resourceType);
            const externalLink = apiResource?.external_link?.trim() || item.externalLink?.trim() || "";

            console.log("[RESOURCE CARD] Type:", resourceType);
            console.log("[RESOURCE CARD] Is catalogue:", isCatalogue);
            console.log("[RESOURCE CARD] Is external link:", isExternalLink);
            console.log("[RESOURCE CARD] External link:", externalLink);
            console.log("[RESOURCE CARD] Attachments:", apiResource?.attachments?.length || 0);

            const downloadResource: DownloadResource = {
  id: String(itemId),

  title:
    apiResource?.title ||
    item.title ||
    title,

  description:
    item.description ||
    description,

  label:
    item.label ||
    label,

  materialType:
    String(
      apiResource?.type ||
        item.materialType ||
        materialType
    ),

  content:
    isCatalogue || isExternalLink
      ? ""
      : apiResource?.content ||
        item.content ||
        "",

  externalLink:
    apiResource?.external_link?.trim() ||
    item.externalLink?.trim() ||
    null,

  attachments:
    apiResource?.attachments ||
    item.attachments ||
    [],

  updatedAt:
    apiResource?.updated_at ||
    apiResource?.published_at ||
    apiResource?.created_at ||
    null,

  category:
    label === "Reports"
      ? "Reports"
      : "Educational Materials",
};


            console.log("[RESOURCE CARD] Download payload:", {
              id: downloadResource.id,
              type: downloadResource.materialType,
              externalLink: downloadResource.externalLink,
              attachments: downloadResource.attachments?.length || 0,
            });

            const downloadedFile = await downloadResourcePDF(downloadResource, user.user_id);

            if (downloadedFile) {
              console.log("[RESOURCE CARD] Successfully downloaded:", downloadedFile);
            }
          } catch (error) {
            console.error("[RESOURCE CARD] Download failed:", error);
            Alert.alert(
              "Download Failed",
              error instanceof Error ? error.message : "Unable to download this resource."
            );
          }
        };

        return (
          <ThemedView key={itemId} style={styles.cardShadow}>
            <ThemedView style={styles.card}>
              <ThemedView style={[styles.cardAccentBar, { backgroundColor: accentColor }]} />

              <ThemedView style={styles.cardContent}>
                <ThemedView style={styles.headerRow}>
                  <ThemedView style={[styles.iconContainer, { backgroundColor: labelBg }]}>
                    <MaterialCommunityIcons name={iconName as any} size={icon(22)} color={accentColor} />
                  </ThemedView>

                  <ThemedView style={[styles.cardlabelPill, { backgroundColor: labelBg }]}>
                    <ThemedText style={[styles.cardlabelText, { color: labelColor }]}>
                      {label} | {materialType}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>

                <ThemedText style={styles.cardtitle}>{title}</ThemedText>

                <ThemedText style={styles.carddescription} numberOfLines={2} ellipsizeMode="tail">
                  {description}
                </ThemedText>

                <ThemedView style={styles.carddivider} />

                <ThemedView style={styles.cardbuttonRow}>
                  <TouchableOpacity
                    style={[styles.readMoreBtn, { backgroundColor: accentColor }]}
                    activeOpacity={0.75}
                    onPress={handleReadMore}
                  >
                    <ThemedText style={styles.readMoreText}>Read More</ThemedText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.downloadBtn}
                    activeOpacity={0.75}
                    onPress={handleDownload}
                    disabled={!user?.user_id}
                  >
                    <MaterialCommunityIcons name="download-outline" size={icon(16)} color="#35408E" />
                    <ThemedText style={styles.downloadText}>Download</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        );
      })}
    </ScrollView>
  );
}
