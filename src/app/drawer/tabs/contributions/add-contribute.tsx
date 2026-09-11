// import { QuestionOne } from "@/components/cards/question-one";
// import { QuestionTwo } from "@/components/cards/question-two";
// import ContributeSuccess from "@/components/modals/contribute-success";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { colors } from "@/styles/contribute/contribute-colors";
// import {
//   addContributeStyles,
//   sharedFormStyles,
// } from "@/styles/contribute/contribute-form-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React, { useMemo, useRef, useState } from "react";
// import {
//   ScrollView,
//   TextInput,
//   TouchableOpacity
// } from "react-native";

// const SENTIMENT_OPTIONS = [
//   { label: "Low", color: colors.success, bg: colors.successBg },
//   { label: "Medium", color: colors.warning, bg: colors.warningBg },
//   { label: "High", color: colors.danger, bg: colors.dangerBg },
// ];

// /*
//  * ============================
//  * FORM TYPES
//  * ============================
//  */

// export type QuestionOneValue = {
//   selected: string | null;
//   otherText: string;
// };

// export type QuestionTwoValue = {
//   region: string | null;
//   province: string | null;
//   city: string | null;
//   barangay: string | null;
// };

// export default function AddContribute() {
//   /*
//    * ============================
//    * Q1
//    * ============================
//    */

//   const [questionOne, setQuestionOne] =
//     useState<QuestionOneValue>({
//       selected: null,
//       otherText: "",
//     });

//   /*
//    * ============================
//    * Q2
//    * ============================
//    */

//   const [questionTwo, setQuestionTwo] =
//     useState<QuestionTwoValue>({
//       region: null,
//       province: null,
//       city: null,
//       barangay: null,
//     });

//   /*
//    * ============================
//    * Q3
//    * ============================
//    */

//   const [experience, setExperience] = useState("");

//   /*
//    * ============================
//    * Q4
//    *
//    * OPTIONAL
//    * ============================
//    */

//   const [successContribute, setSuccessContribute] =
//     useState(false);

//   /*
//    * ============================
//    * VALIDATION ERRORS
//    * ============================
//    */

//   const [errors, setErrors] = useState({
//     questionOne: "",
//     questionTwo: "",
//     experience: "",
//   });

//   /*
//    * ============================
//    * SCROLL REF
//    * ============================
//    */

//   const scrollViewRef = useRef<ScrollView>(null);

//   /*
//    * ============================
//    * RESPONSIVE STYLES
//    * ============================
//    */

//   const r = useResponsive();

//   const styles = useMemo(
//     () => sharedFormStyles(r),
//     [r]
//   );

//   const addContri = useMemo(
//     () => addContributeStyles(r),
//     [r]
//   );

//   /*
//    * ============================
//    * VALIDATE FORM
//    * ============================
//    */

//   const validateForm = () => {
//     let questionOneError = "";
//     let questionTwoError = "";
//     let experienceError = "";

//     /*
//      * Q1
//      */

//     if (!questionOne.selected) {
//       questionOneError =
//         "Please select what you would like to share.";
//     } else if (
//       questionOne.selected === "Other" &&
//       !questionOne.otherText.trim()
//     ) {
//       questionOneError =
//         "Please specify what you would like to share.";
//     }

//     /*
//      * Q2
//      */

//     const missingLocation =
//       !questionTwo.region ||
//       !questionTwo.province ||
//       !questionTwo.city ||
//       !questionTwo.barangay;

//     if (missingLocation) {
//       questionTwoError =
//         "Please complete all location fields.";
//     }

//     /*
//      * Q3
//      */

//     if (!experience.trim()) {
//       experienceError =
//         "Please tell us about your experience.";
//     }

//     /*
//      * SET ERRORS
//      */

//     setErrors({
//       questionOne: questionOneError,
//       questionTwo: questionTwoError,
//       experience: experienceError,
//     });

//     /*
//      * ============================
//      * SCROLL TO FIRST ERROR
//      * ============================
//      */

//     if (questionOneError) {
//       scrollViewRef.current?.scrollTo({
//         y: 0,
//         animated: true,
//       });
//     } else if (questionTwoError) {
//       scrollViewRef.current?.scrollTo({
//         y: 400,
//         animated: true,
//       });
//     } else if (experienceError) {
//       scrollViewRef.current?.scrollTo({
//         y: 750,
//         animated: true,
//       });
//     }

