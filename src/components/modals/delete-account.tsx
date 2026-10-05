import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useResponsive } from "@/styles/responsive";
import { deleteAccountStyles } from "@/styles/settings/settings-components-styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { ActivityIndicator, Modal, TouchableOpacity } from "react-native";

type Props = {
  visible: boolean;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteAccountModal({ visible, loading = false, onCancel, onConfirm }: Props) {
      const r = useResponsive();
      const styles = useMemo(() => deleteAccountStyles(r), [r]);
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}
        supportedOrientations={[
            "portrait",
            "landscape",
        ]}>
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modal}>
          <ThemedView style={styles.header}>
            <ThemedView style={styles.iconContainer}>
              <Ionicons name="trash-outline" size={26} color="#E20000" />
            </ThemedView>

            <ThemedText style={styles.title}>Delete Account</ThemedText>
            <ThemedText style={styles.description}>
              Permanently delete your Advocaid PH account and all associated data. This action cannot be undone.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel} disabled={loading}>
              <ThemedText style={styles.cancelText}>Cancel</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={onConfirm} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.deleteText}>Delete Account</ThemedText>}
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}
