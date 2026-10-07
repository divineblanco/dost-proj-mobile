// import { MisinformationType } from "@/components/cards/misinfo-type";
// import ContributeSuccess from "@/components/modals/contribute-success";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { colors } from "@/styles/contribute/contribute-colors";
// import {
//   reportMisinfoStyles,
//   sharedFormStyles,
// } from "@/styles/contribute/contribute-form-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React, { useMemo, useState } from "react";
// import {
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";

// export default function ReportMisinformation() {
//   /*
//    * ============================
//    * FORM VALUES
//    * ============================
//    */

//   const [selectedMisinformation, setSelectedMisinformation] =
//     useState<string | null>(null);

//   const [source, setSource] = useState("");
//   const [details, setDetails] = useState("");

//   const [successContribute, setSuccessContribute] = useState(false);

//   /*
//    * ============================
//    * VALIDATION ERRORS
//    * ============================
//    */

//   const [errors, setErrors] = useState({
//     misinformation: "",
//     source: "",
//     details: "",
//   });

//   /*
//    * ============================
//    * RESPONSIVE STYLES
//    * ============================
//    */

//   const r = useResponsive();

//   const reportMisinfo = useMemo(
//     () => reportMisinfoStyles(r),
//     [r]
//   );

//   const styles = useMemo(
//     () => sharedFormStyles(r),
//     [r]
//   );

//   /*
//    * ============================
//    * VALIDATION
//    * ============================
//    */

//   const validateForm = () => {
//     let misinformationError = "";
//     let sourceError = "";
//     let detailsError = "";

//     /*
//      * Q1
//      */

//     if (!selectedMisinformation) {
//       misinformationError =
//         "Please select a type of misinformation.";
//     }

//     /*
//      * Q2
//      */

//     if (!source.trim()) {
//       sourceError =
//         "Please provide where you encountered this misinformation.";
//     }

//     /*
//      * Q3
//      */

//     if (!details.trim()) {
//       detailsError =
//         "Please provide details about the misinformation.";
//     }

//     /*
//      * SET ERRORS
//      */

//     setErrors({
//       misinformation: misinformationError,
//       source: sourceError,
//       details: detailsError,
//     });

//     /*
//      * RETURN VALIDITY
//      */

//     return (
//       !misinformationError &&
//       !sourceError &&
//       !detailsError
//     );
//   };

//   /*
//    * ============================
//    * SUBMIT
//    * ============================
//    */

//   const handleSubmit = () => {
//     const isValid = validateForm();

//     if (!isValid) {
//       return;
//     }

//     /*
//      * Q4 IS OPTIONAL
//      * No validation is required for the
//      * supporting evidence.
//      */

//     console.log("Misinformation Report:", {
//       misinformationType: selectedMisinformation,
//       source,
//       details,
//     });

//     setSuccessContribute(true);
//   };

//   /*
//    * ============================
//    * CLEAR ERRORS
//    * ============================
//    */

//   const handleMisinformationChange = (
//     value: string | null
//   ) => {
//     setSelectedMisinformation(value);

//     if (errors.misinformation) {
//       setErrors((prev) => ({
//         ...prev,
//         misinformation: "",
//       }));
//     }
//   };

//   const handleSourceChange = (value: string) => {
//     setSource(value);

//     if (errors.source) {
//       setErrors((prev) => ({
//         ...prev,
//         source: "",
//       }));
//     }
//   };

//   const handleDetailsChange = (value: string) => {
//     setDetails(value);

//     if (errors.details) {
//       setErrors((prev) => ({
//         ...prev,
//         details: "",
//       }));
//     }
//   };

//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//       showsVerticalScrollIndicator={false}
//       keyboardShouldPersistTaps="handled"
//     >
//       <ThemedView style={styles.formInner}>

//         {/* =========================
//             PAGE HEADER
//         ========================= */}

//         <ThemedView style={styles.headerCompact}>
//           <ThemedText style={styles.title}>
//             Report Misinformation
//           </ThemedText>
//         </ThemedView>

//         <ThemedView style={styles.headerDivider} />

//         {/* =========================
//             QUESTION 1
//         ========================= */}

//         <ThemedView style={styles.section}>

//           <ThemedView style={styles.questionRow}>

//             <ThemedView style={styles.qNumber}>
//               <ThemedText style={styles.qNumberText}>
//                 1
//               </ThemedText>
//             </ThemedView>

