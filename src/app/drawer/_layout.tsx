import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#35408E" },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#FFB633",
      }}
    >
      {/* HOME */}
      <Drawer.Screen
        name="(tabs)/home"
        options={{
          title: "Home",
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      {/* MAP */}
      <Drawer.Screen
        name="(tabs)/map"
        options={{
          title: "Map",
          drawerIcon: ({ color }) => (
            <Ionicons name="map-outline" size={22} color={color} />
          ),
        }}
      />

      {/* TRENDS */}
      <Drawer.Screen
        name="(tabs)/trends"
        options={{
          title: "Trends",
          drawerIcon: ({ color }) => (
            <Ionicons name="trending-up" size={22} color={color} />
          ),
        }}
      />

      {/* REPORTS */}
      <Drawer.Screen
        name="(tabs)/reports"
        options={{
          title: "Reports",
          drawerIcon: ({ color }) => (
            <Ionicons name="document-text-outline" size={22} color={color} />
          ),
        }}
      />

      {/* REWARDS */}
      <Drawer.Screen
        name="(tabs)/rewards"
        options={{
          title: "Rewards",
          drawerIcon: ({ color }) => (
            <Ionicons name="star-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}