import {
  font,
  icon,
  isAndroidTablet,
  isCompactAndroid,
  isFold,
  isIPad,
  isIPadMini,
  isLargeIPad,
  isNormalScreen,
  isTallScreen,
  radius,
  scale,
  verticalScale,
} from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useWindowDimensions, View } from "react-native";

export default function TabsLayout() {
  /*
   * ============================================================
   * RESPONSIVE VALUES
   * ============================================================
   */

  // useWindowDimensions() updates immediately when the device
  // rotates, unlike a Dimensions value calculated only once.
  const { width, height } = useWindowDimensions();

  const isLargeIPadLandscape =
    isLargeIPad && width > height;

  const isNormalFold = isNormalScreen && isFold;
  const isTallFold = isTallScreen && isFold;


  const iconSize = isLargeIPad ? icon(25) : icon(23);

  const tabBarHeight = isLargeIPad
    ? verticalScale(75)
    : verticalScale(70);

  /*
   * ============================================================
   * TAB ICON
   * ============================================================
   */

  const renderIcon = (
    name: keyof typeof Ionicons.glyphMap,
    outlineName: keyof typeof Ionicons.glyphMap
  ) => {
    return ({
      color,
      focused,
    }: {
      color: string;
      focused: boolean;
    }) => (
      <View
        style={{
          width: iconSize + scale(8),
          height: iconSize + scale(8),

          alignItems: "center",
          justifyContent: "center",

          flexShrink: 0,
        }}
      >
        <Ionicons
          name={focused ? name : outlineName}
          size={iconSize}
          color={color}
        />
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // ========================================================
        // COLORS
        // ========================================================

        tabBarActiveTintColor: "#35408E",
        tabBarInactiveTintColor: "#35408E",

        // ========================================================
        // IMPORTANT:
        // FORCE ICON ABOVE LABEL ONLY ON LARGE IPAD LANDSCAPE
        // ========================================================

        tabBarLabelPosition: isLargeIPadLandscape
          ? "below-icon"
          : undefined,

        // ========================================================
        // TAB BAR
        // ========================================================

        tabBarStyle: {
          position: "absolute",

          bottom: verticalScale(20),

          left: scale(15),
          right: scale(15),

          height: tabBarHeight,

          borderRadius: radius(35),

          backgroundColor: "rgba(255,255,255,0.95)",

          borderTopWidth: 0,

          elevation: 10,

          shadowColor: "#000",

          shadowOffset: {
            width: 0,
            height: 5,
          },

          shadowOpacity: 0.15,
          shadowRadius: 10,

          paddingHorizontal: scale(20),

          paddingVertical: 0,
        },

        // ========================================================
        // LABEL
        // ========================================================

        tabBarLabelStyle: {
          fontWeight: "bold",

          fontSize: isLargeIPad
            ? font(11)
            : font(10),

          textAlign: "center",

          /*
           * LARGE IPAD LANDSCAPE
           *
           * Keep the existing Large iPad values.
           */
          marginTop: isLargeIPad
            ? verticalScale(8)
            : isIPad || isIPadMini || isAndroidTablet || isTallFold
            ? verticalScale(5)
            : verticalScale(0),

          marginBottom: 0,

          lineHeight: isLargeIPad
            ? font(13)
            : font(12),

          includeFontPadding: false,
        },

        // ========================================================
        // TAB ITEM
        // ========================================================

        tabBarItemStyle: isLargeIPad
          ? {
              flex: 1,

              alignItems: "center",
              justifyContent: "center",

              /*
               * Explicitly column for Large iPad.
               * tabBarLabelPosition above is what prevents
               * React Navigation from switching to beside-icon
               * on landscape.
               */
              flexDirection: "column",

              paddingVertical: 0,
              paddingHorizontal: 0,

              marginTop: verticalScale(15),

              margin: 0,
            }
          : isIPad || isAndroidTablet
          ? {
              marginTop: verticalScale(13)
          }
          : isNormalFold || isCompactAndroid
          ? {
            marginTop: verticalScale(0),
          }
          : {
              /*
               * ==================================================
               * PHONE
               * ==================================================
               */

              flex: 1,

              alignItems: "center",
              justifyContent: "center",

              flexDirection: "column",

              paddingVertical: verticalScale(0),

              paddingHorizontal: verticalScale(0),

              height: verticalScale(50),
              marginTop: verticalScale(10),

              margin: 0,
            },

        // ========================================================
        // ICON CONTAINER
        // ========================================================

        tabBarIconStyle: {
          margin: 0,

          flexShrink: 0,
        },
      }}
    >
      {/* ==========================================================
          VISIBLE TABS
          ========================================================== */}

      {/* HOME */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",

          tabBarIcon: renderIcon(
            "home",
            "home-outline"
          ),
        }}
      />

      {/* MAP */}
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",

          tabBarIcon: renderIcon(
            "map",
            "map-outline"
          ),
        }}
      />

      {/* CONTRIBUTE */}
      <Tabs.Screen
        name="contributions"
        options={{
          title: "Contribute",

          tabBarIcon: renderIcon(
            "chatbubble",
            "chatbubble-outline"
          ),
        }}
      />

      {/* LEARN */}
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",

          tabBarIcon: renderIcon(
            "book",
            "book-outline"
          ),
        }}
      />

      {/* REWARDS */}
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",

          tabBarIcon: renderIcon(
            "star",
            "star-outline"
          ),
        }}
      />

      {/* ==========================================================
          HIDDEN PAGES
          ========================================================== */}

      <Tabs.Screen
        name="trend"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="profiles"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="badges/view-badges"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
