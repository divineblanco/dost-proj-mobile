// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { mapEducationResource } from "@/lib/services/educational-resource-mapper";
// import { getEducationalResourceById } from "@/lib/services/educational-resources";
// import { resourceDetailsStyles } from "@/styles/resources/resources-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import { downloadResourcePDF } from "@/utils/download-resource";
// import { Ionicons } from "@expo/vector-icons";
// import { useQuery } from "@tanstack/react-query";
// import { useLocalSearchParams } from "expo-router";
// import React, { useMemo } from "react";
// import { ActivityIndicator, ScrollView, Share, TouchableOpacity, useWindowDimensions } from "react-native";
// import RenderHTML from "react-native-render-html";

// export default function ResourceDetails() {
//   const params = useLocalSearchParams<{ id?: string | string[] }>();
//   const resourceId = Array.isArray(params.id) ? params.id[0] : params.id;
//   const r = useResponsive();
//   const styles = useMemo(() => resourceDetailsStyles(r), [r]);
//   const { width } = useWindowDimensions();

//   const { data: apiResource, isLoading, isError, error, refetch } = useQuery({
//     queryKey: ["educational-resource", resourceId],
//     queryFn: async () => {
//       if (!resourceId) throw new Error("Educational resource ID is missing.");
//       return getEducationalResourceById(resourceId);
//     },
//     enabled: Boolean(resourceId),
//     staleTime: 5 * 60 * 1000,
//   });

//   const resource = useMemo(() => {
//     if (!apiResource) return null;
//     try {
//       return mapEducationResource(apiResource);
//     } catch (mappingError) {
//       console.error("[RESOURCE DETAILS] Mapping failed:", mappingError);
//       return null;
//     }
//   }, [apiResource]);

//   if (isLoading) {
//     return (
//       <ThemedView style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" }}>
//         <ActivityIndicator size="large" color="#35408E" />
//         <ThemedText style={{ marginTop: 12, color: "#666666" }}>Loading resource...</ThemedText>
//       </ThemedView>
//     );
//   }

//   if (isError || !apiResource || !resource) {
//     return (
//       <ThemedView style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", padding: 24 }}>
//         <Ionicons name="document-text-outline" size={icon(48)} color="#9BA8C0" />
//         <ThemedText style={{ marginTop: 14, textAlign: "center", fontSize: 17, fontWeight: "600" }}>
//           Educational resource not found
//         </ThemedText>
//         <ThemedText style={{ marginTop: 8, textAlign: "center", color: "#888888" }}>
//           We could not load this educational resource.
//         </ThemedText>
//         {error instanceof Error && (
//           <ThemedText style={{ marginTop: 8, textAlign: "center", color: "#C62828", fontSize: 12 }}>
//             {error.message}
//           </ThemedText>
//         )}
//         <TouchableOpacity onPress={() => refetch()} activeOpacity={0.7} style={{ marginTop: 18 }}>
//           <ThemedText style={{ color: "#35408E", fontWeight: "700" }}>Try Again</ThemedText>
//         </TouchableOpacity>
//       </ThemedView>
//     );
//   }

//   const onShare = async () => {
//     try {
//       await Share.share({
//         title: resource.title,
//         message: `${resource.title}\n\n${resource.description || ""}\n\nRead more about HIV educational resources in the AdvocAid PH app.`,
//       });
//     } catch (shareError) {
//       console.error("[RESOURCE SHARE ERROR]", shareError);
//     }
//   };

//   const updatedAt = apiResource.updated_at ?? apiResource.published_at ?? apiResource.created_at ?? null;
//   const formattedDate = updatedAt
//     ? new Date(updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
//     : "N/A";

//   const content = resource.content?.trim() || resource.description?.trim() || "No content available.";
//   const accentColor = resource.accentColor || "#35408E";
//   const labelBg = resource.labelBg || "#EEF0FF";
//   const labelColor = resource.labelColor || "#35408E";

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
//       <ThemedView style={[styles.accentBar, { backgroundColor: accentColor }]} />

