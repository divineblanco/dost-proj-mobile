// import EditSuccess from "@/components/modals/edit-success";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { icon, useResponsive } from "@/styles/responsive";
// import { editProfileStyles } from "@/styles/settings/edit-profile-styles";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useMemo, useState } from "react";
// import {
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   View
// } from "react-native";

// export default function EditEmail() {
//   const [email, setEmail] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);

//   const hasContent = email.length > 0;

//   const isValidEmail =
//     email.length <= 254 &&
//     !/\s/.test(email) &&
//     /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

//   const validationMessage = () => {
//     if (!hasContent) return "Enter your email address";

//     if (/\s/.test(email))
//       return "Email address cannot contain spaces";

//     if (email.length > 254)
//       return "Email address is too long";

//     if (!isValidEmail)
//       return "Enter a valid email address";

//     return "Email address looks good";
//   };

//   const handleSave = () => {
//     if (!isValidEmail) return;

//     // Save email here

//     setShowSuccess(true);
//   };

//   const r = useResponsive();
        
//   const styles = useMemo(() => editProfileStyles(r), [r]);

//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//       keyboardShouldPersistTaps="handled"
//       showsVerticalScrollIndicator={false}
//     >
//       <ThemedView style={styles.inner}>
//         {/* Header */}
//         <ThemedView style={styles.header}>
//           <ThemedText style={styles.title}>
//             Edit Email
//           </ThemedText>

//           <ThemedText style={styles.subtitle}>
//             Change or update your email address.
//           </ThemedText>
//         </ThemedView>

//         <View style={styles.sectionDivider} />

//         {/* Input */}
//         <ThemedView style={styles.card}>
//           <ThemedText style={styles.label}>
//             Email
//           </ThemedText>

//           <View
//             style={[
//               styles.inputRow, styles.inputHeight,
//               hasContent &&
//                 (isValidEmail ? styles.inputValid : styles.inputError),
//             ]}
//           >

//             <TextInput
//               style={styles.input}
//               placeholder="user@email.com"
//               placeholderTextColor="#9BA8C0"
//               value={email}
//               onChangeText={(text) => setEmail(text.slice(0, 254))}
//               autoCapitalize="none"
//               autoCorrect={false}
//               keyboardType="email-address"
//             />

//             {hasContent && (
//               <Ionicons
//                 name={isValidEmail ? "checkmark-circle" : "close-circle"}
//                 size={icon(20)}
//                 color={isValidEmail ? "#2E9E3A" : "#C62828"}
//               />
//             )}
            
//           </View>

//           <View style={styles.inputMeta}>
//               <ThemedText
//                 style={[
//                   styles.validationHint,
//                   hasContent &&
//                     (isValidEmail
//                       ? styles.validationHintOk
//                       : styles.validationHintError),
//                 ]}
//               >
//                 {validationMessage()}
//               </ThemedText>

//               <ThemedText style={styles.charCount}>
//                 {email.length}/254
//               </ThemedText>
//             </View>

//         </ThemedView>

//         {/* Rules */}
//         <ThemedView style={styles.rulesCard}>
//         {[
//           {
//             label: "Must be a valid email address",
//             valid: isValidEmail,
//           },
//           {
//             label: "No spaces",
//             valid: !/\s/.test(email),
//           },
//           {
//             label: "Maximum of 254 characters",
//             valid: email.length <= 254,
//           },
//         ].map((rule) => (
//           <View key={rule.label} style={styles.ruleRow}>
//             <Ionicons
//               name={rule.valid ? "checkmark-circle" : "ellipse-outline"}
//               size={icon(16)}
//               color={rule.valid ? "#2E9E3A" : "#9BA8C0"}
//             />

//             <ThemedText
//               style={[
//                 styles.ruleText,
//                 rule.valid && styles.ruleTextValid,
//               ]}
//             >
//               {rule.label}
//             </ThemedText>
//           </View>
//         ))}
//       </ThemedView>

