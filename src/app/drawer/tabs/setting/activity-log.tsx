import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { ActivityLogsInterfaceResult } from "@/lib/interface/activitiy-logs/activity-log.interface";
import { icon, useResponsive, verticalScale } from "@/styles/responsive";
import { settingsStyles } from "@/styles/settings/settings-styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";

const PAGE_SIZE = 20;

export default function ActivityLog() {
  const r = useResponsive();
  const styles = useMemo(() => settingsStyles(r), [r]);
  const { user, token, isLoading: authLoading, isAuthenticated } = useAuth();

  const currentUserId = user?.user_id ?? "";
  const canLoadLogs =
    !authLoading && isAuthenticated && Boolean(currentUserId) && Boolean(token);

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError, error } =
    useFormQuery<ActivityLogsInterfaceResult>({
      key: ["activity-logs", currentUserId, token],
      url: `/maintenance/activity-logs/${currentUserId}`,
      enabled: canLoadLogs,
      headers: {
        "x-api-key": "testing",
        "x-api-version": "2026-02-26",
        Authorization: `Bearer ${token ?? ""}`,
      },
      params: {
        limit: 1000,
        orderBy: "created_at",
        sortBy: "desc",
        startCursor: "",
        endCursor: "",
      },
    });

  if (isError) console.log("[ACTIVITY] ERROR:", error);

  const allLogs = data?.data?.edges ?? [];
  const totalLogs = allLogs.length;

  const totalPages = Math.ceil(totalLogs / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const logs = allLogs.slice(startIndex, endIndex);

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const handleNextPage = () => {
    if (!hasNextPage || isFetching) return;
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (!hasPrevPage || isFetching) return;
    setPage((prev) => prev - 1);
  };

  const getIcon = (type: string): keyof typeof Ionicons.glyphMap => {
    const value = type?.toLowerCase().replace(/[_-]/g, " ") ?? "";

    if (value.includes("login") || value.includes("sign in") || value.includes("signin"))
      return "log-in-outline";

    if (value.includes("logout") || value.includes("sign out") || value.includes("signout"))
      return "log-out-outline";

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

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });
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

  const renderMessage = (message: string, loading = false) => (
    <View style={{ paddingVertical: r.spacing(24), alignItems: "center" }}>
      {loading && <ActivityIndicator size="small" color="#35408E" />}
      <ThemedText style={styles.desc}>{message}</ThemedText>
    </View>
  );

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <ThemedText style={styles.headerTxt}>
            Track, review, and audit all recent actions and changes made within
            your account.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.dividerLine} />

        {authLoading && renderMessage("Loading your account...", true)}

        {!authLoading &&
          !isAuthenticated &&
          renderMessage("You are not signed in.")}

        {!authLoading &&
          isAuthenticated &&
          !currentUserId &&
          renderMessage("Loading your user information...", true)}

        {canLoadLogs &&
          isLoading &&
          renderMessage("Loading activity logs...", true)}

        {canLoadLogs &&
          !isLoading &&
          isError &&
          renderMessage("Failed to load activity logs.")}

        {canLoadLogs &&
          !isLoading &&
          !isError &&
          totalLogs === 0 &&
          renderMessage("No activity logs available.")}

        {canLoadLogs &&
          !isError &&
          logs.map((edge, index) => {
            const item = edge.node;
            if (!item) return null;

            return (
              <ThemedView
                key={item.activity_logs_id || `${edge.cursor}-${index}`}
                style={styles.row}
              >
                <Ionicons
                  name={getIcon(item.type)}
                  size={icon(20)}
                  color="#35408E"
                />

                <ThemedView style={styles.column}>
                  <ThemedText style={styles.title}>
                    {item.type}
                  </ThemedText>

                  <ThemedText style={styles.desc}>
                    {item.description}
                  </ThemedText>

                  <ThemedText style={styles.date}>
                    {formatRelative(item.created_at)} •{" "}
                    {formatDate(item.created_at)} •{" "}
                    {formatTime(item.created_at)}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            );
          })}

        {canLoadLogs && !isError && totalLogs > 0 && (
          <View
            style={styles.paginationContainer}
          >
            <Pressable
              onPress={handlePrevPage}
              disabled={!hasPrevPage || isFetching}
              style={[ styles.arrows, {
                backgroundColor:
                  !hasPrevPage || isFetching ? "#E5E7EB" : "#35408E",
              }]}
            >
              <Ionicons
                name="chevron-back"
                size={icon(18)}
                color={!hasPrevPage || isFetching ? "#9CA3AF" : "#FFFFFF"}
              />
            </Pressable>

            <ThemedText style={{ fontWeight: "600" }}>
              {page} of {totalPages}
            </ThemedText>

            <Pressable
              onPress={handleNextPage}
              disabled={!hasNextPage || isFetching}
              style={[ styles.arrows, {
                backgroundColor:
                  !hasNextPage || isFetching ? "#E5E7EB" : "#35408E",
              }]}
            >

              <Ionicons
                name="chevron-forward"
                size={icon(18)}
                color={!hasNextPage || isFetching ? "#9CA3AF" : "#FFFFFF"}
              />
            </Pressable>
          </View>
        )}

        {canLoadLogs && isFetching && !isLoading && (
          <View style={{ alignItems: "center", paddingBottom: verticalScale(12) }}>
            <ActivityIndicator size="small" color="#35408E" />
          </View>
        )}
      </ThemedView>
    </ScrollView>
  );
}


// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { useAuth } from "@/lib/auth/AuthProvider";
// import useFormQuery from "@/lib/hooks/useFormQuery";
// import { ActivityLogsInterfaceResult } from "@/lib/interface/activitiy-logs/activity-log.interface";
// import { icon, useResponsive } from "@/styles/responsive";
// import { settingsStyles } from "@/styles/settings/settings-styles";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useMemo, useState } from "react";
// import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";

// const PAGE_SIZE = 20;

// export default function ActivityLog() {
//   const r = useResponsive();
//   const styles = useMemo(() => settingsStyles(r), [r]);
//   const { user, token, isLoading: authLoading, isAuthenticated } = useAuth();

//   const currentUserId = user?.user_id ?? "";
//   const canLoadLogs =
//     !authLoading && isAuthenticated && Boolean(currentUserId) && Boolean(token);

//   const [endCursor, setEndCursor] = useState("");
//   const [startCursor, setStartCursor] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const { data, isLoading, isFetching, isError, error } =
//     useFormQuery<ActivityLogsInterfaceResult>({
//       key: [
//         "activity-logs",
//         currentUserId,
//         endCursor,
//         startCursor,
//         PAGE_SIZE,
//       ],
//       url: `/maintenance/activity-logs/${currentUserId}`,
//       enabled: canLoadLogs,
//       headers: {
//         "x-api-key": "testing",
//         "x-api-version": "2026-02-26",
//         Authorization: `Bearer ${token ?? ""}`,
//       },
//       params: {
//         orderBy: "created_at",
//         sortBy: "desc",
//         limit: PAGE_SIZE,
//         after: endCursor || undefined,
//         before: startCursor || undefined,
//       },
//     });

//   if (isError) {
//     console.log("[ACTIVITY] ERROR:", error);
//   }

//   const logs = data?.data?.edges ?? [];
//   const pageInfo = data?.data?.pageInfo;
//   const totalCount = data?.data?.totalCount ?? 0;
//   const totalPages = Math.ceil(totalCount / PAGE_SIZE);

//   const handleNextPage = () => {
//     if (!pageInfo?.hasNextPage || !pageInfo.endCursor || isFetching) return;

//     setStartCursor("");
//     setEndCursor(pageInfo.endCursor);
//     setCurrentPage((prev) => prev + 1);
//   };

//   const handlePrevPage = () => {
//     if (!pageInfo?.hasPrevPage || !pageInfo.startCursor || isFetching) return;

//     setEndCursor("");
//     setStartCursor(pageInfo.startCursor);
//     setCurrentPage((prev) => Math.max(1, prev - 1));
//   };

//   const getIcon = (type: string): keyof typeof Ionicons.glyphMap => {
//     const value = type?.toLowerCase().replace(/[_-]/g, " ") ?? "";

//     if (
//       value.includes("login") ||
//       value.includes("sign in") ||
//       value.includes("signin")
//     ) {
//       return "log-in-outline";
//     }

//     if (
//       value.includes("logout") ||
//       value.includes("sign out") ||
//       value.includes("signout")
//     ) {
//       return "log-out-outline";
//     }

//     if (value.includes("name") || value.includes("profile")) {
//       return "person-outline";
//     }

//     if (value.includes("email") || value.includes("mail")) {
//       return "mail-outline";
//     }

//     if (value.includes("password")) {
//       return "lock-closed-outline";
//     }

//     if (value.includes("organization")) {
//       return "business-outline";
//     }

//     if (value.includes("address") || value.includes("location")) {
//       return "location-outline";
//     }

//     return "information-circle-outline";
//   };

//   const formatDate = (value: string | undefined) => {
//     if (!value) return "";

//     const date = new Date(value);
//     if (Number.isNaN(date.getTime())) return "";

//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatTime = (value: string | undefined) => {
//     if (!value) return "";

//     const date = new Date(value);
//     if (Number.isNaN(date.getTime())) return "";

//     return date.toLocaleTimeString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       second: "2-digit",
//     });
//   };

//   const formatRelative = (value: string | undefined) => {
//     if (!value) return "";

//     const date = new Date(value);
//     if (Number.isNaN(date.getTime())) return "";

//     const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//     const months = Math.floor(days / 30);
//     const years = Math.floor(days / 365);

//     if (years) return `${years} ${years === 1 ? "yr" : "yrs"}`;
//     if (months) return `${months} ${months === 1 ? "mo" : "mos"}`;
//     if (days) return `${days} ${days === 1 ? "day" : "days"}`;
//     if (hours) return `${hours} ${hours === 1 ? "hr" : "hrs"}`;
//     if (minutes) return `${minutes} ${minutes === 1 ? "min" : "mins"}`;