//     /*
//      * RETURN VALIDITY
//      */

//     return (
//       !questionOneError &&
//       !questionTwoError &&
//       !experienceError
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
//      * At this point all required fields
//      * are valid.
//      *
//      * You can send the data to your API here.
//      */

//     console.log("Contribution:", {
//       questionOne,
//       questionTwo,
//       experience,
//     });

//     setSuccessContribute(true);
//   };

//   /*
//    * ============================
//    * CLEAR Q1 ERROR
//    * ============================
//    */

//   const handleQuestionOneChange = (
//     value: QuestionOneValue
//   ) => {
//     setQuestionOne(value);

//     if (errors.questionOne) {
//       setErrors((prev) => ({
//         ...prev,
//         questionOne: "",
//       }));
//     }
//   };

//   /*
//    * ============================
//    * CLEAR Q2 ERROR
//    * ============================
//    */

//   const handleQuestionTwoChange = (
//     value: QuestionTwoValue
//   ) => {
//     setQuestionTwo(value);

//     if (errors.questionTwo) {
//       setErrors((prev) => ({
//         ...prev,
//         questionTwo: "",
//       }));
//     }
//   };

//   /*
//    * ============================
//    * Q3 CHANGE
//    * ============================
//    */

//   const handleExperienceChange = (
//     value: string
//   ) => {
//     setExperience(value);

//     if (errors.experience) {
//       setErrors((prev) => ({
//         ...prev,
//         experience: "",
//       }));
//     }
//   };

//   return (
//     <ScrollView
//       ref={scrollViewRef}
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//       showsVerticalScrollIndicator={false}
//       keyboardShouldPersistTaps="handled"
//     >
//       <ThemedView style={styles.formInner}>

//         {/* =========================
//             PAGE HEADER
//         ========================= */}

//         <ThemedView style={styles.header}>
//           <ThemedText style={styles.title}>
//             Contribute
//           </ThemedText>

//           <ThemedText style={styles.desc}>
//             Share your personal experiences, observations,
//             and insights related to HIV discussions and
//             resources in your community.
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
//               What would you like to share?{" "}
//               <ThemedText style={styles.required}>*</ThemedText>
//             </ThemedText>

//           </ThemedView>

//           <QuestionOne
//             value={questionOne}
//             onChange={handleQuestionOneChange}
//           />

//           {errors.questionOne ? (
//             <ThemedText style={styles.errorText}>
//               {errors.questionOne}
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
//               Where did this happen?{" "}
//               <ThemedText style={styles.required}>*</ThemedText>
//             </ThemedText>

//           </ThemedView>

//           <QuestionTwo
//             value={questionTwo}
//             onChange={handleQuestionTwoChange}
//           />

//           {errors.questionTwo ? (
//             <ThemedText style={styles.errorText}>
//               {errors.questionTwo}
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
//               Tell us about your experience{" "}
//               <ThemedText style={styles.required}>*</ThemedText>
//             </ThemedText>

//           </ThemedView>

//           <TextInput
//             style={[
//               styles.textArea,
//               errors.experience
//                 ? styles.inputError
//                 : null,
//             ]}
//             placeholder="Describe what you observed or experienced regarding HIV awareness, stigma, misinformation, access to services, or community discussions."
//             placeholderTextColor={colors.muted}
//             multiline
//             textAlignVertical="top"
//             value={experience}
//             onChangeText={handleExperienceChange}
//           />

//           {errors.experience ? (
//             <ThemedText style={styles.errorText}>
//               {errors.experience}
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
//             Add photos, screenshots, or links.
//           </ThemedText>

//           <ThemedView style={addContri.attachRow}>

//             {/* IMAGE */}

//             <TouchableOpacity
//               style={addContri.attachBtn}
//               activeOpacity={0.75}
//             >
//               <ThemedView
//                 style={[
//                   addContri.attachIcon,
//                   {
//                     backgroundColor: "#FFF4EC",
//                   },
//                 ]}
//               >
//                 <Ionicons
//                   name="image-outline"
//                   size={icon(20)}
//                   color="#FFB400"
//                 />
//               </ThemedView>

//               <ThemedText style={addContri.attachTxt}>
//                 Upload Image
//               </ThemedText>
//             </TouchableOpacity>

//             {/* LINK */}

