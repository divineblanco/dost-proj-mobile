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
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FieldErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  organization?: string;
};

export default function Register() {
  const r = useResponsive();
  const styles = useMemo(() => createAuthStyles(r), [r]);
  const router = useRouter();

  // ============================================================
  // STEP 1
  // ============================================================

  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  // ============================================================
  // STEP 2 - PERSONAL INFORMATION
  // ============================================================

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [organization, setOrg] = useState('');

  // ============================================================
  // VALIDATION
  // ============================================================

  const [errors, setErrors] = useState<FieldErrors>({});
  const [roleError, setRoleError] = useState('');

  // ============================================================
  // SUCCESS MODAL
  // ============================================================

  const [modalVisible, setModalVisible] = useState(false);

  // ============================================================
  // CHECK IF SELECTED ROLE IS ORGANIZATION
  // ============================================================

  const isOrganization =
    selectedRole !== null &&
    ['Researcher', 'NGO', 'Institution'].includes(
      ROLE_OPTIONS[selectedRole].label
    );


  // ============================================================
  // RESET FORM
  // ============================================================
  // This resets EVERYTHING:
  // - Role
  // - Step
  // - First Name
  // - Last Name
  // - Email
  // - Address
  // - Organization
  // - Validation errors
  // - Modal
  // ============================================================

  const resetForm = () => {
    // Reset step
    setStep(1);

    // Reset role
    setSelectedRole(null);
    setRoleError('');

    // Reset personal information
    setFirstName('');
    setLastName('');
    setEmail('');
    setAddress('');
    setOrg('');

    // Reset validation
    setErrors({});

    // Reset modal
    setModalVisible(false);
  };

  // ============================================================
  // VALIDATION HELPERS
  // ============================================================

  const validateName = (value: string) => {
    if (!value.trim()) {
      return 'This field is required.';
    }

    if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(value.trim())) {
      return 'Please enter letters only.';
    }

    return '';
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return 'Email address is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(value.trim())) {
      return 'Please enter a valid email address.';
    }

    return '';
  };

  const validateRequired = (
    value: string,
    fieldName: string
  ) => {
    if (!value.trim()) {
      return `${fieldName} is required.`;
    }

    return '';
  };

  // ============================================================
  // VALIDATE INDIVIDUAL FIELD
  // ============================================================

  const validateField = (
    field: keyof FieldErrors,
    value: string
  ) => {
    let error = '';

    switch (field) {
      case 'firstName':
        error = validateName(value);
        break;

      case 'lastName':
        error = validateName(value);
        break;

      case 'email':
        error = validateEmail(value);
        break;

      case 'address':
        error = validateRequired(value, 'Address');
        break;

      case 'organization':
        if (isOrganization) {
          error = validateRequired(value, 'Organization');
        }
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error || undefined,
    }));

    return error;
  };

  // ============================================================
  // STEP 1 VALIDATION
  // ============================================================

  const handleNext = () => {
    if (selectedRole === null) {
      setRoleError('Please select a role to continue.');
      return;
    }

    setRoleError('');
    setStep(2);
  };

  // ============================================================
  // BACK BUTTON
  // ============================================================
  // Instead of only going back to Step 1, this completely
  // resets the registration form.
  // ============================================================

  const handleBackToRole = () => {
    resetForm();
  };

  // ============================================================
  // STEP 2 VALIDATION
  // ============================================================

  const validateForm = () => {
    const newErrors: FieldErrors = {};

    // First Name
    const firstNameError = validateName(firstName);

    if (firstNameError) {
      newErrors.firstName = firstNameError;
    }

    // Last Name
    const lastNameError = validateName(lastName);

    if (lastNameError) {
      newErrors.lastName = lastNameError;
    }

    // Email
    const emailError = validateEmail(email);

    if (emailError) {
      newErrors.email = emailError;
    }

    // Address
    const addressError = validateRequired(
      address,
      'Address'
    );

    if (addressError) {
      newErrors.address = addressError;
    }

    // Organization
    if (isOrganization && !organization.trim()) {
      newErrors.organization =
        'Organization is required.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ============================================================
  // REGISTER
  // ============================================================

  const handleRegister = () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setModalVisible(true);
  };

  // ============================================================
  // AFTER SUCCESSFUL REGISTRATION
  // ============================================================

  const registerPress = () => {
    // Close modal
    setModalVisible(false);

    // Reset the entire registration form
    resetForm();

    // Navigate to Login
    setTimeout(() => {
      router.replace('/auth/login');
    }, 100);
  };

  // ============================================================
  // SIGN IN
  // ============================================================

  const handleSignIn = () => {
    // Reset registration data before leaving
    resetForm();

    router.replace('/auth/login');
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* ======================================================
              STEP INDICATOR
          ====================================================== */}

          {step === 1 && (
            <ThemedText style={styles.stepTxt}>
              STEP 1: Select a Role
            </ThemedText>
          )}

          {step === 2 && (
            <ThemedText style={styles.stepTxt}>
              STEP 2: Personal Information
            </ThemedText>
          )}

          <ThemedView style={styles.cardReg}>

            {/* ====================================================
                STEP 1: SELECT ROLE
            ==================================================== */}

            {step === 1 && (
              <>
                <ThemedText style={styles.default}>
                  Select a role to continue with your registration.
                </ThemedText>

                <ThemedView>
                  <SelectRole
                    selected={selectedRole}
                    onSelect={(index) => {
                      setSelectedRole(index);
                      setRoleError('');
                    }}
                  />

                  {/* Role validation error */}
                  {roleError ? (
                    <ThemedText
                      style={styles.validationError}
                    >
                      {roleError}
                    </ThemedText>
                  ) : null}
                </ThemedView>

                {/* NEXT BUTTON */}
                <ThemedView style={styles.submitBtn}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      selectedRole === null &&
                        styles.btnDisabled,
                    ]}
                    disabled={selectedRole === null}
                    onPress={handleNext}
                    activeOpacity={0.85}
                  >
                    <ThemedText type="buttonCaption">
                      NEXT
                    </ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              </>
            )}

            {/* ====================================================
                STEP 2: PERSONAL INFORMATION
            ==================================================== */}

            {step === 2 && (
              <>
                {/* ==================================================
                    BACK BUTTON
                ================================================== */}

                <ThemedView style={styles.headerBck}>
                  <TouchableOpacity
                    style={styles.backBtn}
                    onPress={handleBackToRole}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={icon(16)}
                      color="#35408E"
                    />
                  </TouchableOpacity>

                  <ThemedText style={styles.default}>
                    Fill in your details to complete registration.
                  </ThemedText>
                </ThemedView>

                {/* ==================================================
                    SELECTED ROLE
                ================================================== */}

                {selectedRole !== null && (
                  <ThemedView style={styles.roleBadge}>
                    <Ionicons
                      name="person-circle-outline"
                      size={icon(14)}
                      color="#35408E"
                    />

                    <ThemedText style={styles.roleBadgeTxt}>
                      Role:{' '}
                      {ROLE_OPTIONS[selectedRole].label}
                    </ThemedText>
                  </ThemedView>
                )}

                {/* ==================================================
                    FIELDS
                ================================================== */}

                <ThemedView style={styles.fields}>

                  {/* =================================================
                      FIRST NAME
                  ================================================= */}

                  <ThemedView style={styles.fieldGroup}>
                    <ThemedText style={styles.fieldLabel}>
                      First Name
                      <ThemedText style={styles.required}>
                        {' '}*
                      </ThemedText>
                    </ThemedText>

                    <View
                      style={[
                        styles.inputRow,
                        firstName.length > 0 &&
                          styles.inputFilled,
                        errors.firstName &&
                          styles.inputError,
                      ]}
                    >
                      <Ionicons
                        name="person-outline"
                        size={icon(15)}
                        color={
                          errors.firstName
                            ? '#E53935'
                            : firstName.length > 0
                            ? '#35408E'
                            : '#9BA8C0'
                        }
                      />

                      <TextInput
                        style={styles.inputReg}
                        placeholder="Enter first name"
                        placeholderTextColor="#9BA8C0"
                        value={firstName}
                        onChangeText={(value) => {
                          setFirstName(value);

                          if (errors.firstName) {
                            validateField(
                              'firstName',
                              value
                            );
                          }
                        }}
                        onBlur={() =>
                          validateField(
                            'firstName',
                            firstName
                          )
                        }
                        autoCapitalize="words"
                        autoCorrect={false}
                      />
                    </View>

                    {errors.firstName && (
                      <ThemedText
                        style={styles.validationError}
                      >
                        {errors.firstName}
                      </ThemedText>
                    )}
                  </ThemedView>

                  {/* =================================================
                      LAST NAME
                  ================================================= */}

                  <ThemedView style={styles.fieldGroup}>
                    <ThemedText style={styles.fieldLabel}>
                      Last Name
                      <ThemedText style={styles.required}>
                        {' '}*
                      </ThemedText>
                    </ThemedText>

                    <View
                      style={[
                        styles.inputRow,
                        lastName.length > 0 &&
                          styles.inputFilled,
                        errors.lastName &&
                          styles.inputError,
                      ]}
                    >
                      <Ionicons
                        name="person-outline"
                        size={icon(15)}
                        color={
                          errors.lastName
                            ? '#E53935'
                            : lastName.length > 0
                            ? '#35408E'
                            : '#9BA8C0'
                        }
                      />

                      <TextInput
                        style={styles.inputReg}
                        placeholder="Enter last name"
                        placeholderTextColor="#9BA8C0"
                        value={lastName}
                        onChangeText={(value) => {
                          setLastName(value);

                          if (errors.lastName) {
                            validateField(
                              'lastName',
                              value
                            );
                          }
                        }}
                        onBlur={() =>
                          validateField(
                            'lastName',
                            lastName
                          )
                        }
                        autoCapitalize="words"
                        autoCorrect={false}
                      />
                    </View>

                    {errors.lastName && (
                      <ThemedText
                        style={styles.validationError}
                      >
                        {errors.lastName}
                      </ThemedText>
                    )}
                  </ThemedView>

                  {/* =================================================
                      EMAIL
                  ================================================= */}

                  <ThemedView style={styles.fieldGroup}>
                    <ThemedText style={styles.fieldLabel}>
                      Email Address
                      <ThemedText style={styles.required}>
                        {' '}*
                      </ThemedText>
                    </ThemedText>

                    <View
                      style={[
                        styles.inputRow,
                        email.length > 0 &&
                          styles.inputFilled,
                        errors.email &&
                          styles.inputError,
                      ]}
                    >
                      <Ionicons
                        name="mail-outline"
                        size={icon(15)}
                        color={
                          errors.email
                            ? '#E53935'
                            : email.length > 0
                            ? '#35408E'
                            : '#9BA8C0'
                        }
                      />

                      <TextInput
                        style={styles.inputReg}
                        placeholder="Enter email address"
                        placeholderTextColor="#9BA8C0"
                        value={email}
                        onChangeText={(value) => {
                          setEmail(value);

                          if (errors.email) {
                            validateField(
                              'email',
                              value
                            );
                          }
                        }}
                        onBlur={() =>
                          validateField(
                            'email',
                            email
                          )
                        }
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>

                    {errors.email && (
                      <ThemedText
                        style={styles.validationError}
                      >
                        {errors.email}
                      </ThemedText>
                    )}
                  </ThemedView>

                  {/* =================================================
                      ADDRESS
                  ================================================= */}

                  <ThemedView style={styles.fieldGroup}>
                    <ThemedText style={styles.fieldLabel}>
                      Address
                      <ThemedText style={styles.required}>
                        {' '}*
                      </ThemedText>
                    </ThemedText>

                    <View
                      style={[
                        styles.inputRow,
                        address.length > 0 &&
                          styles.inputFilled,
                        errors.address &&
                          styles.inputError,
                      ]}
                    >
                      <Ionicons
                        name="location-outline"
                        size={icon(15)}
                        color={
                          errors.address
                            ? '#E53935'
                            : address.length > 0
                            ? '#35408E'
                            : '#9BA8C0'
                        }
                      />

                      <TextInput
                        style={styles.inputReg}
                        placeholder="i.e. House/Bldg No., Street Name, Barangay, City/Municipality, Province"
                        placeholderTextColor="#9BA8C0"
                        value={address}
                        onChangeText={(value) => {
                          setAddress(value);

                          if (errors.address) {
                            validateField(
                              'address',
                              value
                            );
                          }
                        }}
                        onBlur={() =>
                          validateField(
                            'address',
                            address
                          )
                        }
                        keyboardType="default"
                        autoCapitalize="words"
                        autoCorrect={false}
                        multiline
                      />
                    </View>

                    {errors.address && (
                      <ThemedText
                        style={styles.validationError}
                      >
                        {errors.address}
                      </ThemedText>
                    )}
                  </ThemedView>

                  {/* =================================================
                      ORGANIZATION
                  ================================================= */}

                  {isOrganization && (
                    <ThemedView style={styles.fieldGroup}>
                      <ThemedText style={styles.fieldLabel}>
                        Organization
                        <ThemedText style={styles.required}>
                          {' '}*
                        </ThemedText>
                      </ThemedText>

                      <View
                        style={[
                          errors.organization &&
                            styles.inputError,
                        ]}
                      >
                        <OrgDropdown
                          value={organization}
                          onChange={(value) => {
                            setOrg(value);

                            if (errors.organization) {
                              setErrors((prev) => ({
                                ...prev,
                                organization:
                                  undefined,
                              }));
                            }
                          }}
                        />
                      </View>

                      {errors.organization && (
                        <ThemedText
                          style={styles.validationError}
                        >
                          {errors.organization}
                        </ThemedText>
                      )}
                    </ThemedView>
                  )}

                </ThemedView>

                {/* ==================================================
                    REGISTER BUTTON
                ================================================== */}

                <ThemedView style={styles.submitBtn}>
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.85}
                    onPress={handleRegister}
                  >
                    <ThemedText type="buttonCaption">
                      REGISTER
                    </ThemedText>
                  </TouchableOpacity>
                </ThemedView>

                {/* ==================================================
                    SUCCESS MODAL
                ================================================== */}

                <LoginSuccess
                  title="Registered!"
                  message="You have successfully registered your account. Check your inbox to verify your email. Continue to sign in."
                  visible={modalVisible}
                  onSignIn={registerPress}
                />
              </>
            )}

            {/* ====================================================
                FOOTER
            ==================================================== */}

            <ThemedView style={styles.divider} />

            <ThemedView style={styles.accountQst}>
              <ThemedText style={styles.question}>
                Have an account?{' '}

                <ThemedText
                  style={styles.registerLink}
                  onPress={handleSignIn}
                >
                  Sign In
                </ThemedText>
              </ThemedText>
            </ThemedView>

          </ThemedView>

          {/* Web badge */}
          {Platform.OS === 'web' && <WebBadge />}

        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}