//     return "Just now";
//   };

//   const renderMessage = (message: string, loading = false) => (
//     <View style={{ paddingVertical: r.spacing(24), alignItems: "center" }}>
//       {loading && <ActivityIndicator size="small" color="#35408E" />}
//       <ThemedText style={styles.desc}>{message}</ThemedText>
//     </View>
//   );

//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//       showsVerticalScrollIndicator={false}
//     >
//       <ThemedView>
//         <ThemedView style={styles.headerContainer}>
//           <ThemedText style={styles.headerTxt}>
//             Track, review, and audit all recent actions and changes made within
//             your account.
//           </ThemedText>
//         </ThemedView>

//         <ThemedView style={styles.dividerLine} />

//         {authLoading && renderMessage("Loading your account...", true)}

//         {!authLoading &&
//           !isAuthenticated &&
//           renderMessage("You are not signed in.")}

//         {!authLoading &&
//           isAuthenticated &&
//           !currentUserId &&
//           renderMessage("Loading your user information...", true)}

//         {canLoadLogs &&
//           isLoading &&
//           renderMessage("Loading activity logs...", true)}

//         {canLoadLogs &&
//           !isLoading &&
//           isError &&
//           renderMessage("Failed to load activity logs.")}

//         {canLoadLogs &&
//           !isLoading &&
//           !isError &&
//           logs.length === 0 &&
//           renderMessage("No activity logs available.")}

//         {canLoadLogs &&
//           !isError &&
//           logs.map((edge, index) => {
//             const item = edge.node;
//             if (!item) return null;

//             return (
//               <ThemedView
//                 key={item.activity_logs_id || `${edge.cursor}-${index}`}
//                 style={styles.row}
//               >
//                 <Ionicons
//                   name={getIcon(item.type)}
//                   size={icon(20)}
//                   color="#35408E"
//                 />

//                 <ThemedView style={styles.column}>
//                   <ThemedText style={styles.title}>
//                     {item.type}
//                   </ThemedText>

//                   <ThemedText style={styles.desc}>
//                     {item.decription}
//                   </ThemedText>

//                   <ThemedText style={styles.date}>
//                     {formatRelative(item.created_at)} •{" "}
//                     {formatDate(item.created_at)} •{" "}
//                     {formatTime(item.created_at)}
//                   </ThemedText>
//                 </ThemedView>
//               </ThemedView>
//             );
//           })}

//         {canLoadLogs && !isError && logs.length > 0 && (
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 16,
//               paddingVertical: r.spacing(24),
//             }}
//           >
//             <Pressable
//               onPress={handlePrevPage}
//               disabled={!pageInfo?.hasPrevPage || isFetching}
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 paddingHorizontal: 16,
//                 paddingVertical: 10,
//                 borderRadius: 8,
//                 backgroundColor:
//                   !pageInfo?.hasPrevPage || isFetching
//                     ? "#E5E7EB"
//                     : "#35408E",
//               }}
//             >
//               <Ionicons
//                 name="chevron-back"
//                 size={18}
//                 color={
//                   !pageInfo?.hasPrevPage || isFetching
//                     ? "#9CA3AF"
//                     : "#FFFFFF"
//                 }
//               />

//               <ThemedText
//                 style={{
//                   marginLeft: 4,
//                   color:
//                     !pageInfo?.hasPrevPage || isFetching
//                       ? "#9CA3AF"
//                       : "#FFFFFF",
//                   fontWeight: "600",
//                 }}
//               >
//                 Previous
//               </ThemedText>
//             </Pressable>

//             <ThemedText style={{ fontWeight: "600" }}>
//               Page {currentPage} of {totalPages}
//             </ThemedText>

//             <Pressable
//               onPress={handleNextPage}
//               disabled={!pageInfo?.hasNextPage || isFetching}
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 paddingHorizontal: 16,
//                 paddingVertical: 10,
//                 borderRadius: 8,
//                 backgroundColor:
//                   !pageInfo?.hasNextPage || isFetching
//                     ? "#E5E7EB"
//                     : "#35408E",
//               }}
//             >
//               <ThemedText
//                 style={{
//                   marginRight: 4,
//                   color:
//                     !pageInfo?.hasNextPage || isFetching
//                       ? "#9CA3AF"
//                       : "#FFFFFF",
//                   fontWeight: "600",
//                 }}
//               >
//                 Next
//               </ThemedText>

//               <Ionicons
//                 name="chevron-forward"
//                 size={18}
//                 color={
//                   !pageInfo?.hasNextPage || isFetching
//                     ? "#9CA3AF"
//                     : "#FFFFFF"
//                 }
//               />
//             </Pressable>
//           </View>
//         )}

//         {canLoadLogs && isFetching && !isLoading && (
//           <View style={{ alignItems: "center", paddingBottom: 12 }}>
//             <ActivityIndicator size="small" color="#35408E" />
//           </View>
//         )}
//       </ThemedView>
//     </ScrollView>
//   );
// }
