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
              styles.inputRow, styles.inputHeight,
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
                size={icon(20)}
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
              size={icon(16)}
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