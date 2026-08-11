import { ROLE_OPTIONS, SelectRole } from '@/components/cards/select-role';
import { OrgDropdown } from '@/components/dropdown/organization-dropdown';
import { LoginSuccess } from '@/components/modals/login-success';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { createAuthStyles } from '@/styles/auth-styles';
import { icon, useResponsive } from '@/styles/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ── Main Register screen ──────────────────────────────────────────
export default function Register() {
  const r = useResponsive();
  const styles = useMemo(() => createAuthStyles(r), [r]);
  const router = useRouter();

  // Step 1
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  // Step 2
  const [firstName, setFirstName]   = useState('');
  const [lastName, setLastName]     = useState('');
  const [email, setEmail]           = useState('');
  const [address, setAddress]           = useState('');
  const [organization, setOrg]      = useState('');

  const isOrganization = selectedRole !== null && ROLE_OPTIONS[selectedRole].label === "Organization";

  const step2Valid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().length > 0 &&
    address.trim().length > 0 &&
    (!isOrganization || organization.length > 0);

  const [modalVisible, setModalVisible] = useState(false);
  const registerPress = () => {
    console.log("Register pressed");
    setModalVisible(false);
    setTimeout(() => {
    router.replace('/auth/login');
    }, 100);
  };

  const handleSignIn = () => router.replace('/auth/login');

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView >
          {step === 1 && (
          <ThemedText style={styles.stepTxt}>STEP 1: Select a Role</ThemedText>
        )}; 
        {step === 2 && (
        <ThemedText style={styles.stepTxt}>STEP 2: Personal Information</ThemedText>
        )}; 

        <ThemedView style={styles.cardReg}>
          {/* ── STEP 1 ── */}
          {step === 1 && (
            <>
              <ThemedText style={styles.default}>
                Select a role to continue with your registration.
              </ThemedText>

              {/* <ThemedView style={styles.titleContainer}>
                <ThemedText style={styles.stepTxt}>STEP 1</ThemedText>
                <ThemedText style={styles.instTxt}>Select a Role</ThemedText>
              </ThemedView> */}

              <SelectRole selected={selectedRole} onSelect={setSelectedRole} />

              <ThemedView style={styles.submitBtn}>
                <TouchableOpacity
                  style={[styles.button, selectedRole === null && styles.btnDisabled]}
                  disabled={selectedRole === null}
                  onPress={() => setStep(2)}
                  activeOpacity={0.85}
                >
                  <ThemedText type="buttonCaption">NEXT</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </>
          )}

          {/* ── STEP 2 ── */}
          {/* <ScrollView style={styles.step2Scroll}> */}
            {step === 2 && (
            <>
              {/* Back to step 1 */}
              <ThemedView style={styles.headerBck}>
                <TouchableOpacity
                style={styles.backBtn}
                onPress={() => setStep(1)}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={icon(16)} color="#35408E" />

              </TouchableOpacity>

              <ThemedText style={styles.default}>
                Fill in your details to complete registration.
              </ThemedText>

              </ThemedView>

              {/* <ThemedView style={styles.titleContainer}>
                <ThemedText style={styles.stepTxt}>STEP 2</ThemedText>
                <ThemedText style={styles.instTxt}>Personal Information</ThemedText>
              </ThemedView> */}

              {/* Role badge */}
              {selectedRole !== null && (
                <ThemedView style={styles.roleBadge}>
                  <Ionicons name="person-circle-outline" size={icon(14)} color="#35408E" />
                  <ThemedText style={styles.roleBadgeTxt}>
                    Role: {ROLE_OPTIONS[selectedRole].label}
                  </ThemedText>
                </ThemedView>
              )}

              {/* Fields */}
              <ThemedView style={styles.fields}>

                {/* First Name */}
                <ThemedView style={styles.fieldGroup}>
                  <ThemedText style={styles.fieldLabel}>First Name</ThemedText>
                  <View style={[styles.inputRow, firstName.length > 0 && styles.inputFilled]}>
                    <Ionicons name="person-outline" size={icon(15)} color={firstName.length > 0 ? "#35408E" : "#9BA8C0"} />
                    <TextInput
                      style={styles.inputReg}
                      placeholder="Enter first name"
                      placeholderTextColor="#9BA8C0"
                      value={firstName}
                      onChangeText={setFirstName}
                      autoCapitalize="words"
                    />
                  </View>
                </ThemedView>

                {/* Last Name */}
                <ThemedView style={styles.fieldGroup}>
                  <ThemedText style={styles.fieldLabel}>Last Name</ThemedText>
                  <View style={[styles.inputRow, lastName.length > 0 && styles.inputFilled]}>
                    <Ionicons name="person-outline" size={icon(15)} color={lastName.length > 0 ? "#35408E" : "#9BA8C0"} />
                    <TextInput
                      style={styles.inputReg}
                      placeholder="Enter last name"
                      placeholderTextColor="#9BA8C0"
                      value={lastName}
                      onChangeText={setLastName}
                      autoCapitalize="words"
                    />
                  </View>
                </ThemedView>

                {/* Email */}
                <ThemedView style={styles.fieldGroup}>
                  <ThemedText style={styles.fieldLabel}>Email Address</ThemedText>
                  <View style={[styles.inputRow, email.length > 0 && styles.inputFilled]}>
                    <Ionicons name="mail-outline" size={icon(15)} color={email.length > 0 ? "#35408E" : "#9BA8C0"} />
                    <TextInput
                      style={styles.inputReg}
                      placeholder="Enter email address"
                      placeholderTextColor="#9BA8C0"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </ThemedView>

                {/* Address */}
                <ThemedView style={styles.fieldGroup}>
                  <ThemedText style={styles.fieldLabel}>Address</ThemedText>
                  <View style={[styles.inputRow, address.length > 0 && styles.inputFilled]}>
                    <Ionicons name="location-outline" size={icon(15)} color={address.length > 0 ? "#35408E" : "#9BA8C0"} />
                    <TextInput
                      style={styles.inputReg}
                      placeholder="i.e. House/Bldg No., Street Name, Barangay, City/Municipality, Province"
                      placeholderTextColor="#9BA8C0"
                      value={address}
                      onChangeText={setAddress}
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </ThemedView>

                {/* Organization — only shown when role is "Organization" */}
                {isOrganization && (
                  <ThemedView style={styles.fieldGroup}>
                    <ThemedText style={styles.fieldLabel}>Organization</ThemedText>
                    <OrgDropdown value={organization} onChange={setOrg} />
                  </ThemedView>
                )}

              </ThemedView>

              {/* Submit */}
              <ThemedView style={styles.submitBtn}>
                <TouchableOpacity
                  style={[styles.button, !step2Valid && styles.btnDisabled]}
                  disabled={!step2Valid}
                  activeOpacity={0.85}
                  onPress={() => setModalVisible(true)}
                >
                  <ThemedText type="buttonCaption">REGISTER</ThemedText>
                </TouchableOpacity>
              </ThemedView>

              <LoginSuccess
                title='Registered!'
                message='You have successfully registered your account. Check your inbox to verify your email. Continue to sign in.'
                visible={modalVisible}
                onSignIn={registerPress}
              />
            </>
          )}

          {/* </ScrollView> */}

          {/* Footer — always visible */}
          <ThemedView style={styles.divider} />
          <ThemedView style={styles.accountQst}>
            <ThemedText style={styles.question}>
              Have an account?{" "}
              <ThemedText style={styles.registerLink} onPress={handleSignIn}>
                Sign In
              </ThemedText>
            </ThemedText>
          </ThemedView>

        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}