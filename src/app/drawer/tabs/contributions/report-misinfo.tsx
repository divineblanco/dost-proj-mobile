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
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function ReportMisinformation() {
  /*
   * ============================
   * FORM VALUES
   * ============================
   */

  const [selectedMisinformation, setSelectedMisinformation] =
    useState<string | null>(null);

  const [source, setSource] = useState("");
  const [details, setDetails] = useState("");

  const [successContribute, setSuccessContribute] = useState(false);

  /*
   * ============================
   * VALIDATION ERRORS
   * ============================
   */

  const [errors, setErrors] = useState({
    misinformation: "",
    source: "",
    details: "",
  });

  /*
   * ============================
   * RESPONSIVE STYLES
   * ============================
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
   * ============================
   * VALIDATION
   * ============================
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
     */

    if (!source.trim()) {
      sourceError =
        "Please provide where you encountered this misinformation.";
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
      misinformation: misinformationError,
      source: sourceError,
      details: detailsError,
    });

    /*
     * RETURN VALIDITY
     */

    return (
      !misinformationError &&
      !sourceError &&
      !detailsError
    );
  };

  /*
   * ============================
   * SUBMIT
   * ============================
   */

  const handleSubmit = () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    /*
     * Q4 IS OPTIONAL
     * No validation is required for the
     * supporting evidence.
     */

    console.log("Misinformation Report:", {
      misinformationType: selectedMisinformation,
      source,
      details,
    });

    setSuccessContribute(true);
  };

  /*
   * ============================
   * CLEAR ERRORS
   * ============================
   */

  const handleMisinformationChange = (
    value: string | null
  ) => {
    setSelectedMisinformation(value);

    if (errors.misinformation) {
      setErrors((prev) => ({
        ...prev,
        misinformation: "",
      }));
    }
  };

  const handleSourceChange = (value: string) => {
    setSource(value);

    if (errors.source) {
      setErrors((prev) => ({
        ...prev,
        source: "",
      }));
    }
  };

  const handleDetailsChange = (value: string) => {
    setDetails(value);

    if (errors.details) {
      setErrors((prev) => ({
        ...prev,
        details: "",
      }));
    }
  };

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <ThemedView style={styles.formInner}>

        {/* =========================
            PAGE HEADER
        ========================= */}

        <ThemedView style={styles.headerCompact}>
          <ThemedText style={styles.title}>
            Report Misinformation
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.headerDivider} />

        {/* =========================
            QUESTION 1
        ========================= */}

        <ThemedView style={styles.section}>

          <ThemedView style={styles.questionRow}>

            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>
                1
              </ThemedText>
            </ThemedView>

            <ThemedText style={styles.question}>
              What type of misinformation{" "}
              <ThemedText style={styles.required}>
                *
              </ThemedText>
            </ThemedText>

          </ThemedView>

          <MisinformationType
            value={selectedMisinformation}
            onChange={handleMisinformationChange}
          />

          {errors.misinformation ? (
            <ThemedText style={styles.errorText}>
              {errors.misinformation}
            </ThemedText>
          ) : null}

        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        {/* =========================
            QUESTION 2
        ========================= */}

        <ThemedView style={styles.section}>

          <ThemedView style={styles.questionRow}>

            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>
                2
              </ThemedText>
            </ThemedView>

            <ThemedText style={styles.question}>
              Where did you encounter this misinformation{" "}
              <ThemedText style={styles.required}>
                *
              </ThemedText>
            </ThemedText>

          </ThemedView>

          <ThemedView style={reportMisinfo.bg}>

            <ThemedText style={reportMisinfo.label}>
              Source URL or Platform
            </ThemedText>

            <TextInput
              style={[
                reportMisinfo.input,
                errors.source
                  ? styles.inputError
                  : null,
              ]}
              placeholder="e.g., Facebook, X, website URL"
              placeholderTextColor={colors.muted}
              value={source}
              onChangeText={handleSourceChange}
              autoCapitalize="none"
              autoCorrect={false}
            />

          </ThemedView>

          {errors.source ? (
            <ThemedText style={styles.errorText}>
              {errors.source}
            </ThemedText>
          ) : null}

        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        {/* =========================
            QUESTION 3
        ========================= */}

        <ThemedView style={styles.section}>

          <ThemedView style={styles.questionRow}>

            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>
                3
              </ThemedText>
            </ThemedView>

            <ThemedText style={styles.question}>
              Tell us the details about the misinformation{" "}
              <ThemedText style={styles.required}>
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
            placeholderTextColor={colors.muted}
            multiline
            textAlignVertical="top"
            value={details}
            onChangeText={handleDetailsChange}
          />

          {errors.details ? (
            <ThemedText style={styles.errorText}>
              {errors.details}
            </ThemedText>
          ) : null}

        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        {/* =========================
            QUESTION 4
            OPTIONAL
        ========================= */}

        <ThemedView style={styles.section}>

          <ThemedView style={styles.questionRow}>

            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>
                4
              </ThemedText>
            </ThemedView>

            <ThemedText style={styles.question}>
              Attach Supporting Evidence{" "}
              <ThemedText style={styles.optional}>
                (Optional)
              </ThemedText>
            </ThemedText>

          </ThemedView>

          <ThemedText style={styles.subLabel}>
            Add photos, or screenshots.
          </ThemedText>

          <TouchableOpacity
            style={reportMisinfo.attachBtnCentered}
            activeOpacity={0.75}
          >
            <ThemedView
              style={[
                reportMisinfo.attachIconLarge,
                {
                  backgroundColor: "#FFF4EC",
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
              style={reportMisinfo.attachTxtLarge}
            >
              Upload Image
            </ThemedText>
          </TouchableOpacity>

        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        {/* =========================
            SUBMIT
        ========================= */}

        <TouchableOpacity
          style={styles.submitBtn}
          activeOpacity={0.85}
          onPress={handleSubmit}
        >
          <Ionicons
            name="send-outline"
            size={icon(18)}
            color="white"
          />

          <ThemedText style={styles.submitTxt}>
            Submit Report
          </ThemedText>
        </TouchableOpacity>

        {/* =========================
            SUCCESS MODAL
        ========================= */}

        <ContributeSuccess
          visible={successContribute}
          title="Report Submitted"
          message="Your report has been successfully received. Please allow up to (time) for it to be reviewed and verified before it is posted."
          onClose={() => {
            setSuccessContribute(false);
            router.back();
          }}
        />

        {/* =========================
            CANCEL
        ========================= */}

        <TouchableOpacity
          style={reportMisinfo.cancelBtn}
          activeOpacity={0.85}
          onPress={() => router.back()}
        >
          <ThemedText
            style={reportMisinfo.cancelTxt}
          >
            Cancel
          </ThemedText>
        </TouchableOpacity>

      </ThemedView>
    </ScrollView>
  );
}