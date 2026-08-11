import { MisinformationType } from '@/components/cards/misinfo-type';
import ContributeSuccess from '@/components/modals/contribute-success';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { colors } from '@/styles/contribute/contribute-colors';
import { reportMisinfoStyles, sharedFormStyles } from '@/styles/contribute/contribute-form-styles';
import { icon, useResponsive } from '@/styles/responsive';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native';

export default function ReportMisinformation() {
  const [details, setDetails] = useState('');
  const [source, setSource] = useState('');

  const [successContribute, setSuccessContribute] = useState(false);

  const handleSubmit = () => {
    setSuccessContribute(true);
  };

  const r = useResponsive();
        
          const reportMisinfo = useMemo(() => reportMisinfoStyles(r), [r]);
          const styles = useMemo(() => sharedFormStyles(r), [r]);
  

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={styles.formInner}>
        {/* Page header */}
        <ThemedView style={styles.headerCompact}>
          <ThemedText style={styles.title}>Report Misinformation</ThemedText>
        </ThemedView>

        <ThemedView style={styles.headerDivider} />

        {/* Q1 */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.questionRow}>
            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>1</ThemedText>
            </ThemedView>
            <ThemedText style={styles.question}>What type of misinformation?</ThemedText>
          </ThemedView>
          <MisinformationType />
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        {/* Q2 — Source */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.questionRow}>
            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>2</ThemedText>
            </ThemedView>
            <ThemedText style={styles.question}>Where did you encounter this misinformation?</ThemedText>
          </ThemedView>
          <ThemedView style={reportMisinfo.bg}>
            <ThemedText style={reportMisinfo.label}>Source URL or Platform</ThemedText>
            <TextInput
              style={reportMisinfo.input}
              placeholder="e.g., Facebook, X, website URL"
              placeholderTextColor={colors.muted}
              value={source}
              onChangeText={setSource}
            />
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        {/* Q3 — Details text */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.questionRow}>
            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>3</ThemedText>
            </ThemedView>
            <ThemedText style={styles.question}>Tell us the details about the misinformation</ThemedText>
          </ThemedView>
          <TextInput
            style={styles.textArea}
            placeholder="Provide details of the misinformation..."
            placeholderTextColor={colors.muted}
            multiline
            textAlignVertical="top"
            value={details}
            onChangeText={setDetails}
          />
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        {/* Q4 — Attach evidence */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.questionRow}>
            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>4</ThemedText>
            </ThemedView>
            <ThemedText style={styles.question}>
              Attach Supporting Evidence{' '}
              <ThemedText style={styles.optional}>(Optional)</ThemedText>
            </ThemedText>
          </ThemedView>
          <ThemedText style={styles.subLabel}>Add photos, or screenshots.</ThemedText>

          <TouchableOpacity style={reportMisinfo.attachBtnCentered} activeOpacity={0.75}>
            <ThemedView style={[reportMisinfo.attachIconLarge, { backgroundColor: '#FFF4EC' }]}>
              <Ionicons name="image-outline" size={icon(25)} color="#FFB400" />
            </ThemedView>
            <ThemedText style={reportMisinfo.attachTxtLarge}>Upload Image</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        {/* Submit */}
        <TouchableOpacity style={styles.submitBtn} activeOpacity={0.85} onPress={handleSubmit}>
          <Ionicons name="send-outline" size={icon(18)} color="white" />
          <ThemedText style={styles.submitTxt}>Submit Report</ThemedText>
        </TouchableOpacity>

        <ContributeSuccess
          visible={successContribute}
          title="Report Submitted"
          message="Your report has been successfully received. Please allow up to (time) for it to be reviewed and verified before it is posted. Thank you for helping raise HIV awareness and support your community."
          onClose={() => {
            setSuccessContribute(false);
            router.back();
          }}
        />

        {/* Cancel */}
        <TouchableOpacity style={reportMisinfo.cancelBtn} activeOpacity={0.85} onPress={() => router.back()}>
          <ThemedText style={reportMisinfo.cancelTxt}>Cancel</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}