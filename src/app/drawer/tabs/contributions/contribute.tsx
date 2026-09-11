// import { ContributionsCard } from '@/components/cards/contributions-card';
// import { MisinformationPost } from '@/components/cards/misinfomartion-post';
// import { ContributionsFilter } from '@/components/filters/contributions-filter';
// import { MisinformationFilter } from '@/components/filters/misinformation-filter';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { colors } from '@/styles/contribute/contribute-colors';
// import { contributeTabsStyles } from '@/styles/contribute/contribute-form-styles';
// import { icon, useResponsive } from '@/styles/responsive';
// import { Ionicons, Octicons } from '@expo/vector-icons';
// import { PlatformPressable } from '@react-navigation/elements';
// import {
//   createMaterialTopTabNavigator,
//   MaterialTopTabBarProps,
// } from '@react-navigation/material-top-tabs';
// import { router } from 'expo-router';
// import React, { useMemo } from 'react';
// import { Animated, ScrollView, TouchableOpacity, View } from 'react-native';

// /* ---------------- CONTRIBUTIONS SCREEN ---------------- */

// function ContributionsScreen() {
//   const [showFilter, setShowFilter] = React.useState(false);

//   const r = useResponsive();
      
//         const styles = useMemo(() => contributeTabsStyles(r), [r]);

//   return (
//     <ThemedView style={styles.pageContainerPlain}>
//       <ScrollView
//         style={styles.pageContainerPlain}
//         contentContainerStyle={styles.scrollContentPadded}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Action bar */}
//         <ThemedView style={styles.actionBar}>
//           <TouchableOpacity
//             style={styles.primaryBtn}
//             activeOpacity={0.85}
//             onPress={() =>
//               router.push({
//                 pathname: '/drawer/tabs/contributions/add-contribute',
//               })
//             }
//           >
//             <Ionicons name="add" 
//               size={ icon(18)} 
//               color="white" />
//             <ThemedText style={styles.primaryBtnText}>Add Contribution</ThemedText>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.filterBtn}
//             onPress={() => setShowFilter(!showFilter)}
//             activeOpacity={0.75}
//           >
//             <Ionicons
//               name="options-outline"
//               size={icon(20)}
//               color={showFilter ? '#3d6ebd' : colors.primary}
//             />
//           </TouchableOpacity>
//         </ThemedView>

//         <ThemedView style={styles.cardList}>
//           <ContributionsCard />
//         </ThemedView>
//       </ScrollView>

//       {showFilter && <ContributionsFilter onClose={() => setShowFilter(false)} />}
//     </ThemedView>
//   );
// }

// /* ---------------- MISINFORMATION SCREEN ---------------- */

// function MisinformationScreen() {
//   const [showFilter, setShowFilter] = React.useState(false);
//   const r = useResponsive();
      
//         const styles = useMemo(() => contributeTabsStyles(r), [r]);


//   return (
//     <ThemedView style={styles.pageContainerPlain}>
//       <ScrollView
//         style={styles.pageContainerPlain}
//         contentContainerStyle={styles.scrollContentPadded}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Action bar */}
//         <ThemedView style={styles.actionBar}>
//           <TouchableOpacity
//             style={styles.dangerBtn}
//             activeOpacity={0.85}
//             onPress={() =>
//               router.push({
//                 pathname: '/drawer/tabs/contributions/report-misinfo',
//               })
//             }
//           >
//             <Octicons name="alert" size={icon(15)} color="white" />
//             <ThemedText style={styles.primaryBtnText}>Report Misinformation</ThemedText>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.filterBtn}
//             onPress={() => setShowFilter(!showFilter)}
//             activeOpacity={0.75}
//           >
//             <Ionicons
//               name="options-outline"
//               size={icon(20)}
//               color={showFilter ? '#3d6ebd' : colors.primary}
//             />
//           </TouchableOpacity>
//         </ThemedView>

//         <ThemedView style={styles.cardList}>
//           <MisinformationPost />
//         </ThemedView>
//       </ScrollView>

//       {showFilter && <MisinformationFilter onClose={() => setShowFilter(false)} />}
//     </ThemedView>
//   );
// }

// /* ---------------- TAB BAR ---------------- */

