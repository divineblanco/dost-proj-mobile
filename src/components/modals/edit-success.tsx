import { ThemedText } from "@/components/themed-text";
import { icon, useResponsive } from "@/styles/responsive";
import { editSuccessStyles } from "@/styles/settings/edit-profile-styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Modal, TouchableOpacity, View } from "react-native";

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
  message = "Your name has been edited and saved.",
}: SuccessModalProps) {

      const r = useResponsive();
    
      const styles = useMemo(
        () => editSuccessStyles(r),[r]);
        
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      supportedOrientations={[
      "portrait",
      "landscape",
    ]}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          {/* Icon area */}
          <View style={styles.iconRing}>
            <View style={styles.iconInner}>
              <Ionicons name="checkmark" size={icon(36)} color="#FFFFFF" />
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