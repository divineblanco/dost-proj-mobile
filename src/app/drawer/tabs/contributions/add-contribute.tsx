// import { QuestionOne } from "@/components/cards/question-one";
// import { QuestionTwo } from "@/components/cards/question-two";
// import ContributeSuccess from "@/components/modals/contribute-success";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { useAuth } from "@/lib/auth/AuthProvider";
// import useFormMutation from "@/lib/hooks/useFormMutation";
// import { colors } from "@/styles/contribute/contribute-colors";
// import { addContributeStyles, sharedFormStyles } from "@/styles/contribute/contribute-form-styles";
// import { icon, useResponsive, verticalScale } from "@/styles/responsive";
// import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React, { useMemo, useRef, useState } from "react";
// import { ScrollView, TextInput, TouchableOpacity } from "react-native";

// export type QuestionOneValue = { selected: string | null; otherText: string };
// export type QuestionTwoValue = { region: string | null; province: string | null; city: string | null; barangay: string | null };

// type CreateContributionPayload = {
//   title: string;
//   content: string;
//   type: string;
//   classification: "FACTUAL";
//   classification_method: "MANUAL";
//   status: "PENDING";
//   barangay: string;
//   municipality: string;
//   province: string;
//   region: string;
//   user_id: string;
//   source_url?: string | null;
// };

// type ActivityLogPayload = {
//   type: string;
//   description: string;
//   user_id: string;
// };

// const API_KEY = process.env.EXPO_PUBLIC_API_KEY || "testing";

// export default function AddContribute() {
//   const [sourceUrl, setSourceUrl] = useState("");
//   const [showLinkInput, setShowLinkInput] = useState(false);
//   const { token, user, isAuthenticated, isLoading: authLoading } = useAuth();

//   const [questionOne, setQuestionOne] = useState<QuestionOneValue>({ selected: null, otherText: "" });
//   const [questionTwo, setQuestionTwo] = useState<QuestionTwoValue>({ region: null, province: null, city: null, barangay: null });
//   const [experience, setExperience] = useState("");
//   const [successContribute, setSuccessContribute] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [errors, setErrors] = useState({ questionOne: "", questionTwo: "", experience: "" });
//   const scrollViewRef = useRef<ScrollView>(null);

//   const r = useResponsive();
//   const styles = useMemo(() => sharedFormStyles(r), [r]);
//   const addContri = useMemo(() => addContributeStyles(r), [r]);

//   const contributionMutation = useFormMutation<CreateContributionPayload, unknown>({
//     key: ["CreateContribution", user?.user_id],
//     url: "maintenance/contribution",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-api-key": API_KEY,
//       "x-api-version": "2026-02-26",
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   });

//   const { mutateAsync: createActivityLog, isPending: isLoggingActivity } =
//     useFormMutation<ActivityLogPayload, unknown>({
//       key: ["ActivityLog", "ContributionSubmit", user?.user_id],
//       url: "maintenance/activity-logs",
//       method: "POST",
//       params: {},
//       headers: {
//         "x-api-key": API_KEY,
//         "x-api-version": "2026-02-26",
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//     });

//   const validateForm = () => {
//     let questionOneError = "";
//     let questionTwoError = "";
//     let experienceError = "";

//     if (!questionOne.selected) {
//       questionOneError = "Please select what you would like to share.";
//     } else if (questionOne.selected === "Other" && !questionOne.otherText.trim()) {
//       questionOneError = "Please specify what you would like to share.";
//     }

//     const missingLocation = !questionTwo.region || !questionTwo.province || !questionTwo.city || !questionTwo.barangay;
//     if (missingLocation) questionTwoError = "Please complete all location fields.";

//     if (!experience.trim()) experienceError = "Please tell us about your experience.";

//     setErrors({ questionOne: questionOneError, questionTwo: questionTwoError, experience: experienceError });

//     if (questionOneError) {
//       scrollViewRef.current?.scrollTo({ y: 0, animated: true });
//     } else if (questionTwoError) {
//       scrollViewRef.current?.scrollTo({ y: 400, animated: true });
//     } else if (experienceError) {
//       scrollViewRef.current?.scrollTo({ y: 750, animated: true });
//     }

