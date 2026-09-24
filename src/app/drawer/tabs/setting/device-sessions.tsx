// import TerminateSession from "@/components/modals/terminate-session";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { icon, useResponsive } from "@/styles/responsive";
// import { settingsStyles } from "@/styles/settings/settings-styles";
// import { Ionicons, Octicons } from "@expo/vector-icons";
// import React, { useMemo, useState } from "react";
// import {
//   ScrollView,
//   TouchableOpacity
// } from "react-native";

// export default function DeviceSessions() {
//   const [showTerminateModal, setShowTerminateModal] = useState(false);

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
//             View the different devices link to your account. 
//             You may terminate other sessions from other devices.
//           </ThemedText>
//         </ThemedView>

//         <ThemedView style={styles.dividerLine}></ThemedView>

//         <ThemedView style={styles.deviceContainer}>
//             <ThemedView style={styles.boxBG}>
//               <ThemedText style={styles.deviceTitle}>
//                 This Device
//               </ThemedText>
//               <ThemedView style={styles.deviceRow}>
//                 <ThemedView style={styles.icon}>
//                   <Octicons name="device-mobile" size={icon(20)} color="#35408E"/>
//                 </ThemedView>
//                 <ThemedView style={styles.deviceInfo}>
//                   <ThemedText style={styles.device}>Samsung Galaxy S26</ThemedText>
//                   <ThemedText style={styles.location}>Manila City, Philippines</ThemedText>
//                 </ThemedView>
//               </ThemedView>
//               <ThemedView style={styles.row2}>
//                 <Ionicons name="hand-right-sharp" size={icon(20)} color="red"/>
//                 <TouchableOpacity>
//                   <ThemedText style={styles.terminateTxt}>Terminate All Other Sessions</ThemedText>
//                 </TouchableOpacity>
//               </ThemedView>
//             </ThemedView>
//             <ThemedText style={styles.instruction}>Logs out all devices except for this one.</ThemedText>

//             <ThemedView style={styles.boxBG}>
//               <ThemedText style={styles.title}>
//                 Active Sessions
//               </ThemedText>
//               <TouchableOpacity style={styles.row2}
//                 onPress={() => setShowTerminateModal(true)}>
//                 <ThemedView style={styles.icon}>
//                   <Octicons name="device-mobile" size={icon(20)} color="#35408E"/>
//                 </ThemedView>
//                 <ThemedView style={styles.deviceInfo}>
//                   <ThemedText style={styles.device}>iPhone 17</ThemedText>
//                   <ThemedText style={styles.location}>Makati City, Philippines</ThemedText>
//                 </ThemedView>
//               </TouchableOpacity>
//               <TerminateSession visible={showTerminateModal} 
//                 deviceName="iPhone 17" 
//                 location="Makati City, Philippines" 
//                 onClose={() => setShowTerminateModal(false)} 
//                 onTerminate={() => { 
//                   // TODO: terminate session logic 
//                   setShowTerminateModal(false); }} />
//             </ThemedView>
//             <ThemedText style={styles.instruction}>The official AdvocAID PH app is available for Android and iPhone.</ThemedText>
//         </ThemedView>

        
        
        

