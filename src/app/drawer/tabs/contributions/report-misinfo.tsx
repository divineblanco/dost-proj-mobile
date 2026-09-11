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
import { colors } from "@/styles/contribute/contribute-colors";
import {
  reportMisinfoStyles,
  sharedFormStyles,
} from "@/styles/contribute/contribute-form-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, {
  useMemo,
  useState,
} from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useAuth } from "@/lib/auth/AuthProvider";
import useFormMutation from "@/lib/hooks/useFormMutation";

/*
 * ==================================================
 * API
 * ==================================================
 */

const API_KEY =
  process.env.EXPO_PUBLIC_API_KEY || "testing";

/*
 * ==================================================
 * PAYLOAD
 * ==================================================
 */

type CreateMisinformationPayload = {
  title: string;
  type: string;
  source_url: string;
  content: string;

  classification: "MISINFORMATION";
  classification_method: "MANUAL";
  status: "PENDING";

  user_id: string;

};


/*
 * ==================================================
 * COMPONENT
 * ==================================================
 */

export default function ReportMisinformation() {
  /*
   * ==================================================
   * AUTH
   * ==================================================
   */

  const {
    token,
    user,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth();

  /*
   * ==================================================
   * FORM VALUES
   * ==================================================
   */

  const [
    selectedMisinformation,
    setSelectedMisinformation,
  ] = useState<string | null>(null);

  const [source, setSource] =
    useState("");

  const [details, setDetails] =
    useState("");

  /*
   * ==================================================
   * SUCCESS
   * ==================================================
   */

  const [
    successContribute,
    setSuccessContribute,
  ] = useState(false);

  /*
   * ==================================================
   * SUBMISSION ERROR
   * ==================================================
   */

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  /*
   * ==================================================
   * VALIDATION ERRORS
   * ==================================================
   */

  const [errors, setErrors] =
    useState({
      misinformation: "",
      source: "",
      details: "",
    });

  /*
   * ==================================================
   * RESPONSIVE STYLES
   * ==================================================
   */

  const r = useResponsive();

  const reportMisinfo = useMemo(
    () => reportMisinfoStyles(r),
    [r]
  );

  const styles = useMemo(
    () => sharedFormStyles(r),
    [r]
  );

  /*
   * ==================================================
   * MUTATION
   * ==================================================
   */

  const misinformationMutation =
    useFormMutation<
      CreateMisinformationPayload
    >({
      key: [
        "CreateMisinformation",
        user?.user_id,
      ],

      /*
       * Use the same endpoint as the
       * contribution flow.
       *
       * If your backend has a separate
       * misinformation endpoint, change
       * this URL only.
       */
      url: "maintenance/contribution",

      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        "x-api-key": API_KEY,

        Authorization: token
          ? `Bearer ${token}`
          : "",
      },
    });

  /*
   * ==================================================
   * VALIDATION
   * ==================================================
   */

  const validateForm = () => {
    let misinformationError = "";
    let sourceError = "";
    let detailsError = "";

    /*
     * Q1
     */

    if (!selectedMisinformation) {
      misinformationError =
        "Please select a type of misinformation.";
    }

    /*
     * Q2
     *
     * This accepts BOTH:
     *
     * Facebook
     * X
     * TikTok
     * YouTube
     *
     * OR:
     *
     * https://facebook.com/...
     */

    if (!source.trim()) {
      sourceError =
        "Please provide the source or social media platform.";
    }

    /*
     * Q3
     */

    if (!details.trim()) {
      detailsError =
        "Please provide details about the misinformation.";
    }

    /*
     * SET ERRORS
     */

    setErrors({
      misinformation:
        misinformationError,

      source:
        sourceError,

      details:
        detailsError,
    });

    return (
      !misinformationError &&
      !sourceError &&
      !detailsError
    );
  };

  /*
   * ==================================================
   * SUBMIT
   * ==================================================
   */

  const handleSubmit = () => {
    console.log(
      "[MISINFORMATION] Submit pressed"
    );

    /*
     * Wait for auth restoration.
     */

    if (authLoading) {
      setSubmitError(
        "Please wait while your session is being restored."
      );

      return;
    }

    /*
     * Verify authentication.
     */

    if (
      !isAuthenticated ||
      !token ||
      !user?.user_id
    ) {
      setSubmitError(
        "You must be signed in before submitting a report."
      );

      return;
    }

    /*
     * Verify API key.
     */

    if (!API_KEY) {
      setSubmitError(
        "API configuration is missing."
      );

      return;
    }

    /*
     * Validate form.
     */

    const isValid =
      validateForm();

    if (!isValid) {
      return;
    }

    setSubmitError("");

    /*
     * Build payload.
     *
     * IMPORTANT:
     *
     * source is intentionally passed
     * directly into source_url.
     *
     * This means the backend receives:
     *
     * "Facebook"
     *
     * OR:
     *
     * "https://facebook.com/example"
     *
     * depending on what the user entered.
     *
     * Image is explicitly null because
     * image upload is not implemented yet.
     */

    const payload: CreateMisinformationPayload = {
      title: selectedMisinformation!,
      type: selectedMisinformation!,
      source_url: source.trim(),
      content: details.trim(),
      classification: "MISINFORMATION",
      classification_method: "MANUAL",
      status: "PENDING",
      user_id: user.user_id,
    };




    console.log(
      "[MISINFORMATION] Submitting payload:",
      payload
    );

    /*
     * SEND TO BACKEND
     */

    misinformationMutation.mutate(
      payload,
      {
        onSuccess: (
          response
        ) => {
          console.log(
            "[MISINFORMATION] Submission successful:",
            response
          );

          setSuccessContribute(
            true
          );
        },

        onError: (
          error
        ) => {
          console.error(
            "[MISINFORMATION] Submission failed:",
            error
          );

          console.error(
            "[MISINFORMATION] Error response:",
            JSON.stringify(error.response?.data, null, 2)
          );



          const status =
            error.response?.status;

          if (status === 401) {
            const message =
              (
                error.response?.data as any
              )?.data?.message ||
              (
                error.response?.data as any
              )?.message;

            if (
              message ===
              "Invalid API key"
            ) {
              setSubmitError(
                "The API key is invalid. Please check your mobile app API configuration."
              );

              return;
            }

            if (
              message ===
              "Invalid authorization format"
            ) {
              setSubmitError(
                "Your authentication token was not sent correctly."
              );

              return;
            }

            if (
              message ===
              "Invalid or expired token"
            ) {
              setSubmitError(
                "Your session has expired. Please sign in again."
              );

              return;
            }

            setSubmitError(
              "Authentication failed. Please sign in again."
            );

            return;
          }

          setSubmitError(
            "Unable to submit your report. Please try again."
          );
        },
      }
    );
  };

  /*
   * ==================================================
   * FIELD CHANGES
   * ==================================================
   */

  const handleMisinformationChange = (
    value: string | null
  ) => {
    setSelectedMisinformation(
      value
    );

    if (
      errors.misinformation
    ) {
      setErrors((prev) => ({
        ...prev,
        misinformation: "",
      }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSourceChange = (
    value: string
  ) => {
    setSource(value);

    if (errors.source) {
      setErrors((prev) => ({
        ...prev,
        source: "",
      }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleDetailsChange = (
    value: string
  ) => {
    setDetails(value);

    if (errors.details) {
      setErrors((prev) => ({
        ...prev,
        details: "",
      }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  /*
   * ==================================================
   * SUBMITTING
   * ==================================================
   */

  const isSubmitting =
    misinformationMutation.isPending;

  /*
   * ==================================================
   * RENDER
   * ==================================================
   */

  return (
    <ScrollView
      style={
        styles.pageContainer
      }
      contentContainerStyle={
        styles.scrollContent
      }
      showsVerticalScrollIndicator={
        false
      }
      keyboardShouldPersistTaps="handled"
    >
      <ThemedView
        style={styles.formInner}
      >
        {/* =========================
            PAGE HEADER
        ========================= */}

        <ThemedView
          style={
            styles.headerCompact
          }
        >
          <ThemedText
            style={styles.title}
          >
            Report Misinformation
          </ThemedText>
        </ThemedView>

        <ThemedView
          style={styles.headerDivider}
        />

        {/* =========================
            QUESTION 1
        ========================= */}

        <ThemedView
          style={styles.section}
        >
          <ThemedView
            style={styles.questionRow}
          >
            <ThemedView
              style={styles.qNumber}
            >
              <ThemedText
                style={
                  styles.qNumberText
                }
              >
                1
              </ThemedText>
            </ThemedView>

            <ThemedText
              style={styles.question}
            >
              What type of misinformation?{" "}
              <ThemedText
                style={styles.required}
              >
                *
              </ThemedText>
            </ThemedText>
          </ThemedView>

          <MisinformationType
            value={
              selectedMisinformation
            }
            onChange={
              handleMisinformationChange
            }
          />

          {errors.misinformation ? (
            <ThemedText
              style={
                styles.errorText
              }
            >
              {
                errors.misinformation
              }
            </ThemedText>
          ) : null}
        </ThemedView>

        <ThemedView
          style={
            styles.sectionDivider
          }
        />

        {/* =========================
            QUESTION 2
        ========================= */}

        <ThemedView
          style={styles.section}
        >
          <ThemedView
            style={styles.questionRow}
          >
            <ThemedView
              style={styles.qNumber}
            >
              <ThemedText
                style={
                  styles.qNumberText
                }
              >
                2
              </ThemedText>
            </ThemedView>

            <ThemedText
              style={styles.question}
            >
              Where did you encounter this misinformation?{" "}
              <ThemedText
                style={styles.required}
              >
                *
              </ThemedText>
            </ThemedText>
          </ThemedView>

          <ThemedView
            style={reportMisinfo.bg}
          >
            <ThemedText
              style={
                reportMisinfo.label
              }
            >
              Source URL
            </ThemedText>

            <TextInput
              style={[
                reportMisinfo.input,
                errors.source
                  ? styles.inputError
                  : null,
              ]}
              placeholder="e.g., Facebook, X, TikTok, or website URL"
              placeholderTextColor={
                colors.muted
              }
              value={source}
              onChangeText={
                handleSourceChange
              }
              autoCapitalize="none"
              autoCorrect={false}
              editable={
                !isSubmitting
              }
            />
          </ThemedView>

          {errors.source ? (
            <ThemedText
              style={
                styles.errorText
              }
            >
              {errors.source}
            </ThemedText>
          ) : null}
        </ThemedView>

        <ThemedView
          style={
            styles.sectionDivider
          }
        />

        {/* =========================
            QUESTION 3
        ========================= */}

        <ThemedView
          style={styles.section}
        >
          <ThemedView
            style={styles.questionRow}
          >
            <ThemedView
              style={styles.qNumber}
            >
              <ThemedText
                style={
                  styles.qNumberText
                }
              >
                3
              </ThemedText>
            </ThemedView>

            <ThemedText
              style={styles.question}
            >
              Tell us the details about the misinformation{" "}
              <ThemedText
                style={styles.required}
              >
                *
              </ThemedText>
            </ThemedText>
          </ThemedView>

          <TextInput
            style={[
              styles.textArea,
              errors.details
                ? styles.inputError
                : null,
            ]}
            placeholder="Provide details of the misinformation..."
            placeholderTextColor={
              colors.muted
            }
            multiline
            textAlignVertical="top"
            value={details}
            onChangeText={
              handleDetailsChange
            }
            editable={
              !isSubmitting
            }
          />

          {errors.details ? (
            <ThemedText
              style={
                styles.errorText
              }
            >
              {errors.details}
            </ThemedText>
          ) : null}
        </ThemedView>

        <ThemedView
          style={
            styles.sectionDivider
          }
        />

        {/* =========================
            QUESTION 4
            OPTIONAL
         ========================= */}

        <ThemedView
          style={styles.section}
        >
          <ThemedView
            style={styles.questionRow}
          >
            <ThemedView
              style={styles.qNumber}
            >
              <ThemedText
                style={
                  styles.qNumberText
                }
              >
                4
              </ThemedText>
            </ThemedView>

            <ThemedText
              style={styles.question}
            >
              Attach Supporting Evidence{" "}
              <ThemedText
                style={styles.optional}
              >
                (Optional)
              </ThemedText>
            </ThemedText>
          </ThemedView>

          <ThemedText
            style={styles.subLabel}
          >
            Add photos, or screenshots.
          </ThemedText>

          {/*
           * IMAGE UPLOAD REMAINS VISIBLE.
           *
           * It intentionally has NO onPress.
           * Image functionality can be added later.
           */}

          <TouchableOpacity
            style={
              reportMisinfo.attachBtnCentered
            }
            activeOpacity={0.75}
          >
            <ThemedView
              style={[
                reportMisinfo.attachIconLarge,
                {
                  backgroundColor:
                    "#FFF4EC",
                },
              ]}
            >
              <Ionicons
                name="image-outline"
                size={icon(25)}
                color="#FFB400"
              />
            </ThemedView>

            <ThemedText
              style={
                reportMisinfo.attachTxtLarge
              }
            >
              Upload Image
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView
          style={
            styles.sectionDivider
          }
        />

        {/* =========================
            API ERROR
        ========================= */}

        {submitError ? (
          <ThemedView
            style={{
              backgroundColor:
                "transparent",
              marginTop: 12,
            }}
          >
            <ThemedText
              style={{
                color: "#E20000",
                textAlign: "center",
              }}
            >
              {submitError}
            </ThemedText>
          </ThemedView>
        ) : null}

        {/* =========================
            SUBMIT
        ========================= */}

        <TouchableOpacity
          style={[
            styles.submitBtn,
            isSubmitting && {
              opacity: 0.5,
            },
          ]}
          activeOpacity={0.85}
          onPress={
            handleSubmit
          }
          disabled={
            isSubmitting
          }
        >
          <Ionicons
            name="send-outline"
            size={icon(18)}
            color="white"
          />

          <ThemedText
            style={styles.submitTxt}
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Report"}
          </ThemedText>
        </TouchableOpacity>

        {/* =========================
            SUCCESS MODAL
        ========================= */}

        <ContributeSuccess
          visible={
            successContribute
          }
          title="Report Submitted"
          message="Your report has been successfully received. Please allow up to (time) for it to be reviewed and verified before it is posted."
          onClose={() => {
            setSuccessContribute(
              false
            );

            router.back();
          }}
        />

        {/* =========================
            CANCEL
        ========================= */}

        <TouchableOpacity
          style={
            reportMisinfo.cancelBtn
          }
          activeOpacity={0.85}
          onPress={() =>
            router.back()
          }
          disabled={
            isSubmitting
          }
        >
          <ThemedText
            style={
              reportMisinfo.cancelTxt
            }
          >
            Cancel
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}
