import { ContributionsCard } from '@/components/cards/contributions-card';
import { MisinformationPost } from '@/components/cards/misinfomartion-post';
import { ContributionsFilter } from '@/components/filters/contributions-filter';
import { MisinformationFilter } from '@/components/filters/misinformation-filter';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { colors } from '@/styles/contribute/contribute-colors';
import { contributeTabsStyles } from '@/styles/contribute/contribute-form-styles';
import { icon, useResponsive } from '@/styles/responsive';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { PlatformPressable } from '@react-navigation/elements';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { Animated, ScrollView, TouchableOpacity, View } from 'react-native';

/* ---------------- CONTRIBUTIONS SCREEN ---------------- */

function ContributionsScreen() {
  const [showFilter, setShowFilter] = React.useState(false);

  const r = useResponsive();
      
        const styles = useMemo(() => contributeTabsStyles(r), [r]);

  return (
    <ThemedView style={styles.pageContainerPlain}>
      <ScrollView
        style={styles.pageContainerPlain}
        contentContainerStyle={styles.scrollContentPadded}
        showsVerticalScrollIndicator={false}
      >
        {/* Action bar */}
        <ThemedView style={styles.actionBar}>
          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.85}
            onPress={() =>
              router.push({
                pathname: '/drawer/tabs/contributions/add-contribute',
              })
            }
          >
            <Ionicons name="add" 
              size={ icon(18)} 
              color="white" />
            <ThemedText style={styles.primaryBtnText}>Add Contribution</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setShowFilter(!showFilter)}
            activeOpacity={0.75}
          >
            <Ionicons
              name="options-outline"
              size={icon(20)}
              color={showFilter ? '#3d6ebd' : colors.primary}
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
  const r = useResponsive();
      
        const styles = useMemo(() => contributeTabsStyles(r), [r]);


  return (
    <ThemedView style={styles.pageContainerPlain}>
      <ScrollView
        style={styles.pageContainerPlain}
        contentContainerStyle={styles.scrollContentPadded}
        showsVerticalScrollIndicator={false}
      >
        {/* Action bar */}
        <ThemedView style={styles.actionBar}>
          <TouchableOpacity
            style={styles.dangerBtn}
            activeOpacity={0.85}
            onPress={() =>
              router.push({
                pathname: '/drawer/tabs/contributions/report-misinfo',
              })
            }
          >
            <Octicons name="alert" size={icon(15)} color="white" />
            <ThemedText style={styles.primaryBtnText}>Report Misinformation</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setShowFilter(!showFilter)}
            activeOpacity={0.75}
          >
            <Ionicons
              name="options-outline"
              size={icon(20)}
              color={showFilter ? '#3d6ebd' : colors.primary}
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

  const r = useResponsive();
      
        const styles = useMemo(() => contributeTabsStyles(r), [r]);

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : typeof options.title === 'string'
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
  const r = useResponsive();
      
        const styles = useMemo(() => contributeTabsStyles(r), [r]);

  return (
    <View style={styles.pageContainerPlain}>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Contributions" component={ContributionsScreen} />
        <Tab.Screen name="Misinformation" component={MisinformationScreen} />
      </Tab.Navigator>
    </View>
  );
}