//         {/* Button */}
//         <TouchableOpacity
//           disabled={!isValidEmail}
//           onPress={handleSave}
//           style={[
//             styles.saveBtn,
//             !isValidEmail && styles.saveBtnDisabled,
//           ]}
//         >
//           <ThemedText
//             style={[
//               styles.saveTxt,
//               !isValidEmail && styles.saveTxtDisabled,
//             ]}
//           >
//             Save Email
//           </ThemedText>
//         </TouchableOpacity>
//         <EditSuccess
//           visible={showSuccess}
//           message="Your email has been updated and saved."
//           onClose={() => setShowSuccess(false)}
//         />
//       </ThemedView>
//     </ScrollView>
//   );
// }

import EditSuccess from "@/components/modals/edit-success";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormMutation from "@/lib/hooks/useFormMutation";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { icon, useResponsive } from "@/styles/responsive";
import { editProfileStyles } from "@/styles/settings/edit-profile-styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";

interface UserDetails {
  user_id: string;
  email?: string;
}
interface UserResponse { data?: UserDetails; }
interface UpdateEmailPayload { email: string; }
interface ActivityLogPayload {
  type: string;
  description: string;
  user_id: string;
}

export default function EditEmail() {
  const r = useResponsive();
  const styles = useMemo(() => editProfileStyles(r), [r]);
  const { user, token, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const currentUserId = user?.user_id;

  const {
    data: userResponse,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useFormQuery<UserResponse>({
    key: ["user", currentUserId],
    url: `maintenance/users/${currentUserId}`,
    enabled: Boolean(currentUserId && token),
    headers: {
      "x-api-key": "testing",
      "x-api-version": "2026-02-26",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const userDetails = userResponse?.data;

  useEffect(() => {
    if (!userDetails) return;
    const currentEmail = userDetails.email ?? "";
    setEmail(currentEmail);
    setOriginalEmail(currentEmail);
  }, [userDetails]);

  const {
    mutateAsync: updateUserEmail,
    isPending: isSaving,
  } = useFormMutation<UpdateEmailPayload, unknown>({
    key: ["users", "update-email", currentUserId],
    method: "PATCH",
    url: `maintenance/users/${currentUserId}`,
    params: {},
    headers: {
      "x-api-key": "testing",
      "x-api-version": "2026-02-26",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const {
    mutateAsync: createActivityLog,
    isPending: isLoggingActivity,
  } = useFormMutation<ActivityLogPayload, unknown>({
    key: ["ActivityLog", "UpdateEmail", currentUserId],
    method: "POST",
    url: "maintenance/activity-logs",
    params: {},
    headers: {
      "x-api-key": "testing",
      "x-api-version": "2026-02-26",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const hasContent = email.length > 0;
  const isValidEmail =
    email.length <= 254 &&
    !/\s/.test(email) &&
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

  const validationMessage = () => {
    if (!hasContent) return "Enter your email address";
    if (/\s/.test(email)) return "Email address cannot contain spaces";
    if (email.length > 254) return "Email address is too long";
    if (!isValidEmail) return "Enter a valid email address";
    return "Email address looks good";
  };

  const handleSave = async () => {
    if (!isValidEmail) return;
    if (!currentUserId) {
      console.error("[UPDATE EMAIL] Missing user ID.");
      return;
    }
    if (!token) {
      console.error("[UPDATE EMAIL] Missing authentication token.");
      return;
    }

    const updatedEmail = email.trim().toLowerCase();
    const previousEmail = originalEmail.trim().toLowerCase();

    if (updatedEmail === previousEmail) {
      console.log("[UPDATE EMAIL] No email changes detected.");
      setShowSuccess(true);
      return;
    }

    const payload: UpdateEmailPayload = { email: updatedEmail };

    console.log("[UPDATE EMAIL] User ID:", currentUserId);
    console.log("[UPDATE EMAIL] Old email:", previousEmail);
    console.log("[UPDATE EMAIL] New email:", updatedEmail);
    console.log("[UPDATE EMAIL] Payload:", JSON.stringify(payload, null, 2));

    try {
      const updateResponse = await updateUserEmail(payload);
      console.log("[UPDATE EMAIL] User successfully updated:", updateResponse);

      const activityPayload: ActivityLogPayload = {
        type: "UPDATED EMAIL",
        description: `User updated their email address from ${previousEmail} to ${updatedEmail}.`,
        user_id: currentUserId,
      };

      console.log(
        "[UPDATE EMAIL] Activity payload:",
        JSON.stringify(activityPayload, null, 2),
      );

      try {
        const activityResponse = await createActivityLog(activityPayload);
        console.log(
          "[UPDATE EMAIL] Activity log successfully created:",
          activityResponse,
        );
      } catch (activityError: any) {
        console.error(
          "[UPDATE EMAIL] Activity log failed:",
          activityError?.response?.data ?? activityError,
        );
      }

      setEmail(updatedEmail);
      setOriginalEmail(updatedEmail);
      setShowSuccess(true);
    } catch (error: any) {
      console.error(
        "[UPDATE EMAIL] Failed to update email:",
        error?.response?.data ?? error,
      );

      if (error?.response?.status === 409) {
        console.error(
          "[UPDATE EMAIL] Email already in use:",
          error?.response?.data?.message,
        );
      }
    }
  };

  if (authLoading || isUserLoading) {
    return (
      <ThemedView style={styles.pageContainer}>
        <ThemedView style={styles.inner}>
          <ThemedText>Loading...</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  if (isUserError) {
    console.error("[EDIT EMAIL] Failed to load user:", userError);
    return (
      <ThemedView style={styles.pageContainer}>
        <ThemedView style={styles.inner}>
          <ThemedText>Unable to load your email information.</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  const rules = [
    { label: "Must be a valid email address", valid: isValidEmail },
    { label: "No spaces", valid: !/\s/.test(email) },
    { label: "Maximum of 254 characters", valid: email.length <= 254 },
  ];
  const isBusy = isSaving || isLoggingActivity;

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={styles.inner}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>Edit Email</ThemedText>
          <ThemedText style={styles.subtitle}>
            Change or update your email address.
          </ThemedText>
        </ThemedView>

        <View style={styles.sectionDivider} />

        <ThemedView style={styles.card}>
          <ThemedText style={styles.label}>Email</ThemedText>

          <View
            style={[
              styles.inputRow,
              styles.inputHeight,
              !hasContent
                ? styles.inputDefault
                : isValidEmail
                  ? styles.inputValid
                  : styles.inputError,
            ]}
          >
            <Ionicons name="mail-outline" size={icon(20)} color="#35408E" />

            <TextInput
              style={styles.input}
              placeholder="user@email.com"
              placeholderTextColor="#9BA8C0"
              value={email}
              onChangeText={(text) => setEmail(text.slice(0, 254))}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              editable={!isBusy}
              returnKeyType="done"
              onSubmitEditing={() => isValidEmail && !isBusy && handleSave()}
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
            <ThemedText style={styles.charCount}>{email.length}/254</ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={styles.rulesCard}>
          {rules.map((rule) => (
            <View key={rule.label} style={styles.ruleRow}>
              <Ionicons
                name={rule.valid ? "checkmark-circle" : "ellipse-outline"}
                size={icon(16)}
                color={rule.valid ? "#2E9E3A" : "#9BA8C0"}
              />
              <ThemedText
                style={[styles.ruleText, rule.valid && styles.ruleTextValid]}
              >
                {rule.label}
              </ThemedText>
            </View>
          ))}
        </ThemedView>

        <TouchableOpacity
          disabled={!isValidEmail || isBusy}
          onPress={handleSave}
          style={[
            styles.saveBtn,
            (!isValidEmail || isBusy) && styles.saveBtnDisabled,
          ]}
          activeOpacity={0.85}
        >
          <ThemedText
            style={[
              styles.saveTxt,
              (!isValidEmail || isBusy) && styles.saveTxtDisabled,
            ]}
          >
            {isSaving
              ? "Saving..."
              : isLoggingActivity
                ? "Recording..."
                : "Save Email"}
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