//       </ThemedView>
//     </ScrollView>
//   );
// }
import TerminateSession from "@/components/modals/terminate-session";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getMobileDeviceInfo } from "@/lib/device/device-info";
import useFormQuery from "@/lib/hooks/useFormQuery";
import {
  DeviceSessionsInterface,
  DeviceSessionsResult,
} from "@/lib/interface/deviceSessions/device-sessions.interface";
import { icon, useResponsive } from "@/styles/responsive";
import {
  deviceSessionsStyles,
  settingsStyles,
} from "@/styles/settings/settings-styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function DeviceSessions() {
  const r = useResponsive();
  const styles = useMemo(() => settingsStyles(r), [r]);
  const deviceSessions = useMemo(() => deviceSessionsStyles(r), [r]);
  const { token, user, isLoading: authLoading } = useAuth();

  const [selectedSession, setSelectedSession] =
    useState<DeviceSessionsInterface | null>(null);
  const [showTerminateModal, setShowTerminateModal] = useState(false);

  const currentDevice = useMemo(() => getMobileDeviceInfo(), []);
  const userId = user?.user_id;

  const { data, isLoading, isError, error, refetch } =
    useFormQuery<DeviceSessionsResult>({
      key: ["device-sessions", userId],
      url: `/auth/device-sessions/${userId}`,
      enabled: !authLoading && !!token && !!userId,
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": "testing",
        "x-api-version": "2026-02-26",
      },
    });

  const sessions =
    data?.data?.edges
      ?.map((edge) => edge.node)
      .filter((s) => s && !s.is_deleted && !s.is_revoked) ?? [];

  const currentSession =
    sessions.find((s) => s.is_current === true) ??
    sessions.find(
      (s) =>
        s.device_name === currentDevice.device_name &&
        s.os?.toLowerCase() === currentDevice.os.toLowerCase()
    );

  const otherSessions = sessions.filter(
    (s) => s.device_sessions_id !== currentSession?.device_sessions_id
  );

  function getSessionType(s: DeviceSessionsInterface): "mobile" | "website" {
    const dt = s.device_type?.toLowerCase().trim() ?? "";
    const br = s.browser?.toLowerCase().trim() ?? "";
    const ua = s.user_agent?.toLowerCase().trim() ?? "";

    return dt === "mobile" ||
      dt === "app" ||
      br === "app" ||
      ua.includes("react native") ||
      ua.includes("expo")
      ? "mobile"
      : "website";
  }

  function getSessionIcon(
    s: DeviceSessionsInterface
  ): keyof typeof Ionicons.glyphMap {
    return getSessionType(s) === "mobile"
      ? "phone-portrait-outline"
      : "globe-outline";
  }

  function formatDate(value?: string | null) {
    if (!value) return "Unknown";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "Unknown";

    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const openTerminateModal = (session: DeviceSessionsInterface) => {
    setSelectedSession(session);
    setShowTerminateModal(true);
  };

  const closeTerminateModal = () => {
    setShowTerminateModal(false);
    setSelectedSession(null);
  };

  const renderSession = (
    session: DeviceSessionsInterface,
    isCurrent = false
  ) => {
    const sessionType = getSessionType(session);

    return (
      <ThemedView key={session.device_sessions_id}>
        <TouchableOpacity
          activeOpacity={isCurrent ? 1 : 0.75}
          disabled={isCurrent}
          onPress={() => !isCurrent && openTerminateModal(session)}
          style={deviceSessions.sessionRow}
        >
          <ThemedView
            style={[
              styles.icon,
              { backgroundColor: isCurrent ? "#E8F3FD" : "#F3F4F8" },
            ]}
          >
            <Ionicons
              name={getSessionIcon(session)}
              size={icon(20)}
              color="#35408E"
            />
          </ThemedView>

          <ThemedView style={[styles.deviceInfo, { flex: 1 }]}>
            <View style={deviceSessions.nameRow}>
              <ThemedText style={styles.device}>
                {session.device_name || "Unknown Device"}
              </ThemedText>

              {isCurrent && (
                <View style={deviceSessions.currentBadge}>
                  <ThemedText style={deviceSessions.currentBadgeTxt}>
                    CURRENT
                  </ThemedText>
                </View>
              )}
            </View>

            <ThemedView style={deviceSessions.row}>
              {session.os && (
                <ThemedText style={styles.location}>
                  OS: {session.os}
                  {session.os_version ? ` ${session.os_version}` : ""}
                </ThemedText>
              )}

              <ThemedView style={deviceSessions.divider} />

              {session.browser && (
                <ThemedText style={styles.location}>
                  {sessionType === "website" ? "Browser: " : "App: "}
                  {session.browser}
                </ThemedText>
              )}
            </ThemedView>

            {session.ip_address && (
              <ThemedText style={styles.location}>
                IP: {session.ip_address}
              </ThemedText>
            )}

            {session.created_at && (
              <ThemedText style={styles.location}>
                Signed in: {formatDate(session.created_at)}
              </ThemedText>
            )}

            {session.last_active_at && (
              <ThemedText style={styles.location}>
                Last active: {formatDate(session.last_active_at)}
              </ThemedText>
            )}
          </ThemedView>

          {!isCurrent && (
            <Ionicons
              name="chevron-forward"
              size={icon(16)}
              color="#9BA8C0"
            />
          )}
        </TouchableOpacity>

        <View style={styles.rowDivider} />
      </ThemedView>
    );
  };

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <ThemedText style={styles.headerTxt}>
            View the different devices linked to your account. You may
            terminate other sessions from other devices.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.dividerLine} />

        <ThemedView style={styles.deviceContainer}>
          <ThemedView style={styles.boxBG}>
            <ThemedText style={styles.deviceTitle}>This Device</ThemedText>
            <View style={styles.rowDivider} />

            {currentSession ? (
              renderSession(currentSession, true)
            ) : (
              <ThemedView>
                <View style={deviceSessions.sessionRow}>
                  <ThemedView
                    style={[styles.icon, { backgroundColor: "#E8F3FD" }]}
                  >
                    <Ionicons
                      name="phone-portrait-outline"
                      size={icon(20)}
                      color="#35408E"
                    />
                  </ThemedView>

                  <ThemedView style={[styles.deviceInfo, { flex: 1 }]}>
                    <ThemedText style={styles.device}>
                      {currentDevice.device_name}
                    </ThemedText>
                    <ThemedText style={styles.location}>
                      OS: {currentDevice.os} {currentDevice.os_version}
                    </ThemedText>
                    <ThemedText style={styles.location}>
                      App: {currentDevice.browser}
                    </ThemedText>
                  </ThemedView>
                </View>

                <View style={styles.rowDivider} />
              </ThemedView>
            )}

            {otherSessions.length > 0 && (
              <TouchableOpacity
                style={deviceSessions.terminateAllBtn}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="warning-outline"
                  size={icon(17)}
                  color="#FECACA"
                />
                <ThemedText style={deviceSessions.terminateAllTxt}>
                  Terminate All Other Sessions
                </ThemedText>
              </TouchableOpacity>
            )}
          </ThemedView>

          <ThemedText style={styles.instruction}>
            This is the device currently being used to access your account.
          </ThemedText>

          {isLoading && (
            <ThemedView style={[styles.boxBG, deviceSessions.stateBox]}>
              <Ionicons
                name="sync-outline"
                size={icon(22)}
                color="#9BA8C0"
              />
              <ThemedText style={styles.deviceTitle}>
                Loading active sessions...
              </ThemedText>
            </ThemedView>
          )}

          {isError && (
            <ThemedView style={[styles.boxBG, deviceSessions.stateBox]}>
              <Ionicons
                name="cloud-offline-outline"
                size={icon(28)}
                color="#C62828"
              />
              <ThemedText style={styles.deviceTitle}>
                Failed to load sessions
              </ThemedText>
              <ThemedText style={styles.instruction}>
                {String(error?.message ?? "Please try again.")}
              </ThemedText>

              <TouchableOpacity
                style={deviceSessions.retryBtn}
                onPress={() => refetch()}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="refresh-outline"
                  size={icon(14)}
                  color="#35408E"
                />
                <ThemedText style={deviceSessions.retryTxt}>
                  Try Again
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}

          {!isLoading && !isError && (
            <ThemedView style={styles.boxBG}>
              <ThemedText style={styles.deviceTitle}>
                Active Sessions
              </ThemedText>

              <View style={styles.rowDivider} />

              {otherSessions.length === 0 ? (
                <View style={deviceSessions.emptyState}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={icon(30)}
                    color="#2E9E3A"
                  />
                  <ThemedText style={styles.instruction}>
                    No other active sessions found.
                  </ThemedText>
                </View>
              ) : (
                otherSessions.map((session) => renderSession(session))
              )}
            </ThemedView>
          )}

          <ThemedText style={styles.instruction}>
            Sessions can be active from either the AdvocAid PH mobile app or
            website.
          </ThemedText>
        </ThemedView>

        <TerminateSession
          visible={showTerminateModal}
          deviceName={selectedSession?.device_name ?? "Unknown Device"}
          location={selectedSession?.ip_address ?? "Unknown Location"}
          sessionIcon={
            selectedSession
              ? getSessionIcon(selectedSession)
              : "phone-portrait-outline"
          }
          sessionType={selectedSession ? getSessionType(selectedSession) : "mobile"}
          onClose={closeTerminateModal}
          onTerminate={() => {
            closeTerminateModal();
            refetch();
          }}
        />
      </ThemedView>
    </ScrollView>
  );
}