//     return !questionOneError && !questionTwoError && !experienceError;
//   };

//   const handleSubmit = async () => {
//     console.log("[CONTRIBUTION] Submit pressed");

//     if (authLoading) {
//       setSubmitError("Please wait while your session is being restored.");
//       return;
//     }

//     if (!isAuthenticated || !token || !user?.user_id) {
//       setSubmitError("You must be signed in before submitting a contribution.");
//       return;
//     }

//     if (!API_KEY) {
//       setSubmitError("API configuration is missing.");
//       return;
//     }

//     if (!validateForm()) return;

//     if (sourceUrl.trim()) {
//       try {
//         const url = new URL(sourceUrl.trim());
//         if (url.protocol !== "http:" && url.protocol !== "https:") {
//           setSubmitError("Please enter a valid link.");
//           return;
//         }
//       } catch {
//         setSubmitError("Please enter a valid link.");
//         return;
//       }
//     }

//     setSubmitError("");

//     const selectedType = questionOne.selected === "Other"
//       ? questionOne.otherText.trim()
//       : questionOne.selected;

//     if (!selectedType) {
//       setSubmitError("Please specify what you would like to share.");
//       return;
//     }

//     const payload: CreateContributionPayload = {
//       title: selectedType,
//       content: experience.trim(),
//       type: selectedType,
//       classification: "FACTUAL",
//       classification_method: "MANUAL",
//       status: "PENDING",
//       barangay: questionTwo.barangay!,
//       municipality: questionTwo.city!,
//       province: questionTwo.province!,
//       region: questionTwo.region!,
//       user_id: user.user_id,
//       ...(sourceUrl.trim() ? { source_url: sourceUrl.trim() } : {}),
//     };

//     try {
//       console.log("[CONTRIBUTION] Submitting:", payload);

//       const response = await contributionMutation.mutateAsync(payload);
//       console.log("[CONTRIBUTION] Submission successful:", response);

//       const activityPayload: ActivityLogPayload = {
//         type: "CONTRIBUTION SUBMITTED",
//         description: `User submitted a contribution about ${selectedType}.`,
//         user_id: user.user_id,
//       };

//       console.log("[ACTIVITY LOG] Creating:", activityPayload);

//       try {
//         const activityResponse = await createActivityLog(activityPayload);
//         console.log("[ACTIVITY LOG] Successfully created:", activityResponse);
//       } catch (activityError: any) {
//         console.error(
//           "[ACTIVITY LOG] Failed:",
//           activityError?.response?.data || activityError?.message || activityError
//         );
//       }

//       setSuccessContribute(true);
//     } catch (error: any) {
//       console.log("[CONTRIBUTION] Failed:", error);
//       console.log("[CONTRIBUTION] Error response:", error?.response?.data);

//       const status = error?.response?.status;
//       const message = error?.response?.data?.data?.message || error?.response?.data?.message;

//       if (status === 401) {
//         if (message === "Invalid API key") {
//           setSubmitError("The API key is invalid. Please check your mobile app API configuration.");
//           return;
//         }

//         if (message === "Invalid authorization format") {
//           setSubmitError("Your authentication token was not sent correctly.");
//           return;
//         }

//         if (message === "Invalid or expired token") {
//           setSubmitError("Your session has expired. Please sign in again.");
//           return;
//         }

//         setSubmitError("Authentication failed. Please sign in again.");
//         return;
//       }

//       setSubmitError("Unable to submit your contribution. Please try again.");
//     }
//   };

//   const handleQuestionOneChange = (value: QuestionOneValue) => {
//     setQuestionOne(value);
//     if (errors.questionOne) setErrors(prev => ({ ...prev, questionOne: "" }));
//     if (submitError) setSubmitError("");
//   };

//   const handleQuestionTwoChange = (value: QuestionTwoValue) => {
//     setQuestionTwo(value);
//     if (errors.questionTwo) setErrors(prev => ({ ...prev, questionTwo: "" }));
//     if (submitError) setSubmitError("");
//   };

