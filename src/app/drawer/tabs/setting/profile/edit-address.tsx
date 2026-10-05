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

// export default function EditAddress() {
//   const [address, setAddress] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);

//   const validations = useMemo(() => ({
//     notOnlySpaces:  address.trim().length > 0,
//     minLength:      address.trim().length >= 10,
//     maxLength:      address.trim().length <= 100,
//     hasLetter:      /[a-zA-Z]/.test(address),
//     noDoubleSpaces: !/\s{2,}/.test(address),
//   }), [address]);

//   const isValid = Object.values(validations).every(Boolean) && address.trim().length > 0;
//   const hasContent = address.length > 0;

//   const validationMessage = () => {
//     if (!hasContent)                  return "Enter your complete address";
//     if (!validations.notOnlySpaces)   return "Address cannot be empty";
//     if (!validations.minLength)       return `${10 - address.trim().length} more character${10 - address.trim().length !== 1 ? "s" : ""} needed`;
//     if (!validations.maxLength)       return "Maximum of 100 characters allowed";
//     if (!validations.hasLetter)       return "Address must contain letters (e.g. city or province)";
//     if (!validations.noDoubleSpaces)  return "Remove extra consecutive spaces";
//     return "Address looks good!";
//   };

//   const handleSave = () => {
//     if (!isValid) return;
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
//           <ThemedText style={styles.title}>Edit Address</ThemedText>
//           <ThemedText style={styles.subtitle}>
//             Update your current home or mailing address.
//           </ThemedText>
//         </ThemedView>

//         <View style={styles.sectionDivider} />

//         {/* Input card */}
//         <ThemedView style={styles.card}>
//           <ThemedText style={styles.label}>Current Address</ThemedText>

//           <View style={[
//             styles.inputRow,
//             hasContent && (isValid ? styles.inputValid : styles.inputError),
//           ]}>
//             <Ionicons
//               name="location-outline"
//               size={icon(18)}
//               color={
//                 !hasContent ? "#9BA8C0"
//                 : isValid   ? "#2E9E3A"
//                 :              "#C62828"
//               }
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="i.e. House/Bldg No., Street Name, Barangay, City/Municipality, Province"
//               placeholderTextColor="#9BA8C0"
//               value={address}
//               onChangeText={(text) => setAddress(text.slice(0, 100))}
//               autoCapitalize="words"
//               autoCorrect={false}
//               multiline
//             />
//             {hasContent && (
//               <Ionicons
//                 name={isValid ? "checkmark-circle" : "close-circle"}
//                 size={icon(18)}
//                 color={isValid ? "#2E9E3A" : "#C62828"}
//               />
//             )}
//           </View>

//           <View style={styles.inputMeta}>
//             <ThemedText style={[
//               styles.validationHint,
//               hasContent && (isValid ? styles.validationHintOk : styles.validationHintError),
//             ]}>
//               {validationMessage()}
//             </ThemedText>
//           </View>
//         </ThemedView>

//         {/* Reminder card */}
//         <ThemedView style={styles.rulesCard}>
//           <View style={styles.rulesHeader}>
//             <Ionicons name="information-circle-outline" size={icon(15)} color="#35408E" />
//             <ThemedText style={styles.rulesTitle}>Reminder</ThemedText>
//           </View>
//           <View style={styles.ruleRow}>
//             <ThemedText style={styles.ruleText}>
//               Please make sure that this is your real current address.
//             </ThemedText>
//           </View>
//         </ThemedView>

//         {/* Save button */}
//         <TouchableOpacity
//           disabled={!isValid}
//           onPress={handleSave}
//           style={[styles.saveBtn, !isValid && styles.saveBtnDisabled]}
//           activeOpacity={0.85}
//         >
//           <ThemedText style={[styles.saveTxt, !isValid && styles.saveTxtDisabled]}>
//             Save Address
//           </ThemedText>
//         </TouchableOpacity>

//         <EditSuccess 
//           visible={showSuccess} 
//           message="Your address has been updated and saved."
//           onClose={() => setShowSuccess(false)} />
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
  location?: string;
}
interface UserDetails {
  user_id: string;
  email?: string;
  Profile?: UserProfile;
}
interface UserResponse { data?: UserDetails; }
interface UpdateAddressPayload { location: string; }
interface ActivityLogPayload {
  type: string;
  description: string;
  user_id: string;
}

