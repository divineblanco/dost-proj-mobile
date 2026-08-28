import ProblemDropdown from "@/components/dropdown/problem-dropdown";
import ContributeSuccess from "@/components/modals/contribute-success";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { helpProblemStyles } from "@/styles/settings/help-problem-styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
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

  const r = useResponsive();
        
  const styles = useMemo(() => helpProblemStyles(r), [r]);

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
              <Feather name="paperclip" size={icon(16)} color="white" />
              <ThemedText style={styles.fileBtnTxt}>
                {fileName ?? "Attach image or screenshot"}
              </ThemedText>
              {fileName
                ? <Ionicons name="checkmark-circle" size={icon(16)} color="#2E9E3A" />
                : <Ionicons name="chevron-forward" size={icon(14)} color="#9BA8C0" />
              }
            </TouchableOpacity>
          </View>

        </ThemedView>

        {/* Info notice */}
        <ThemedView style={styles.noticeCard}>
          <Ionicons name="information-circle-outline" size={icon(15)} color="#35408E" />
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
          <Ionicons name="flag" size={icon(16)} color={isReady ? "#FFFFFF" : "#9BA8C0"} />
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