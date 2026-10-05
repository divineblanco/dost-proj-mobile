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

// export default function EditUsername() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");

//   const NAME_REGEX =
//     /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u;

//   const validateName = (name: string) => {
//     const trimmed = name.trim();

//     return {
//       notEmpty: trimmed.length > 0,
//       minLength: trimmed.length >= 2,
//       maxLength: trimmed.length <= 50,
//       validCharacters: NAME_REGEX.test(trimmed),
//     };
//   };

//   const firstNameValidation = validateName(firstName);
//   const lastNameValidation = validateName(lastName);

//   const isValid =
//     Object.values(firstNameValidation).every(Boolean) &&
//     Object.values(lastNameValidation).every(Boolean);

//   const getValidationMessage = (
//     validation: ReturnType<typeof validateName>
//   ) => {
//     if (!validation.notEmpty)
//       return "*This field is required.";

//     if (!validation.minLength)
//       return "Must contain at least 2 letters.";

//     if (!validation.maxLength)
//       return "Maximum of 50 characters.";

//     if (!validation.validCharacters)
//       return "Letters, spaces, hyphens (-), and apostrophes (') only.";

//     return "Looks good.";
//   };
    
//   const [showSuccess, setShowSuccess] = useState(false);


//   const handleSave = () => {
//     if (!isValid) return;

//     console.log(firstName, lastName);

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
//             Edit Name
//           </ThemedText>

//           <ThemedText style={styles.subtitle}>
//             Update your first and last name.
//           </ThemedText>
//         </ThemedView>

//         <View style={styles.sectionDivider} />

//         {/* Input */}
//         <ThemedView style={styles.card}>
//           <ThemedText style={styles.label}>
//             First Name
//           </ThemedText>

//           <View
//             style={[
//               styles.inputRow, styles.inputHeight,
//               firstName.length === 0
//               ? styles.inputDefault
//               : Object.values(firstNameValidation).every(Boolean)
//               ? styles.inputValid
//               : styles.inputError,
//             ]}
//           >
//             <Ionicons
//               name="person-outline"
//               size={icon(20)}
//               color="#35408E"
//             />

//             <TextInput
//               style={styles.input}
//               placeholder="Enter your first name"
//               placeholderTextColor="#9BA8C0"
//               value={firstName}
//               onChangeText={setFirstName}
//               autoCapitalize="words"
//             />
            
//           </View>
//           <ThemedText
//               style={[
//                 styles.validationHint,
//                 Object.values(firstNameValidation).every(Boolean)
//                   ? styles.validationHintOk
//                   : styles.validationHintError,
//               ]}
//             >
//               {getValidationMessage(firstNameValidation)}
//             </ThemedText>

//           <ThemedText style={styles.label}>
//             Last Name
//           </ThemedText>

//           <View
//             style={[
//               styles.inputRow, styles.inputHeight,
//               lastName.length === 0
//               ? styles.inputDefault
//               : Object.values(lastNameValidation).every(Boolean)
//               ? styles.inputValid
//               : styles.inputError,
//             ]}
//           >
//             <Ionicons
//               name="person-outline"
//               size={icon(20)}
//               color="#35408E"
//             />

//             <TextInput
//               style={styles.input}
//               placeholder="Enter your last name"
//               placeholderTextColor="#9BA8C0"
//               value={lastName}
//               onChangeText={setLastName}
//               autoCapitalize="words"
//             />
//           </View>
//           <ThemedText
//               style={[
//                 styles.validationHint,
//                 Object.values(lastNameValidation).every(Boolean)
//                   ? styles.validationHintOk
//                   : styles.validationHintError,
//               ]}
//             >
//               {getValidationMessage(lastNameValidation)}
//             </ThemedText>
//         </ThemedView>

//         {/* Button */}
//         <TouchableOpacity
//           disabled={!isValid}
//           onPress={handleSave}
//           style={[
//             styles.saveBtn,
//             !isValid && styles.saveBtnDisabled,
//           ]}
//         >
//           <ThemedText
//             style={[
//               styles.saveTxt,
//               !isValid && styles.saveTxtDisabled,
//             ]}
//           >
//             Save Changes
//           </ThemedText>
//         </TouchableOpacity>
//         <EditSuccess
//           visible={showSuccess}
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

interface UserProfile {
  first_name?: string;
  last_name?: string;
}
interface UserDetails {
  user_id: string;
  email?: string;
  Profile?: UserProfile;
}
interface UserResponse { data?: UserDetails; }
interface UpdateUserPayload {
  first_name: string;
  last_name: string;
}
interface ActivityLogPayload {
  type: string;
  description: string;
  user_id: string;
}