export default function EditAddress() {
  const r = useResponsive();
  const styles = useMemo(() => editProfileStyles(r), [r]);
  const { user, token, isLoading: authLoading } = useAuth();
  const [address, setAddress] = useState("");
  const [originalAddress, setOriginalAddress] = useState("");
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
    const currentAddress = userDetails.Profile?.location ?? "";
    setAddress(currentAddress);
    setOriginalAddress(currentAddress);
  }, [userDetails]);

  const validations = useMemo(
    () => ({
      notOnlySpaces: address.trim().length > 0,
      minLength: address.trim().length >= 10,
      maxLength: address.trim().length <= 100,
      hasLetter: /[a-zA-Z]/.test(address),
      noDoubleSpaces: !/\s{2,}/.test(address),
    }),
    [address],
  );

  const isValid = Object.values(validations).every(Boolean);
  const hasContent = address.length > 0;

  const validationMessage = () => {
    if (!hasContent) return "Enter your complete address";
    if (!validations.notOnlySpaces) return "Address cannot be empty";

    if (!validations.minLength) {
      const remaining = 10 - address.trim().length;
      return `${remaining} more character${remaining !== 1 ? "s" : ""} needed`;
    }

    if (!validations.maxLength) return "Maximum of 100 characters allowed";
    if (!validations.hasLetter) {
      return "Address must contain letters (e.g. city or province)";
    }
    if (!validations.noDoubleSpaces) return "Remove extra consecutive spaces";

    return "Address looks good!";
  };

  const {
    mutateAsync: updateUserAddress,
    isPending: isSaving,
  } = useFormMutation<UpdateAddressPayload, unknown>({
    key: ["users", "update-address", currentUserId],
    url: `maintenance/users/${currentUserId}`,
    method: "PATCH",
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
    key: ["ActivityLog", "UpdateAddress", currentUserId],
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

  const handleSave = async () => {
    if (!isValid) return;
    if (!currentUserId) {
      console.error("[UPDATE ADDRESS] Missing user ID.");
      return;
    }
    if (!token) {
      console.error("[UPDATE ADDRESS] Missing authentication token.");
      return;
    }

    const updatedAddress = address.trim();
    const previousAddress = originalAddress.trim();

    if (updatedAddress === previousAddress) {
      console.log("[UPDATE ADDRESS] No address changes detected.");
      setShowSuccess(true);
      return;
    }

    const payload: UpdateAddressPayload = { location: updatedAddress };

    console.log("[UPDATE ADDRESS] User ID:", currentUserId);
    console.log("[UPDATE ADDRESS] Old address:", previousAddress);
    console.log("[UPDATE ADDRESS] New address:", updatedAddress);
    console.log("[UPDATE ADDRESS] Payload:", JSON.stringify(payload, null, 2));

    try {
      const updateResponse = await updateUserAddress(payload);
      console.log("[UPDATE ADDRESS] User successfully updated:", updateResponse);

      const activityPayload: ActivityLogPayload = {
        type: "UPDATED ADDRESS",
        description: `User updated their address from "${previousAddress}" to "${updatedAddress}".`,
        user_id: currentUserId,
      };

      console.log(
        "[UPDATE ADDRESS] Activity payload:",
        JSON.stringify(activityPayload, null, 2),
      );

      try {
        const activityResponse = await createActivityLog(activityPayload);
        console.log(
          "[UPDATE ADDRESS] Activity log successfully created:",
          activityResponse,
        );
      } catch (activityError: any) {
        console.error(
          "[UPDATE ADDRESS] Activity log failed:",
          activityError?.response?.data ?? activityError,
        );
      }

      setAddress(updatedAddress);
      setOriginalAddress(updatedAddress);
      setShowSuccess(true);
    } catch (error: any) {
      console.error(
        "[UPDATE ADDRESS] Failed to update address:",
        error?.response?.data ?? error,
      );
      console.error("[UPDATE ADDRESS] Response:", error?.response?.data);
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
    console.error("[EDIT ADDRESS] Failed to load user:", userError);
    return (
      <ThemedView style={styles.pageContainer}>
        <ThemedView style={styles.inner}>
          <ThemedText>Unable to load your address information.</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

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
          <ThemedText style={styles.title}>Edit Address</ThemedText>
          <ThemedText style={styles.subtitle}>
            Update your current home or mailing address.
          </ThemedText>
        </ThemedView>

        <View style={styles.sectionDivider} />

        <ThemedView style={styles.card}>
          <ThemedText style={styles.label}>Current Address</ThemedText>

          <View
            style={[
              styles.inputRow,
              styles.inputHeight,
              !hasContent
                ? styles.inputDefault
                : isValid
                  ? styles.inputValid
                  : styles.inputError,
            ]}
          >
            <Ionicons
              name="location-outline"
              size={icon(18)}
              color={!hasContent ? "#9BA8C0" : isValid ? "#2E9E3A" : "#C62828"}
            />

            <TextInput
              style={styles.input}
              placeholder="i.e. House/Bldg No., Street Name, Barangay, City/Municipality, Province"
              placeholderTextColor="#9BA8C0"
              value={address}
              onChangeText={(text) => setAddress(text.slice(0, 100))}
              autoCapitalize="words"
              autoCorrect={false}
              multiline
              editable={!isBusy}
            />

            {hasContent && (
              <Ionicons
                name={isValid ? "checkmark-circle" : "close-circle"}
                size={icon(18)}
                color={isValid ? "#2E9E3A" : "#C62828"}
              />
            )}
          </View>

          <View style={styles.inputMeta}>
            <ThemedText
              style={[
                styles.validationHint,
                hasContent &&
                  (isValid
                    ? styles.validationHintOk
                    : styles.validationHintError),
              ]}
            >
              {validationMessage()}
            </ThemedText>
            <ThemedText style={styles.charCount}>{address.length}/100</ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={styles.rulesCard}>
          <View style={styles.rulesHeader}>
            <Ionicons
              name="information-circle-outline"
              size={icon(15)}
              color="#35408E"
            />
            <ThemedText style={styles.rulesTitle}>Reminder</ThemedText>
          </View>

          <View style={styles.ruleRow}>
            <ThemedText style={styles.ruleText}>
              Please make sure that this is your real current address.
            </ThemedText>
          </View>
        </ThemedView>

        <TouchableOpacity
          disabled={!isValid || isBusy}
          onPress={handleSave}
          style={[
            styles.saveBtn,
            (!isValid || isBusy) && styles.saveBtnDisabled,
          ]}
          activeOpacity={0.85}
        >
          <ThemedText
            style={[
              styles.saveTxt,
              (!isValid || isBusy) && styles.saveTxtDisabled,
            ]}
          >
            {isSaving
              ? "Saving..."
              : isLoggingActivity
                ? "Recording..."
                : "Save Address"}
          </ThemedText>
        </TouchableOpacity>

        <EditSuccess
          visible={showSuccess}
          message="Your address has been updated and saved."
          onClose={() => setShowSuccess(false)}
        />
      </ThemedView>
    </ScrollView>
  );
}
