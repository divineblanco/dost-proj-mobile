import { ThemedText } from "@/components/themed-text";
import { Ionicons, Octicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  deviceName: string;
  location: string;
  onClose: () => void;
  onTerminate: () => void;
};

export default function TerminateSession({
  visible, deviceName, location, onClose, onTerminate,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* Warning icon */}
          <View style={styles.iconRing}>
            <View style={styles.iconInner}>
              <Octicons name="device-mobile" size={26} color="#FFFFFF" />
            </View>
          </View>

          {/* Device info */}
          <ThemedText style={styles.title}>{deviceName}</ThemedText>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={13} color="#9BA8C0" />
            <ThemedText style={styles.location}>{location}</ThemedText>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <ThemedText style={styles.description}>
            Are you sure you want to terminate this session? The device will be signed out immediately.
          </ThemedText>

          {/* Actions */}
          <TouchableOpacity style={styles.terminateBtn} onPress={onTerminate} activeOpacity={0.85}>
            <Ionicons name="power" size={16} color="#FFFFFF" />
            <ThemedText style={styles.terminateTxt}>Terminate Session</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.75}>
            <ThemedText style={styles.cancelTxt}>Cancel</ThemedText>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15,20,60,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "82%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
  },

  // Warning icon badge
  iconRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#f0f0ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  iconInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#35408E",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1F5E",
    textAlign: "center",
    marginBottom: 6,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 16,
  },

  location: {
    fontSize: 12,
    color: "#9BA8C0",
    fontWeight: "500",
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#F0F2F8",
    marginBottom: 16,
  },

  description: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 22,
  },

  terminateBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    width: "100%",
    backgroundColor: "#C62828",
    paddingVertical: 13,
    borderRadius: 10,
    shadowColor: "#C62828",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 10,
  },

  terminateTxt: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

  cancelBtn: {
    width: "100%",
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#D1D5E8",
    backgroundColor: "#F8F9FD",
    alignItems: "center",
  },

  cancelTxt: {
    color: "#35408E",
    fontWeight: "600",
    fontSize: 14,
  },
});