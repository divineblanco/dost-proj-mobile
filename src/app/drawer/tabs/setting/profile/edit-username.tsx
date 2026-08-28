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
              styles.inputRow, styles.inputHeight,
              firstName.length === 0
              ? styles.inputDefault
              : Object.values(firstNameValidation).every(Boolean)
              ? styles.inputValid
              : styles.inputError,
            ]}
          >
            <Ionicons
              name="person-outline"
              size={icon(20)}
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
              styles.inputRow, styles.inputHeight,
              lastName.length === 0
              ? styles.inputDefault
              : Object.values(lastNameValidation).every(Boolean)
              ? styles.inputValid
              : styles.inputError,
            ]}
          >
            <Ionicons
              name="person-outline"
              size={icon(20)}
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