export default function EditUsername() {
  const r = useResponsive();
  const styles = useMemo(() => editProfileStyles(r), [r]);
  const { user, token, isLoading: authLoading } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
    setFirstName(userDetails.Profile?.first_name ?? "");
    setLastName(userDetails.Profile?.last_name ?? "");
  }, [userDetails]);

  const {
    mutateAsync: updateUserProfile,
    isPending: isSaving,
  } = useFormMutation<UpdateUserPayload, unknown>({
    key: ["users", "update", currentUserId],
    url: `maintenance/users/${currentUserId}`,
    method: "PATCH",
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
    key: ["ActivityLog", "NameUpdate", currentUserId],
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

  const NAME_REGEX = /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u;

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
  const firstNameValid = Object.values(firstNameValidation).every(Boolean);
  const lastNameValid = Object.values(lastNameValidation).every(Boolean);
  const isValid = firstNameValid && lastNameValid;

  const getValidationMessage = (
    validation: ReturnType<typeof validateName>,
  ) => {
    if (!validation.notEmpty) return "*This field is required.";
    if (!validation.minLength) return "Must contain at least 2 letters.";
    if (!validation.maxLength) return "Maximum of 50 characters.";
    if (!validation.validCharacters) {
      return "Letters, spaces, hyphens (-), and apostrophes (') only.";
    }
    return "Looks good.";
  };

  const handleSave = async () => {
    if (!isValid) return;
    if (!currentUserId) {
      console.error("[UPDATE USER] Missing user ID.");
      return;
    }
    if (!token) {
      console.error("[UPDATE USER] Missing authentication token.");
      return;
    }

    const payload: UpdateUserPayload = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
    };

    console.log("[UPDATE USER] User ID:", currentUserId);
    console.log("[UPDATE USER] Payload:", JSON.stringify(payload, null, 2));

    try {
      const updateResponse = await updateUserProfile(payload);
      console.log("[UPDATE USER] Successfully updated user:", updateResponse);

      const activityPayload: ActivityLogPayload = {
        type: "UPDATED NAME",
        description: `User updated their name to ${payload.first_name} ${payload.last_name}.`,
        user_id: currentUserId,
      };

      console.log(
        "[ACTIVITY LOG] Creating name update log:",
        JSON.stringify(activityPayload, null, 2),
      );

      try {
        const activityResponse = await createActivityLog(activityPayload);
        console.log("[ACTIVITY LOG] Successfully created:", activityResponse);
      } catch (activityError: any) {
        console.error(
          "[ACTIVITY LOG] Failed to create activity log:",
          activityError?.response?.data || activityError?.message || activityError,
        );
      }

      setShowSuccess(true);
    } catch (error: any) {
      console.error(
        "[UPDATE USER] Failed to update user:",
        error?.response?.data || error?.message || error,
      );
    }
  };

  const renderNameInput = (
    label: string,
    value: string,
    setValue: (value: string) => void,
    validation: ReturnType<typeof validateName>,
  ) => {
    const valid = Object.values(validation).every(Boolean);
    const isEmpty = value.length === 0;

    return (
      <>
        <ThemedText style={styles.label}>{label}</ThemedText>
        <View
          style={[
            styles.inputRow,
            styles.inputHeight,
            isEmpty
              ? styles.inputDefault
              : valid
                ? styles.inputValid
                : styles.inputError,
          ]}
        >
          <Ionicons name="person-outline" size={icon(20)} color="#35408E" />
          <TextInput
            style={styles.input}
            placeholder={`Enter your ${label.toLowerCase()}`}
            placeholderTextColor="#9BA8C0"
            value={value}
            onChangeText={setValue}
            autoCapitalize="words"
            autoCorrect={false}
            editable={!isSaving && !isLoggingActivity}
          />
        </View>
        <ThemedText
          style={[
            styles.validationHint,
            valid ? styles.validationHintOk : styles.validationHintError,
          ]}
        >
          {getValidationMessage(validation)}
        </ThemedText>
      </>
    );
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
    console.error("[EDIT USERNAME] Failed to load user:", userError);
    return (
      <ThemedView style={styles.pageContainer}>
        <ThemedView style={styles.inner}>
          <ThemedText>Unable to load your profile information.</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  const isSavingDisabled = !isValid || isSaving || isLoggingActivity;

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={styles.inner}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>Edit Name</ThemedText>
          <ThemedText style={styles.subtitle}>
            Update your first and last name.
          </ThemedText>
        </ThemedView>

        <View style={styles.sectionDivider} />

        <ThemedView style={styles.card}>
          {renderNameInput("First Name", firstName, setFirstName, firstNameValidation)}
          {renderNameInput("Last Name", lastName, setLastName, lastNameValidation)}
        </ThemedView>

        <TouchableOpacity
          disabled={isSavingDisabled}
          onPress={handleSave}
          style={[
            styles.saveBtn,
            isSavingDisabled && styles.saveBtnDisabled,
          ]}
        >
          <ThemedText
            style={[
              styles.saveTxt,
              isSavingDisabled && styles.saveTxtDisabled,
            ]}
          >
            {isSaving ? "Saving..." : isLoggingActivity ? "Logging..." : "Save Changes"}
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