//             <ThemedText style={styles.question}>
//               What type of misinformation?{" "}
//               <ThemedText style={styles.required}>
//                 *
//               </ThemedText>
//             </ThemedText>

//           </ThemedView>

//           <MisinformationType
//             value={selectedMisinformation}
//             onChange={handleMisinformationChange}
//           />

//           {errors.misinformation ? (
//             <ThemedText style={styles.errorText}>
//               {errors.misinformation}
//             </ThemedText>
//           ) : null}

//         </ThemedView>

//         <ThemedView style={styles.sectionDivider} />

//         {/* =========================
//             QUESTION 2
//         ========================= */}

//         <ThemedView style={styles.section}>

//           <ThemedView style={styles.questionRow}>

//             <ThemedView style={styles.qNumber}>
//               <ThemedText style={styles.qNumberText}>
//                 2
//               </ThemedText>
//             </ThemedView>

//             <ThemedText style={styles.question}>
//               Where did you encounter this misinformation?{" "}
//               <ThemedText style={styles.required}>
//                 *
//               </ThemedText>
//             </ThemedText>

//           </ThemedView>

//           <ThemedView style={reportMisinfo.bg}>

//             <ThemedText style={reportMisinfo.label}>
//               Source URL
//             </ThemedText>

//             <TextInput
//               style={[
//                 reportMisinfo.input,
//                 errors.source
//                   ? styles.inputError
//                   : null,
//               ]}
//               placeholder="e.g., Facebook, X, TikTok, or website URL"
//               placeholderTextColor={colors.muted}
//               value={source}
//               onChangeText={handleSourceChange}
//               autoCapitalize="none"
//               autoCorrect={false}
//             />

//           </ThemedView>

//           {errors.source ? (
//             <ThemedText style={styles.errorText}>
//               {errors.source}
//             </ThemedText>
//           ) : null}

//         </ThemedView>

//         <ThemedView style={styles.sectionDivider} />

//         {/* =========================
//             QUESTION 3
//         ========================= */}

//         <ThemedView style={styles.section}>

//           <ThemedView style={styles.questionRow}>

//             <ThemedView style={styles.qNumber}>
//               <ThemedText style={styles.qNumberText}>
//                 3
//               </ThemedText>
//             </ThemedView>

//             <ThemedText style={styles.question}>
//               Tell us the details about the misinformation{" "}
//               <ThemedText style={styles.required}>
//                 *
//               </ThemedText>
//             </ThemedText>

//           </ThemedView>

//           <TextInput
//             style={[
//               styles.textArea,
//               errors.details
//                 ? styles.inputError
//                 : null,
//             ]}
//             placeholder="Provide details of the misinformation..."
//             placeholderTextColor={colors.muted}
//             multiline
//             textAlignVertical="top"
//             value={details}
//             onChangeText={handleDetailsChange}
//           />

//           {errors.details ? (
//             <ThemedText style={styles.errorText}>
//               {errors.details}
//             </ThemedText>
//           ) : null}

//         </ThemedView>

//         <ThemedView style={styles.sectionDivider} />

//         {/* =========================
//             QUESTION 4
//             OPTIONAL
//         ========================= */}

//         <ThemedView style={styles.section}>

//           <ThemedView style={styles.questionRow}>

//             <ThemedView style={styles.qNumber}>
//               <ThemedText style={styles.qNumberText}>
//                 4
//               </ThemedText>
//             </ThemedView>

//             <ThemedText style={styles.question}>
//               Attach Supporting Evidence{" "}
//               <ThemedText style={styles.optional}>
//                 (Optional)
//               </ThemedText>
//             </ThemedText>

//           </ThemedView>

//           <ThemedText style={styles.subLabel}>
//             Add photos, or screenshots.
//           </ThemedText>

//           <TouchableOpacity
//             style={reportMisinfo.attachBtnCentered}
//             activeOpacity={0.75}
//           >
//             <ThemedView
//               style={[
//                 reportMisinfo.attachIconLarge,
//                 {
//                   backgroundColor: "#FFF4EC",
//                 },
//               ]}
//             >
//               <Ionicons
//                 name="image-outline"
//                 size={icon(25)}
//                 color="#FFB400"
//               />
//             </ThemedView>

//             <ThemedText
//               style={reportMisinfo.attachTxtLarge}
//             >
//               Upload Image
//             </ThemedText>
//           </TouchableOpacity>

