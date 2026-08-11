import { QuestionOne } from '@/components/cards/question-one';
import { QuestionTwo } from '@/components/cards/question-two';
import ContributeSuccess from '@/components/modals/contribute-success';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { colors } from '@/styles/contribute/contribute-colors';
import { addContributeStyles, sharedFormStyles } from '@/styles/contribute/contribute-form-styles';
import { icon, useResponsive } from '@/styles/responsive';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native';

const SENTIMENT_OPTIONS = [
  { label: 'Low', color: colors.success, bg: colors.successBg },
  { label: 'Medium', color: colors.warning, bg: colors.warningBg },
  { label: 'High', color: colors.danger, bg: colors.dangerBg },
];

export default function AddContribute() {
  const [experience, setExperience] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState<number | null>(null);

  const [successContribute, setSuccessContribute] = useState(false);

  const handleSubmit = () => {
    setSuccessContribute(true);
  };

  const r = useResponsive();
    
      const styles = useMemo(() => sharedFormStyles(r), [r]);
      const addContri = useMemo(() => addContributeStyles(r), [r]);

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={styles.formInner}>
        {/* Page header */}
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>Contribute</ThemedText>
          <ThemedText style={styles.desc}>
            Share your personal experiences, observations, and insights related to
            HIV discussions and resources in your community.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.headerDivider} />

        {/* Q1 */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.questionRow}>
            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>1</ThemedText>
            </ThemedView>
            <ThemedText style={styles.question}>What would you like to share?</ThemedText>
          </ThemedView>
          <QuestionOne />
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        {/* Q2 — Location placeholder */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.questionRow}>
            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>2</ThemedText>
            </ThemedView>
            <ThemedText style={styles.question}>Where did this happen?</ThemedText>
          </ThemedView>
          <ThemedView>
            <QuestionTwo />
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        {/* Q3 — Experience text */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.questionRow}>
            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>3</ThemedText>
            </ThemedView>
            <ThemedText style={styles.question}>Tell us about your experience</ThemedText>
          </ThemedView>
          <TextInput
            style={styles.textArea}
            placeholder="Describe what you observed or experienced regarding HIV awareness, stigma, misinformation, access to services, or community discussions."
            placeholderTextColor={colors.muted}
            multiline
            textAlignVertical="top"
            value={experience}
            onChangeText={setExperience}
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
          <ThemedText style={styles.subLabel}>Add photos, screenshots, or links.</ThemedText>

          <ThemedView style={addContri.attachRow}>
            <TouchableOpacity style={addContri.attachBtn} activeOpacity={0.75}>
              <ThemedView style={[addContri.attachIcon, { backgroundColor: '#FFF4EC' }]}>
                <Ionicons name="image-outline" size={icon(20)} color="#FFB400" />
              </ThemedView>
              <ThemedText style={addContri.attachTxt}>Upload Image</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={addContri.attachBtn} activeOpacity={0.75}>
              <ThemedView style={[addContri.attachIcon, { backgroundColor: '#EDFAF3' }]}>
                <Feather name="link" size={icon(17)} color={colors.success} />
              </ThemedView>
              <ThemedText style={addContri.attachTxt}>Upload Link</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.sectionDivider} />

        {/* Q5 — Sentiment */}
        {/* <ThemedView style={styles.section}>
          <ThemedView style={styles.questionRow}>
            <ThemedView style={styles.qNumber}>
              <ThemedText style={styles.qNumberText}>5</ThemedText>
            </ThemedView>
            <ThemedText style={styles.question}>Sentiment level?</ThemedText>
          </ThemedView>

          <ThemedView style={addContri.sentimentRow}>
            {SENTIMENT_OPTIONS.map((s, i) => {
              const isActive = selectedSentiment === i;
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    addContri.sentimentBtn,
                    { borderColor: isActive ? s.color : colors.border },
                    isActive && { backgroundColor: s.bg },
                  ]}
                  onPress={() => setSelectedSentiment(i)}
                  activeOpacity={0.8}
                >
                  <ThemedView style={[addContri.sentimentDot, { backgroundColor: s.color }]} />
                  <ThemedText style={[addContri.sentimentTxt, isActive && { color: s.color, fontWeight: '700' }]}>
                    {s.label}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </ThemedView>
        </ThemedView> */}

        {/* <ThemedView style={styles.sectionDivider} /> */}

        {/* Privacy notice */}
        <ThemedView style={addContri.privacyCard}>
          <ThemedView style={addContri.privacyHeader}>
            <ThemedView style={addContri.privacyIconBg}>
              <MaterialIcons name="verified-user" size={icon(20)} color={colors.primary} />
            </ThemedView>
            <ThemedText style={addContri.privacyTitle}>Your Privacy Matters</ThemedText>
          </ThemedView>
          <ThemedText style={addContri.privacyBody}>
            Your submission will be anonymized and analyzed by AdvocAid PH's AI system to identify
            trends, stigma, and resource needs while protecting your personal privacy.
          </ThemedText>
          <TouchableOpacity activeOpacity={0.7}>
            <ThemedText style={addContri.privacyLink}>Learn more about our privacy policy →</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Submit */}
        <TouchableOpacity style={styles.submitBtn} activeOpacity={0.85} onPress={handleSubmit}>
          <Ionicons name="send-outline" size={icon(18)} color="white" />
          <ThemedText style={styles.submitTxt}>Submit Contribution</ThemedText>
        </TouchableOpacity>

        <ContributeSuccess
          visible={successContribute}
          onClose={() => {
            setSuccessContribute(false);
            router.back();
          }}
        />
      </ThemedView>
    </ScrollView>
  );
}