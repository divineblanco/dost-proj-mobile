import { ContributionsCard } from "@/components/cards/contributions-card";
import { MisinformationPost } from "@/components/cards/misinfomartion-post";
import {
  ContributionFilters,
  ContributionsFilter,
} from "@/components/filters/contributions-filter";
import { MisinformationFilter, MisinformationFilters } from "@/components/filters/misinformation-filter";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  getStorageItem,
  setStorageItem,
} from "@/lib/auth/storage.native";
import { colors } from "@/styles/contribute/contribute-colors";
import { contributeTabsStyles } from "@/styles/contribute/contribute-form-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { PlatformPressable } from "@react-navigation/elements";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, ScrollView, TouchableOpacity, View } from "react-native";

const CONTRIBUTE_TAB_KEY = "last_contribute_tab";

type ContributeTab = "Contributions" | "Misinformation";

function ContributionsScreen() {
  const [showFilter, setShowFilter] = useState(false);
  const r = useResponsive();
  const styles = useMemo(() => contributeTabsStyles(r), [r]);

  const [filters, setFilters] = useState<ContributionFilters>({
    selectedDate: "Last 7 Days",
    startDate: null,
    endDate: null,
    selectedRegion: "All Regions",
    selectedRegionCode: null,
    selectedCategories: "All Categories",
    selectedSentiment: "All Sentiment",
  });

  return (
    <ThemedView style={styles.pageContainerPlain}>
      <ScrollView
        style={styles.pageContainerPlain}
        contentContainerStyle={styles.scrollContentPadded}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.actionBar}>
          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.85}
            onPress={() =>
              router.push("/drawer/tabs/contributions/add-contribute")
            }
          >
            <Ionicons name="add" size={icon(18)} color="white" />
            <ThemedText style={styles.primaryBtnText}>
              Add Contribution
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterBtn}
            activeOpacity={0.75}
            onPress={() => setShowFilter((value) => !value)}
          >
            <Ionicons
              name="options-outline"
              size={icon(20)}
              color={showFilter ? "#3d6ebd" : colors.primary}
            />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.cardList}>
          <ContributionsCard filters={filters} />
        </ThemedView>
      </ScrollView>

      {showFilter && (
        <ContributionsFilter
          onClose={() => setShowFilter(false)}
          onApply={(newFilters) => {
            setFilters(newFilters);
            setShowFilter(false);
          }}
        />
      )}
    </ThemedView>
  );
}

function MisinformationScreen() {
  const [showFilter, setShowFilter] = useState(false);
  const r = useResponsive();
  const styles = useMemo(() => contributeTabsStyles(r), [r]);

  const [misinformationFilters, setMisinformationFilters] =
  useState<MisinformationFilters>({
    selectedDate: "Last 7 Days",
    startDate: null,
    endDate: null,
    selectedType: "All Types",
  });


  return (
    <ThemedView style={styles.pageContainerPlain}>
      <ScrollView
        style={styles.pageContainerPlain}
        contentContainerStyle={styles.scrollContentPadded}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.actionBar}>
          <TouchableOpacity
            style={styles.dangerBtn}
            activeOpacity={0.85}
            onPress={() =>
              router.push("/drawer/tabs/contributions/report-misinfo")
            }
          >
            <Octicons name="alert" size={icon(15)} color="white" />
            <ThemedText style={styles.primaryBtnText}>
              Report Misinformation
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterBtn}
            activeOpacity={0.75}
            onPress={() => setShowFilter((value) => !value)}
          >
            <Ionicons
              name="options-outline"
              size={icon(20)}
              color={showFilter ? "#3d6ebd" : colors.primary}
            />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.cardList}>
          <MisinformationPost filters={misinformationFilters} />
        </ThemedView>
      </ScrollView>

      {showFilter && (
        <MisinformationFilter
          onClose={() => setShowFilter(false)}
          onApply={(newFilters) => {
            setMisinformationFilters(newFilters);
            setShowFilter(false);
          }}
        />
      )}

    </ThemedView>
  );
}

function MyTabBar({
  state,
  descriptors,
  navigation,
  onNavigationReady,
}: MaterialTopTabBarProps & {
  onNavigationReady: (
    navigation: MaterialTopTabBarProps["navigation"]
  ) => void;
}) {
  const r = useResponsive();
  const styles = useMemo(() => contributeTabsStyles(r), [r]);

  useEffect(() => {
    onNavigationReady(navigation);
  }, [navigation, onNavigationReady]);

  const handleTabPress = async (tabName: ContributeTab) => {
    try {
      await setStorageItem(CONTRIBUTE_TAB_KEY, tabName);
    } catch (error) {
      console.log("Failed to save tab:", error);
    }

    navigation.navigate(tabName);
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : typeof options.title === "string"
            ? options.title
            : route.name;

        return (
          <PlatformPressable
            key={route.key}
            onPress={() => handleTabPress(route.name as ContributeTab)}
            style={[
              styles.tabItem,
              isFocused && styles.tabItemActive,
            ]}
          >
            <Animated.Text
              style={[
                styles.tabLabel,
                isFocused
                  ? styles.tabLabelActive
                  : styles.tabLabelInactive,
              ]}
            >
              {label}
            </Animated.Text>

            {isFocused && <View style={styles.tabIndicator} />}
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function Contribute() {
  const r = useResponsive();
  const styles = useMemo(() => contributeTabsStyles(r), [r]);

  const { tab, refresh } = useLocalSearchParams<{
    tab?: string;
    refresh?: string;
  }>();

  const [savedTab, setSavedTab] =
    useState<ContributeTab>("Contributions");

  const [isTabLoaded, setIsTabLoaded] = useState(false);

  const tabNavigationRef =
    useRef<MaterialTopTabBarProps["navigation"] | null>(null);

  const handleNavigationReady = useCallback(
    (navigation: MaterialTopTabBarProps["navigation"]) => {
      tabNavigationRef.current = navigation;
    },
    []
  );

  useEffect(() => {
    let mounted = true;

    async function loadSavedTab() {
      try {
        if (tab === "Misinformation") {
          if (mounted) {
            setSavedTab("Misinformation");
          }
          return;
        }

        const storedTab = await getStorageItem(CONTRIBUTE_TAB_KEY);

        if (!mounted) return;

        setSavedTab(
          storedTab === "Misinformation"
            ? "Misinformation"
            : "Contributions"
        );
      } catch (error) {
        console.log("Failed to load saved tab:", error);

        if (mounted) {
          setSavedTab("Contributions");
        }
      } finally {
        if (mounted) {
          setIsTabLoaded(true);
        }
      }
    }

    loadSavedTab();

    return () => {
      mounted = false;
    };
  }, [tab]);

  useEffect(() => {
    if (!isTabLoaded || tab !== "Misinformation") return;

    const timer = setTimeout(() => {
      tabNavigationRef.current?.navigate("Misinformation");
    }, 100);

    return () => clearTimeout(timer);
  }, [tab, refresh, isTabLoaded]);

  if (!isTabLoaded) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.pageContainerPlain}>
      <Tab.Navigator
        initialRouteName={savedTab}
        tabBar={(props) => (
          <MyTabBar
            {...props}
            onNavigationReady={handleNavigationReady}
          />
        )}
      >
        <Tab.Screen
          name="Contributions"
          component={ContributionsScreen}
        />
        <Tab.Screen
          name="Misinformation"
          component={MisinformationScreen}
        />
      </Tab.Navigator>
    </View>
  );
}
