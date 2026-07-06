import CustomDrawer from "@/components/CustomDrawer";
import { ProfileDropDown } from "@/components/dropdown/profile-dropdown";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { usePathname, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useState } from "react";
import { Image, TouchableOpacity } from "react-native";

export default function DrawerLayout() {
  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // ✅ BACK BUTTON CONDITIONS
  const isResourceDetails =
    pathname.startsWith("/drawer/tabs/learn/resources-detail");

  const isAddContribute =
    pathname.startsWith("/drawer/tabs/contributions/add-contribute");

  const isReportMisinformation =
    pathname.startsWith("/drawer/tabs/contributions/report-misinfo");

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
  const showBackButton = isResourceDetails || isAddContribute || isReportMisinformation
                      || isProfileSettings || isEditProfile || isActivityLog || isDeviceSessions
                      || isLanguage || isAppearance || isHelp || isReportHelp || isAbout;

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: "#35408E",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",

        // ✅ LEFT HEADER (DRAWER OR BACK BUTTON)
        headerLeft: () =>
          showBackButton ? (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="chevron-back" size={26} color="#fff" />
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
            }}
          >
            <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
              <Image
                source={require("@/assets/images/profile.jpg")}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
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
          headerShown: true,
        }}
      />
    </Drawer>
  );
}