//   const handleExperienceChange = (value: string) => {
//     setExperience(value);
//     if (errors.experience) setErrors(prev => ({ ...prev, experience: "" }));
//     if (submitError) setSubmitError("");
//   };

//   const isSubmitting = contributionMutation.isPending || isLoggingActivity;

//   return (
//     <ScrollView
//       ref={scrollViewRef}
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//       showsVerticalScrollIndicator={false}
//       keyboardShouldPersistTaps="handled"
//     >
//       <ThemedView style={styles.formInner}>
//         <ThemedView style={styles.header}>
//           <ThemedText style={styles.title}>Contribute</ThemedText>
//           <ThemedText style={styles.desc}>
//             Share your personal experiences, observations, and insights related to HIV discussions and resources in your community.
//           </ThemedText>
//         </ThemedView>

//         <ThemedView style={styles.headerDivider} />

//         <ThemedView style={styles.section}>
//           <ThemedView style={styles.questionRow}>
//             <ThemedView style={styles.qNumber}>
//               <ThemedText style={styles.qNumberText}>1</ThemedText>
//             </ThemedView>
//             <ThemedText style={styles.question}>
//               What would you like to share? <ThemedText style={styles.required}>*</ThemedText>
//             </ThemedText>
//           </ThemedView>

//           <QuestionOne value={questionOne} onChange={handleQuestionOneChange} />

//           {errors.questionOne ? <ThemedText style={styles.errorText}>{errors.questionOne}</ThemedText> : null}
//         </ThemedView>

//         <ThemedView style={styles.sectionDivider} />

//         <ThemedView style={styles.section}>
//           <ThemedView style={styles.questionRow}>
//             <ThemedView style={styles.qNumber}>
//               <ThemedText style={styles.qNumberText}>2</ThemedText>
//             </ThemedView>
//             <ThemedText style={styles.question}>
//               Where did this happen? <ThemedText style={styles.required}>*</ThemedText>
//             </ThemedText>
//           </ThemedView>

//           <QuestionTwo value={questionTwo} onChange={handleQuestionTwoChange} />

//           {errors.questionTwo ? <ThemedText style={styles.errorText}>{errors.questionTwo}</ThemedText> : null}
//         </ThemedView>

//         <ThemedView style={styles.sectionDivider} />

//         <ThemedView style={styles.section}>
//           <ThemedView style={styles.questionRow}>
//             <ThemedView style={styles.qNumber}>
//               <ThemedText style={styles.qNumberText}>3</ThemedText>
//             </ThemedView>
//             <ThemedText style={styles.question}>
//               Tell us about your experience <ThemedText style={styles.required}>*</ThemedText>
//             </ThemedText>
//           </ThemedView>

//           <TextInput
//             style={[styles.textArea, errors.experience ? styles.inputError : null]}
//             placeholder="Describe what you observed or experienced regarding HIV awareness, stigma, misinformation, access to services, or community discussions."
//             placeholderTextColor={colors.muted}
//             multiline
//             textAlignVertical="top"
//             value={experience}
//             onChangeText={handleExperienceChange}
//             editable={!isSubmitting}
//           />

//           {errors.experience ? <ThemedText style={styles.errorText}>{errors.experience}</ThemedText> : null}
//         </ThemedView>

//         <ThemedView style={styles.sectionDivider} />

//         <ThemedView style={styles.section}>
//           <ThemedView style={styles.questionRow}>
//             <ThemedView style={styles.qNumber}>
//               <ThemedText style={styles.qNumberText}>4</ThemedText>
//             </ThemedView>
//             <ThemedText style={styles.question}>
//               Attach Supporting Evidence <ThemedText style={styles.optional}>(Optional)</ThemedText>
//             </ThemedText>
//           </ThemedView>

//           <ThemedText style={styles.subLabel}>Add photos, screenshots, or links.</ThemedText>

