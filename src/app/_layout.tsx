import { ThemedView } from "@/components/themed-view";
import {
  AuthProvider,
  useAuth,
} from "@/lib/auth/AuthProvider";

import { setStorageItem } from "@/lib/auth/storage.native";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  Stack,
  useGlobalSearchParams,
  usePathname,
} from "expo-router";

import React, {
  useEffect,
} from "react";

import {
  ActivityIndicator,
  useColorScheme,
} from "react-native";


const queryClient =
  new QueryClient();

const LAST_ROUTE_KEY =
  "last_authenticated_route";


function RootNavigation() {

  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  const pathname = usePathname();
  const params = useGlobalSearchParams();


  /*
   * =====================================================
   * SAVE CURRENT ROUTE
   * =====================================================
   */

useEffect(() => {
  if (isLoading || !isAuthenticated) {
    return;
  }

  /*
   * Don't save authentication routes.
   */
  if (
    pathname === "/" ||
    pathname.startsWith("/auth")
  ) {
    return;
  }

  let routeToSave = pathname;

  if (
    routeToSave.endsWith("/Contributions") ||
    routeToSave.endsWith("/Misinformation")
  ) {
    routeToSave =
      routeToSave.substring(
        0,
        routeToSave.lastIndexOf("/")
      );
  }

    const queryParams = new URLSearchParams();

  Object.entries(params).forEach(
    ([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.set(
          key,
          Array.isArray(value)
            ? value[0]
            : String(value)
        );
      }
    }
  );

  const queryString =
    queryParams.toString();

  if (queryString) {
    routeToSave = `${routeToSave}?${queryString}`;
  }

  console.log(
    "[ROUTE] Actual pathname:",
    pathname
  );

  console.log(
    "[ROUTE] Route params:",
    params
  );

  console.log(
    "[ROUTE] Saving route:",
    routeToSave
  );

  setStorageItem(
    LAST_ROUTE_KEY,
    routeToSave
  )
    .then(() => {
      console.log(
        "[ROUTE] Route saved successfully:",
        routeToSave
      );
    })
    .catch((error) => {
      console.log(
        "[ROUTE] Failed to save route:",
        error
      );
    });

}, [
  pathname,
  params,
  isAuthenticated,
  isLoading,
]);



  if (isLoading) {

    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size="large"
        />
      </ThemedView>
    );

  }


  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="auth"
      />

      <Stack.Screen
        name="drawer"
        options={{
          headerShown: false,
        }}
      />

    </Stack>
  );
}


export default function RootLayout() {

  const colorScheme =
    useColorScheme();


  return (
    <ThemeProvider
      value={
        colorScheme === "dark"
          ? DarkTheme
          : DefaultTheme
      }
    >

      <AuthProvider>

        <QueryClientProvider
          client={queryClient}
        >

          <RootNavigation />

        </QueryClientProvider>

      </AuthProvider>

    </ThemeProvider>
  );
}
