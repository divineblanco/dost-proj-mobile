import EditSuccess from "@/components/modals/edit-success";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditUsername() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const NAME_REGEX =
    /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u;

  const validateName = (name: string) => {
    const trimmed = name.trim();

    return {
      notEmpty: trimmed.length > 0,
      minLength: trimmed.length >= 2,
      maxLength: trimmed.length <= 50,
      validCharacters: NAME_REGEX.test(trimmed),
    };
  };

  const firstNameValidation = validateName(firstName);
  const lastNameValidation = validateName(lastName);

  const isValid =
    Object.values(firstNameValidation).every(Boolean) &&
    Object.values(lastNameValidation).every(Boolean);

  const getValidationMessage = (
    validation: ReturnType<typeof validateName>
  ) => {
    if (!validation.notEmpty)
      return "*This field is required.";

    if (!validation.minLength)
      return "Must contain at least 2 letters.";

    if (!validation.maxLength)
      return "Maximum of 50 characters.";

    if (!validation.validCharacters)
      return "Letters, spaces, hyphens (-), and apostrophes (') only.";

    return "Looks good.";
  };
    
  const [showSuccess, setShowSuccess] = useState(false);


  const handleSave = () => {
    if (!isValid) return;

    console.log(firstName, lastName);

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
          <ThemedText style={styles.title}>
            Edit Name
          </ThemedText>

          <ThemedText style={styles.subtitle}>
            Update your first and last name.
          </ThemedText>
        </ThemedView>

        <View style={styles.sectionDivider} />

        {/* Input */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.label}>
            First Name
          </ThemedText>

          <View
            style={[
              styles.inputRow,
              firstName.length === 0
              ? styles.inputDefault
              : Object.values(firstNameValidation).every(Boolean)
              ? styles.inputValid
              : styles.inputError,
            ]}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color="#35408E"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              placeholderTextColor="#9BA8C0"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
            
          </View>
          <ThemedText
              style={[
                styles.validationHint,
                Object.values(firstNameValidation).every(Boolean)
                  ? styles.validationHintOk
                  : styles.validationHintError,
              ]}
            >
              {getValidationMessage(firstNameValidation)}
            </ThemedText>

          <ThemedText style={styles.label}>
            Last Name
          </ThemedText>

          <View
            style={[
              styles.inputRow,
              lastName.length === 0
              ? styles.inputDefault
              : Object.values(lastNameValidation).every(Boolean)
              ? styles.inputValid
              : styles.inputError,
            ]}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color="#35408E"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              placeholderTextColor="#9BA8C0"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
          </View>
          <ThemedText
              style={[
                styles.validationHint,
                Object.values(lastNameValidation).every(Boolean)
                  ? styles.validationHintOk
                  : styles.validationHintError,
              ]}
            >
              {getValidationMessage(lastNameValidation)}
            </ThemedText>
        </ThemedView>

        {/* Button */}
        <TouchableOpacity
          disabled={!isValid}
          onPress={handleSave}
          style={[
            styles.saveBtn,
            !isValid && styles.saveBtnDisabled,
          ]}
        >
          <ThemedText
            style={[
              styles.saveTxt,
              !isValid && styles.saveTxtDisabled,
            ]}
          >
            Save Changes
          </ThemedText>
        </TouchableOpacity>
        <EditSuccess
          visible={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
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
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1F5E",
    lineHeight: 25,
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
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
    fontSize: 15,
    fontWeight: "600",
    color: "#35408E",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
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

  inputDefault: {
    borderColor: "#E0E4F0",
    backgroundColor: "#F8F9FD",
  },

  inputError: {
    borderColor: "#C62828",
    backgroundColor: "#FFF0F0",
  },

  atSign: {
    fontSize: 15,
    fontWeight: "700",
    color: "#35408E",
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#1A1F5E",
    fontWeight: "500",
  },

  inputMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  validationHint: {
    fontSize: 11,
    textAlign: "right"
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

  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  ruleText: {
    fontSize: 12,
    color: "#4B5563",
  },

  ruleTextValid: {
    color: "#2E9E3A",
    fontWeight: "600",
  },

  saveBtn: {
    backgroundColor: "#FFB633",
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
  },

  saveBtnDisabled: {
    backgroundColor: "#E0E4F0",
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