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

export default function EditEmail() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const hasContent = email.length > 0;

  const isValidEmail =
    email.length <= 254 &&
    !/\s/.test(email) &&
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

  const validationMessage = () => {
    if (!hasContent) return "Enter your email address";

    if (/\s/.test(email))
      return "Email address cannot contain spaces";

    if (email.length > 254)
      return "Email address is too long";

    if (!isValidEmail)
      return "Enter a valid email address";

    return "Email address looks good";
  };

  const handleSave = () => {
    if (!isValidEmail) return;

    // Save email here

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
            Edit Email
          </ThemedText>

          <ThemedText style={styles.subtitle}>
            Change or update your email address.
          </ThemedText>
        </ThemedView>

        <View style={styles.sectionDivider} />

        {/* Input */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.label}>
            Email
          </ThemedText>

          <View
            style={[
              styles.inputRow,
              hasContent &&
                (isValidEmail ? styles.inputValid : styles.inputError),
            ]}
          >

            <TextInput
              style={styles.input}
              placeholder="user@email.com"
              placeholderTextColor="#9BA8C0"
              value={email}
              onChangeText={(text) => setEmail(text.slice(0, 254))}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />

            {hasContent && (
              <Ionicons
                name={isValidEmail ? "checkmark-circle" : "close-circle"}
                size={20}
                color={isValidEmail ? "#2E9E3A" : "#C62828"}
              />
            )}
            
          </View>

          <View style={styles.inputMeta}>
              <ThemedText
                style={[
                  styles.validationHint,
                  hasContent &&
                    (isValidEmail
                      ? styles.validationHintOk
                      : styles.validationHintError),
                ]}
              >
                {validationMessage()}
              </ThemedText>

              <ThemedText style={styles.charCount}>
                {email.length}/254
              </ThemedText>
            </View>

        </ThemedView>

        {/* Rules */}
        <ThemedView style={styles.rulesCard}>
        {[
          {
            label: "Must be a valid email address",
            valid: isValidEmail,
          },
          {
            label: "No spaces",
            valid: !/\s/.test(email),
          },
          {
            label: "Maximum of 254 characters",
            valid: email.length <= 254,
          },
        ].map((rule) => (
          <View key={rule.label} style={styles.ruleRow}>
            <Ionicons
              name={rule.valid ? "checkmark-circle" : "ellipse-outline"}
              size={16}
              color={rule.valid ? "#2E9E3A" : "#9BA8C0"}
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
          disabled={!isValidEmail}
          onPress={handleSave}
          style={[
            styles.saveBtn,
            !isValidEmail && styles.saveBtnDisabled,
          ]}
        >
          <ThemedText
            style={[
              styles.saveTxt,
              !isValidEmail && styles.saveTxtDisabled,
            ]}
          >
            Save Email
          </ThemedText>
        </TouchableOpacity>
        <EditSuccess
          visible={showSuccess}
          message="Your email has been updated and saved."
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