//         </ThemedView>

//         <ThemedView style={styles.sectionDivider} />

//         {/* =========================
//             SUBMIT
//         ========================= */}

//         <TouchableOpacity
//           style={styles.submitBtn}
//           activeOpacity={0.85}
//           onPress={handleSubmit}
//         >
//           <Ionicons
//             name="send-outline"
//             size={icon(18)}
//             color="white"
//           />

//           <ThemedText style={styles.submitTxt}>
//             Submit Report
//           </ThemedText>
//         </TouchableOpacity>

//         {/* =========================
//             SUCCESS MODAL
//         ========================= */}

//         <ContributeSuccess
//           visible={successContribute}
//           title="Report Submitted"
//           message="Your report has been successfully received. Please allow up to (time) for it to be reviewed and verified before it is posted."
//           onClose={() => {
//             setSuccessContribute(false);
//             router.back();
//           }}
//         />

//         {/* =========================
//             CANCEL
//         ========================= */}

//         <TouchableOpacity
//           style={reportMisinfo.cancelBtn}
//           activeOpacity={0.85}
//           onPress={() => router.back()}
//         >
//           <ThemedText
//             style={reportMisinfo.cancelTxt}
//           >
//             Cancel
//           </ThemedText>
//         </TouchableOpacity>

//       </ThemedView>
//     </ScrollView>
//   );
// }

import { MisinformationType } from "@/components/cards/misinfo-type";
import ContributeSuccess from "@/components/modals/contribute-success";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormMutation from "@/lib/hooks/useFormMutation";
import { colors } from "@/styles/contribute/contribute-colors";
import { reportMisinfoStyles, sharedFormStyles } from "@/styles/contribute/contribute-form-styles";
import { icon, useResponsive, verticalScale } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, ScrollView, TextInput, TouchableOpacity } from "react-native";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY || "testing";

type CreateMisinformationPayload = {
  title: string;
  type: string;
  source_url: string;
  content: string;
  classification: "MISINFORMATION";
  classification_method: "MANUAL";
  status: "PENDING";
  user_id: string;
  attachment?: { uri: string; name: string; type: string };
};

type ActivityLogPayload = {
  type: string;
  description: string;
  user_id: string;
};

type FormErrors = {
  misinformation: string;
  source: string;
  details: string;
};

const EMPTY_ERRORS: FormErrors = { misinformation: "", source: "", details: "" };

