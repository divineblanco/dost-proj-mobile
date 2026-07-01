import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

type SuccessModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
};

export default function EditSuccess({
  visible,
  onClose,
  title = "Saved!",
  message = "Your username has been edited and saved.",
}: SuccessModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          {/* Icon area */}
          <View style={styles.iconRing}>
            <View style={styles.iconInner}>
              <Ionicons name="checkmark" size={36} color="#FFFFFF" />
            </View>
          </View>

          {/* Text */}
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.message}>{message}</ThemedText>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Action */}
          <TouchableOpacity style={styles.button} onPress={onClose} activeOpacity={0.85}>
            <ThemedText style={styles.buttonText}>Continue</ThemedText>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 20, 60, 0.5)",
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

  // Outer soft ring + filled circle
  iconRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#EAFBE7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  iconInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#2E9E3A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2E9E3A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1F5E",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 20,
  },

  message: {
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
    gap: 8,
    backgroundColor: "#35408E",
    paddingHorizontal: 32,
    paddingVertical: 13,
    borderRadius: 10,
    width: "100%",
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