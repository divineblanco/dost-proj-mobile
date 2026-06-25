import { QuestionOne } from '@/components/cards/question-one';
import { QuestionTwo } from '@/components/cards/question-two';
import ContributeSuccess from '@/components/modals/contribute-success';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const SENTIMENT_OPTIONS = [
  { label: 'Low',    color: '#1E7C10', bg: '#EAFBE7' },
  { label: 'Medium', color: '#B36B00', bg: '#FFF4E0' },
  { label: 'High',   color: '#C62828', bg: '#FFF0F0' },
];

export default function AddContribute() {
  const [experience, setExperience] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState<number | null>(null);

  const [successContribute, setSuccessContribute] = useState(false);

  const handleSubmit = () => {
  setSuccessContribute(true);
  };

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
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
            <QuestionTwo/>
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
          placeholderTextColor="#9BA8C0"
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
          <ThemedText style={styles.question}>Attach Supporting Evidence {" "}
            <ThemedText style={styles.optional}>(Optional)</ThemedText>
            </ThemedText>
        </ThemedView>
        <ThemedText style={styles.subLabel}>Add photos, screenshots, or links.</ThemedText>

        <ThemedView style={styles.attachRow}>
          <TouchableOpacity style={styles.attachBtn} activeOpacity={0.75}>
            <ThemedView style={[styles.attachIcon, { backgroundColor: '#FFF4EC' }]}>
              <Ionicons name="image-outline" size={20} color="#FFB400" />
            </ThemedView>
            <ThemedText style={styles.attachTxt}>Upload Image</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.attachBtn} activeOpacity={0.75}>
            <ThemedView style={[styles.attachIcon, { backgroundColor: '#EDFAF3' }]}>
              <Feather name="link" size={17} color="#1E7C10" />
            </ThemedView>
            <ThemedText style={styles.attachTxt}>Attach Link</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.sectionDivider} />

      {/* Q5 — Sentiment */}
      <ThemedView style={styles.section}>
        <ThemedView style={styles.questionRow}>
          <ThemedView style={styles.qNumber}>
            <ThemedText style={styles.qNumberText}>5</ThemedText>
          </ThemedView>
          <ThemedText style={styles.question}>Sentiment level?</ThemedText>
        </ThemedView>

        <ThemedView style={styles.sentimentRow}>
          {SENTIMENT_OPTIONS.map((s, i) => {
            const isActive = selectedSentiment === i;
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.sentimentBtn,
                  { borderColor: isActive ? s.color : '#E8EAF0' },
                  isActive && { backgroundColor: s.bg },
                ]}
                onPress={() => setSelectedSentiment(i)}
                activeOpacity={0.8}
              >
                <ThemedView style={[styles.sentimentDot, { backgroundColor: s.color }]} />
                <ThemedText style={[styles.sentimentTxt, isActive && { color: s.color, fontWeight: '700' }]}>
                  {s.label}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.sectionDivider} />

      {/* Privacy notice */}
      <ThemedView style={styles.privacyCard}>
        <ThemedView style={styles.privacyHeader}>
          <ThemedView style={styles.privacyIconBg}>
            <MaterialIcons name="verified-user" size={20} color="#35408E" />
          </ThemedView>
          <ThemedText style={styles.privacyTitle}>Your Privacy Matters</ThemedText>
        </ThemedView>
        <ThemedText style={styles.privacyBody}>
          Your submission will be anonymized and analyzed by AdvocAid PH's AI system to identify
          trends, stigma, and resource needs while protecting your personal privacy.
        </ThemedText>
        <TouchableOpacity activeOpacity={0.7}>
          <ThemedText style={styles.privacyLink}>Learn more about our privacy policy →</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Submit */}
      <TouchableOpacity
        style={styles.submitBtn}
        activeOpacity={0.85}
        onPress={handleSubmit}
      >
        <Ionicons
          name="send-outline"
          size={18}
          color="white"
        />

        <ThemedText style={styles.submitTxt}>
          Submit Contribution
        </ThemedText>
      </TouchableOpacity>

      <ContributeSuccess
        visible={successContribute}
        onClose={() => {
          setSuccessContribute(false);
          router.back();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },

  scrollContent: {
    paddingBottom: 100,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#35408E',
    paddingVertical: 6,
  },

  desc: {
    fontSize: 12,
    color: '#35408E',
    lineHeight: 17,
    textAlign: "justify"
  },

  headerDivider: {
    height: 3,
    backgroundColor: '#35408E',
    marginHorizontal: 20,
    borderRadius: 2,
    marginBottom: 16,
  },

  // Section
  section: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 12,
  },

  sectionDivider: {
    height: 8,
    backgroundColor: '#F0F2F8',
  },

  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'transparent',
  },

  qNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#35408E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  question: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1F5E',
    flex: 1,
  },

  optional: {
    fontSize: 11,
    color: '#9BA8C0',
    fontWeight: '400',
  },

  subLabel: {
    fontSize: 12,
    color: '#9BA8C0',
    marginTop: -4,
  },

  // Text area
  textArea: {
    backgroundColor: '#F0F3FA',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8EAF0',
    padding: 14,
    height: 140,
    fontSize: 13,
    color: '#374151',
    lineHeight: 20,
  },

  // Attach buttons
  attachRow: {
    flexDirection: 'row',
    gap: 10,
  },

  attachBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    backgroundColor: '#F8F9FD',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8EAF0',
  },

  attachIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  attachTxt: {
    fontSize: 13,
    fontWeight: '600',
    color: '#35408E',
  },

  // Sentiment
  sentimentRow: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'transparent',
  },

  sentimentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8EAF0',
    backgroundColor: '#FFFFFF',
  },

  sentimentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  sentimentTxt: {
    fontSize: 13,
    fontWeight: '500',
    color: '#35408E',
  },

  // Privacy card
  privacyCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#EEF0FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5E8',
    gap: 8,
  },

  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'transparent',
  },

  privacyIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1A1F5E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  privacyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#35408E',
  },

  privacyBody: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 18,
  },

  privacyLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#35408E',
    textDecorationLine: 'underline',
  },

  // Submit
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#35408E',
    marginHorizontal: 16,
    marginTop: 4,
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: '#35408E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  submitTxt: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});