//             <TouchableOpacity
//               style={addContri.attachBtn}
//               activeOpacity={0.75}
//             >
//               <ThemedView
//                 style={[
//                   addContri.attachIcon,
//                   {
//                     backgroundColor: "#EDFAF3",
//                   },
//                 ]}
//               >
//                 <Feather
//                   name="link"
//                   size={icon(17)}
//                   color={colors.success}
//                 />
//               </ThemedView>

//               <ThemedText style={addContri.attachTxt}>
//                 Upload Link
//               </ThemedText>
//             </TouchableOpacity>

//           </ThemedView>

//         </ThemedView>

//         <ThemedView style={styles.sectionDivider} />

//         {/* =========================
//             PRIVACY
//         ========================= */}

//         <ThemedView style={addContri.privacyCard}>

//           <ThemedView style={addContri.privacyHeader}>

//             <ThemedView style={addContri.privacyIconBg}>
//               <MaterialIcons
//                 name="verified-user"
//                 size={icon(20)}
//                 color={colors.primary}
//               />
//             </ThemedView>

//             <ThemedText style={addContri.privacyTitle}>
//               Your Privacy Matters
//             </ThemedText>

//           </ThemedView>

//           <ThemedText style={addContri.privacyBody}>
//             Your submission will be anonymized and analyzed
//             by AdvocAid PH's AI system to identify trends,
//             stigma, and resource needs while protecting your
//             personal privacy.
//           </ThemedText>

//           <TouchableOpacity
//             activeOpacity={0.7}
//             onPress={() =>
//               router.push(
//                 "/drawer/tabs/setting/abouts/privacy-policy"
//               )
//             }
//           >
//             <ThemedText style={addContri.privacyLink}>
//               Learn more about our privacy policy →
//             </ThemedText>
//           </TouchableOpacity>

//         </ThemedView>

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
//             Submit Contribution
//           </ThemedText>
//         </TouchableOpacity>

//         {/* =========================
//             SUCCESS MODAL
//         ========================= */}

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

import { colors } from "@/styles/contribute/contribute-colors";
import {
  addContributeStyles,
  sharedFormStyles,
} from "@/styles/contribute/contribute-form-styles";
import { icon, useResponsive, verticalScale } from "@/styles/responsive";

import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";


