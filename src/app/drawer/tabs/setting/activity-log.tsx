// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { icon, useResponsive } from "@/styles/responsive";
// import { settingsStyles } from "@/styles/settings/settings-styles";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React, { useMemo } from "react";
// import {
//   ScrollView,
//   TouchableOpacity
// } from "react-native";

// const ACTIVITYLOG = [
//   {
//     icon: "person-outline",
//     title: "Name",
//     desc: "You changed your name to name.",
//     date: "1 yr",
//     route: "/drawer/tabs/setting/profile-settings",
//   },
//   {
//     icon: "mail-outline",
//     title: "Email",
//     desc: "You changed your email address to new@email.com.",
//     date: "2 yrs",
//     route: "/drawer/tabs/setting/profile-settings",
//   },
//   {
//     icon: "information-circle-outline",
//     title: "Account Created",
//     desc: "You created your account on March 1, 2023",
//     date: "3 yrs",
//     route: "/drawer/tabs/profiles/profile",
//   },
// ];

// export default function ActivityLog() {

//       const r = useResponsive();
            
//       const styles = useMemo(() => settingsStyles(r), [r]);
      
//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//     >
//       <ThemedView>
//         <ThemedView style={styles.headerContainer}>
//           <ThemedText style={styles.headerTxt}>
//             Review changes you’ve made to your account since you created it.
//           </ThemedText>
//         </ThemedView>

//         <ThemedView style={styles.dividerLine}></ThemedView>

//         {ACTIVITYLOG.map((item, index) => (
//           <React.Fragment key={index}>
//             <ThemedView style={styles.row}>
//               <Ionicons
//                 name={item.icon as keyof typeof Ionicons.glyphMap}
//                 size={icon(20)}
//                 color="#35408E"
//               />

//               <ThemedView style={styles.column}>
//                 <ThemedText style={styles.title}>
//                   {item.title}
//                 </ThemedText>

//                 <ThemedText style={styles.desc}>
//                   {item.desc}
//                 </ThemedText>

//                 <ThemedText style={styles.date}>
//                   {item.date}
//                 </ThemedText>
//               </ThemedView>

//               <TouchableOpacity onPress={() => router.push(item.route as any)}>
//                 <Ionicons
//                   name="chevron-forward"
//                   size={icon(20)}
//                   color="#35408E"
//                 />
//               </TouchableOpacity>
//             </ThemedView>

            
//           </React.Fragment>
//         ))}
        

//       </ThemedView>
//     </ScrollView>
//   );
//}
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { ActivityLogsInterfaceResult } from "@/lib/interface/activitiy-logs/activity-log.interface";
import { icon, useResponsive } from "@/styles/responsive";
import { settingsStyles } from "@/styles/settings/settings-styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

export default function ActivityLog() {
  const r = useResponsive();
  const styles = useMemo(() => settingsStyles(r), [r]);
  const { user, token, isLoading: authLoading } = useAuth();

  const currentUserId = user?.user_id ?? "";
  const canLoadLogs = !authLoading && Boolean(currentUserId) && Boolean(token);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useFormQuery<ActivityLogsInterfaceResult>({
      key: ["activity-logs", currentUserId],
      url: `/maintenance/activity-logs/${currentUserId}`,
      enabled: canLoadLogs,
      headers: {
        "x-api-key": "testing",
        "x-api-version": "2026-02-26",
        Authorization: `Bearer ${token ?? ""}`,
      },
      params: {
        limit: 20,
        orderBy: "created_at",
        sortBy: "desc",
        startCursor: "",
        endCursor: "",
      },
    });

  console.log("[ACTIVITY] USER ID:", currentUserId);
  console.log("[ACTIVITY] TOKEN:", Boolean(token));
  console.log("[ACTIVITY] AUTH LOADING:", authLoading);
  console.log("[ACTIVITY] CAN LOAD:", canLoadLogs);
  console.log("[ACTIVITY] RESPONSE:", JSON.stringify(data, null, 2));

  if (isError) {
    console.log("[ACTIVITY] ERROR:", error);
  }

  const logs = data?.data?.edges ?? [];

  const getIcon = (type: string): keyof typeof Ionicons.glyphMap => {
    const value = type?.toLowerCase().replace(/[_-]/g, " ") ?? "";
    if (value.includes("login") || value.includes("sign in") || value.includes("signin")) return "log-in-outline";
    if (value.includes("logout") || value.includes("sign out") || value.includes("signout")) return "log-out-outline";
    if (value.includes("name") || value.includes("profile")) return "person-outline";
    if (value.includes("email") || value.includes("mail")) return "mail-outline";
    if (value.includes("password")) return "lock-closed-outline";
    if (value.includes("organization")) return "business-outline";
    if (value.includes("address") || value.includes("location")) return "location-outline";
    return "information-circle-outline";
  };

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const formatTime = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" });
  };

  const formatRelative = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    if (years) return `${years} ${years === 1 ? "yr" : "yrs"}`;
    if (months) return `${months} ${months === 1 ? "mo" : "mos"}`;
    if (days) return `${days} ${days === 1 ? "day" : "days"}`;
    if (hours) return `${hours} ${hours === 1 ? "hr" : "hrs"}`;
    if (minutes) return `${minutes} ${minutes === 1 ? "min" : "mins"}`;
    return "Just now";
  };

  const messageStyle = {
    paddingVertical: r.spacing(24),
    alignItems: "center" as const,
  };

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <ThemedText style={styles.headerTxt}>
            Track, review, and audit all recent actions and changes made within your account.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.dividerLine} />

        {authLoading && (
          <View style={messageStyle}>
            <ActivityIndicator size="small" color="#35408E" />
          </View>
        )}

        {!authLoading && !currentUserId && (
          <View style={messageStyle}>
            <ThemedText style={styles.desc}>Unable to identify the logged-in user.</ThemedText>
          </View>
        )}

        {!authLoading && currentUserId && !token && (
          <View style={messageStyle}>
            <ThemedText style={styles.desc}>Authentication token is missing.</ThemedText>
          </View>
        )}

        {canLoadLogs && isLoading && (
          <View style={messageStyle}>
            <ActivityIndicator size="small" color="#35408E" />
          </View>
        )}

        {canLoadLogs && !isLoading && isError && (
          <View style={messageStyle}>
            <ThemedText style={styles.desc}>Failed to load activity logs.</ThemedText>
          </View>
        )}

        {canLoadLogs && !isLoading && !isError && logs.length === 0 && (
          <View style={messageStyle}>
            <ThemedText style={styles.desc}>No activity logs available.</ThemedText>
          </View>
        )}

        {canLoadLogs && isFetching && !isLoading && (
          <View style={{ alignItems: "center", paddingVertical: 8 }}>
            <ActivityIndicator size="small" color="#35408E" />
          </View>
        )}

        {canLoadLogs && !isError && logs.map((edge, index) => {
          const item = edge.node;
          if (!item) return null;

          return (
            <ThemedView key={item.activity_logs_id ?? `${edge.cursor}-${index}`} style={styles.row}>
              <Ionicons name={getIcon(item.type)} size={icon(20)} color="#35408E" />
              <ThemedView style={styles.column}>
                <ThemedText style={styles.title}>{item.type}</ThemedText>
                <ThemedText style={styles.desc}>{item.decription}</ThemedText>
                <ThemedText style={styles.date}>
                  {formatRelative(item.created_at)} • {formatDate(item.created_at)} • {formatTime(item.created_at)}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          );
        })}
      </ThemedView>
    </ScrollView>
  );
}
