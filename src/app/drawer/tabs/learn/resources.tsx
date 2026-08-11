import { ExternalResources } from "@/components/cards/external-resources";
import { ResourcesCard } from "@/components/cards/resources-card";
import { MaterialType, MaterialTypeDropdown } from "@/components/dropdown/material-dropdown";
import ResourcesDropdown from "@/components/dropdown/resources-dropdown";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { resourcesPageStyles } from "@/styles/resources/resources-styles";
import { icon, scale, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import { resourcesData } from "./resource-data";

const ITEMS_PER_PAGE = 5;

export default function Resources() {
  const [selectedResources, setSelectectedResources] = useState("All Categories");
  const [search, setSearch]               = useState("");
  const [currentPage, setCurrentPage]     = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<MaterialType[]>([]);

  const filteredResources = useMemo(() => {
    return resourcesData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedResources === "All Categories" ||
        item.label === selectedResources;

      const matchesMaterial =
        selectedTypes.length === 0 ||
        selectedTypes.includes(item.materialType);

      return matchesSearch && matchesCategory && matchesMaterial;
    });
  }, [search, selectedResources, selectedTypes]);

  const totalPages = Math.max(1, Math.ceil(filteredResources.length / ITEMS_PER_PAGE));

  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const r = useResponsive();
  const styles = useMemo(() => resourcesPageStyles(r), [r]);

  const resetPage = () => setCurrentPage(1);

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedResources !== "All Categories" ||
    search !== "";

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView style={styles.pageInner}>

        {/* Header */}
        <ThemedView style={styles.headerContainer}>
          <ThemedText type="title" style={styles.headerTitle}>
            HIV Educational Resources
          </ThemedText>
          <ThemedText style={styles.headerTxt}>
            Read educational materials about HIV prevention, treatment, awareness, and more.
          </ThemedText>
        </ThemedView>

        {/* Search */}
        <ThemedView style={styles.search}>
          <Ionicons name="search" size={icon(20)} color="#868686" />
          <TextInput
            value={search}
            onChangeText={(text) => { setSearch(text); resetPage(); }}
            placeholder="Search educational resources..."
            placeholderTextColor="#868686"
            style={styles.searchInput}
          />
        </ThemedView>

        {/* Filter row */}
        <ThemedView style={styles.filterRow}>
          <ResourcesDropdown
            selectedResources={selectedResources}
            setSelectectedResources={(value) => {
              setSelectectedResources(value);
              resetPage();
            }}
          />

          <MaterialTypeDropdown
            selected={selectedTypes}
            onChange={(updated) => { setSelectedTypes(updated); resetPage(); }}
          />
        </ThemedView>

        {/* Results count + clear */}
        <ThemedView style={styles.resultsRow}>
          <ThemedText style={styles.resultsTxt}>
            {filteredResources.length} result{filteredResources.length !== 1 ? "s" : ""}
            {selectedTypes.length > 0 && (
              <ThemedText style={styles.resultsBadge}>
                {" "}· {selectedTypes.join(", ")}
              </ThemedText>
            )}
          </ThemedText>

          {hasActiveFilters && (
            <TouchableOpacity
              onPress={() => {
                setSelectedTypes([]);
                setSelectectedResources("All Categories");
                setSearch("");
                resetPage();
              }}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.clearTxt}>Clear filters</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>

        {/* Cards + Pagination */}
        <ThemedView style={{ padding: scale(10) }}>
          <ResourcesCard data={paginatedResources} />

          <ThemedView style={styles.pagination}>
            <TouchableOpacity
              disabled={currentPage === 1}
              onPress={() => setCurrentPage((prev) => prev - 1)}
            >
              <Ionicons
                name="chevron-back-circle"
                size={icon(34)}
                color={currentPage === 1 ? "#D4D4D4" : "#35408E"}
              />
            </TouchableOpacity>

            <ThemedText style={styles.paginationTxt}>
              {currentPage} / {totalPages}
            </ThemedText>

            <TouchableOpacity
              disabled={currentPage === totalPages}
              onPress={() => setCurrentPage((prev) => prev + 1)}
            >
              <Ionicons
                name="chevron-forward-circle"
                size={icon(34)}
                color={currentPage === totalPages ? "#D4D4D4" : "#35408E"}
              />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {/* External Resources */}
        <ThemedView style={styles.extContainer}>
          <ThemedText style={styles.extTitle}>External Resources</ThemedText>
          <ExternalResources />
        </ThemedView>

      </ThemedView>
    </ScrollView>
  );
}