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

export default function EditUsername() {
  const [username, setUsername] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const validations = useMemo(() => {
    return {
      minLength: username.length >= 5,
      maxLength: username.length <= 30,
      lowercaseOnly: username === username.toLowerCase(),
      hasLetter: /[a-z]/.test(username),
      validCharacters: /^[a-z0-9_]*$/.test(username),
      noSpaces: !/\s/.test(username),
      noLeadingTrailingUnderscore:
        username.length === 0 ||
        (!username.startsWith("_") && !username.endsWith("_")),
      noDoubleUnderscore: !/__/.test(username),
    };
  }, [username]);

  const isValid =
    Object.values(validations).every(Boolean) && username.length > 0;

  const hasContent = username.length > 0;

  const validationMessage = () => {
    if (!hasContent) return "Enter a username";

    if (!validations.minLength)
      return `${5 - username.length} more character${
        5 - username.length !== 1 ? "s" : ""
      } needed`;

    if (!validations.maxLength)
      return "Maximum of 30 characters allowed";

    if (!validations.lowercaseOnly)
      return "Use lowercase letters only";

    if (!validations.validCharacters)
      return "Only letters, numbers and underscores allowed";

    if (!validations.noSpaces)
      return "Spaces are not allowed";

    if (!validations.noLeadingTrailingUnderscore)
      return "Cannot start or end with an underscore";

    if (!validations.noDoubleUnderscore)
      return "Consecutive underscores are not allowed";

    if (!validations.hasLetter)
      return "Must contain at least one letter";

    return "Username is available";
  };

  const handleSave = () => {
  if (!isValid) return;

  // Save username here (API/database/AsyncStorage)

  setShowSuccess(true);
};

  const RULES = [
    {
      label: "5–30 characters",
      valid: validations.minLength && validations.maxLength,
    },
    {
      label: "Contains lowercase letters (a-z)",
      valid: validations.lowercaseOnly && validations.hasLetter,
    },
    {
      label: "Numbers (0-9) are allowed",
      valid: true,
    },
    {
      label: "Underscores (_) are allowed",
      valid: true,
    },
    {
      label: "No spaces",
      valid: validations.noSpaces,
    },
    {
      label: "No special characters",
      valid: validations.validCharacters,
    },
    {
      label: "Cannot start or end with _",
      valid: validations.noLeadingTrailingUnderscore,
    },
    {
      label: "No consecutive underscores",
      valid: validations.noDoubleUnderscore,
    },
  ];

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
            Edit Username
          </ThemedText>

          <ThemedText style={styles.subtitle}>
            Choose a unique username for your profile.
          </ThemedText>
        </ThemedView>

        <View style={styles.sectionDivider} />

        {/* Input */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.label}>
            Username
          </ThemedText>

          <View
            style={[
              styles.inputRow,
              hasContent &&
                (isValid
                  ? styles.inputValid
                  : styles.inputError),
            ]}
          >
            <ThemedText style={styles.atSign}>
              @
            </ThemedText>

            <TextInput
              style={styles.input}
              placeholder="your_username"
              placeholderTextColor="#9BA8C0"
              value={username}
              onChangeText={(text) =>
                setUsername(text.slice(0, 30))
              }
              autoCapitalize="none"
              autoCorrect={false}
            />

            {hasContent && (
              <Ionicons
                name={
                  isValid
                    ? "checkmark-circle"
                    : "close-circle"
                }
                size={20}
                color={isValid ? "#2E9E3A" : "#C62828"}
              />
            )}
          </View>

          <View style={styles.inputMeta}>
            <ThemedText
              style={[
                styles.validationHint,
                hasContent &&
                  (isValid
                    ? styles.validationHintOk
                    : styles.validationHintError),
              ]}
            >
              {validationMessage()}
            </ThemedText>

            <ThemedText style={styles.charCount}>
              {username.length}/30
            </ThemedText>
          </View>
        </ThemedView>

        {/* Rules */}
        <ThemedView style={styles.rulesCard}>
          {RULES.map((rule) => (
            <View key={rule.label} style={styles.ruleRow}>
              <Ionicons
                name={
                  rule.valid
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                size={16}
                color={
                  rule.valid ? "#2E9E3A" : "#9BA8C0"
                }
              />

              <ThemedText
                style={[
                  styles.ruleText,
                  rule.valid && styles.ruleTextValid,
                ]}
              >
                {rule.label}
              </ThemedText>
            </View>
          ))}
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
            Save Username
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