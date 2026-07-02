import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#35408E",
        tabBarInactiveTintColor: "#35408E",

        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 15,
          right: 15,
          height: 70,
          borderRadius: 35,
          backgroundColor: "rgba(255,255,255,0.95)",
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
      }}
    >
      {/* VISIBLE TABS */}

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
            name={focused ? "home" : "home-outline"} 
            size={size} 
            color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
            name={focused ? "map" : "map-outline"} 
            size={size} 
            color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="contributions"
        options={{
          title: "Contribute",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
            name={focused ? "chatbubble" : "chatbubble-outline"} 
            size={size} 
            color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
            name={focused ? "book" : "book-outline"} 
            size={size} 
            color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
            name={focused ? "star" : "star-outline"} 
            size={size} 
            color={color} />
          ),
        }}
      />

      {/* HIDDEN PAGES */}

      <Tabs.Screen
        name="trends"
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
    </Tabs>
  );
}