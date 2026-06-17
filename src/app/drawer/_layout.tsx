import CustomDrawer from "@/components/CustomDrawer";
import { ProfileDropDown } from "@/components/profile-dropdown";
import { ThemedView } from "@/components/themed-view";
import { Drawer } from "expo-router/drawer";
import { useState } from "react";
import { Image, TouchableOpacity } from "react-native";

export default function DrawerLayout() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: "#35408E",
        },

        headerTintColor: "#fff",
        headerTitleAlign: "center",

        headerRight: () => (
          <ThemedView
            style={{
              marginRight: 15,
              backgroundColor: "transparent",
            }}
          >
            <TouchableOpacity
              onPress={() => setShowMenu(!showMenu)}
            >
              <Image
                source={require("@/assets/images/profile.jpg")}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                }}
              />
            </TouchableOpacity>

            {showMenu && <ProfileDropDown />}
          </ThemedView>
        ),
      }}
      drawerContent={(props) => (
        <CustomDrawer {...props} />
      )}
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