//           <ThemedView style={addContri.attachRow}>
//             <TouchableOpacity style={addContri.attachBtn} activeOpacity={0.75}>
//               <ThemedView style={[addContri.attachIcon, { backgroundColor: "#FFF4EC" }]}>
//                 <Ionicons name="image-outline" size={icon(20)} color="#FFB400" />
//               </ThemedView>
//               <ThemedText style={addContri.attachTxt}>Upload Image</ThemedText>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={addContri.attachBtn}
//               activeOpacity={0.75}
//               onPress={() => setShowLinkInput(previous => !previous)}
//               disabled={isSubmitting}
//             >
//               <ThemedView style={[addContri.attachIcon, { backgroundColor: "#EDFAF3" }]}>
//                 <Feather name="link" size={icon(17)} color={colors.success} />
//               </ThemedView>
//               <ThemedText style={addContri.attachTxt}>Upload Link</ThemedText>
//             </TouchableOpacity>
//           </ThemedView>

//           {showLinkInput ? (
//             <ThemedView style={{ marginTop: verticalScale(5) }}>
//               <TextInput
//                 style={styles.linkInput}
//                 placeholder="Paste supporting link here"
//                 placeholderTextColor={colors.muted}
//                 value={sourceUrl}
//                 onChangeText={setSourceUrl}
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 keyboardType="url"
//                 editable={!isSubmitting}
//               />
//             </ThemedView>
//           ) : null}
//         </ThemedView>

//         <ThemedView style={styles.sectionDivider} />

//         <ThemedView style={addContri.privacyCard}>
//           <ThemedView style={addContri.privacyHeader}>
//             <ThemedView style={addContri.privacyIconBg}>
//               <MaterialIcons name="verified-user" size={icon(20)} color={colors.primary} />
//             </ThemedView>
//             <ThemedText style={addContri.privacyTitle}>Your Privacy Matters</ThemedText>
//           </ThemedView>

//           <ThemedText style={addContri.privacyBody}>
//             Your submission will be anonymized and analyzed by AdvocAid PH's AI system to identify trends, stigma, and resource needs while protecting your personal privacy.
//           </ThemedText>

//           <TouchableOpacity
//             activeOpacity={0.7}
//             onPress={() => router.push("/drawer/tabs/setting/abouts/privacy-policy")}
//           >
//             <ThemedText style={addContri.privacyLink}>
//               Learn more about our privacy policy →
//             </ThemedText>
//           </TouchableOpacity>
//         </ThemedView>

//         {submitError ? (
//           <ThemedView style={{ backgroundColor: "transparent", marginTop: 12 }}>
//             <ThemedText style={{ color: "#E20000", textAlign: "center" }}>{submitError}</ThemedText>
//           </ThemedView>
//         ) : null}

//         <TouchableOpacity
//           style={[styles.submitBtn, isSubmitting && { opacity: 0.5 }]}
//           activeOpacity={0.85}
//           onPress={handleSubmit}
//           disabled={isSubmitting}
//         >
//           <Ionicons name="send-outline" size={icon(18)} color="white" />
//           <ThemedText style={styles.submitTxt}>
//             {isSubmitting ? (isLoggingActivity ? "Logging..." : "Submitting...") : "Submit Contribution"}
//           </ThemedText>
//         </TouchableOpacity>

//         <ContributeSuccess
//           visible={successContribute}
//           onClose={() => {
//             setSuccessContribute(false);
//             router.back();
//           }}
//         />
//       </ThemedView>
//     </ScrollView>
//   );
// }

import { QuestionOne } from "@/components/cards/question-one";
import { QuestionTwo } from "@/components/cards/question-two";
import ContributeSuccess from "@/components/modals/contribute-success";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormMutation from "@/lib/hooks/useFormMutation";
import { colors } from "@/styles/contribute/contribute-colors";
import { addContributeStyles, sharedFormStyles } from "@/styles/contribute/contribute-form-styles";
import { icon, useResponsive, verticalScale } from "@/styles/responsive";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { Image, ScrollView, TextInput, TouchableOpacity } from "react-native";

export type QuestionOneValue = { selected: string | null; otherText: string };
export type QuestionTwoValue = { region: string | null; province: string | null; city: string | null; barangay: string | null };

