import EditSuccess from "@/components/modals/edit-success";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditAddress() {
  const [address, setAddress] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const validations = useMemo(() => ({
    notOnlySpaces:  address.trim().length > 0,
    minLength:      address.trim().length >= 10,
    maxLength:      address.trim().length <= 100,
    hasLetter:      /[a-zA-Z]/.test(address),
    noDoubleSpaces: !/\s{2,}/.test(address),
  }), [address]);

  const isValid = Object.values(validations).every(Boolean) && address.trim().length > 0;
  const hasContent = address.length > 0;

  const validationMessage = () => {
    if (!hasContent)                  return "Enter your complete address";
    if (!validations.notOnlySpaces)   return "Address cannot be empty";
    if (!validations.minLength)       return `${10 - address.trim().length} more character${10 - address.trim().length !== 1 ? "s" : ""} needed`;
    if (!validations.maxLength)       return "Maximum of 100 characters allowed";
    if (!validations.hasLetter)       return "Address must contain letters (e.g. street or barangay name)";
    if (!validations.noDoubleSpaces)  return "Remove extra consecutive spaces";
    return "Address looks good!";
  };

  const handleSave = () => {
    if (!isValid) return;
    setShowSuccess(true);
  };

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={styles.inner}>

        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>Edit Address</ThemedText>
          <ThemedText style={styles.subtitle}>
            Update your current home or mailing address.
          </ThemedText>
        </ThemedView>

        <View style={styles.sectionDivider} />

        {/* Input card */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.label}>Current Address</ThemedText>

          <View style={[
            styles.inputRow,
            hasContent && (isValid ? styles.inputValid : styles.inputError),
          ]}>
            <Ionicons
              name="location-outline"
              size={18}
              color={
                !hasContent ? "#9BA8C0"
                : isValid   ? "#2E9E3A"
                :              "#C62828"
              }
            />
            <TextInput
              style={styles.input}
              placeholder="e.g. 12 Rizal St., Brgy. 1, Calamba, Laguna"
              placeholderTextColor="#9BA8C0"
              value={address}
              onChangeText={(text) => setAddress(text.slice(0, 100))}
              autoCapitalize="words"
              autoCorrect={false}
              multiline
            />
            {hasContent && (
              <Ionicons
                name={isValid ? "checkmark-circle" : "close-circle"}
                size={18}
                color={isValid ? "#2E9E3A" : "#C62828"}
              />
            )}
          </View>

          <View style={styles.inputMeta}>
            <ThemedText style={[
              styles.validationHint,
              hasContent && (isValid ? styles.validationHintOk : styles.validationHintError),
            ]}>
              {validationMessage()}
            </ThemedText>
          </View>
        </ThemedView>

        {/* Reminder card */}
        <ThemedView style={styles.rulesCard}>
          <View style={styles.rulesHeader}>
            <Ionicons name="information-circle-outline" size={15} color="#35408E" />
            <ThemedText style={styles.rulesTitle}>Reminder</ThemedText>
          </View>
          <View style={styles.ruleRow}>
            <ThemedText style={styles.ruleText}>
              Please make sure that this is your real current address.
            </ThemedText>
          </View>
        </ThemedView>

        {/* Save button */}
        <TouchableOpacity
          disabled={!isValid}
          onPress={handleSave}
          style={[styles.saveBtn, !isValid && styles.saveBtnDisabled]}
          activeOpacity={0.85}
        >
          <ThemedText style={[styles.saveTxt, !isValid && styles.saveTxtDisabled]}>
            Save Address
          </ThemedText>
        </TouchableOpacity>

        <EditSuccess 
          visible={showSuccess} 
          message="Your address has been updated and saved."
          onClose={() => setShowSuccess(false)} />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },

  scrollContent: {
    paddingBottom: 100,
  },

  inner: {
    padding: 20,
    gap: 14,
  },

  header: {
    gap: 5,
    backgroundColor: "transparent",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1F5E",
    lineHeight: 28,
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },

  sectionDivider: {
    height: 3,
    backgroundColor: "#35408E",
    borderRadius: 2,
    width: "100%",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    padding: 16,
    gap: 10,
    elevation: 3,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#35408E",
    letterSpacing: 0.2,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "#E0E4F0",
    backgroundColor: "#F8F9FD",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  inputValid: {
    borderColor: "#2E9E3A",
    backgroundColor: "#EAFBE7",
  },

  inputError: {
    borderColor: "#C62828",
    backgroundColor: "#FFF0F0",
  },

  input: {
    flex: 1,
    fontSize: 13,
    color: "#1A1F5E",
    fontWeight: "500",
    lineHeight: 20,
    minHeight: 40,
    paddingTop: 0,
  },

  inputMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  validationHint: {
    fontSize: 11,
    color: "#9BA8C0",
    flex: 1,
  },

  validationHintError: {
    color: "#C62828",
  },

  validationHintOk: {
    color: "#2E9E3A",
    fontWeight: "600",
  },

  charCount: {
    fontSize: 11,
    color: "#9BA8C0",
  },

  rulesCard: {
    backgroundColor: "#EEF0FA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5E8",
    padding: 14,
    gap: 10,
  },

  rulesHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
    backgroundColor: "transparent",
  },

  rulesTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#35408E",
  },

  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  ruleText: {
    fontSize: 12,
    color: "#6B7280",
    flex: 1,
  },

  ruleTextValid: {
    color: "#2E9E3A",
    fontWeight: "600",
  },

  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFB633",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 4,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 5,
  },

  saveBtnDisabled: {
    backgroundColor: "#E0E4F0",
    shadowOpacity: 0,
    elevation: 0,
  },

  saveTxt: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },

  saveTxtDisabled: {
    color: "#9BA8C0",
  },
});