import React, {
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";

// AUTH
import { useAuth } from "@/lib/auth/AuthProvider";

// API MUTATION
import useFormMutation from "@/lib/hooks/useFormMutation";

/*
 * ============================
 * FORM TYPES
 * ============================
 */

export type QuestionOneValue = {
  selected: string | null;
  otherText: string;
};

export type QuestionTwoValue = {
  region: string | null;
  province: string | null;
  city: string | null;
  barangay: string | null;
};

/*
 * ============================
 * API TYPE
 * ============================
 */

type CreateContributionPayload = {
  title: string;
  content: string;
  type: string;

  classification: "PENDING";
  classification_method: "MANUAL";
  status: "PENDING";

  barangay: string;
  municipality: string;
  province: string;
  region: string;

  user_id: string;

  source_url?: string | null;
};


/*
 * ============================
 * API KEY
 * ============================
 *
 * Your backend currently has:
 *
 * const VALID_API_KEYS =
 *   (process.env.API_KEYS || "testing").split(",");
 *
 * Therefore "testing" is the development
 * API key unless your backend API_KEYS
 * environment variable has another value.
 *
 * IMPORTANT:
 *
 * This is NOT stored in AuthProvider.
 * AuthProvider is only responsible for
 * the authenticated user's session/JWT.
 */

const API_KEY =
  process.env.EXPO_PUBLIC_API_KEY || "testing";

/*
 * ============================
 * MAIN COMPONENT
 * ============================
 */


export default function AddContribute() {
 
 const [sourceUrl, setSourceUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  /*
   * ============================
   * AUTH
   * ============================
   */

  const {
    token,
    user,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth();

  /*
   * ============================
   * Q1
   * ============================
   */

  const [questionOne, setQuestionOne] =
    useState<QuestionOneValue>({
      selected: null,
      otherText: "",
    });

  /*
   * ============================
   * Q2
   * ============================
   */

  const [questionTwo, setQuestionTwo] =
    useState<QuestionTwoValue>({
      region: null,
      province: null,
      city: null,
      barangay: null,
    });

  /*
   * ============================
   * Q3
   * ============================
   */

  const [experience, setExperience] =
    useState("");

  /*
   * ============================
   * SUCCESS MODAL
   * ============================
   */

  const [
    successContribute,
    setSuccessContribute,
  ] = useState(false);

  /*
   * ============================
   * SUBMISSION ERROR
   * ============================
   */

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  /*
   * ============================
   * VALIDATION ERRORS
   * ============================
   */

  const [errors, setErrors] = useState({
    questionOne: "",
    questionTwo: "",
    experience: "",
  });

  /*
   * ============================
   * SCROLL REF
   * ============================
   */

  const scrollViewRef =
    useRef<ScrollView>(null);

  /*
   * ============================
   * RESPONSIVE STYLES
   * ============================
   */

  const r = useResponsive();

  const styles = useMemo(
    () => sharedFormStyles(r),
    [r]
  );

  const addContri = useMemo(
    () => addContributeStyles(r),
    [r]
  );

  /*
   * ============================
   * CREATE CONTRIBUTION MUTATION
   * ============================
   *
   * The backend withAuth middleware
   * requires:
   *
   * x-api-key
   * Authorization: Bearer <token>
   *
   * We get the token from AuthProvider.
   */

  const contributionMutation =
    useFormMutation<
      CreateContributionPayload
    >({
      key: [
        "CreateContribution",
        user?.user_id,
      ],

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
   * ============================
   * VALIDATE FORM
   * ============================
   */

  const validateForm = () => {
    let questionOneError = "";
    let questionTwoError = "";
    let experienceError = "";

    /*
     * Q1
     */

    if (!questionOne.selected) {
      questionOneError =
        "Please select what you would like to share.";
    } else if (
      questionOne.selected === "Other" &&
      !questionOne.otherText.trim()
    ) {
      questionOneError =
        "Please specify what you would like to share.";
    }

    /*
     * Q2
     */

    const missingLocation =
      !questionTwo.region ||
      !questionTwo.province ||
      !questionTwo.city ||
      !questionTwo.barangay;

    if (missingLocation) {
      questionTwoError =
        "Please complete all location fields.";
    }

    /*
     * Q3
     */

    if (!experience.trim()) {
      experienceError =
        "Please tell us about your experience.";
    }

    /*
     * SET ERRORS
     */

    setErrors({
      questionOne:
        questionOneError,
      questionTwo:
        questionTwoError,
      experience:
        experienceError,
    });

    /*
     * SCROLL TO FIRST ERROR
     */

    if (questionOneError) {
      scrollViewRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    } else if (questionTwoError) {
      scrollViewRef.current?.scrollTo({
        y: 400,
        animated: true,
      });
    } else if (experienceError) {
      scrollViewRef.current?.scrollTo({
        y: 750,
        animated: true,
      });
    }

    return (
      !questionOneError &&
      !questionTwoError &&
      !experienceError
    );
  };

  /*
   * ============================
   * SUBMIT
   * ============================
   */

  const handleSubmit = () => {
    console.log(
      "[CONTRIBUTION] Submit pressed"
    );

    console.log(
      "[CONTRIBUTION] Current auth:",
      {
        authLoading,
        isAuthenticated,
        hasToken: Boolean(token),
        hasUser: Boolean(user),
        userId: user?.user_id,
        hasApiKey: Boolean(API_KEY),
      }
    );

    /*
     * Do not submit while AuthProvider
     * is still restoring the session.
     */

    if (authLoading) {
      console.log(
        "[CONTRIBUTION] Auth is still loading"
      );

      setSubmitError(
        "Please wait while your session is being restored."
      );

      return;
    }

    /*
     * Verify the session.
     */

    if (
      !isAuthenticated ||
      !token ||
      !user?.user_id
    ) {
      console.log(
        "[CONTRIBUTION] Missing authentication:",
        {
          hasToken: Boolean(token),
          hasUser: Boolean(user),
          isAuthenticated,
          userId: user?.user_id,
        }
      );

      setSubmitError(
        "You must be signed in before submitting a contribution."
      );

      return;
    }

    /*
     * Verify API key.
     */

    if (!API_KEY) {
      console.log(
        "[CONTRIBUTION] Missing API key"
      );

      setSubmitError(
        "API configuration is missing."
      );

      return;
    }

    /*
     * Validate form.
     */

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    if (sourceUrl.trim()) {
      try {
        const url = new URL(
          sourceUrl.trim()
        );

        if (
          url.protocol !== "http:" &&
          url.protocol !== "https:"
        ) {
          setSubmitError(
            "Please enter a valid link."
          );

          return;
        }
      } catch {
        setSubmitError(
          "Please enter a valid link."
        );

        return;
      }
    }

    /*
     * Clear previous API error.
     */

    setSubmitError("");
    


    /*
     * Determine contribution type/title.
     *
     * For "Other", use the custom text.
     */

    const selectedType =
      questionOne.selected === "Other"
        ? questionOne.otherText.trim()
        : questionOne.selected;

    if (!selectedType) {
      setSubmitError(
        "Please specify what you would like to share."
      );

      return;
    }

    /*
     * Build backend payload.
     *
     * This matches CreateContributionSchema.
     */

    const payload: CreateContributionPayload =
  {
    title: selectedType,

    content:
      experience.trim(),

    type: selectedType,

    classification:
      "PENDING",

    classification_method:
      "MANUAL",

    status:
      "PENDING",

    barangay:
      questionTwo.barangay!,

    municipality:
      questionTwo.city!,

    province:
      questionTwo.province!,

    region:
      questionTwo.region!,

    user_id:
      user.user_id,

    source_url:
      sourceUrl.trim()
        ? sourceUrl.trim()
        : null,
  };


    console.log(
      "[CONTRIBUTION] Submitting:",
      payload
    );

    /*
     * Submit to backend.
     */

    contributionMutation.mutate(
      payload,
      {
        onSuccess: (response) => {
          console.log(
            "[CONTRIBUTION] Submission successful:",
            response
          );

          /*
           * Show existing success modal.
           */

          setSuccessContribute(true);
        },

        onError: (error) => {
          console.log(
            "[CONTRIBUTION] Failed to submit:",
            error
          );

          console.log(
            "[CONTRIBUTION] Error response:",
            error.response?.data
          );

          const status =
            error.response?.status;

          /*
           * 401 means authentication/API key
           * was rejected by withAuth.
           */

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

          /*
           * Other errors.
           */

          setSubmitError(
            "Unable to submit your contribution. Please try again."
          );
        },
      }
    );
  };

  /*
   * ============================
   * Q1 CHANGE
   * ============================
   */

  const handleQuestionOneChange = (
    value: QuestionOneValue
  ) => {
    setQuestionOne(value);

    if (errors.questionOne) {
      setErrors((prev) => ({
        ...prev,
        questionOne: "",
      }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  /*
   * ============================
   * Q2 CHANGE
   * ============================
   */

  const handleQuestionTwoChange = (
    value: QuestionTwoValue
  ) => {
    setQuestionTwo(value);

    if (errors.questionTwo) {
      setErrors((prev) => ({
        ...prev,
        questionTwo: "",
      }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  /*
   * ============================
   * Q3 CHANGE
   * ============================
   */

  const handleExperienceChange = (
    value: string
  ) => {
    setExperience(value);

    if (errors.experience) {
      setErrors((prev) => ({
        ...prev,
        experience: "",
      }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  /*
   * ============================
   * SUBMITTING STATE
   * ============================
   */

  const isSubmitting =
    contributionMutation.isPending;

  /*
   * ============================
   * RENDER
   * ============================
   */

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.pageContainer}
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
          style={styles.header}
        >
          <ThemedText
            style={styles.title}
          >
            Contribute
          </ThemedText>

          <ThemedText
            style={styles.desc}
          >
            Share your personal
            experiences, observations,
            and insights related to HIV
            discussions and resources in
            your community.
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
              What would you like to
              share?{" "}
              <ThemedText
                style={styles.required}
              >
                *
              </ThemedText>
            </ThemedText>
          </ThemedView>

          <QuestionOne
            value={questionOne}
            onChange={
              handleQuestionOneChange
            }
          />

          {errors.questionOne ? (
            <ThemedText
              style={styles.errorText}
            >
              {errors.questionOne}
            </ThemedText>
          ) : null}
        </ThemedView>

        <ThemedView
          style={styles.sectionDivider}
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
              Where did this happen?{" "}
              <ThemedText
                style={styles.required}
              >
                *
              </ThemedText>
            </ThemedText>
          </ThemedView>

          <QuestionTwo
            value={questionTwo}
            onChange={
              handleQuestionTwoChange
            }
          />

          {errors.questionTwo ? (
            <ThemedText
              style={styles.errorText}
            >
              {errors.questionTwo}
            </ThemedText>
          ) : null}
        </ThemedView>

        <ThemedView
          style={styles.sectionDivider}
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
              Tell us about your
              experience{" "}
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
              errors.experience
                ? styles.inputError
                : null,
            ]}
            placeholder="Describe what you observed or experienced regarding HIV awareness, stigma, misinformation, access to services, or community discussions."
            placeholderTextColor={
              colors.muted
            }
            multiline
            textAlignVertical="top"
            value={experience}
            onChangeText={
              handleExperienceChange
            }
            editable={!isSubmitting}
          />

          {errors.experience ? (
            <ThemedText
              style={styles.errorText}
            >
              {errors.experience}
            </ThemedText>
          ) : null}
        </ThemedView>

        <ThemedView
          style={styles.sectionDivider}
        />

        {/* =========================
            QUESTION 4 OPTIONAL
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
            Add photos, screenshots, or
            links.
          </ThemedText>

          <ThemedView
            style={addContri.attachRow}
          >
            {/* IMAGE */}

            <TouchableOpacity
              style={
                addContri.attachBtn
              }
              activeOpacity={0.75}
            >
              <ThemedView
                style={[
                  addContri.attachIcon,
                  {
                    backgroundColor:
                      "#FFF4EC",
                  },
                ]}
              >
                <Ionicons
                  name="image-outline"
                  size={icon(20)}
                  color="#FFB400"
                />
              </ThemedView>

              <ThemedText
                style={
                  addContri.attachTxt
                }
              >
                Upload Image
              </ThemedText>
            </TouchableOpacity>


            {/* LINK */}

            <TouchableOpacity
              style={
                addContri.attachBtn
              }
              activeOpacity={0.75}
              onPress={() =>
                setShowLinkInput(
                  (previous) => !previous
                )
              }
              disabled={isSubmitting}
            >
              <ThemedView
                style={[
                  addContri.attachIcon,
                  {
                    backgroundColor:
                      "#EDFAF3",
                  },
                ]}
              >
                <Feather
                  name="link"
                  size={icon(17)}
                  color={colors.success}
                />
              </ThemedView>

              <ThemedText
                style={
                  addContri.attachTxt
                }
              >
                Upload Link
              </ThemedText>
            </TouchableOpacity>

          </ThemedView>

          {showLinkInput ? (
            <ThemedView
              style={{
                marginTop: verticalScale(5),
              }}
            >
              <TextInput
                style={styles.linkInput}
                placeholder="Paste supporting link here"
                placeholderTextColor={colors.muted}
                value={sourceUrl}
                onChangeText={setSourceUrl}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                editable={!isSubmitting}
              />
            </ThemedView>
          ) : null}

        </ThemedView>

        <ThemedView
          style={styles.sectionDivider}
        />

        {/* =========================
            PRIVACY
        ========================= */}

        <ThemedView
          style={addContri.privacyCard}
        >
          <ThemedView
            style={
              addContri.privacyHeader
            }
          >
            <ThemedView
              style={
                addContri.privacyIconBg
              }
            >
              <MaterialIcons
                name="verified-user"
                size={icon(20)}
                color={colors.primary}
              />
            </ThemedView>

            <ThemedText
              style={
                addContri.privacyTitle
              }
            >
              Your Privacy Matters
            </ThemedText>
          </ThemedView>

          <ThemedText
            style={
              addContri.privacyBody
            }
          >
            Your submission will be
            anonymized and analyzed by
            AdvocAid PH's AI system to
            identify trends, stigma, and
            resource needs while
            protecting your personal
            privacy.
          </ThemedText>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              router.push(
                "/drawer/tabs/setting/abouts/privacy-policy"
              )
            }
          >
            <ThemedText
              style={
                addContri.privacyLink
              }
            >
              Learn more about our privacy policy →
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

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
          onPress={handleSubmit}
          disabled={isSubmitting}
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
              : "Submit Contribution"}
          </ThemedText>
        </TouchableOpacity>

        {/* =========================
            SUCCESS MODAL
        ========================= */}

        <ContributeSuccess
          visible={
            successContribute
          }
          onClose={() => {
            setSuccessContribute(
              false
            );

            router.back();
          }}
        />
      </ThemedView>
    </ScrollView>
  );
}
