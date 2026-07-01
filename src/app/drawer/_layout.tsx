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
    pathname.startsWith("/drawer/tabs/settings/profile-settings");

  const isEditProfile =
    pathname.startsWith("/drawer/tabs/settings/profile/edit-");

  // ✅ SINGLE FLAG FOR BACK BEHAVIOR
  const showBackButton = isResourceDetails || isAddContribute || isReportMisinformation
                      || isProfileSettings || isEditProfile;

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