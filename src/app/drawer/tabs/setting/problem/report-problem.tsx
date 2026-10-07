// import ProblemDropdown from "@/components/dropdown/problem-dropdown";
// import ContributeSuccess from "@/components/modals/contribute-success";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { icon, useResponsive } from "@/styles/responsive";
// import { helpProblemStyles } from "@/styles/settings/help-problem-styles";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import React, { useMemo, useState } from "react";
// import {
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   View
// } from "react-native";

// export default function ReportProblem() {
//   const [description, setDescription] = useState('');
//   const [selectedProblem, setSelectedProblem] = useState("Bug");
//   const [fileName, setFileName] = useState<string | null>(null);
//   const [imageUri, setImageUri] = useState<string | null>(null);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   const handleSubmit = () => {
//   // TODO: Send report to your backend here

//   setShowSuccessModal(true);
// };

//   const pickImage = async () => {
//   // Ask permission
//   const permission =
//     await ImagePicker.requestMediaLibraryPermissionsAsync();

//   if (!permission.granted) {
//     alert("Permission to access your gallery is required.");
//     return;
//   }

//   // Open gallery
//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ["images"],
//     allowsEditing: true,
//     quality: 0.8,
//   });

//   if (!result.canceled) {
//     const asset = result.assets[0];

//     setImageUri(asset.uri);

//     // Show filename
//     const name =
//       asset.fileName ??
//       asset.uri.split("/").pop() ??
//       "image.jpg";

//     setFileName(name);
//   }
// };

//   const isReady = selectedProblem.length > 0 && description.trim().length > 0;

//   const r = useResponsive();
        
//   const styles = useMemo(() => helpProblemStyles(r), [r]);

//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//       showsVerticalScrollIndicator={false}
//       keyboardShouldPersistTaps="handled"
//     >
//       <ThemedView style={styles.inner}>

//         {/* Header */}
//         <ThemedView style={styles.header}>
//           <ThemedText style={styles.title}>Report a Problem</ThemedText>
//           <ThemedText style={styles.subtitle}>
//             Help us improve by describing the issue you encountered.
//           </ThemedText>
//         </ThemedView>

//         <View style={styles.accentBar} />

//         {/* Form card */}
//         <ThemedView style={styles.card}>

//           {/* Problem type */}
//           <View style={styles.field}>
//             <ThemedText style={styles.fieldLabel}>Problem Type</ThemedText>
//             <ProblemDropdown
//               selectedProblem={selectedProblem}
//               setSelectedProblem={setSelectedProblem}
//             />
//           </View>

//           <View style={styles.fieldDivider} />

//           {/* Description */}
//           <View style={styles.field}>
//             <ThemedText style={styles.fieldLabel}>Description</ThemedText>
//             <TextInput
//               style={styles.textArea}
//               placeholder="Describe the issue you've encountered in detail."
//               placeholderTextColor="#9BA8C0"
//               multiline
//               textAlignVertical="top"
//               value={description}
//               onChangeText={setDescription}
//             />
//             <ThemedText style={styles.charCount}>{description.length}/500</ThemedText>
//           </View>

//           <View style={styles.fieldDivider} />

//           {/* File attachment */}
//           <View style={styles.field}>
//             <ThemedText style={styles.fieldLabel}>
//               Attach Image{" "}
//               <ThemedText style={styles.optional}>Optional</ThemedText>
//             </ThemedText>

//             <TouchableOpacity
//               style={styles.fileBtn}
//               activeOpacity={0.75}
//               onPress={pickImage}
//             >
//               <Feather name="paperclip" size={icon(16)} color="white" />
//               <ThemedText style={styles.fileBtnTxt}>
//                 {fileName ?? "Attach image or screenshot"}
//               </ThemedText>
//               {fileName
//                 ? <Ionicons name="checkmark-circle" size={icon(16)} color="#2E9E3A" />
//                 : <Ionicons name="chevron-forward" size={icon(14)} color="#9BA8C0" />
//               }
//             </TouchableOpacity>
//           </View>

//         </ThemedView>

//         {/* Info notice */}
//         <ThemedView style={styles.noticeCard}>
//           <Ionicons name="information-circle-outline" size={icon(15)} color="#35408E" />
//           <ThemedText style={styles.noticeTxt}>
//             Your report will be reviewed by the AdvocAid PH team. We may follow up via your registered email.
//           </ThemedText>
//         </ThemedView>

