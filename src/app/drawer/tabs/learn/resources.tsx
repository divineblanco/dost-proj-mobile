// import { ExternalResources } from "@/components/cards/external-resources";
// import { ResourcesCard } from "@/components/cards/resources-card";
// import { MaterialType, MaterialTypeDropdown } from "@/components/dropdown/material-dropdown";
// import ResourcesDropdown from "@/components/dropdown/resources-dropdown";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { resourcesPageStyles } from "@/styles/resources/resources-styles";
// import { icon, scale, useResponsive } from "@/styles/responsive";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useMemo, useState } from "react";
// import { ScrollView, TextInput, TouchableOpacity } from "react-native";
// import { resourcesData } from "./resource-data";

// const ITEMS_PER_PAGE = 5;

// export default function Resources() {
//   const [selectedResources, setSelectectedResources] = useState("All Categories");
//   const [search, setSearch]               = useState("");
//   const [currentPage, setCurrentPage]     = useState(1);
//   const [selectedTypes, setSelectedTypes] = useState<MaterialType[]>([]);

//   const filteredResources = useMemo(() => {
//     return resourcesData.filter((item) => {
//       const matchesSearch =
//         item.title.toLowerCase().includes(search.toLowerCase()) ||
//         item.description.toLowerCase().includes(search.toLowerCase());

//       const matchesCategory =
//         selectedResources === "All Categories" ||
//         item.label === selectedResources;

//       const matchesMaterial =
//         selectedTypes.length === 0 ||
//         selectedTypes.includes(item.materialType);

//       return matchesSearch && matchesCategory && matchesMaterial;
//     });
//   }, [search, selectedResources, selectedTypes]);

//   const totalPages = Math.max(1, Math.ceil(filteredResources.length / ITEMS_PER_PAGE));

//   const paginatedResources = filteredResources.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const r = useResponsive();
//   const styles = useMemo(() => resourcesPageStyles(r), [r]);

//   const resetPage = () => setCurrentPage(1);

//   const hasActiveFilters =
//     selectedTypes.length > 0 ||
//     selectedResources !== "All Categories" ||
//     search !== "";

//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//     >
//       <ThemedView style={styles.pageInner}>

//         {/* Header */}
//         <ThemedView style={styles.headerContainer}>
//           <ThemedText type="title" style={styles.headerTitle}>
//             HIV Educational Resources
//           </ThemedText>
//           <ThemedText style={styles.headerTxt}>
//             Read educational materials about HIV prevention, treatment, awareness, and more.
//           </ThemedText>
//         </ThemedView>

//         {/* Search */}
//         <ThemedView style={styles.search}>
//           <Ionicons name="search" size={icon(20)} color="#868686" />
//           <TextInput
//             value={search}
//             onChangeText={(text) => { setSearch(text); resetPage(); }}
//             placeholder="Search educational resources..."
//             placeholderTextColor="#868686"
//             style={styles.searchInput}
//           />
//         </ThemedView>

//         {/* Filter row */}
//         <ThemedView style={styles.filterRow}>
//           <ResourcesDropdown
//             selectedResources={selectedResources}
//             setSelectectedResources={(value) => {
//               setSelectectedResources(value);
//               resetPage();
//             }}
//           />

//           <MaterialTypeDropdown
//             selected={selectedTypes}
//             onChange={(updated) => { setSelectedTypes(updated); resetPage(); }}
//           />
//         </ThemedView>

//         {/* Results count + clear */}
//         <ThemedView style={styles.resultsRow}>
//           <ThemedText style={styles.resultsTxt}>
//             {filteredResources.length} result{filteredResources.length !== 1 ? "s" : ""}
//             {selectedTypes.length > 0 && (
//               <ThemedText style={styles.resultsBadge}>
//                 {" "}· {selectedTypes.join(", ")}
//               </ThemedText>
//             )}
//           </ThemedText>

//           {hasActiveFilters && (
//             <TouchableOpacity
//               onPress={() => {
//                 setSelectedTypes([]);
//                 setSelectectedResources("All Categories");
//                 setSearch("");
//                 resetPage();
//               }}
//               activeOpacity={0.7}
//             >
//               <ThemedText style={styles.clearTxt}>Clear filters</ThemedText>
//             </TouchableOpacity>
//           )}
//         </ThemedView>

//         {/* Cards + Pagination */}
//         <ThemedView style={{ padding: scale(10) }}>
//           <ResourcesCard data={paginatedResources} />