// function MyTabBar({ state, descriptors, navigation }: MaterialTopTabBarProps) {

//   const r = useResponsive();
      
//         const styles = useMemo(() => contributeTabsStyles(r), [r]);

//   return (
//     <View style={styles.tabBar}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const isFocused = state.index === index;

//         const label =
//           typeof options.tabBarLabel === 'string'
//             ? options.tabBarLabel
//             : typeof options.title === 'string'
//             ? options.title
//             : route.name;

//         return (
//           <PlatformPressable
//             key={route.key}
//             onPress={() => navigation.navigate(route.name)}
//             style={[styles.tabItem, isFocused && styles.tabItemActive]}
//           >
//             <Animated.Text
//               style={[
//                 styles.tabLabel,
//                 isFocused ? styles.tabLabelActive : styles.tabLabelInactive,
//               ]}
//             >
//               {label}
//             </Animated.Text>
//             {isFocused && <View style={styles.tabIndicator} />}
//           </PlatformPressable>
//         );
//       })}
//     </View>
//   );
// }

// /* ---------------- TABS ---------------- */

// const Tab = createMaterialTopTabNavigator();

// export default function Contribute() {
//   const r = useResponsive();
      
//         const styles = useMemo(() => contributeTabsStyles(r), [r]);

//   return (
//     <View style={styles.pageContainerPlain}>
//       <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
//         <Tab.Screen name="Contributions" component={ContributionsScreen} />
//         <Tab.Screen name="Misinformation" component={MisinformationScreen} />
//       </Tab.Navigator>
//     </View>
//   );
// }

import { ContributionsCard } from '@/components/cards/contributions-card';
import { MisinformationPost } from '@/components/cards/misinfomartion-post';

import { ContributionsFilter } from '@/components/filters/contributions-filter';
import { MisinformationFilter } from '@/components/filters/misinformation-filter';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import {
  getStorageItem,
  setStorageItem,
} from '@/lib/auth/storage.native';

import { colors } from '@/styles/contribute/contribute-colors';
import { contributeTabsStyles } from '@/styles/contribute/contribute-form-styles';
import { icon, useResponsive } from '@/styles/responsive';

import { Ionicons, Octicons } from '@expo/vector-icons';

import { PlatformPressable } from '@react-navigation/elements';

import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';

import { router, useLocalSearchParams } from 'expo-router';

import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Animated,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';


/* =========================================================
   STORAGE KEY
========================================================= */

const CONTRIBUTE_TAB_KEY =
  'last_contribute_tab';


/* =========================================================
   TAB TYPE
========================================================= */

type ContributeTab =
  | 'Contributions'
  | 'Misinformation';


/* =========================================================
   CONTRIBUTIONS SCREEN
========================================================= */

function ContributionsScreen() {

  const [
    showFilter,
    setShowFilter,
  ] = useState(false);

  const r = useResponsive();

  const styles = useMemo(
    () => contributeTabsStyles(r),
    [r]
  );


  return (
    <ThemedView
      style={styles.pageContainerPlain}
    >

      <ScrollView
        style={styles.pageContainerPlain}
        contentContainerStyle={
          styles.scrollContentPadded
        }
        showsVerticalScrollIndicator={false}
      >

        {/* ACTION BAR */}

        <ThemedView
          style={styles.actionBar}
        >

          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.85}
            onPress={() =>
              router.push(
                '/drawer/tabs/contributions/add-contribute'
              )
            }
          >

            <Ionicons
              name="add"
              size={icon(18)}
              color="white"
            />

            <ThemedText
              style={styles.primaryBtnText}
            >
              Add Contribution
            </ThemedText>

          </TouchableOpacity>


          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() =>
              setShowFilter(!showFilter)
            }
            activeOpacity={0.75}
          >

            <Ionicons
              name="options-outline"
              size={icon(20)}
              color={
                showFilter
                  ? '#3d6ebd'
                  : colors.primary
              }
            />

          </TouchableOpacity>

        </ThemedView>


        {/* CONTRIBUTIONS */}

        <ThemedView
          style={styles.cardList}
        >

          <ContributionsCard />

        </ThemedView>

      </ScrollView>


      {showFilter && (
        <ContributionsFilter
          onClose={() =>
            setShowFilter(false)
          }
        />
      )}

    </ThemedView>
  );
}


