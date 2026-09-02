import { createAuthStyles } from '@/styles/auth-styles';
import { useResponsive } from '@/styles/responsive';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Platform, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//components
import { AnimatedIcon } from '@/components/animated-icon';
import TermsAndConditions from '@/components/modals/terms-and-conditions';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';

//lib
import useFormHook from '@/lib/hooks/useFormHook';
import useFormMutation from '@/lib/hooks/useFormMutation';
import { UserLoginFields } from '@/lib/types/user.type';
import { UserSchema } from '@/lib/validations/user.validation';

export default function Login() {
  const r = useResponsive();
  const styles = useMemo(() => createAuthStyles(r), [r]);

  const [isChecked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  const {
    errors,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
  } = useFormHook({
    schema: UserSchema,
    defaultValues: {
      email: '',
    },
  });

  const mutation = useFormMutation<UserLoginFields>({
    url: 'auth/login',
    key: ['Login'],
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const email = watch('email');
  const emailError = errors.email?.message;

  const handlePress = handleSubmit((data) => {
    if (!isChecked) {
      return;
    }

    mutation.mutate(data, {
      onSuccess: () => {

        reset({
          email: ""
        })

        router.push({
          pathname: "/auth/otp",
          params: {
            email
          }
        })
      }
    });
  });

  const registerPress = () => {
    router.push('/auth/register');
  };

  const isTabletLandscape =
    r.isLandscape &&
    (r.isAndroidTablet ||
      r.isIPad ||
      r.isIPadMini ||
      r.isLargeIPad);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView
          style={[
            styles.authContainer,
            isTabletLandscape && styles.authContainerLandscape,
          ]}
        >
          <ThemedView
            style={[
              styles.heroSection,
              isTabletLandscape && styles.heroLandscape,
            ]}
          >
            <AnimatedIcon />

            {isTabletLandscape && (
              <ThemedView style={styles.heroTagline}>
                <ThemedText style={styles.heroTaglineText}>
                  Transforming Digital Conversations into HIV Intelligence:
                  Geospatial AI for Public Health Surveillance
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>

          {isTabletLandscape && (
            <ThemedView style={styles.landscapeDivider} />
          )}

          <ThemedView
            style={[
              styles.card,
              isTabletLandscape && styles.cardLandscape,
            ]}
          >
            <ThemedText style={styles.default}>
              We'll send a one-time 6-digit code to your email address.{' '}
              <ThemedText
                style={[
                  styles.default,
                  {
                    fontWeight: 'bold',
                  },
                ]}
              >
                NO PASSWORD REQUIRED.
              </ThemedText>
            </ThemedText>

            <ThemedText style={styles.emailTitle}>
              Email Address
            </ThemedText>

            <ThemedView style={styles.emailContainer}>
            <TextInput
                style={styles.input}
                placeholder="juandelacruz@national-u.edu.ph"
                placeholderTextColor="#9C9898"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={(value) => {
                  setValue("email", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }}
                onBlur={() => {
                  trigger("email");
                }}
                editable={!mutation.isPending}
              />
            </ThemedView>

            {emailError && (
              <ThemedText
                style={{
                  marginTop: 6,
                  color: '#E20000',
                }}
              >
                {emailError}
              </ThemedText>
            )}

            <ThemedView
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  (!isChecked ||
                    mutation.isPending) && {
                    opacity: 0.5,
                  },
                ]}
                onPress={handlePress}
                disabled={
                  !isChecked ||
                  mutation.isPending
                }
              >
                <ThemedText type="buttonCaption">
                  {mutation.isPending
                    ? 'SENDING...'
                    : 'SEND VERIFICATION CODE'}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.terms}>
              <Checkbox
                value={isChecked}
                disabled={false}
                onValueChange={setChecked}
                color={isChecked ? '#E20000' : undefined}
                style={styles.checkbox}
              />

              <ThemedText style={styles.termsText}>
                I hereby acknowledge that I have read, understood,
                and accepted the{' '}
                <ThemedText
                  style={styles.termsLink}
                  onPress={() => setModalVisible(true)}
                >
                  Terms and Conditions.
                </ThemedText>
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.divider} />

            <ThemedView style={styles.accountQst}>
              <ThemedText style={styles.question}>
                Don't have an account?{' '}
                <ThemedText
                  style={styles.registerLink}
                  onPress={registerPress}
                >
                  Register Here
                </ThemedText>
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <TermsAndConditions
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAccept={() => setChecked(true)}
        />

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}