type CreateContributionPayload = {
  title: string; content: string; type: string; classification: "FACTUAL";
  classification_method: "MANUAL"; status: "PENDING"; barangay: string;
  municipality: string; province: string; region: string; user_id: string;
  source_url?: string | null; image_url?: string | null;
};

type ActivityLogPayload = { type: string; description: string; user_id: string };
type FormErrors = { questionOne: string; questionTwo: string; experience: string };

const API_KEY = process.env.EXPO_PUBLIC_API_KEY || "testing";
const EMPTY_ERRORS: FormErrors = { questionOne: "", questionTwo: "", experience: "" };

export default function AddContribute() {
  const scrollRef = useRef<ScrollView>(null);
  const r = useResponsive();
  const styles = useMemo(() => sharedFormStyles(r), [r]);
  const addStyles = useMemo(() => addContributeStyles(r), [r]);
  const { token, user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [sourceUrl, setSourceUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [questionOne, setQuestionOne] = useState<QuestionOneValue>({ selected: null, otherText: "" });
  const [questionTwo, setQuestionTwo] = useState<QuestionTwoValue>({ region: null, province: null, city: null, barangay: null });
  const [experience, setExperience] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<FormErrors>(EMPTY_ERRORS);

  const contributionMutation = useFormMutation<CreateContributionPayload, unknown>({
    key: ["CreateContribution", user?.user_id], url: "maintenance/contribution", method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY, "x-api-version": "2026-02-26", Authorization: token ? `Bearer ${token}` : "" },
  });

  const { mutateAsync: createActivityLog, isPending: isLogging } = useFormMutation<ActivityLogPayload, unknown>({
    key: ["ActivityLog", "ContributionSubmit", user?.user_id], url: "maintenance/activity-logs",
    method: "POST", params: {},
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY, "x-api-version": "2026-02-26", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });

  const isSubmitting = contributionMutation.isPending || isLogging;

  const clearError = () => submitError && setSubmitError("");

  const validateForm = () => {
    const next: FormErrors = { ...EMPTY_ERRORS };
    if (!questionOne.selected) next.questionOne = "Please select what you would like to share.";
    else if (questionOne.selected === "Other" && !questionOne.otherText.trim()) next.questionOne = "Please specify what you would like to share.";

    if (!questionTwo.region || !questionTwo.province || !questionTwo.city || !questionTwo.barangay)
      next.questionTwo = "Please complete all location fields.";

    if (!experience.trim()) next.experience = "Please tell us about your experience.";
    setErrors(next);

    const scrollY = next.questionOne ? 0 : next.questionTwo ? 400 : next.experience ? 750 : null;
    if (scrollY !== null) scrollRef.current?.scrollTo({ y: scrollY, animated: true });
    return !Object.values(next).some(Boolean);
  };

  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) return setSubmitError("Please allow photo library access to upload an image.");

      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"], allowsEditing: true, aspect: [4, 3], quality: 0.8 });
      if (result.canceled || !result.assets?.length) return;

      const asset = result.assets[0];
      setImageUri(asset.uri);
      setImageName(asset.fileName || "Selected image");
      clearError();
    } catch (error) {
      console.error("[IMAGE]", error);
      setSubmitError("Unable to select the image. Please try again.");
    }
  };

  const validateUrl = (value: string) => {
    if (!value.trim()) return true;
    try {
      const url = new URL(value.trim());
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const logActivity = async (type: string) => {
    try {
      await createActivityLog({
        type: "CONTRIBUTION SUBMITTED",
        description: `User submitted a contribution about ${type}${imageUri ? " with supporting image evidence." : "."}`,
        user_id: user!.user_id,
      });
    } catch (error: any) {
      console.error("[ACTIVITY LOG]", error?.response?.data || error?.message || error);
    }
  };

  const handleSubmitError = (error: any) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.data?.message || error?.response?.data?.message;

    if (status !== 401) return setSubmitError("Unable to submit your contribution. Please try again.");

    const messages: Record<string, string> = {
      "Invalid API key": "The API key is invalid. Please check your mobile app API configuration.",
      "Invalid authorization format": "Your authentication token was not sent correctly.",
      "Invalid or expired token": "Your session has expired. Please sign in again.",
    };

    setSubmitError(messages[message] || "Authentication failed. Please sign in again.");
  };

  const handleSubmit = async () => {
    if (authLoading) return setSubmitError("Please wait while your session is being restored.");
    if (!isAuthenticated || !token || !user?.user_id) return setSubmitError("You must be signed in before submitting a contribution.");
    if (!API_KEY) return setSubmitError("API configuration is missing.");
    if (!validateForm()) return;
    if (!validateUrl(sourceUrl)) return setSubmitError("Please enter a valid link.");

    const type = questionOne.selected === "Other" ? questionOne.otherText.trim() : questionOne.selected;
    if (!type) return setSubmitError("Please specify what you would like to share.");

    setSubmitError("");

    const payload: CreateContributionPayload = {
      title: type, content: experience.trim(), type,
      classification: "FACTUAL", classification_method: "MANUAL", status: "PENDING",
      barangay: questionTwo.barangay!, municipality: questionTwo.city!,
      province: questionTwo.province!, region: questionTwo.region!, user_id: user.user_id,
      ...(sourceUrl.trim() && { source_url: sourceUrl.trim() }),
      ...(imageUri && { image_url: imageUri }),
    };

    try {
      await contributionMutation.mutateAsync(payload);
      await logActivity(type);
      setSuccess(true);
    } catch (error) {
      console.error("[CONTRIBUTION]", error);
      handleSubmitError(error);
    }
  };

  const updateQuestionOne = (value: QuestionOneValue) => {
    setQuestionOne(value);
    setErrors(prev => ({ ...prev, questionOne: "" }));
    clearError();
  };

  const updateQuestionTwo = (value: QuestionTwoValue) => {
    setQuestionTwo(value);
    setErrors(prev => ({ ...prev, questionTwo: "" }));
    clearError();
  };

  const updateExperience = (value: string) => {
    setExperience(value);
    setErrors(prev => ({ ...prev, experience: "" }));
    clearError();
  };

  return (
    <ScrollView ref={scrollRef} style={styles.pageContainer} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <ThemedView style={styles.formInner}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>Contribute</ThemedText>
          <ThemedText style={styles.desc}>Share your personal experiences, observations, and insights related to HIV discussions and resources in your community.</ThemedText>
        </ThemedView>

        <ThemedView style={styles.headerDivider} />

        <ThemedView style={styles.section}>
          <QuestionHeader number="1" title="What would you like to share?" required styles={styles} />
          <QuestionOne value={questionOne} onChange={updateQuestionOne} />
          {errors.questionOne ? <ThemedText style={styles.errorText}>{errors.questionOne}</ThemedText> : null}
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        <ThemedView style={styles.section}>
          <QuestionHeader number="2" title="Where did this happen?" required styles={styles} />
          <QuestionTwo value={questionTwo} onChange={updateQuestionTwo} />
          {errors.questionTwo ? <ThemedText style={styles.errorText}>{errors.questionTwo}</ThemedText> : null}
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        <ThemedView style={styles.section}>
          <QuestionHeader number="3" title="Tell us about your experience" required styles={styles} />
          <TextInput
            style={[styles.textArea, errors.experience && styles.inputError]}
            placeholder="Describe what you observed or experienced regarding HIV awareness, stigma, misinformation, access to services, or community discussions."
            placeholderTextColor={colors.muted} multiline textAlignVertical="top"
            value={experience} onChangeText={updateExperience} editable={!isSubmitting}
          />
          {errors.experience ? <ThemedText style={styles.errorText}>{errors.experience}</ThemedText> : null}
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        <ThemedView style={styles.section}>
          <QuestionHeader number="4" title="Attach Supporting Evidence" optional styles={styles} />
          <ThemedText style={styles.subLabel}>Add photos, screenshots, or links.</ThemedText>

          <ThemedView style={addStyles.attachRow}>
            <TouchableOpacity style={addStyles.attachBtn} activeOpacity={0.75} onPress={pickImage} disabled={isSubmitting}>
              <ThemedView style={[addStyles.attachIcon, { backgroundColor: "#FFF4EC" }]}>
                <Ionicons name="image-outline" size={icon(20)} color="#FFB400" />
              </ThemedView>
              <ThemedText style={addStyles.attachTxt}>{imageUri ? "Change Image" : "Upload Image"}</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={addStyles.attachBtn} activeOpacity={0.75} onPress={() => setShowLinkInput(v => !v)} disabled={isSubmitting}>
              <ThemedView style={[addStyles.attachIcon, { backgroundColor: "#EDFAF3" }]}>
                <Feather name="link" size={icon(17)} color={colors.success} />
              </ThemedView>
              <ThemedText style={addStyles.attachTxt}>Upload Link</ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {imageUri && (
            <ThemedView style={{ marginTop: verticalScale(10), position: "relative" }}>
              <Image source={{ uri: imageUri }} style={{ width: "100%", height: verticalScale(180), borderRadius: 12 }} resizeMode="cover" />
              <TouchableOpacity onPress={() => { setImageUri(null); setImageName(null); }} disabled={isSubmitting} style={{ position: "absolute", right: 10, top: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(0,0,0,0.65)", alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="close" size={icon(18)} color="white" />
              </TouchableOpacity>
              {imageName && <ThemedText style={{ marginTop: 5, color: colors.muted }} numberOfLines={1}>{imageName}</ThemedText>}
            </ThemedView>
          )}

          {showLinkInput && (
            <ThemedView style={{ marginTop: verticalScale(5) }}>
              <TextInput style={styles.linkInput} placeholder="Paste supporting link here" placeholderTextColor={colors.muted} value={sourceUrl} onChangeText={setSourceUrl} autoCapitalize="none" autoCorrect={false} keyboardType="url" editable={!isSubmitting} />
            </ThemedView>
          )}
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        <ThemedView style={addStyles.privacyCard}>
          <ThemedView style={addStyles.privacyHeader}>
            <ThemedView style={addStyles.privacyIconBg}>
              <MaterialIcons name="verified-user" size={icon(20)} color={colors.primary} />
            </ThemedView>
            <ThemedText style={addStyles.privacyTitle}>Your Privacy Matters</ThemedText>
          </ThemedView>

          <ThemedText style={addStyles.privacyBody}>
            Your submission will be anonymized and analyzed by AdvocAid PH's AI system to identify trends, stigma, and resource needs while protecting your personal privacy.
          </ThemedText>

          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/drawer/tabs/setting/abouts/privacy-policy")}>
            <ThemedText style={addStyles.privacyLink}>Learn more about our privacy policy →</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {submitError && (
          <ThemedView style={{ backgroundColor: "transparent", marginTop: 12 }}>
            <ThemedText style={{ color: "#E20000", textAlign: "center" }}>{submitError}</ThemedText>
          </ThemedView>
        )}

        <TouchableOpacity style={[styles.submitBtn, isSubmitting && { opacity: 0.5 }]} activeOpacity={0.85} onPress={handleSubmit} disabled={isSubmitting}>
          <Ionicons name="send-outline" size={icon(18)} color="white" />
          <ThemedText style={styles.submitTxt}>{isSubmitting ? (isLogging ? "Logging..." : "Submitting...") : "Submit Contribution"}</ThemedText>
        </TouchableOpacity>

        <ContributeSuccess visible={success} onClose={() => { setSuccess(false); router.back(); }} />
      </ThemedView>
    </ScrollView>
  );
}

function QuestionHeader({ number, title, required, optional, styles }: {
  number: string;
  title: string;
  required?: boolean;
  optional?: boolean;
  styles: ReturnType<typeof sharedFormStyles>;
}) {
  return (
    <ThemedView style={styles.questionRow}>
      <ThemedView style={styles.qNumber}><ThemedText style={styles.qNumberText}>{number}</ThemedText></ThemedView>
      <ThemedText style={styles.question}>
        {title}{" "}
        {required && <ThemedText style={styles.required}>*</ThemedText>}
        {optional && <ThemedText style={styles.optional}>(Optional)</ThemedText>}
      </ThemedText>
    </ThemedView>
  );
}
