import { ThemedText } from "@/components/themed-text";
import { authStyles as styles } from "@/styles/auth-styles";
import { icon } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function ResendCode({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="fade" transparent statusBarTranslucent
    supportedOrientations={[
      "portrait",
      "landscape",
    ]}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>

          {/* Close button */}
          <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn} activeOpacity={0.7}>
            <Ionicons name="close" size={icon(16)} color="#6B7280" />
          </TouchableOpacity>

          {/* Icon */}
          <View style={[styles.modalIconRing, { backgroundColor: "#EEF0FA" }]}>
            <View style={[styles.modalIconInner, { shadowColor: "#35408E" }]}>
              <Ionicons name="mail" size={icon(28)} color="#FFFFFF" />
            </View>
          </View>

          <ThemedText style={styles.modalTitle}>Check Your Email</ThemedText>
          <ThemedText style={styles.modalDescription}>
            We've sent a one-time password to your inbox. Please check your email to continue.
          </ThemedText>

          <View style={styles.modalDivider} />

          <TouchableOpacity
            style={[styles.modalButton, { shadowColor: "#35408E" }]}
            onPress={onClose}
            activeOpacity={0.85}
          >
            <Ionicons name="checkmark" size={icon(16)} color="#FFFFFF" />
            <ThemedText style={styles.modalButtonText}>Got It</ThemedText>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}