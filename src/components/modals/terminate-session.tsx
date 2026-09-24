// import { ThemedText } from "@/components/themed-text";
// import { icon, useResponsive } from "@/styles/responsive";
// import { terminateModalStyles } from "@/styles/settings/help-problem-styles";
// import { Ionicons, Octicons } from "@expo/vector-icons";
// import React, { useMemo } from "react";
// import { Modal, TouchableOpacity, View } from "react-native";

// type Props = {
//   visible: boolean;
//   deviceName: string;
//   location: string;
//   onClose: () => void;
//   onTerminate: () => void;
// };

// export default function TerminateSession({
//   visible, deviceName, location, onClose, onTerminate,
// }: Props) {

//     const r = useResponsive();
  
//     const styles = useMemo(
//       () => terminateModalStyles(r),[r]);
      
//   return (
//     <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}
//       supportedOrientations={[
//         "portrait",
//         "landscape",
//       ]}>
//       <View style={styles.overlay}>
//         <View style={styles.card}>

//           {/* Warning icon */}
//           <View style={styles.iconRing}>
//             <View style={styles.iconInner}>
//               <Octicons name="device-mobile" size={icon(26)} color="#FFFFFF" />
//             </View>
//           </View>

//           {/* Device info */}
//           <ThemedText style={styles.title}>{deviceName}</ThemedText>

//           <View style={styles.locationRow}>
//             <Ionicons name="location-outline" size={icon(13)} color="#9BA8C0" />
//             <ThemedText style={styles.location}>{location}</ThemedText>
//           </View>

//           <View style={styles.divider} />

//           {/* Description */}
//           <ThemedText style={styles.description}>
//             Are you sure you want to terminate this session? The device will be signed out immediately.
//           </ThemedText>

//           {/* Actions */}
//           <TouchableOpacity style={styles.terminateBtn} onPress={onTerminate} activeOpacity={0.85}>
//             <Ionicons name="power" size={icon(16)} color="#FFFFFF" />
//             <ThemedText style={styles.terminateTxt}>Terminate Session</ThemedText>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.75}>
//             <ThemedText style={styles.cancelTxt}>Cancel</ThemedText>
//           </TouchableOpacity>

//         </View>
//       </View>
//     </Modal>
//   );
// }

import { ThemedText } from "@/components/themed-text";
import { icon, useResponsive } from "@/styles/responsive";
import { terminateModalStyles } from "@/styles/settings/help-problem-styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;

  deviceName: string;

  location: string;

  sessionIcon: keyof typeof Ionicons.glyphMap;

  sessionType: "mobile" | "website";

  onClose: () => void;

  onTerminate: () => void;
};

export default function TerminateSession({
  visible,
  deviceName,
  location,
  sessionIcon,
  sessionType,
  onClose,
  onTerminate,
}: Props) {
  const r = useResponsive();

  const styles = useMemo(
    () => terminateModalStyles(r),
    [r]
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      supportedOrientations={[
        "portrait",
        "landscape",
      ]}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* ================================================= */}
          {/* SESSION ICON */}
          {/* ================================================= */}

          <View style={styles.iconRing}>
            <View style={styles.iconInner}>
              <Ionicons
                name={sessionIcon}
                size={icon(26)}
                color="#FFFFFF"
              />
            </View>
          </View>

          {/* ================================================= */}
          {/* DEVICE INFO */}
          {/* ================================================= */}

          <ThemedText style={styles.title}>
            {deviceName}
          </ThemedText>

          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={icon(13)}
              color="#9BA8C0"
            />

            <ThemedText
              style={styles.location}
            >
              {location}
            </ThemedText>
          </View>

          {/* SESSION TYPE */}

          <ThemedText
            style={[
              styles.location,
              {
                marginBottom: 12,
              },
            ]}
          >
            {sessionType === "mobile"
              ? "Mobile Session"
              : "Website Session"}
          </ThemedText>

          <View style={styles.divider} />

          {/* ================================================= */}
          {/* DESCRIPTION */}
          {/* ================================================= */}

          <ThemedText
            style={styles.description}
          >
            Are you sure you want to
            terminate this session? The
            device will be signed out
            immediately.
          </ThemedText>

          {/* ================================================= */}
          {/* TERMINATE */}
          {/* ================================================= */}

          <TouchableOpacity
            style={styles.terminateBtn}
            onPress={onTerminate}
            activeOpacity={0.85}
          >
            <Ionicons
              name="power"
              size={icon(16)}
              color="#FFFFFF"
            />

            <ThemedText
              style={styles.terminateTxt}
            >
              Terminate Session
            </ThemedText>
          </TouchableOpacity>

          {/* ================================================= */}
          {/* CANCEL */}
          {/* ================================================= */}

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={onClose}
            activeOpacity={0.75}
          >
            <ThemedText
              style={styles.cancelTxt}
            >
              Cancel
            </ThemedText>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}