//       <ThemedView style={styles.pillContainer}>
//         {resource.label && (
//           <ThemedView style={[styles.labelPill, { backgroundColor: labelBg }]}>
//             <ThemedText style={[styles.labelText, { color: labelColor }]}>{resource.label}</ThemedText>
//           </ThemedView>
//         )}
//         {resource.materialType && (
//           <ThemedView style={[styles.labelPill, { backgroundColor: labelBg }]}>
//             <ThemedText style={[styles.labelText, { color: labelColor }]}>{resource.materialType}</ThemedText>
//           </ThemedView>
//         )}
//       </ThemedView>

//       <ThemedText style={styles.title}>{resource.title}</ThemedText>

//       {resource.description && (
//         <ThemedText style={styles.description}>{resource.description}</ThemedText>
//       )}

//       <ThemedView style={styles.divider} />

      
//       <ThemedView >
//         <RenderHTML
//           contentWidth={width - 40}
//           source={{ html: content }}
//           tagsStyles={{
//             body: { color: "#333333", fontSize: 16, lineHeight: 26 },
//             p: { color: "#333333", fontSize: 16, lineHeight: 26, marginBottom: 12 },
//             span: { color: "#333333" },
//             strong: { fontWeight: "700", color: "#222222" },
//             b: { fontWeight: "700", color: "#222222" },
//             em: { fontStyle: "italic" },
//             i: { fontStyle: "italic" },
//             h1: { fontSize: 24, fontWeight: "700", color: "#222222", marginBottom: 12 },
//             h2: { fontSize: 21, fontWeight: "700", color: "#222222", marginBottom: 10 },
//             h3: { fontSize: 18, fontWeight: "700", color: "#222222", marginBottom: 8 },
//             h4: { fontSize: 17, fontWeight: "700", color: "#222222", marginBottom: 8 },
//             ul: { marginBottom: 12 },
//             ol: { marginBottom: 12 },
//             li: { color: "#333333", fontSize: 16, lineHeight: 26, marginBottom: 6 },
//             a: { color: "#35408E", textDecorationLine: "underline" },
//             blockquote: { borderLeftWidth: 4, borderLeftColor: "#35408E", paddingLeft: 12, marginVertical: 10, color: "#555555" },
//           }}
//         />
//       </ThemedView>

//       <ThemedView style={styles.updateRow}>
//         <Ionicons name="time-outline" size={icon(13)} color="#9BA8C0" />
//         <ThemedText style={styles.updateText}>Last updated: {formattedDate}</ThemedText>
//       </ThemedView>

//       <ThemedView style={styles.buttonRow}>
//         <TouchableOpacity style={styles.actionBtn} activeOpacity={0.75} onPress={() => downloadResourcePDF(resource)}>
//           <Ionicons name="download-outline" size={icon(18)} color="#35408E" />
//           <ThemedText style={styles.actionBtnText}>Download</ThemedText>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionBtn} activeOpacity={0.75} onPress={onShare}>
//           <Ionicons name="share-social-outline" size={icon(18)} color="#35408E" />
//           <ThemedText style={styles.actionBtnText}>Share</ThemedText>
//         </TouchableOpacity>
//       </ThemedView>
//     </ScrollView>
//   );
// }

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import CatalogueFullscreenViewer from "@/components/viewer/catalogue-viewer";
import { useAuth } from "@/lib/auth/AuthProvider";
import { mapEducationResource } from "@/lib/services/educational-resource-mapper";
import { getEducationalResourceById } from "@/lib/services/educational-resources";
import { resourceDetailsStyles } from "@/styles/resources/resources-styles";
import {
  font,
  icon,
  radius,
  scale,
  useResponsive,
  verticalScale,
} from "@/styles/responsive";
import { downloadResourcePDF, shareResourcePDF } from "@/utils/download-resource";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions
} from "react-native";
import RenderHTML, {
  MixedStyleDeclaration,
} from "react-native-render-html";

const tagsStyles: Record<string, MixedStyleDeclaration> = {
  body: {
    color: "#333",
    fontSize: 16,
    lineHeight: 26,
  },
  p: {
    color: "#333",
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 12,
  },
  span: {
    color: "#333",
  },
  strong: {
    fontWeight: "700",
    color: "#222",
  },
  b: {
    fontWeight: "700",
    color: "#222",
  },
  em: {
    fontStyle: "italic",
  },
  i: {
    fontStyle: "italic",
  },
  h1: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginBottom: 12,
  },
  h2: {
    fontSize: 21,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
  },
  h3: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  h4: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  ul: {
    marginBottom: 12,
  },
  ol: {
    marginBottom: 12,
  },
  li: {
    color: "#333",
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 6,
  },
  a: {
    color: "#35408E",
    textDecorationLine: "underline",
  },
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: "#35408E",
    paddingLeft: 12,
    marginVertical: 10,
    color: "#555",
  },
};