/* =========================================================
   MISINFORMATION SCREEN
========================================================= */

function MisinformationScreen() {

  const [
    showFilter,
    setShowFilter,
  ] = useState(false);

  const r = useResponsive();

  const styles = useMemo(
    () => contributeTabsStyles(r),
    [r]
  );


  return (
    <ThemedView
      style={styles.pageContainerPlain}
    >

      <ScrollView
        style={styles.pageContainerPlain}
        contentContainerStyle={
          styles.scrollContentPadded
        }
        showsVerticalScrollIndicator={false}
      >

        {/* ACTION BAR */}

        <ThemedView
          style={styles.actionBar}
        >

          <TouchableOpacity
            style={styles.dangerBtn}
            activeOpacity={0.85}
            onPress={() =>
              router.push(
                '/drawer/tabs/contributions/report-misinfo'
              )
            }
          >

            <Octicons
              name="alert"
              size={icon(15)}
              color="white"
            />

            <ThemedText
              style={styles.primaryBtnText}
            >
              Report Misinformation
            </ThemedText>

          </TouchableOpacity>


          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() =>
              setShowFilter(!showFilter)
            }
            activeOpacity={0.75}
          >

            <Ionicons
              name="options-outline"
              size={icon(20)}
              color={
                showFilter
                  ? '#3d6ebd'
                  : colors.primary
              }
            />

          </TouchableOpacity>

        </ThemedView>


        {/* MISINFORMATION POSTS */}

        <ThemedView
          style={styles.cardList}
        >

          <MisinformationPost />

        </ThemedView>

      </ScrollView>


      {showFilter && (
        <MisinformationFilter
          onClose={() =>
            setShowFilter(false)
          }
        />
      )}

    </ThemedView>
  );
}


/* =========================================================
   CUSTOM TAB BAR
========================================================= */

function MyTabBar({
  state,
  descriptors,
  navigation,
  onNavigationReady,
}: MaterialTopTabBarProps & {
  onNavigationReady: (
    navigation: MaterialTopTabBarProps['navigation']
  ) => void;
}) {
  const r = useResponsive();

  const styles = useMemo(
    () => contributeTabsStyles(r),
    [r]
  );

  React.useEffect(() => {
    onNavigationReady(navigation);
  }, [navigation, onNavigationReady]);

  const handleTabPress = async (
    tabName: ContributeTab
  ) => {
    console.log(
      '[CONTRIBUTE] User selected tab:',
      tabName
    );

    try {
      await setStorageItem(
        CONTRIBUTE_TAB_KEY,
        tabName
      );

      console.log(
        '[CONTRIBUTE] Tab saved:',
        tabName
      );
    } catch (error) {
      console.log(
        '[CONTRIBUTE] Failed to save tab:',
        error
      );
    }

    navigation.navigate(tabName);
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } =
          descriptors[route.key];

        const isFocused =
          state.index === index;

        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : typeof options.title === 'string'
            ? options.title
            : route.name;

        return (
          <PlatformPressable
            key={route.key}
            onPress={() =>
              handleTabPress(
                route.name as ContributeTab
              )
            }
            style={[
              styles.tabItem,
              isFocused &&
                styles.tabItemActive,
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

            {isFocused && (
              <View
                style={styles.tabIndicator}
              />
            )}
          </PlatformPressable>
        );
      })}
    </View>
  );
}


/* =========================================================
   MATERIAL TOP TAB NAVIGATOR
========================================================= */

const Tab = createMaterialTopTabNavigator();

/* =========================================================
   MAIN CONTRIBUTE SCREEN
========================================================= */

