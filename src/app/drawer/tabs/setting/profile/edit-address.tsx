import EditSuccess from "@/components/modals/edit-success";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { editProfileStyles } from "@/styles/settings/edit-profile-styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
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
    if (!validations.hasLetter)       return "Address must contain letters (e.g. city or province)";
    if (!validations.noDoubleSpaces)  return "Remove extra consecutive spaces";
    return "Address looks good!";
  };

  const handleSave = () => {
    if (!isValid) return;
    setShowSuccess(true);
  };

  const r = useResponsive();
        
  const styles = useMemo(() => editProfileStyles(r), [r]);

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
              size={icon(18)}
              color={
                !hasContent ? "#9BA8C0"
                : isValid   ? "#2E9E3A"
                :              "#C62828"
              }
            />
            <TextInput
              style={styles.input}
              placeholder="i.e. House/Bldg No., Street Name, Barangay, City/Municipality, Province"
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
                size={icon(18)}
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
            <Ionicons name="information-circle-outline" size={icon(15)} color="#35408E" />
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