import { ProfileDropDown } from "@/components/profile-dropdown";
import { ThemedView } from "@/components/themed-view";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Tabs, useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export default function TabsLayout() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#FFB633",
        tabBarInactiveTintColor: "#35408E",

    tabBarStyle: {
        position: "absolute",
        bottom: 20,
        left: 15,
        right: 15,
        height: 70,
        borderRadius: 35,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        paddingHorizontal: 20,
    },

    tabBarLabelStyle: {
      fontWeight: "bold",
      fontSize: 10,
      marginBottom: 5,
    },

    tabBarItemStyle: {
      paddingVertical: 5,
    },

    headerStyle: {
      backgroundColor: "#35408E",
    },

    headerTintColor: "#fff",
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",

          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),

          // DRAWER
          headerLeft: () => {
            const navigation = useNavigation<DrawerNavigationProp<any>>();

            return (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => navigation.openDrawer()}
              >
                <Ionicons name="menu" size={26} color="white" />
              </TouchableOpacity>
            );
          },
          
          //PROFILE PICTURE
          headerRight: () => (
            <ThemedView style={{ marginRight: 15, backgroundColor: "transparent" }}>
              <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                <Image
                  source={require('@/assets/images/profile.jpg')}
                  style={{ width: 30, height: 30, borderRadius: 15 }}
                />
              </TouchableOpacity>

              {/* DROPDOWN */}
              {showMenu && (
                <ProfileDropDown/>
              )}
            </ThemedView>
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",

          tabBarIcon: ({ color }) => (
            <Ionicons name="map" size={24} color={color} />
          ),

          // DRAWER
          headerLeft: () => {
            const navigation = useNavigation<DrawerNavigationProp<any>>();

            return (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => navigation.openDrawer()}
              >
                <Ionicons name="menu" size={26} color="white" />
              </TouchableOpacity>
            );
          },
          
          //PROFILE PICTURE
          headerRight: () => (
            <ThemedView style={{ marginRight: 15, backgroundColor: "transparent" }}>
              <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                <Image
                  source={require('@/assets/images/profile.jpg')}
                  style={{ width: 30, height: 30, borderRadius: 15 }}
                />
              </TouchableOpacity>

              {/* DROPDOWN */}
              {showMenu && (
                <ProfileDropDown/>
              )}
            </ThemedView>
          ),
        }}
      />

      <Tabs.Screen
        name="trends"
        options={{
          title: "Trends",

          tabBarIcon: ({ color }) => (
            <Ionicons name="trending-up" size={24} color={color} />
          ),

          // DRAWER
          headerLeft: () => {
            const navigation = useNavigation<DrawerNavigationProp<any>>();

            return (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => navigation.openDrawer()}
              >
                <Ionicons name="menu" size={26} color="white" />
              </TouchableOpacity>
            );
          },
          
          //PROFILE PICTURE
          headerRight: () => (
            <ThemedView style={{ marginRight: 15, backgroundColor: "transparent" }}>
              <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                <Image
                  source={require('@/assets/images/profile.jpg')}
                  style={{ width: 30, height: 30, borderRadius: 15 }}
                />
              </TouchableOpacity>

              {/* DROPDOWN */}
              {showMenu && (
                <ProfileDropDown/>
              )}
            </ThemedView>
          ),
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",

          tabBarIcon: ({ color }) => (
            <FontAwesome name="file-text" size={24} color={color} />
          ),

          // DRAWER
          headerLeft: () => {
            const navigation = useNavigation<DrawerNavigationProp<any>>();

            return (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => navigation.openDrawer()}
              >
                <Ionicons name="menu" size={26} color="white" />
              </TouchableOpacity>
            );
          },
          
          //PROFILE PICTURE
          headerRight: () => (
            <ThemedView style={{ marginRight: 15, backgroundColor: "transparent" }}>
              <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                <Image
                  source={require('@/assets/images/profile.jpg')}
                  style={{ width: 30, height: 30, borderRadius: 15 }}
                />
              </TouchableOpacity>

              {/* DROPDOWN */}
              {showMenu && (
                <ProfileDropDown/>
              )}
            </ThemedView>
          ),
        }}
      />

      <Tabs.Screen
        name="contribute"
        options={{
          title: "Contribute",

          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble" size={24} color={color} />
          ),

          // DRAWER
          headerLeft: () => {
            const navigation = useNavigation<DrawerNavigationProp<any>>();

            return (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => navigation.openDrawer()}
              >
                <Ionicons name="menu" size={26} color="white" />
              </TouchableOpacity>
            );
          },
          
          //PROFILE PICTURE
          headerRight: () => (
            <ThemedView style={{ marginRight: 15, backgroundColor: "transparent" }}>
              <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                <Image
                  source={require('@/assets/images/profile.jpg')}
                  style={{ width: 30, height: 30, borderRadius: 15 }}
                />
              </TouchableOpacity>

              {/* DROPDOWN */}
              {showMenu && (
                <ProfileDropDown/>
              )}
            </ThemedView>
          ),
        }}
      />

      <Tabs.Screen
        name="resources"
        options={{

          title: "Learn",

          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={24} color={color} />
          ),

          // DRAWER
          headerLeft: () => {
            const navigation = useNavigation<DrawerNavigationProp<any>>();

            return (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => navigation.openDrawer()}
              >
                <Ionicons name="menu" size={26} color="white" />
              </TouchableOpacity>
            );
          },
          
          //PROFILE PICTURE
          headerRight: () => (
            <ThemedView style={{ marginRight: 15, backgroundColor: "transparent" }}>
              <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                <Image
                  source={require('@/assets/images/profile.jpg')}
                  style={{ width: 30, height: 30, borderRadius: 15 }}
                />
              </TouchableOpacity>

              {/* DROPDOWN */}
              {showMenu && (
                <ProfileDropDown/>
              )}
            </ThemedView>
          ),
        }}
      />

      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",

          tabBarIcon: ({ color }) => (
            <Ionicons name="star" size={24} color={color} />
          ),

          // DRAWER
          headerLeft: () => {
            const navigation = useNavigation<DrawerNavigationProp<any>>();

            return (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => navigation.openDrawer()}
              >
                <Ionicons name="menu" size={26} color="white" />
              </TouchableOpacity>
            );
          },
          
          //PROFILE PICTURE
          headerRight: () => (
            <ThemedView style={{ marginRight: 15, backgroundColor: "transparent" }}>
              <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                <Image
                  source={require('@/assets/images/profile.jpg')}
                  style={{ width: 30, height: 30, borderRadius: 15 }}
                />
              </TouchableOpacity>

              {/* DROPDOWN */}
              {showMenu && (
                <ProfileDropDown/>
              )}
            </ThemedView>
          ),
        }}
      />

      

    </Tabs>
  );
}

const styles = StyleSheet.create({
    
});