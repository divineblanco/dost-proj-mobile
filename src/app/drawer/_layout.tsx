import CustomDrawer from "@/components/CustomDrawer";
import { ProfileDropDown } from "@/components/dropdown/profile-dropdown";
import { ThemedView } from "@/components/themed-view";
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
import { DrawerToggleButton } from "@react-navigation/drawer";
import {
  Href,
  useGlobalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

export default function DrawerLayout() {
  const [showMenu, setShowMenu] = useState(false);

  // Position of the dropdown relative to the screen
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });

  // Reference to the profile button
  const profileButtonRef = useRef<View>(null);

  const pathname = usePathname();
  const router = useRouter();

  const { returnTo } = useGlobalSearchParams<{
    returnTo?: string;
  }>();

  // ============================================================
  // BACK BUTTON CONDITIONS
  // ============================================================

  const isResourceDetails =
    pathname.startsWith(
      "/drawer/tabs/learn/resources-detail"
    );

  const isAddContribute =
    pathname.startsWith(
      "/drawer/tabs/contributions/add-contribute"
    );

  const isReportMisinformation =
    pathname.startsWith(
      "/drawer/tabs/contributions/report-misinfo"
    );

  const isViewTrendsPost =
    pathname.startsWith(
      "/drawer/tabs/trend/view-trendspost"
    );

  const isViewBadges =
    pathname.startsWith(
      "/drawer/tabs/badges/view-badges"
    );

  const isViewResources =
    pathname.startsWith(
      "/drawer/tabs/profiles/view-resources"
    );

  const isViewDiscussions =
    pathname.startsWith(
      "/drawer/tabs/profiles/view-discussions"
    );

  const isProfileSettings =
    pathname.startsWith(
      "/drawer/tabs/setting/profile-settings"
    );

  const isEditProfile =
    pathname.startsWith(
      "/drawer/tabs/setting/profile/edit-"
    );

  const isActivityLog =
    pathname.startsWith(
      "/drawer/tabs/setting/activity-log"
    );

  const isDeviceSessions =
    pathname.startsWith(
      "/drawer/tabs/setting/device-sessions"
    );

  const isLanguage =
    pathname.startsWith(
      "/drawer/tabs/setting/language"
    );

  const isAppearance =
    pathname.startsWith(
      "/drawer/tabs/setting/appearance"
    );

  const isHelp =
    pathname.startsWith(
      "/drawer/tabs/setting/help"
    );

  const isReportHelp =
    pathname.startsWith(
      "/drawer/tabs/setting/problem/report-problem"
    );

  const isAbout =
    pathname.startsWith(
      "/drawer/tabs/setting/about"
    );

  // ============================================================
  // SINGLE FLAG FOR BACK BEHAVIOR
  // ============================================================

  const showBackButton =
    isResourceDetails ||
    isAddContribute ||
    isReportMisinformation ||
    isViewTrendsPost ||
    isProfileSettings ||
    isEditProfile ||
    isViewBadges ||
    isViewResources ||
    isViewDiscussions ||
    isActivityLog ||
    isDeviceSessions ||
    isLanguage ||
    isAppearance ||
    isHelp ||
    isReportHelp ||
    isAbout;

  // ============================================================
  // BACK HANDLER
  // ============================================================

  const handleBack = () => {
    /*
     * View Badges has an explicit returnTo parameter.
     *
     * Example:
     * /drawer/tabs/badges/view-badges
     * ?returnTo=/drawer/tabs/profiles/profile
     */

    if (isViewBadges && returnTo) {
      router.replace(returnTo as Href);

      console.log("Current pathname:", pathname);
      console.log("returnTo:", returnTo);

      return;
    }

    router.back();
  };

  // ============================================================
  // FOLD SCREEN CONDITIONS
  // ============================================================

  const isNormalFold = isNormalScreen && isFold;
  const isTallFold = isTallScreen && isFold;

  // ============================================================
  // OPEN PROFILE DROPDOWN
  // ============================================================

  const openProfileDropdown = () => {
    profileButtonRef.current?.measure(
      (
        x,
        y,
        width,
        height,
        pageX,
        pageY
      ) => {
        const screenWidth =
          Dimensions.get("window").width;

        /*
         * Position dropdown directly below
         * the profile button.
         */
        setDropdownPosition({
          top: pageY + height,

          /*
           * Align the right edge of the dropdown
           * with the right edge of the profile button.
           */
          right:
            screenWidth - (pageX + width),
        });

        setShowMenu(true);
      }
    );
  };

  // ============================================================
  // CLOSE PROFILE DROPDOWN
  // ============================================================

  const closeProfileDropdown = () => {
    setShowMenu(false);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      <Drawer
        screenOptions={{
          // ====================================================
          // HEADER
          // ====================================================

          headerStyle: {
            backgroundColor: "#35408E",

            height: isAndroidTablet
              ? verticalScale(90)
              : isFold
              ? verticalScale(115)
              : verticalScale(100),
          },

          headerTintColor: "#fff",

          headerTitleAlign: "center",

          // ====================================================
          // LEFT HEADER
          // ====================================================

          headerLeft: () =>
            showBackButton ? (
              <TouchableOpacity
                onPress={handleBack}
                style={{
                  marginLeft: 15,
                }}
              >
                <Ionicons
                  name="chevron-back"
                  size={icon(26)}
                  color="#fff"
                />
              </TouchableOpacity>
            ) : (
              <DrawerToggleButton tintColor="#fff" />
            ),

          // ====================================================
          // RIGHT HEADER
          // ====================================================

          headerRight: () => (
            <ThemedView
              style={{
                marginRight: 15,
                backgroundColor: "transparent",
              }}
            >
              <TouchableOpacity
                ref={profileButtonRef}
                onPress={openProfileDropdown}
                activeOpacity={0.7}
              >
                <Image
                  source={require("@/assets/images/profile.jpg")}
                  style={{
                    width:
                      isLargeIPad ||
                      isIPad ||
                      isIPadMini ||
                      isFold
                        ? scale(20)
                        : isAndroidTablet
                        ? scale(23)
                        : isCompactAndroid
                        ? scale(26)
                        : scale(30),

                    height:
                      isNormalFold
                        ? verticalScale(50)
                        : isTallFold
                        ? verticalScale(40)
                        : verticalScale(30),

                    borderRadius: radius(15),
                  }}
                />
              </TouchableOpacity>
            </ThemedView>
          ),
        }}

        // ======================================================
        // DRAWER CONTENT
        // ======================================================

        drawerContent={(props) => (
          <CustomDrawer {...props} />
        )}
      >
        <Drawer.Screen
          name="tabs"
          options={{
            headerTitle: "AdvocAid PH",

            headerTitleStyle: {
              fontSize: font(18),
            },

            headerShown: true,
          }}
        />
      </Drawer>

      {/* ======================================================
          PROFILE DROPDOWN

          Render outside the Drawer so the Modal can properly
          overlay the entire application.
      ====================================================== */}

      {showMenu && (
        <ProfileDropDown
          position={dropdownPosition}
          onNavigate={closeProfileDropdown}
        />
      )}
    </>
  );
}