//           <ThemedView style={styles.pagination}>
//             <TouchableOpacity
//               disabled={currentPage === 1}
//               onPress={() => setCurrentPage((prev) => prev - 1)}
//             >
//               <Ionicons
//                 name="chevron-back-circle"
//                 size={icon(34)}
//                 color={currentPage === 1 ? "#D4D4D4" : "#35408E"}
//               />
//             </TouchableOpacity>

//             <ThemedText style={styles.paginationTxt}>
//               {currentPage} / {totalPages}
//             </ThemedText>

//             <TouchableOpacity
//               disabled={currentPage === totalPages}
//               onPress={() => setCurrentPage((prev) => prev + 1)}
//             >
//               <Ionicons
//                 name="chevron-forward-circle"
//                 size={icon(34)}
//                 color={currentPage === totalPages ? "#D4D4D4" : "#35408E"}
//               />
//             </TouchableOpacity>
//           </ThemedView>
//         </ThemedView>

//         {/* External Resources */}
//         <ThemedView style={styles.extContainer}>
//           <ThemedText style={styles.extTitle}>External Resources</ThemedText>
//           <ExternalResources />
//         </ThemedView>

//       </ThemedView>
//     </ScrollView>
//   );
// }

import { ExternalResources } from "@/components/cards/external-resources";
import { ResourcesCard } from "@/components/cards/resources-card";
import {
  MaterialType,
  MaterialTypeDropdown,
} from "@/components/dropdown/material-dropdown";
import ResourcesDropdown from "@/components/dropdown/resources-dropdown";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { mapEducationResources } from "@/lib/services/educational-resource-mapper";
import { getEducationalResources } from "@/lib/services/educational-resources";
import { resourcesPageStyles } from "@/styles/resources/resources-styles";
import { icon, scale, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

const ITEMS_PER_PAGE = 5;

export default function Resources() {
  const testCloudFront = async () => {
    const url =
      "https://d2i0afz2m2bklk.cloudfront.net/1785213136365-1.jpg";
  
    console.log(
      "[NETWORK TEST] Starting:",
      url
    );
  
    try {
      const response =
        await fetch(url);
  
      console.log(
        "[NETWORK TEST] Status:",
        response.status
      );
  
      console.log(
        "[NETWORK TEST] OK:",
        response.ok
      );
  
      console.log(
        "[NETWORK TEST] Content-Type:",
        response.headers.get(
          "content-type"
        )
      );
  
      const blob =
        await response.blob();
  
      console.log(
        "[NETWORK TEST] Blob size:",
        blob.size
      );
    } catch (error) {
      console.error(
        "[NETWORK TEST] FAILED:",
        error
      );
    }
  };

  testCloudFront();
  /**
   * =======================================================
   * STATE
   * =======================================================
   */

  const [selectedResources, setSelectedResources] =
    useState("All Categories");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedTypes, setSelectedTypes] =
    useState<MaterialType[]>([]);

  /**
   * =======================================================
   * RESPONSIVE STYLES
   * =======================================================
   */

  const r = useResponsive();

  const styles = useMemo(
    () => resourcesPageStyles(r),
    [r]
  );

  /**
   * =======================================================
   * FETCH RESOURCES
   * =======================================================
   *
   * getEducationalResources() returns:
   *
   * EducationResource[]
   *
   * The API response extraction is handled inside:
   *
   * src/lib/services/educational-resources.ts
   */

  const {
    data: apiResources = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["educational-resources"],
    queryFn: getEducationalResources,
    staleTime: 5 * 60 * 1000,
  });

  /**
   * =======================================================
   * MAP API DATA
   * =======================================================
   */

  const resourcesData = useMemo(() => {
    if (!Array.isArray(apiResources)) {
      console.error(
        "[RESOURCES SCREEN] Expected an array but received:",
        apiResources
      );

      return [];
    }

    try {
      const mappedResources =
        mapEducationResources(apiResources);

      console.log(
        "[RESOURCES SCREEN] Resources:",
        apiResources.length
      );

      console.log(
        "[RESOURCES SCREEN] Mapped resources:",
        mappedResources.length
      );

      return mappedResources;
    } catch (mappingError) {
      console.error(
        "[RESOURCES SCREEN] Mapping failed:",
        mappingError
      );

      return [];
    }
  }, [apiResources]);

  /**
   * =======================================================
   * FILTER RESOURCES
   * =======================================================
   */

  const filteredResources = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return resourcesData.filter((item) => {
      const title =
        item.title?.toLowerCase() ?? "";

      const description =
        item.description?.toLowerCase() ?? "";

      /**
       * Search
       */

      const matchesSearch =
        searchValue === "" ||
        title.includes(searchValue) ||
        description.includes(searchValue);

      /**
       * Category
       */

      const matchesCategory =
        selectedResources === "All Categories" ||
        item.label === selectedResources;

      /**
       * Material type
       */

      const matchesMaterial =
        selectedTypes.length === 0 ||
        selectedTypes.includes(item.materialType);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMaterial
      );
    });
  }, [
    resourcesData,
    search,
    selectedResources,
    selectedTypes,
  ]);

  /**
   * =======================================================
   * PAGINATION
   * =======================================================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredResources.length /
        ITEMS_PER_PAGE
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedResources =
    filteredResources.slice(
      (safeCurrentPage - 1) *
        ITEMS_PER_PAGE,
      safeCurrentPage *
        ITEMS_PER_PAGE
    );

  /**
   * =======================================================
   * RESET PAGE WHEN FILTERS CHANGE
   * =======================================================
   */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    selectedResources,
    selectedTypes,
  ]);

  /**
   * =======================================================
   * ACTIVE FILTERS
   * =======================================================
   */

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedResources !==
      "All Categories" ||
    search.trim() !== "";

  /**
   * =======================================================
   * CLEAR FILTERS
   * =======================================================
   */

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedResources("All Categories");
    setSearch("");
    setCurrentPage(1);
  };

  /**
   * =======================================================
   * RENDER
   * =======================================================
   */

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={
        styles.scrollContent
      }
      showsVerticalScrollIndicator={false}
    >
      <ThemedView
        style={styles.pageInner}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <ThemedView
          style={
            styles.headerContainer
          }
        >
          <ThemedText
            type="title"
            style={
              styles.headerTitle
            }
          >
            HIV Educational Resources
          </ThemedText>

          <ThemedText
            style={styles.headerTxt}
          >
            Read educational materials about
            HIV prevention, treatment,
            awareness, and more.
          </ThemedText>
        </ThemedView>

        {/* =================================================
            SEARCH
        ================================================= */}

        <ThemedView
          style={styles.search}
        >
          <Ionicons
            name="search"
            size={icon(20)}
            color="#868686"
          />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search educational resources..."
            placeholderTextColor="#868686"
            style={
              styles.searchInput
            }
          />
        </ThemedView>

        {/* =================================================
            FILTERS
        ================================================= */}

        <ThemedView
          style={styles.filterRow}
        >
          <ResourcesDropdown
            selectedResources={
              selectedResources
            }
            setSelectectedResources={
              setSelectedResources
            }
          />

          <MaterialTypeDropdown
            selected={
              selectedTypes
            }
            onChange={
              setSelectedTypes
            }
          />
        </ThemedView>

        {/* =================================================
            RESULTS
        ================================================= */}

        <ThemedView
          style={styles.resultsRow}
        >
          <ThemedText
            style={
              styles.resultsTxt
            }
          >
            {filteredResources.length}{" "}
            result
            {filteredResources.length !==
            1
              ? "s"
              : ""}

            {selectedTypes.length >
              0 && (
              <ThemedText
                style={
                  styles.resultsBadge
                }
              >
                {" · "}
                {selectedTypes.join(
                  ", "
                )}
              </ThemedText>
            )}
          </ThemedText>

          {hasActiveFilters && (
            <TouchableOpacity
              onPress={
                clearFilters
              }
              activeOpacity={0.7}
            >
              <ThemedText
                style={
                  styles.clearTxt
                }
              >
                Clear filters
              </ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>

        {/* =================================================
            RESOURCE CONTENT
        ================================================= */}

        <ThemedView
          style={{
            padding: scale(10),
          }}
        >
          {/* =================================================
              INITIAL LOADING
          ================================================= */}

          {isLoading && (
            <ThemedView
              style={{
                paddingVertical:
                  scale(40),
                alignItems:
                  "center",
                justifyContent:
                  "center",
              }}
            >
              <ActivityIndicator
                size="large"
                color="#35408E"
              />

              <ThemedText
                style={{
                  marginTop:
                    scale(10),
                  color: "#666",
                  textAlign:
                    "center",
                }}
              >
                Loading educational
                resources...
              </ThemedText>
            </ThemedView>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {isError &&
            !isLoading && (
              <ThemedView
                style={{
                  paddingVertical:
                    scale(40),
                  paddingHorizontal:
                    scale(20),
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                }}
              >
                <Ionicons
                  name="alert-circle-outline"
                  size={icon(44)}
                  color="#C62828"
                />

                <ThemedText
                  style={{
                    textAlign:
                      "center",
                    marginTop:
                      scale(12),
                  }}
                >
                  Unable to load
                  educational
                  resources.
                </ThemedText>

                {error instanceof
                  Error && (
                  <ThemedText
                    style={{
                      textAlign:
                        "center",
                      color:
                        "#888",
                      marginTop:
                        scale(8),
                      fontSize:
                        scale(12),
                    }}
                  >
                    {error.message}
                  </ThemedText>
                )}

                <TouchableOpacity
                  onPress={() =>
                    refetch()
                  }
                  activeOpacity={0.7}
                  style={{
                    marginTop:
                      scale(16),
                  }}
                >
                  <ThemedText
                    style={{
                      color:
                        "#35408E",
                      fontWeight:
                        "700",
                    }}
                  >
                    Try Again
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            )}

          {/* =================================================
              EMPTY / NO MATCHES
          ================================================= */}

          {!isLoading &&
            !isError &&
            filteredResources.length ===
              0 && (
              <ThemedView
                style={{
                  paddingVertical:
                    scale(40),
                  paddingHorizontal:
                    scale(20),
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                }}
              >
                <Ionicons
                  name="document-text-outline"
                  size={icon(44)}
                  color="#BDBDBD"
                />

                <ThemedText
                  style={{
                    textAlign:
                      "center",
                    marginTop:
                      scale(12),
                  }}
                >
                  {resourcesData.length >
                  0
                    ? "No resources match your filters."
                    : "No educational resources found."}
                </ThemedText>

                {hasActiveFilters && (
                  <TouchableOpacity
                    onPress={
                      clearFilters
                    }
                    activeOpacity={
                      0.7
                    }
                    style={{
                      marginTop:
                        scale(16),
                    }}
                  >
                    <ThemedText
                      style={{
                        color:
                          "#35408E",
                        fontWeight:
                          "700",
                      }}
                    >
                      Clear filters
                    </ThemedText>
                  </TouchableOpacity>
                )}
              </ThemedView>
            )}

          {/* =================================================
              RESOURCE CARDS
          ================================================= */}

          {!isLoading &&
            !isError &&
            paginatedResources.length >
              0 && (
              <ResourcesCard
                data={
                  paginatedResources
                }
              />
            )}

          {/* =================================================
              BACKGROUND REFRESH
          ================================================= */}

          {!isLoading &&
            !isError &&
            isFetching &&
            resourcesData.length >
              0 && (
              <ThemedView
                style={{
                  alignItems:
                    "center",
                  paddingVertical:
                    scale(8),
                }}
              >
                <ActivityIndicator
                  size="small"
                  color="#35408E"
                />
              </ThemedView>
            )}

          {/* =================================================
              PAGINATION
          ================================================= */}

          {!isLoading &&
            !isError &&
            filteredResources.length >
              0 && (
              <ThemedView
                style={
                  styles.pagination
                }
              >
                {/* Previous */}

                <TouchableOpacity
                  disabled={
                    safeCurrentPage ===
                    1
                  }
                  onPress={() =>
                    setCurrentPage(
                      (previous) =>
                        Math.max(
                          1,
                          previous -
                            1
                        )
                    )
                  }
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-back-circle"
                    size={icon(34)}
                    color={
                      safeCurrentPage ===
                      1
                        ? "#D4D4D4"
                        : "#35408E"
                    }
                  />
                </TouchableOpacity>

                {/* Page */}

                <ThemedText
                  style={
                    styles.paginationTxt
                  }
                >
                  {safeCurrentPage} /{" "}
                  {totalPages}
                </ThemedText>

                {/* Next */}

                <TouchableOpacity
                  disabled={
                    safeCurrentPage ===
                    totalPages
                  }
                  onPress={() =>
                    setCurrentPage(
                      (previous) =>
                        Math.min(
                          totalPages,
                          previous +
                            1
                        )
                    )
                  }
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-forward-circle"
                    size={icon(34)}
                    color={
                      safeCurrentPage ===
                      totalPages
                        ? "#D4D4D4"
                        : "#35408E"
                    }
                  />
                </TouchableOpacity>
              </ThemedView>
            )}
        </ThemedView>

        {/* =================================================
            EXTERNAL RESOURCES
        ================================================= */}

        <ThemedView
          style={
            styles.extContainer
          }
        >
          <ThemedText
            style={
              styles.extTitle
            }
          >
            External Resources
          </ThemedText>

          <ExternalResources />
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
