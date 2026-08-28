import CustomDrawer from "@/components/CustomDrawer";
import { ProfileDropDown } from "@/components/dropdown/profile-dropdown";
import { ThemedView } from "@/components/themed-view";
import { font, icon, isAndroidTablet, isCompactAndroid, isFold, isIPad, isIPadMini, isLargeIPad, isNormalScreen, isTallScreen, radius, scale, verticalScale } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Href, useGlobalSearchParams, usePathname, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useState } from "react";
import { Image, TouchableOpacity } from "react-native";

export default function DrawerLayout() {
  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { returnTo } = useGlobalSearchParams<{
    returnTo?: string;
  }>();

  // ✅ BACK BUTTON CONDITIONS
  const isResourceDetails =
    pathname.startsWith("/drawer/tabs/learn/resources-detail");

  const isAddContribute =
    pathname.startsWith("/drawer/tabs/contributions/add-contribute");

  const isReportMisinformation =
    pathname.startsWith("/drawer/tabs/contributions/report-misinfo");

  const isViewTrendsPost =
    pathname.startsWith("/drawer/tabs/trend/view-trendspost");

  const isViewBadges =
    pathname.startsWith("/drawer/tabs/badges/view-badges");

  const isViewResources = 
    pathname.startsWith("/drawer/tabs/profiles/view-resources");

  const isViewDiscussions = 
    pathname.startsWith("/drawer/tabs/profiles/view-discussions");


  const isProfileSettings =
    pathname.startsWith("/drawer/tabs/setting/profile-settings");

  const isEditProfile =
    pathname.startsWith("/drawer/tabs/setting/profile/edit-");

  const isActivityLog =
    pathname.startsWith("/drawer/tabs/setting/activity-log");
  
  const isDeviceSessions = 
    pathname.startsWith("/drawer/tabs/setting/device-sessions");
  
  const isLanguage = 
    pathname.startsWith("/drawer/tabs/setting/language");

  const isAppearance = 
    pathname.startsWith("/drawer/tabs/setting/appearance");

  const isHelp = 
    pathname.startsWith("/drawer/tabs/setting/help");

  const isReportHelp = 
    pathname.startsWith("/drawer/tabs/setting/problem/report-problem");

  const isAbout = 
    pathname.startsWith("/drawer/tabs/setting/about");


  // ✅ SINGLE FLAG FOR BACK BEHAVIOR
  const showBackButton = isResourceDetails || isAddContribute || isReportMisinformation || isViewTrendsPost
                      || isProfileSettings || isEditProfile || isViewBadges || isViewResources || isViewDiscussions 
                      || isActivityLog || isDeviceSessions || isLanguage || isAppearance || isHelp 
                      || isReportHelp || isAbout;

  const handleBack = () => {
    /*
     * View Badges has an explicit returnTo parameter.
     *
     * Profile:
     * /drawer/tabs/badges/view-badges
     * ?returnTo=/drawer/tabs/profiles/profile
     *
     * Rewards:
     * /drawer/tabs/badges/view-badges
     * ?returnTo=/drawer/tabs/rewards
     */

    if (isViewBadges && returnTo) {
      router.replace(returnTo as Href);
          console.log("Current pathname:", pathname);
    console.log("returnTo:", returnTo);
      return;
    }

    /*
     * For all the other detail pages,
     * keep your existing behavior.
     */
    router.back();
  };

  const isNormalFold = isNormalScreen && isFold;
  const isTallFold = isTallScreen && isFold;


  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: "#35408E",
          height: 
            isAndroidTablet
            ? verticalScale(90)
            : isFold
            ? verticalScale(115)
            : verticalScale(100)
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",

        // ✅ LEFT HEADER (DRAWER OR BACK BUTTON)
        headerLeft: () =>
          showBackButton ? (
            <TouchableOpacity
              onPress={handleBack}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="chevron-back" size={icon(26)} color="#fff" />
            </TouchableOpacity>
          ) : (
            <DrawerToggleButton tintColor="#fff" />
          ),

        // ✅ RIGHT HEADER (PROFILE MENU)
        headerRight: () => (
          <ThemedView
            style={{
              marginRight: 15,
              backgroundColor: "transparent",
              position: "relative"
            }}
          >
            <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
              <Image
                source={require("@/assets/images/profile.jpg")}
                style={{
                  width: 
                    isLargeIPad || isIPad || isIPadMini
                    || isFold
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

            {showMenu && (
              <ProfileDropDown
                onNavigate={() => setShowMenu(false)}
              />
            )}
          </ThemedView>
        ),
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="tabs"
        options={{
          headerTitle: "AdvocAid PH",
          headerTitleStyle: {
            fontSize: font(18)
          },
          headerShown: true,
        }}
      />
    </Drawer>
  );
}