//         {/* Submit button */}
//         <TouchableOpacity
//           style={[styles.reportBtn, !isReady && styles.reportBtnDisabled]}
//           disabled={!isReady}
//           activeOpacity={0.85}
//           onPress={handleSubmit}
//         >
//           <Ionicons name="flag" size={icon(16)} color={isReady ? "#FFFFFF" : "#9BA8C0"} />
//           <ThemedText style={[styles.reportBtnTxt, !isReady && styles.reportBtnTxtDisabled]}>
//             Submit Report
//           </ThemedText>
//         </TouchableOpacity>

//         <ContributeSuccess
//           visible={showSuccessModal}
//           message="Your Report has been submitted. Our team will be on it."
//           onClose={() => {
//             setShowSuccessModal(false);

//             // clear the form after submission
//             setDescription("");
//             setSelectedProblem("Bug");
//             setFileName(null);
//             setImageUri(null);
//           }}
//         />

//       </ThemedView>
//     </ScrollView>
//   );
// }

import ProblemDropdown from "@/components/dropdown/problem-dropdown";
import ContributeSuccess from "@/components/modals/contribute-success";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormMutation from "@/lib/hooks/useFormMutation";
import { icon, useResponsive } from "@/styles/responsive";
import { helpProblemStyles } from "@/styles/settings/help-problem-styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY || "testing";