export default function ResourceDetails() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{
    id?: string | string[];
  }>();

  const resourceId = Array.isArray(id) ? id[0] : id;
  const responsive = useResponsive();
  const styles = useMemo(
    () => resourceDetailsStyles(responsive),
    [responsive]
  );

  const { width } = useWindowDimensions();

  const [currentPage, setCurrentPage] = useState(0);
  const [fullscreenVisible, setFullscreenVisible] =
    useState(false);

  const {
    data: apiResource,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["educational-resource", resourceId],
    queryFn: async () => {
      if (!resourceId) {
        throw new Error(
          "Educational resource ID is missing."
        );
      }

      return getEducationalResourceById(resourceId);
    },
    enabled: Boolean(resourceId),
    staleTime: 5 * 60 * 1000,
  });

  const resource = useMemo(() => {
    if (!apiResource) return null;

    try {
      return mapEducationResource(apiResource);
    } catch (err) {
      console.error(
        "[RESOURCE DETAILS] Mapping failed:",
        err
      );
      return null;
    }
  }, [apiResource]);

  const resourceType = String(
    apiResource?.type ||
      resource?.materialType ||
      ""
  ).toUpperCase();

  const isCatalogue =
    resourceType === "CATALOGUE" ||
    resourceType === "CATALOG";

  const isExternalLink =
    resourceType === "EXTERNAL_LINK" ||
    resourceType === "EXTERNAL LINK" ||
    resourceType === "EXTERNAL-LINK";

  const content = isExternalLink
    ? ""
    : apiResource?.content?.trim() ||
      resource?.content?.trim() ||
      resource?.description?.trim() ||
      "";

  const externalLink =
    apiResource?.external_link?.trim() || "";

  const pages =
    isCatalogue && apiResource?.attachments?.length
      ? [...apiResource.attachments]
          .filter(
            (attachment) =>
              Boolean(attachment.file_url)
          )
          .sort(
            (a, b) =>
              (a.order_index ?? 0) -
              (b.order_index ?? 0)
          )
      : [];

  const safeCurrentPage = pages.length
    ? Math.min(
        currentPage,
        pages.length - 1
      )
    : 0;

  const isFirstPage =
    safeCurrentPage === 0;

  const isLastPage =
    pages.length === 0 ||
    safeCurrentPage ===
      pages.length - 1;

  const goToPreviousPage = () => {
    setCurrentPage((page) =>
      Math.max(page - 1, 0)
    );
  };

  const goToNextPage = () => {
    setCurrentPage((page) =>
      Math.min(
        page + 1,
        Math.max(
          pages.length - 1,
          0
        )
      )
    );
  };

  const openFullscreen = () => {
    setFullscreenVisible(true);
  };

  const closeFullscreen = () => {
    setFullscreenVisible(false);
  };

  if (isLoading) {
    return (
      <ThemedView style={centerStyle}>
        <ActivityIndicator
          size="large"
          color="#35408E"
        />
        <ThemedText style={loadingText}>
          Loading resource...
        </ThemedText>
      </ThemedView>
    );
  }

  if (
    isError ||
    !apiResource ||
    !resource
  ) {
    return (
      <ThemedView style={errorContainer}>
        <Ionicons
          name="document-text-outline"
          size={icon(48)}
          color="#9BA8C0"
        />

        <ThemedText style={errorTitle}>
          Educational resource not found
        </ThemedText>

        <ThemedText style={errorText}>
          We could not load this educational
          resource.
        </ThemedText>

        {error instanceof Error && (
          <ThemedText style={errorMessage}>
            {error.message}
          </ThemedText>
        )}

        <TouchableOpacity
          onPress={() => refetch()}
          activeOpacity={0.7}
          style={retryButton}
        >
          <ThemedText style={retryText}>
            Try Again
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const updatedAt =
    apiResource.updated_at ||
    apiResource.published_at ||
    apiResource.created_at;

  const formattedDate = updatedAt
    ? new Date(
        updatedAt
      ).toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      )
    : "N/A";

  const accentColor =
    resource.accentColor || "#35408E";

  const labelBg =
    resource.labelBg || "#EEF0FF";

  const labelColor =
    resource.labelColor || "#35408E";

//   const onShare = async () => {
//     try {
//       await Share.share({
//         title: resource.title,
//         message: `${resource.title}

// ${resource.description || ""}

// ${
//   isExternalLink && externalLink
//     ? externalLink
//     : ""
// }

// Read more about HIV educational resources in the AdvocAid PH app.`,
//       });
//     } catch (err) {
//       console.error(
//         "[RESOURCE SHARE ERROR]",
//         err
//       );
//     }
//   };

const onShare = async () => {
  try {
    await shareResourcePDF({
      ...resource,

      content: isExternalLink
        ? ""
        : apiResource.content ||
          resource.content ||
          "",

      attachments: isCatalogue
        ? apiResource.attachments || []
        : [],

      updatedAt:
        apiResource.updated_at ||
        apiResource.published_at ||
        apiResource.created_at,

      externalLink:
        isExternalLink
          ? externalLink
          : "",

      category:
        resource.label === "Reports"
          ? "Reports"
          : "Educational Materials",
    });
  } catch (error) {
    console.error(
      "[RESOURCE SHARE ERROR]",
      error
    );

    Alert.alert(
      "Share Failed",
      error instanceof Error
        ? error.message
        : "Unable to share this resource."
    );
  }
};


  const openExternalLink = async () => {
    if (!externalLink) {
      Alert.alert(
        "Link Unavailable",
        "No external link is available for this resource."
      );
      return;
    }

    try {
      const supported =
        await Linking.canOpenURL(
          externalLink
        );

      if (!supported) {
        Alert.alert(
          "Unable to Open Link",
          "This external link cannot be opened on this device."
        );
        return;
      }

      await Linking.openURL(
        externalLink
      );
    } catch (err) {
      console.error(
        "[RESOURCE EXTERNAL LINK ERROR]",
        err
      );

      Alert.alert(
        "Unable to Open Link",
        "We could not open the external link."
      );
    }
  };

  const renderCatalogue = () => {
    if (!pages.length) {
      return (
        <ThemedView
          style={styles.emptyPreview}
        >
          <Ionicons
            name="image-outline"
            size={icon(42)}
            color="#BDBDBD"
          />

          <ThemedText
            style={
              styles.emptyPreviewText
            }
          >
            No catalogue preview
            available.
          </ThemedText>
        </ThemedView>
      );
    }

    const currentAttachment =
      pages[safeCurrentPage];

    return (
      <ThemedView
        style={styles.previewContainer}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={openFullscreen}
        >
          <Image
            source={{
              uri:
                currentAttachment.file_url,
            }}
            style={[
              styles.previewImage,
              {
                width:
                  width - 40,
                height:
                  (width - 40) *
                  1.414,
              },
            ]}
            resizeMode="contain"
            onError={(err) =>
              console.error(
                "[RESOURCE DETAILS] Failed to load catalogue page:",
                err
              )
            }
          />
        </TouchableOpacity>

        <ThemedText
          style={{
            textAlign: "center",
            color: "#9BA8C0",
            fontSize: font(12),
            marginTop: verticalScale(6),
          }}
        >
          Tap page to view fullscreen
        </ThemedText>

        <ThemedView
          style={styles.pageController}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={isFirstPage}
            onPress={
              goToPreviousPage
            }
            style={[
              styles.pageButton,
              isFirstPage &&
                styles.pageButtonDisabled,
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={icon(20)}
              color={
                isFirstPage
                  ? "#BDBDBD"
                  : "#35408E"
              }
            />

            <ThemedText
              style={[
                styles.pageButtonText,
                isFirstPage &&
                  styles.pageButtonTextDisabled,
              ]}
            >
              Previous
            </ThemedText>
          </TouchableOpacity>

          <ThemedText
            style={styles.pageIndicator}
          >
            {safeCurrentPage + 1} /{" "}
            {pages.length}
          </ThemedText>

          <TouchableOpacity
            activeOpacity={0.7}
            disabled={isLastPage}
            onPress={goToNextPage}
            style={[
              styles.pageButton,
              isLastPage &&
                styles.pageButtonDisabled,
            ]}
          >
            <ThemedText
              style={[
                styles.pageButtonText,
                isLastPage &&
                  styles.pageButtonTextDisabled,
              ]}
            >
              Next
            </ThemedText>

            <Ionicons
              name="chevron-forward"
              size={icon(20)}
              color={
                isLastPage
                  ? "#BDBDBD"
                  : "#35408E"
              }
            />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    );
  };

  const renderExternalLink = () => {
    if (!externalLink) {
      return (
        <ThemedView
          style={styles.emptyPreview}
        >
          <Ionicons
            name="link-outline"
            size={icon(42)}
            color="#BDBDBD"
          />

          <ThemedText
            style={
              styles.emptyPreviewText
            }
          >
            No external link
            available.
          </ThemedText>
        </ThemedView>
      );
    }

    return (
      <ThemedView
        style={externalLinkContainer}
      >
        <ThemedView
          style={externalLinkIcon}
        >
          <Ionicons
            name="link-outline"
            size={icon(28)}
            color="#35408E"
          />
        </ThemedView>

        <ThemedText
          style={externalLinkTitle}
        >
          External Resource
        </ThemedText>

        <ThemedText
          style={
            externalLinkDescription
          }
        >
          This resource is available
          on an external website.
        </ThemedText>

        <ThemedText
          style={externalLinkUrl}
          numberOfLines={3}
        >
          {externalLink}
        </ThemedText>

        <TouchableOpacity
          style={externalLinkButton}
          activeOpacity={0.75}
          onPress={
            openExternalLink
          }
        >
          <Ionicons
            name="open-outline"
            size={icon(18)}
            color="#FFFFFF"
          />

          <ThemedText
            style={
              externalLinkButtonText
            }
          >
            Open External Link
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  };

  const renderContent = () => {
    if (isExternalLink) {
      return renderExternalLink();
    }

    if (isCatalogue) {
      return renderCatalogue();
    }

    if (content) {
      return (
        <RenderHTML
          contentWidth={
            width - 40
          }
          source={{
            html: content,
          }}
          tagsStyles={tagsStyles}
        />
      );
    }

    return (
      <ThemedText
        style={styles.noContentText}
      >
        No content available.
      </ThemedText>
    );
  };

  const handleDownload = async () => {
    if (!user?.user_id) {
      Alert.alert(
        "Login Required",
        "You need to be logged in to download this resource."
      );
      return;
    }

    if (
      isExternalLink &&
      !externalLink
    ) {
      Alert.alert(
        "Download Failed",
        "This external-link resource does not have an external URL."
      );
      return;
    }

    try {
      console.log(
        "[RESOURCE DOWNLOAD] Starting:",
        resource.title
      );

      console.log(
        "[RESOURCE DOWNLOAD] Type:",
        resource.materialType
      );

      console.log(
        "[RESOURCE DOWNLOAD] External link:",
        externalLink
      );

      console.log(
        "[RESOURCE DOWNLOAD] Attachments:",
        apiResource.attachments
      );

      const result =
        await downloadResourcePDF(
          {
            ...resource,
            content: isExternalLink
              ? ""
              : apiResource.content ||
                resource.content ||
                "",
            attachments:
              isCatalogue
                ? apiResource.attachments ||
                  []
                : [],
            updatedAt:
              apiResource.updated_at ||
              apiResource.published_at ||
              apiResource.created_at,
            externalLink:
              isExternalLink
                ? externalLink
                : "",
            category:
              resource.label ===
              "Reports"
                ? "Reports"
                : "Educational Materials",
          },
          user.user_id
        );

      if (result) {
        console.log(
          "[RESOURCE DOWNLOAD] Complete:",
          result
        );

        Alert.alert(
          "Download Complete",
          "The PDF has been saved successfully."
        );
      }
    } catch (error) {
      console.error(
        "[RESOURCE DOWNLOAD ERROR]",
        error
      );

      Alert.alert(
        "Download Failed",
        error instanceof Error
          ? error.message
          : "Unable to download this resource."
      );
    }
  };

  return (
    <>
      <CatalogueFullscreenViewer
        visible={fullscreenVisible}
        pages={pages}
        currentPage={safeCurrentPage}
        onClose={closeFullscreen}
        onPageChange={setCurrentPage}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <ThemedView
          style={[
            styles.accentBar,
            {
              backgroundColor:
                accentColor,
            },
          ]}
        />

        <ThemedView
          style={styles.pillContainer}
        >
          {[
            resource.label,
            resource.materialType,
          ]
            .filter(Boolean)
            .map((label) => (
              <ThemedView
                key={label}
                style={[
                  styles.labelPill,
                  {
                    backgroundColor:
                      labelBg,
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.labelText,
                    {
                      color:
                        labelColor,
                    },
                  ]}
                >
                  {label}
                </ThemedText>
              </ThemedView>
            ))}
        </ThemedView>

        <ThemedText
          style={styles.title}
        >
          {resource.title}
        </ThemedText>

        {resource.description && (
          <ThemedText
            style={styles.description}
          >
            {resource.description}
          </ThemedText>
        )}

        <ThemedView
          style={styles.divider}
        />

        <ThemedView
          style={styles.contentWrapper}
        >
          {renderContent()}
        </ThemedView>

        <ThemedView
          style={styles.updateRow}
        >
          <Ionicons
            name="time-outline"
            size={icon(13)}
            color="#9BA8C0"
          />

          <ThemedText
            style={styles.updateText}
          >
            Last updated:{" "}
            {formattedDate}
          </ThemedText>
        </ThemedView>

        <ThemedView
          style={styles.buttonRow}
        >
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.75}
            onPress={
              handleDownload
            }
          >
            <Ionicons
              name="download-outline"
              size={icon(18)}
              color="#35408E"
            />

            <ThemedText
              style={
                styles.actionBtnText
              }
            >
              Download
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.75}
            onPress={onShare}
          >
            <Ionicons
              name="share-social-outline"
              size={icon(18)}
              color="#35408E"
            />

            <ThemedText
              style={
                styles.actionBtnText
              }
            >
              Share
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </>
  );
}

const centerStyle = {
  flex: 1,
  backgroundColor: "#FFF",
  alignItems: "center" as const,
  justifyContent: "center" as const,
};

const loadingText = {
  marginTop: 12,
  color: "#666",
};

const errorContainer = {
  ...centerStyle,
  padding: scale(24),
};

const errorTitle = {
  marginTop: verticalScale(14),
  textAlign: "center" as const,
  fontSize: font(17),
  lineHeight: font(18),
  fontWeight: "600" as const,
};

const errorText = {
  marginTop: verticalScale(8),
  textAlign: "center" as const,
  color: "#888",
};

const errorMessage = {
  marginTop: verticalScale(8),
  textAlign: "center" as const,
  color: "#C62828",
  fontSize: font(12),
  lineHeight: font(13),
};

const retryButton = {
  marginTop: verticalScale(18),
};

const retryText = {
  color: "#35408E",
  fontWeight: "700" as const,
};

const externalLinkContainer = {
  width: "100%" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  paddingVertical: verticalScale(28),
  paddingHorizontal: scale(20),
  backgroundColor: "#F7F8FC",
  borderRadius: radius(16),
  borderWidth: scale(1),
  borderColor: "#E4E7F0",
};

const externalLinkIcon = {
  width: scale(58),
  height: verticalScale(58),
  borderRadius: radius(29),
  alignItems: "center" as const,
  justifyContent: "center" as const,
  backgroundColor: "#EEF0FF",
  marginBottom: verticalScale(14),
};

const externalLinkTitle = {
  fontSize: font(18),
  lineHeight: font(19),
  fontWeight: "700" as const,
  color: "#222",
  textAlign: "center" as const,
  marginBottom: verticalScale(8),
};

const externalLinkDescription = {
  fontSize: font(14),
  lineHeight: font(21),
  color: "#777",
  textAlign: "center" as const,
  marginBottom: verticalScale(16),
};

const externalLinkUrl = {
  width: "100%" as const,
  fontSize: font(14),
  lineHeight: font(21),
  color: "#35408E",
  textAlign: "center" as const,
  marginBottom: verticalScale(20),
};

const externalLinkButton = {
  flexDirection: "row" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  backgroundColor: "#35408E",
  paddingVertical: verticalScale(12),
  paddingHorizontal: scale(20),
  borderRadius: radius(10),
  minWidth: scale(190),
};

const externalLinkButtonText = {
  color: "#FFFFFF",
  fontSize: font(14),
  lineHeight: font(15),
  fontWeight: "700" as const,
  marginLeft: scale(8),
};
