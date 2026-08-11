import { ThemedText } from "@/components/themed-text";
import { authStyles as styles } from "@/styles/auth-styles";
import { icon } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onSignIn: () => void;
  title?: string;
  message?: string;
};

export function LoginSuccess({ visible, onSignIn, 
  title="Authenticated!", 
  message= "Your identity has been verified. You can now sign in to your account."
 }: Props) {
  return (
    <Modal visible={visible} animationType="fade" transparent statusBarTranslucent
    supportedOrientations={[
      "portrait",
      "landscape",
    ]}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>

          {/* Icon */}
          <View style={styles.modalIconRing}>
            <View style={styles.modalIconInner}>
              <Ionicons name="checkmark" size={icon(32)} color="#FFFFFF" />
            </View>
          </View>

          <ThemedText style={styles.modalTitle}>{title}</ThemedText>
          <ThemedText style={styles.modalDescription}>
            {message}
          </ThemedText>

          <View style={styles.modalDivider} />

          <TouchableOpacity style={styles.modalButton} onPress={onSignIn} activeOpacity={0.85}>
            <ThemedText style={styles.modalButtonText}>Sign In</ThemedText>
            <Ionicons name="arrow-forward" size={icon(16)} color="#FFFFFF" />
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}