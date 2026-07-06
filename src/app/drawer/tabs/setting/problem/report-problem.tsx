import ProblemDropdown from "@/components/dropdown/problem-dropdown";
import ContributeSuccess from "@/components/modals/contribute-success";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReportProblem() {
  const [description, setDescription] = useState('');
  const [selectedProblem, setSelectedProblem] = useState("Bug");
  const [fileName, setFileName] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = () => {
  // TODO: Send report to your backend here

  setShowSuccessModal(true);
};

  const pickImage = async () => {
  // Ask permission
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    alert("Permission to access your gallery is required.");
    return;
  }

  // Open gallery
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 0.8,
  });

  if (!result.canceled) {
    const asset = result.assets[0];

    setImageUri(asset.uri);

    // Show filename
    const name =
      asset.fileName ??
      asset.uri.split("/").pop() ??
      "image.jpg";

    setFileName(name);
  }
};

  const isReady = selectedProblem.length > 0 && description.trim().length > 0;

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <ThemedView style={styles.inner}>

        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>Report a Problem</ThemedText>
          <ThemedText style={styles.subtitle}>
            Help us improve by describing the issue you encountered.
          </ThemedText>
        </ThemedView>

        <View style={styles.accentBar} />

        {/* Form card */}
        <ThemedView style={styles.card}>

          {/* Problem type */}
          <View style={styles.field}>
            <ThemedText style={styles.fieldLabel}>Problem Type</ThemedText>
            <ProblemDropdown
              selectedProblem={selectedProblem}
              setSelectedProblem={setSelectedProblem}
            />
          </View>

          <View style={styles.fieldDivider} />

          {/* Description */}
          <View style={styles.field}>
            <ThemedText style={styles.fieldLabel}>Description</ThemedText>
            <TextInput
              style={styles.textArea}
              placeholder="Describe the issue you've encountered in detail."
              placeholderTextColor="#9BA8C0"
              multiline
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
            <ThemedText style={styles.charCount}>{description.length}/500</ThemedText>
          </View>

          <View style={styles.fieldDivider} />

          {/* File attachment */}
          <View style={styles.field}>
            <ThemedText style={styles.fieldLabel}>
              Attach Image{" "}
              <ThemedText style={styles.optional}>Optional</ThemedText>
            </ThemedText>

            <TouchableOpacity
              style={styles.fileBtn}
              activeOpacity={0.75}
              onPress={pickImage}
            >
              <Feather name="paperclip" size={16} color="white" />
              <ThemedText style={styles.fileBtnTxt}>
                {fileName ?? "Attach image or screenshot"}
              </ThemedText>
              {fileName
                ? <Ionicons name="checkmark-circle" size={16} color="#2E9E3A" />
                : <Ionicons name="chevron-forward" size={14} color="#9BA8C0" />
              }
            </TouchableOpacity>
          </View>

        </ThemedView>

        {/* Info notice */}
        <ThemedView style={styles.noticeCard}>
          <Ionicons name="information-circle-outline" size={15} color="#35408E" />
          <ThemedText style={styles.noticeTxt}>
            Your report will be reviewed by the AdvocAid PH team. We may follow up via your registered email.
          </ThemedText>
        </ThemedView>

        {/* Submit button */}
        <TouchableOpacity
          style={[styles.reportBtn, !isReady && styles.reportBtnDisabled]}
          disabled={!isReady}
          activeOpacity={0.85}
          onPress={handleSubmit}
        >
          <Ionicons name="flag" size={16} color={isReady ? "#FFFFFF" : "#9BA8C0"} />
          <ThemedText style={[styles.reportBtnTxt, !isReady && styles.reportBtnTxtDisabled]}>
            Submit Report
          </ThemedText>
        </TouchableOpacity>

        <ContributeSuccess
          visible={showSuccessModal}
          message="Your Report has been submitted. Our team will be on it."
          onClose={() => {
            setShowSuccessModal(false);

            // clear the form after submission
            setDescription("");
            setSelectedProblem("Bug");
            setFileName(null);
            setImageUri(null);
          }}
        />

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

  // Header
  header: {
    gap: 4,
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

  accentBar: {
    height: 3,
    width: "100%",
    backgroundColor: "#E20000",
    borderRadius: 2,
  },

  // Form card
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    paddingHorizontal: 16,
    paddingVertical: 6,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  field: {
    paddingVertical: 14,
    gap: 8,
  },

  fieldDivider: {
    height: 1,
    backgroundColor: "#F0F2F8",
  },

  fieldLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#35408E",
    letterSpacing: 0.2,
  },

  optional: {
    fontSize: 11,
    fontWeight: "400",
    color: "#9BA8C0",
  },

  // Text area
  textArea: {
    backgroundColor: "#F8F9FD",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E8EAF0",
    padding: 12,
    height: 130,
    fontSize: 13,
    color: "#1A1F5E",
    lineHeight: 20,
  },

  charCount: {
    fontSize: 11,
    color: "#9BA8C0",
    textAlign: "right",
  },

  // File button
  fileBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#35408E",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    padding: 12,
  },

  fileIconBubble: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#EEF0FA",
    justifyContent: "center",
    alignItems: "center",
  },

  fileBtnTxt: {
    flex: 1,
    fontSize: 13,
    color: "white",
    fontWeight: "500",
  },

  // Notice
  noticeCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#EEF0FA",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5E8",
    padding: 12,
  },

  noticeTxt: {
    flex: 1,
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 18,
  },

  // Submit button
  reportBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#C62828",
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: "#C62828",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  reportBtnDisabled: {
    backgroundColor: "#E0E4F0",
    shadowOpacity: 0,
    elevation: 0,
  },

  reportBtnTxt: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  reportBtnTxtDisabled: {
    color: "#9BA8C0",
  },
});