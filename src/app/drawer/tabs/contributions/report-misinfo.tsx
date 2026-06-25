import { MisinformationType } from '@/components/cards/misinfo-type';
import ContributeSuccess from '@/components/modals/contribute-success';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ReportMisinformation() {
  const [details, setDetails] = useState('');
  const [source, setSource] = useState('');

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
        <ThemedView style={styles.bg}>
            <ThemedText style={styles.label}>
                Source URL or Platform
            </ThemedText>
            <TextInput
                style={styles.input}
                placeholder='e.g., Facebook, X, website URL'
                placeholderTextColor="#9BA8C0"
                value={source}
                onChangeText={setSource}/>
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
          placeholderTextColor="#9BA8C0"
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
          <ThemedText style={styles.question}>Attach Supporting Evidence {" "}
            <ThemedText style={styles.optional}>(Optional)</ThemedText>
            </ThemedText>
        </ThemedView>
        <ThemedText style={styles.subLabel}>Add photos, or screenshots.</ThemedText>

        <TouchableOpacity style={styles.attachBtn} activeOpacity={0.75}>
            <ThemedView style={[styles.attachIcon, { backgroundColor: '#FFF4EC' }]}>
              <Ionicons name="image-outline" size={25} color="#FFB400" />
            </ThemedView>
            <ThemedText style={styles.attachTxt}>Upload Image</ThemedText>
        </TouchableOpacity>

      </ThemedView>

      <ThemedView style={styles.sectionDivider} />

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
        Submit Report
        </ThemedText>
    </TouchableOpacity>
      
        <ContributeSuccess
            visible={successContribute}
            title="Report Submitted"
            message="Your report has been sent successfully."
            onClose={() => {
            setSuccessContribute(false);
            router.back();
            }}
        />

    {/* Cancel */}
      <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.85}>
        <ThemedText style={styles.cancelTxt}>Cancel</ThemedText>
      </TouchableOpacity>
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
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#35408E',
    paddingVertical: 6,
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

  //Text Input

  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#35408E',
    marginBottom: 5,
    letterSpacing: 0.2,
  },

  input: {
    backgroundColor: "white", 
    padding: 10, 
    borderRadius: 5, 
    borderWidth: 1, 
    borderColor: "#E0E4F0"
  },

  bg: {
    backgroundColor: '#F0F3FA',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8EAF0',
    padding: 13,
    height: "auto",
    fontSize: 13,
    color: '#374151',
  },

  // Text area
  textArea: {
    backgroundColor: '#F0F3FA',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8EAF0',
    padding: 13,
    height: 140,
    fontSize: 13,
    color: '#374151',
    lineHeight: 20,
  },

  // Attach buttons
  attachBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    gap: 10,
    padding: 10,
    backgroundColor: '#F8F9FD',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8EAF0',
  },

  attachIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  attachTxt: {
    fontSize: 15,
    fontWeight: '600',
    color: '#35408E',
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

  // Cancel
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 4,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#35408E",
    shadowColor: '#35408E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  cancelTxt: {
    color: '#35408E',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});