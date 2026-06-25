import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

type MapResourceProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const RESOURCE_TYPES = [
  "Testing",
  "Support",
  "Counseling",
  "Treatment",
];

export default function MapResource({
  visible,
  onClose,
  onSubmit,
}: MapResourceProps) {
  const [resourceType, setResourceType] = useState(
    "Select Resource Type"
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = () => {
    onClose();

    setTimeout(() => {
      onSubmit();
    }, 200);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
          >
            <Ionicons
              name="close"
              size={22}
              color="#6B7280"
            />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Ionicons
                name="location-outline"
                size={28}
                color="#35408E"
              />
            </View>

            <ThemedText style={styles.modalTitle}>
              Add Resource
            </ThemedText>

            <ThemedText style={styles.modalSubtitle}>
              Help the community by mapping an HIV-related
              healthcare resource.
            </ThemedText>
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>
              Resource Name
            </ThemedText>

            <TextInput
              style={styles.input}
              placeholder="e.g. Manila Health Center"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>
              Resource Type
            </ThemedText>

            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <ThemedText style={styles.dropdownText}>
                {resourceType}
              </ThemedText>

              <Ionicons
                name={
                  showDropdown
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={18}
                color="#35408E"
              />
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdown}>
                {RESOURCE_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setResourceType(type);
                      setShowDropdown(false);
                    }}
                  >
                    <ThemedText
                      style={styles.dropdownItemText}
                    >
                      {type}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>
              Resource Description
            </ThemedText>

            <TextInput
              style={styles.textArea}
              placeholder="Provide details of the resource..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>
              Resource Location
            </ThemedText>

            <TouchableOpacity
              style={styles.locationButton}
            >
              <Ionicons
                name="location"
                size={18}
                color="#35408E"
              />

              <ThemedText style={styles.locationText}>
                Select Location on Map
              </ThemedText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={handleSubmit}
          >
            <Ionicons
              name="checkmark-circle"
              size={18}
              color="#FFFFFF"
            />

            <ThemedText style={styles.submitText}>
              Submit Resource
            </ThemedText>
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
    padding: 20,
  },

  container: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
  },

  closeBtn: {
    position: "absolute",
    top: 18,
    right: 18,
    zIndex: 10,
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },

  headerIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1F5E",
    marginBottom: 4,
    lineHeight: 25
  },

  modalSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#35408E",
    marginBottom: 8,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    backgroundColor: "#FAFAFA",
  },

  textArea: {
    height: 110,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 13,
    fontSize: 14,
    backgroundColor: "#FAFAFA",
  },

  dropdownButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownText: {
    color: "#374151",
    fontSize: 14,
  },

  dropdown: {
    marginTop: 10,
    top: 65,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    position: "absolute",
    zIndex: 999,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  dropdownItemText: {
    fontSize: 14,
    color: "#374151",
  },

  locationButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "#35408E",
    borderRadius: 12,
    backgroundColor: "#F5F7FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  locationText: {
    color: "#35408E",
    fontWeight: "600",
  },

  submitButton: {
    backgroundColor: "#35408E",
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },

  submitText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});