export default function ReportMisinformation() {
  const { token, user, isAuthenticated, isLoading: authLoading } = useAuth();
  const r = useResponsive();
  const styles = useMemo(() => sharedFormStyles(r), [r]);
  const reportMisinfo = useMemo(() => reportMisinfoStyles(r), [r]);

  const [selectedMisinformation, setSelectedMisinformation] = useState<string | null>(null);
  const [source, setSource] = useState("");
  const [details, setDetails] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState("image/jpeg");
  const [successContribute, setSuccessContribute] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<FormErrors>(EMPTY_ERRORS);

  const misinformationMutation = useFormMutation<CreateMisinformationPayload, unknown>({
    key: ["CreateMisinformation", user?.user_id],
    url: "maintenance/contribution",
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "x-api-version": "2026-02-26",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const { mutateAsync: createActivityLog, isPending: isLoggingActivity } =
    useFormMutation<ActivityLogPayload, unknown>({
      key: ["ActivityLog", "MisinformationSubmitted", user?.user_id],
      url: "maintenance/activity-logs",
      method: "POST",
      params: {},
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "x-api-version": "2026-02-26",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

  const isSubmitting = misinformationMutation.isPending || isLoggingActivity;

  const clearSubmitError = () => {
    if (submitError) setSubmitError("");
  };

  const validateForm = () => {
    const next: FormErrors = {
      misinformation: selectedMisinformation ? "" : "Please select a type of misinformation.",
      source: source.trim() ? "" : "Please provide the source or social media platform.",
      details: details.trim() ? "" : "Please provide details about the misinformation.",
    };

    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const pickImage = async () => {
    try {
      clearSubmitError();

      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        setSubmitError("Please allow photo library access to upload an image.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (result.canceled || !result.assets?.length) return;

      const asset = result.assets[0];
      const uri = asset.uri;
      const fileName = asset.fileName || `misinformation-${Date.now()}.jpg`;
      const mimeType = asset.mimeType || "image/jpeg";

      setImageUri(uri);
      setImageName(fileName);
      setImageMimeType(mimeType);

      console.log("[MISINFORMATION IMAGE]", { uri, fileName, mimeType });
    } catch (error) {
      console.error("[IMAGE PICKER]", error);
      setSubmitError("Unable to select the image. Please try again.");
    }
  };

  const removeImage = () => {
    if (misinformationMutation.isPending) return;
    setImageUri(null);
    setImageName(null);
    setImageMimeType("image/jpeg");
  };

  const handleSubmitError = (error: any) => {
    console.error("[MISINFORMATION] Submission failed:", error?.response?.data || error?.message || error);

    const status = error?.response?.status;
    const message = error?.response?.data?.data?.message || error?.response?.data?.message;

    if (status === 401) {
      const messages: Record<string, string> = {
        "Invalid API key": "The API key is invalid. Please check your mobile app API configuration.",
        "Invalid authorization format": "Your authentication token was not sent correctly.",
        "Invalid or expired token": "Your session has expired. Please sign in again.",
      };

      setSubmitError(messages[message] || "Authentication failed. Please sign in again.");
      return;
    }

    setSubmitError("Unable to submit your report. Please try again.");
  };

  const handleSubmit = async () => {
    console.log("[MISINFORMATION] Submit pressed");

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

    if (!validateForm()) return;

    clearSubmitError();

    const formData = new FormData();

    formData.append("title", selectedMisinformation!);
    formData.append("type", selectedMisinformation!);
    formData.append("source_url", source.trim());
    formData.append("content", details.trim());
    formData.append("classification", "MISINFORMATION");
    formData.append("classification_method", "MANUAL");
    formData.append("status", "PENDING");
    formData.append("user_id", user.user_id);

    if (imageUri) {
      formData.append("attachment", {
        uri: imageUri,
        name: imageName || `misinformation-${Date.now()}.jpg`,
        type: imageMimeType || "image/jpeg",
      } as any);
    }

    console.log("[MISINFORMATION FORM]", {
      hasImage: Boolean(imageUri),
      imageUri,
      imageName,
      imageMimeType,
      source,
      selectedMisinformation,
    });

    try {
      const response = await misinformationMutation.mutateAsync(formData as any);
      console.log("[MISINFORMATION] Submission successful:", response);

      try {
        const activityResponse = await createActivityLog({
          type: "MISINFORMATION SUBMITTED",
          description: `User submitted a misinformation report about ${selectedMisinformation}${imageUri ? " with supporting image evidence." : "."}`,
          user_id: user.user_id,
        });

        console.log("[ACTIVITY LOG] Successfully created:", activityResponse);
      } catch (activityError: any) {
        console.error("[ACTIVITY LOG] Failed:", activityError?.response?.data || activityError?.message || activityError);
      }

      setSuccessContribute(true);
    } catch (error) {
      handleSubmitError(error);
    }
  };

  const handleMisinformationChange = (value: string | null) => {
    setSelectedMisinformation(value);
    setErrors((prev) => ({ ...prev, misinformation: "" }));
    clearSubmitError();
  };

  const handleSourceChange = (value: string) => {
    setSource(value);
    setErrors((prev) => ({ ...prev, source: "" }));
    clearSubmitError();
  };

  const handleDetailsChange = (value: string) => {
    setDetails(value);
    setErrors((prev) => ({ ...prev, details: "" }));
    clearSubmitError();
  };

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <ThemedView style={styles.formInner}>
        <ThemedView style={styles.headerCompact}>
          <ThemedText style={styles.title}>Report Misinformation</ThemedText>
        </ThemedView>

        <ThemedView style={styles.headerDivider} />

        <ThemedView style={styles.section}>
          <ThemedView style={styles.questionRow}>
            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>1</ThemedText>
            </ThemedView>
            <ThemedText style={styles.question}>
              What type of misinformation? <ThemedText style={styles.required}>*</ThemedText>
            </ThemedText>
          </ThemedView>

          <MisinformationType value={selectedMisinformation} onChange={handleMisinformationChange} />

          {errors.misinformation ? <ThemedText style={styles.errorText}>{errors.misinformation}</ThemedText> : null}
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        <ThemedView style={styles.section}>
          <ThemedView style={styles.questionRow}>
            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>2</ThemedText>
            </ThemedView>
            <ThemedText style={styles.question}>
              Where did you encounter this misinformation? <ThemedText style={styles.required}>*</ThemedText>
            </ThemedText>
          </ThemedView>

          <ThemedView style={reportMisinfo.bg}>
            <ThemedText style={reportMisinfo.label}>Source URL</ThemedText>
            <TextInput
              style={[reportMisinfo.input, errors.source ? styles.inputError : null]}
              placeholder="e.g., Facebook, X, TikTok, or website URL"
              placeholderTextColor={colors.muted}
              value={source}
              onChangeText={handleSourceChange}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isSubmitting}
            />
          </ThemedView>

          {errors.source ? <ThemedText style={styles.errorText}>{errors.source}</ThemedText> : null}
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        <ThemedView style={styles.section}>
          <ThemedView style={styles.questionRow}>
            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>3</ThemedText>
            </ThemedView>
            <ThemedText style={styles.question}>
              Tell us the details about the misinformation <ThemedText style={styles.required}>*</ThemedText>
            </ThemedText>
          </ThemedView>

          <TextInput
            style={[styles.textArea, errors.details ? styles.inputError : null]}
            placeholder="Provide details of the misinformation..."
            placeholderTextColor={colors.muted}
            multiline
            textAlignVertical="top"
            value={details}
            onChangeText={handleDetailsChange}
            editable={!isSubmitting}
          />

          {errors.details ? <ThemedText style={styles.errorText}>{errors.details}</ThemedText> : null}
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        <ThemedView style={styles.section}>
          <ThemedView style={styles.questionRow}>
            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>4</ThemedText>
            </ThemedView>
            <ThemedText style={styles.question}>
              Attach Supporting Evidence <ThemedText style={styles.optional}>(Optional)</ThemedText>
            </ThemedText>
          </ThemedView>

          <ThemedText style={styles.subLabel}>Add photos or screenshots.</ThemedText>

          <TouchableOpacity
            style={reportMisinfo.attachBtnCentered}
            activeOpacity={0.75}
            onPress={pickImage}
            disabled={isSubmitting}
          >
            <ThemedView style={[reportMisinfo.attachIconLarge, { backgroundColor: "#FFF4EC" }]}>
              <Ionicons name="image-outline" size={icon(25)} color="#FFB400" />
            </ThemedView>
            <ThemedText style={reportMisinfo.attachTxtLarge}>{imageUri ? "Change Image" : "Upload Image"}</ThemedText>
          </TouchableOpacity>

          {imageUri ? (
            <ThemedView style={{ marginTop: verticalScale(10), position: "relative" }}>
              <Image source={{ uri: imageUri }} style={{ width: "100%", height: verticalScale(180), borderRadius: 12 }} resizeMode="cover" />

              <TouchableOpacity
                onPress={removeImage}
                disabled={isSubmitting}
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: "rgba(0,0,0,0.65)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="close" size={icon(18)} color="white" />
              </TouchableOpacity>

              {imageName ? (
                <ThemedText style={{ marginTop: 5, color: colors.muted }} numberOfLines={1}>
                  {imageName}
                </ThemedText>
              ) : null}
            </ThemedView>
          ) : null}
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        {submitError ? (
          <ThemedView style={{ backgroundColor: "transparent", marginTop: 12 }}>
            <ThemedText style={{ color: "#E20000", textAlign: "center" }}>{submitError}</ThemedText>
          </ThemedView>
        ) : null}

        <TouchableOpacity
          style={[styles.submitBtn, isSubmitting && { opacity: 0.5 }]}
          activeOpacity={0.85}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Ionicons name="send-outline" size={icon(18)} color="white" />
          <ThemedText style={styles.submitTxt}>
            {misinformationMutation.isPending ? "Submitting..." : isLoggingActivity ? "Logging..." : "Submit Report"}
          </ThemedText>
        </TouchableOpacity>

        <ContributeSuccess
          visible={successContribute}
          title="Report Submitted"
          message="Your report has been successfully received. Please allow up to (time) for it to be reviewed and verified before it is posted."
          onClose={() => {
            setSuccessContribute(false);
            router.back();
          }}
        />

        <TouchableOpacity style={reportMisinfo.cancelBtn} activeOpacity={0.85} onPress={() => router.back()} disabled={isSubmitting}>
          <ThemedText style={reportMisinfo.cancelTxt}>Cancel</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}
