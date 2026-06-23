import { ContributionsCard } from "@/components/contributions-card";
import { ContributionsFilter } from "@/components/contributions-filter";
import { MisinformationPost } from "@/components/misinfomartion-card";
import { MisinformationFilter } from "@/components/misinformation-filter";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { PlatformPressable } from "@react-navigation/elements";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import * as React from "react";
import { Animated, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

/* ---------------- CONTRIBUTIONS SCREEN ---------------- */

function ContributionsScreen() {
  const [showFilter, setShowFilter] = React.useState(false);

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#F8F9FD" }}>
      <ScrollView
        style={styles.pageContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Action bar */}
        <ThemedView style={styles.actionBar}>
          <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85}>
            <Ionicons name="add" size={18} color="white" />
            <ThemedText style={styles.primaryBtnText}>Add Contribution</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setShowFilter(!showFilter)}
            activeOpacity={0.75}
          >
            <Ionicons
              name="options-outline"
              size={20}
              color={showFilter ? "#3d6ebd" : "#35408E"}
            />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.cardList}>
          <ContributionsCard />
        </ThemedView>
      </ScrollView>

      {showFilter && <ContributionsFilter onClose={() => setShowFilter(false)} />}
    </ThemedView>
  );
}

/* ---------------- MISINFORMATION SCREEN ---------------- */

function MisinformationScreen() {
  const [showFilter, setShowFilter] = React.useState(false);

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#F8F9FD" }}>
      <ScrollView
        style={styles.pageContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Action bar */}
        <ThemedView style={styles.actionBar}>
          <TouchableOpacity style={styles.dangerBtn} activeOpacity={0.85}>
            <Octicons name="alert" size={15} color="white" />
            <ThemedText style={styles.primaryBtnText}>Report Misinformation</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setShowFilter(!showFilter)}
            activeOpacity={0.75}
          >
            <Ionicons
              name="options-outline"
              size={20}
              color={showFilter ? "#3d6ebd" : "#35408E"}
            />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.cardList}>
          <MisinformationPost />
        </ThemedView>
      </ScrollView>

      {showFilter && <MisinformationFilter onClose={() => setShowFilter(false)} />}
    </ThemedView>
  );
}

/* ---------------- TAB BAR ---------------- */

function MyTabBar({ state, descriptors, navigation }: MaterialTopTabBarProps) {
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
            onPress={() => navigation.navigate(route.name)}
            style={[styles.tabItem, isFocused && styles.tabItemActive]}
          >
            <Animated.Text
              style={[
                styles.tabLabel,
                isFocused ? styles.tabLabelActive : styles.tabLabelInactive,
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

/* ---------------- TABS ---------------- */

const Tab = createMaterialTopTabNavigator();

export default function Contribute() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Contributions" component={ContributionsScreen} />
        <Tab.Screen name="Misinformation" component={MisinformationScreen} />
      </Tab.Navigator>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 14,
    paddingTop: 14,
    gap: 12,
  },

  // Action bar
  actionBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "transparent",
  },

  primaryBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#35408E",
    paddingVertical: 11,
    borderRadius: 10,
    shadowColor: "#35408E",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  dangerBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#C62828",
    paddingVertical: 11,
    borderRadius: 10,
    shadowColor: "#C62828",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#35408E",
    backgroundColor: "#F8F9FD",
    justifyContent: "center",
    alignItems: "center",
  },

  cardList: {
    gap: 0,
  },

  // Tab bar
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F2F8",
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    position: "relative",
  },

  tabItemActive: {
    backgroundColor: "transparent",
  },

  tabLabel: {
    fontSize: 15,
  },

  tabLabelActive: {
    color: "#35408E",
    fontWeight: "700",
  },

  tabLabelInactive: {
    color: "#9BA8C0",
    fontWeight: "400",
  },

  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: "15%",
    right: "15%",
    height: 2.5,
    borderRadius: 2,
    backgroundColor: "#35408E",
  },
});