// import { ThemedView } from '@/components/themed-view';
// import { useAuth } from '@/lib/auth/AuthProvider';
// import { Redirect } from 'expo-router';
// import { ActivityIndicator } from 'react-native';

// export default function Index() {
//   const { isAuthenticated, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </ThemedView>
//     );
//   }

//   return <Redirect href={isAuthenticated ? '/drawer/tabs/home' : '/auth/login'} />;
// }

// import { ThemedView } from "@/components/themed-view";
// import { useAuth } from "@/lib/auth/AuthProvider";
// import { getStorageItem } from "@/lib/auth/storage.native";
// import { useRouter } from "expo-router";
// import React, {
//   useEffect,
//   useState,
// } from "react";
// import {
//   ActivityIndicator,
// } from "react-native";

// const LAST_ROUTE_KEY =
//   "last_authenticated_route";

// export default function Index() {
//   const {
//     isAuthenticated,
//     isLoading,
//   } = useAuth();

//   const router = useRouter();

//   const [
//     lastRoute,
//     setLastRoute,
//   ] = useState<string | null>(
//     null
//   );

//   const [
//     routeLoading,
//     setRouteLoading,
//   ] = useState(true);

//   useEffect(() => {
//     const loadLastRoute =
//       async () => {
//         try {
//           const storedRoute =
//             await getStorageItem(
//               LAST_ROUTE_KEY
//             );

//           console.log(
//             "[ROUTE] Stored last route:",
//             storedRoute
//           );

//           setLastRoute(
//             storedRoute
//           );
//         } catch (error) {
//           console.log(
//             "[ROUTE] Failed to load last route:",
//             error
//           );

//           setLastRoute(null);
//         } finally {
//           setRouteLoading(false);
//         }
//       };

//     if (!isLoading) {
//       loadLastRoute();
//     }
//   }, [isLoading]);

//   useEffect(() => {
//     if (
//       isLoading ||
//       routeLoading
//     ) {
//       return;
//     }

//     if (!isAuthenticated) {
//       console.log(
//         "[INDEX] Not authenticated → login"
//       );

//       router.replace(
//         "/auth/login"
//       );

//       return;
//     }

//     const destination =
//       lastRoute ||
//       "/drawer/tabs/home";

//     console.log(
//       "[INDEX] Authenticated →",
//       destination
//     );

//     router.replace(
//       destination as any
//     );
//   }, [
//     isAuthenticated,
//     isLoading,
//     routeLoading,
//     lastRoute,
//     router,
//   ]);

//   return (
//     <ThemedView
//       style={{
//         flex: 1,
//         justifyContent:
//           "center",
//         alignItems:
//           "center",
//       }}
//     >
//       <ActivityIndicator
//         size="large"
//       />
//     </ThemedView>
//   );
// }


import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getStorageItem } from "@/lib/auth/storage.native";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";

const LAST_ROUTE_KEY =
  "last_authenticated_route";

export default function Index() {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    

    const restoreRoute = async () => {
      try {
        /*
         * -------------------------------------------------
         * NOT LOGGED IN
         * -------------------------------------------------
         */

        // TEMPORARY: fix the old saved route
    // await setStorageItem(
    //   "last_authenticated_route",
    //   "/drawer/tabs/contributions/contribute"
    // );

      if (!isAuthenticated) {
        router.replace("/auth/login");
        return;
      }

      const savedRoute =
        await getStorageItem(
          "last_authenticated_route"
        );

      console.log(
        "[INDEX] Saved route:",
        savedRoute
      );

          if (!isAuthenticated) {
            console.log(
              "[INDEX] Not authenticated → login"
            );

            router.replace("/auth/login");

            return;
          }


        /*
         * -------------------------------------------------
         * LOGGED IN
         * -------------------------------------------------
         */

        // const savedRoute =
        //   await getStorageItem(
        //     LAST_ROUTE_KEY
        //   );

        console.log(
          "[INDEX] Saved route:",
          savedRoute
        );


        /*
         * -------------------------------------------------
         * RESTORE PREVIOUS ROUTE
         * -------------------------------------------------
         */

        if (
          savedRoute &&
          savedRoute.startsWith("/drawer/")
        ) {

          console.log(
            "[INDEX] Restoring previous route:",
            savedRoute
          );

          router.replace(
            savedRoute as any
          );

          return;
        }


        /*
         * -------------------------------------------------
         * DEFAULT
         * -------------------------------------------------
         */

        console.log(
          "[INDEX] No saved route → home"
        );

        router.replace(
          "/drawer/tabs/home"
        );

      } catch (error) {

        console.log(
          "[INDEX] Error restoring route:",
          error
        );

        router.replace(
          "/drawer/tabs/home"
        );
      }
    };


    restoreRoute();

  }, [
    isAuthenticated,
    isLoading,
  ]);


  if (
    isLoading
  ) {
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


  return null;
}