export default function ReportProblem() {
  const r = useResponsive();
  const styles = useMemo(() => helpProblemStyles(r), [r]);
  const { token, user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [description, setDescription] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("Bug");
  const [fileName, setFileName] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageType, setImageType] = useState("image/jpeg");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const currentUserId = String(user?.user_id ?? "").trim();

  const formMutation = useFormMutation<FormData, unknown>({
    key: ["CreateProblemReport", currentUserId],
    url: "maintenance/form",
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "x-api-version": "2026-02-26",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const isSubmitting = formMutation.isPending;
  const isReady = Boolean(selectedProblem.trim() && description.trim());

  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        setSubmitError("Please allow photo library access to upload an image.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.8,
      });

      if (result.canceled || !result.assets?.length) return;

      const asset = result.assets[0];
      const name = asset.fileName || `problem-${Date.now()}.jpg`;
      const mime = asset.mimeType || "image/jpeg";

      setImageUri(asset.uri);
      setFileName(name);
      setImageType(mime);
      setSubmitError("");

      console.log("[REPORT PROBLEM] IMAGE SELECTED:", {
        uri: asset.uri,
        name,
        mimeType: mime,
      });
    } catch (error) {
      console.error("[REPORT PROBLEM] IMAGE ERROR:", error);
      setSubmitError("Unable to select the image. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (authLoading) {
      setSubmitError("Please wait while your session is being restored.");
      return;
    }

    if (!isAuthenticated || !token || !user?.user_id) {
      setSubmitError("You must be signed in before submitting a report.");
      return;
    }

    if (!API_KEY) {
      setSubmitError("API configuration is missing.");
      return;
    }

    if (!isReady) {
      setSubmitError("Please select a problem type and describe the issue.");
      return;
    }

    setSubmitError("");

    const formData = new FormData();

    formData.append("type", selectedProblem.trim());
    formData.append("description", description.trim());
    formData.append("user_id", user.user_id);

    if (imageUri) {
      formData.append(
        "attachment",
        {
          uri: imageUri,
          name: fileName || `problem-${Date.now()}.jpg`,
          type: imageType || "image/jpeg",
        } as any
      );
    }

    try {
      await formMutation.mutateAsync(formData);
      console.log("[REPORT PROBLEM] SUBMIT SUCCESS");
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error(
        "[REPORT PROBLEM] SUBMIT FAILED:",
        error?.response?.data || error?.message || error
      );

      const status = error?.response?.status;
      const serverMessage =
        error?.response?.data?.data?.message ||
        error?.response?.data?.message;

      if (status === 401) {
        const messages: Record<string, string> = {
          "Invalid API key":
            "The API key is invalid. Please check your mobile app API configuration.",
          "Invalid authorization format":
            "Your authentication token was not sent correctly.",
          "Invalid or expired token":
            "Your session has expired. Please sign in again.",
        };

        setSubmitError(
          messages[serverMessage] ||
            "Authentication failed. Please sign in again."
        );
        return;
      }

      if (status === 500) {
        setSubmitError(
          "The server could not process the image upload. Please try again."
        );
        return;
      }

      setSubmitError(
        serverMessage || "Unable to submit your report. Please try again."
      );
    }
  };

  const resetForm = () => {
    setShowSuccessModal(false);
    setDescription("");
    setSelectedProblem("Bug");
    setFileName(null);
    setImageUri(null);
    setImageType("image/jpeg");
    setSubmitError("");
  };

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <ThemedView style={styles.inner}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>Report a Problem</ThemedText>
          <ThemedText style={styles.subtitle}>
            Help us improve by describing the issue you encountered.
          </ThemedText>
        </ThemedView>

        <View style={styles.accentBar} />

        <ThemedView style={styles.card}>
          <View style={styles.field}>
            <ThemedText style={styles.fieldLabel}>Problem Type</ThemedText>
            <ProblemDropdown
              selectedProblem={selectedProblem}
              setSelectedProblem={(value) => {
                setSelectedProblem(value);
                setSubmitError("");
              }}
            />
          </View>

          <View style={styles.fieldDivider} />

          <View style={styles.field}>
            <ThemedText style={styles.fieldLabel}>Description</ThemedText>
            <TextInput
              style={styles.textArea}
              placeholder="Describe the issue you've encountered in detail."
              placeholderTextColor="#9BA8C0"
              multiline
              maxLength={500}
              textAlignVertical="top"
              value={description}
              onChangeText={(value) => {
                setDescription(value);
                setSubmitError("");
              }}
              editable={!isSubmitting}
            />
            <ThemedText style={styles.charCount}>
              {description.length}/500
            </ThemedText>
          </View>

          <View style={styles.fieldDivider} />

          <View style={styles.field}>
            <ThemedText style={styles.fieldLabel}>
              Attach Image{" "}
              <ThemedText style={styles.optional}>Optional</ThemedText>
            </ThemedText>

            <TouchableOpacity
              style={styles.fileBtn}
              activeOpacity={0.75}
              onPress={pickImage}
              disabled={isSubmitting}
            >
              <Feather name="paperclip" size={icon(16)} color="white" />

              <ThemedText style={styles.fileBtnTxt}>
                {fileName || "Attach image or screenshot"}
              </ThemedText>

              <Ionicons
                name={fileName ? "checkmark-circle" : "chevron-forward"}
                size={icon(fileName ? 16 : 14)}
                color={fileName ? "#2E9E3A" : "#9BA8C0"}
              />
            </TouchableOpacity>
          </View>
        </ThemedView>

        <ThemedView style={styles.noticeCard}>
          <Ionicons
            name="information-circle-outline"
            size={icon(15)}
            color="#35408E"
          />
          <ThemedText style={styles.noticeTxt}>
            Your report will be reviewed by the AdvocAid PH team. We may
            follow up via your registered email.
          </ThemedText>
        </ThemedView>

        {submitError ? (
          <ThemedView
            style={{ backgroundColor: "transparent", marginTop: 12 }}
          >
            <ThemedText style={{ color: "#E20000", textAlign: "center" }}>
              {submitError}
            </ThemedText>
          </ThemedView>
        ) : null}

        <TouchableOpacity
          style={[
            styles.reportBtn,
            (!isReady || isSubmitting) && styles.reportBtnDisabled,
          ]}
          disabled={!isReady || isSubmitting}
          activeOpacity={0.85}
          onPress={handleSubmit}
        >
          <Ionicons
            name="flag"
            size={icon(16)}
            color={isReady && !isSubmitting ? "#FFFFFF" : "#9BA8C0"}
          />

          <ThemedText
            style={[
              styles.reportBtnTxt,
              (!isReady || isSubmitting) && styles.reportBtnTxtDisabled,
            ]}
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </ThemedText>
        </TouchableOpacity>

        <ContributeSuccess
          visible={showSuccessModal}
          message="Your report has been submitted. Our team will be on it."
          onClose={resetForm}
        />
      </ThemedView>
    </ScrollView>
  );
}
