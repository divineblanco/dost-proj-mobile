import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function ResendCode({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="fade" transparent statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.container}>

          {/* Close button */}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
            <Ionicons name="close" size={16} color="#6B7280" />
          </TouchableOpacity>

          {/* Icon */}
          <View style={styles.iconRing}>
            <View style={styles.iconInner}>
              <Ionicons name="mail" size={28} color="#FFFFFF" />
            </View>
          </View>

          <ThemedText style={styles.title}>Check Your Email</ThemedText>
          <ThemedText style={styles.description}>
            We've sent a one-time password to your inbox. Please check your email to continue.
          </ThemedText>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.button} onPress={onClose} activeOpacity={0.85}>
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            <ThemedText style={styles.buttonText}>Got It</ThemedText>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15,20,60,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "82%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingTop: 36,
    paddingBottom: 28,
    paddingHorizontal: 28,
    alignItems: "center",
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
  },

  closeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  iconRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EEF0FA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  iconInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#35408E",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#35408E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1F5E",
    marginBottom: 8,
    textAlign: "center",
  },

  description: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#F0F2F8",
    marginVertical: 22,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    backgroundColor: "#35408E",
    width: "100%",
    paddingVertical: 13,
    borderRadius: 10,
    shadowColor: "#35408E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});