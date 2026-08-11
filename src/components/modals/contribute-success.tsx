import { ThemedText } from "@/components/themed-text";
import { colors } from "@/styles/contribute/contribute-colors";
import { contributeSuccessStyles } from "@/styles/contribute/contribute-component-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Modal, TouchableOpacity, View } from "react-native";

type SuccessModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
};

export default function ContributeSuccess({
  visible,
  onClose,
  title = "Submitted!",
  message = "Your contribution has been successfully received. Please allow up to (time) for it to be reviewed and verified before it is posted. Thank you for helping raise HIV awareness and support your community.",
}: SuccessModalProps) {

  const r = useResponsive();

  const styles = useMemo(
    () => contributeSuccessStyles(r),[r]);

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
              <Ionicons name="checkmark" size={icon(36)} color={colors.white} />
            </View>
          </View>

          {/* Text */}
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.message}>{message}</ThemedText>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Action */}
          <TouchableOpacity style={styles.button} onPress={onClose} activeOpacity={0.85}>
            <Ionicons name="arrow-forward" size={icon(16)} color={colors.white} />
            <ThemedText style={styles.buttonText}>Continue</ThemedText>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}