export default function Contribute() {
  const r = useResponsive();

  const styles = useMemo(
    () => contributeTabsStyles(r),
    [r]
  );

  const {
    tab,
    refresh,
  } = useLocalSearchParams<{
    tab?: string;
    refresh?: string;
  }>();

  const [savedTab, setSavedTab] =
    useState<ContributeTab>(
      'Contributions'
    );

  const [isTabLoaded, setIsTabLoaded] =
    useState(false);

  const tabNavigationRef =
    React.useRef<
      MaterialTopTabBarProps['navigation'] | null
    >(null);

  /*
   * ----------------------------------------------------------
   * SAVE TAB NAVIGATION REFERENCE
   * ----------------------------------------------------------
   */
  const handleNavigationReady =
    React.useCallback(
      (
        navigation: MaterialTopTabBarProps['navigation']
      ) => {
        console.log(
          '[CONTRIBUTE] Tab navigation ready'
        );

        tabNavigationRef.current =
          navigation;
      },
      []
    );

  /*
   * ----------------------------------------------------------
   * LOAD PERSISTENT TAB
   * ----------------------------------------------------------
   *
   * If Home sends:
   *
   * tab=Misinformation
   *
   * that request takes priority over the saved tab.
   *
   * Otherwise, restore the previously saved tab.
   */
  useEffect(() => {
    let mounted = true;

    const loadSavedTab = async () => {
      try {
        console.log(
          '[CONTRIBUTE] Loading saved tab...'
        );

        /*
         * HOME VIEW ALL REQUEST
         *
         * Do NOT change persistent storage here.
         * This is only an explicit navigation request.
         */
        if (tab === 'Misinformation') {
          console.log(
            '[CONTRIBUTE] Home requested Misinformation'
          );

          if (mounted) {
            setSavedTab(
              'Misinformation'
            );
          }

          return;
        }

        /*
         * NORMAL CONTRIBUTE NAVIGATION
         *
         * Restore the persistent tab.
         */
        const storedTab =
          await getStorageItem(
            CONTRIBUTE_TAB_KEY
          );

        console.log(
          '[CONTRIBUTE] Stored tab:',
          storedTab
        );

        if (!mounted) {
          return;
        }

        if (
          storedTab === 'Misinformation'
        ) {
          console.log(
            '[CONTRIBUTE] Restoring Misinformation'
          );

          setSavedTab(
            'Misinformation'
          );
        } else {
          console.log(
            '[CONTRIBUTE] Restoring Contributions'
          );

          setSavedTab(
            'Contributions'
          );
        }
      } catch (error) {
        console.log(
          '[CONTRIBUTE] Error loading saved tab:',
          error
        );

        if (mounted) {
          setSavedTab(
            'Contributions'
          );
        }
      } finally {
        if (mounted) {
          setIsTabLoaded(true);
        }
      }
    };

    loadSavedTab();

    return () => {
      mounted = false;
    };
  }, [tab]);

  /*
   * ----------------------------------------------------------
   * EXPLICIT HOME NAVIGATION
   * ----------------------------------------------------------
   *
   * This is what fixes the problem.
   *
   * Even if the Contribute page is already mounted and the
   * user previously switched to Contributions, clicking
   * Home -> View All will explicitly navigate to
   * Misinformation again.
   */
  useEffect(() => {
    if (
      !isTabLoaded ||
      tab !== 'Misinformation'
    ) {
      return;
    }

    console.log(
      '[CONTRIBUTE] Explicit Misinformation request'
    );

    const timer = setTimeout(() => {
      const navigation =
        tabNavigationRef.current;

      if (!navigation) {
        console.log(
          '[CONTRIBUTE] Tab navigation not ready'
        );

        return;
      }

      console.log(
        '[CONTRIBUTE] Navigating to Misinformation'
      );

      navigation.navigate(
        'Misinformation'
      );
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [
    tab,
    refresh,
    isTabLoaded,
  ]);

  /*
   * ----------------------------------------------------------
   * WAIT FOR PERSISTENT TAB TO LOAD
   * ----------------------------------------------------------
   */
  if (!isTabLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor:
            'transparent',
        }}
      />
    );
  }

  /*
   * ----------------------------------------------------------
   * MATERIAL TOP TAB NAVIGATOR
   * ----------------------------------------------------------
   */
  return (
    <View
      style={styles.pageContainerPlain}
    >
      <Tab.Navigator
        initialRouteName={savedTab}
        tabBar={(props) => (
          <MyTabBar
            {...props}
            onNavigationReady={
              handleNavigationReady
            }
          />
        )}
      >
        <Tab.Screen
          name="Contributions"
          component={
            ContributionsScreen
          }
        />

        <Tab.Screen
          name="Misinformation"
          component={
            MisinformationScreen
          }
        />
      </Tab.Navigator>
    </View>
  );
}