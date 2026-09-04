import { createAuthStyles } from '@/styles/auth-styles';
import { useResponsive, verticalScale } from '@/styles/responsive';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  Platform,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


//components
import { LoginSuccess } from '@/components/modals/login-success';
import { ResendCode } from '@/components/modals/resend-code';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';

//lib & hooks
import { useAuth } from '@/lib/auth/AuthProvider';
import useFormMutation from '@/lib/hooks/useFormMutation';
import { VerifyOTPFormFields } from '@/lib/types/auth.type';

export default function OTP() {
  const r = useResponsive();
  const styles = useMemo(() => createAuthStyles(r), [r]);

  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [otp, setOtp] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const [resendTimer, setResendTimer] = useState(300);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const minutes = Math.floor(resendTimer / 60);
  const seconds = resendTimer % 60;

  const formattedTimer = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const [otpError, setOtpError] = useState('');

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const router = useRouter();

  const { email } = useLocalSearchParams<{
    email?: string;
  }>();

  const { setSession } = useAuth();

  const verifyOtpMutation = useFormMutation<VerifyOTPFormFields>({
      key: ["Verification", email],
      method: "POST",
      url: `auth/verification?email=${email}`,
      params: {}
  });

  // const handleOtpChange = (
  //   value: string,
  //   index: number
  // ) => {
  //   const numericValue = value.replace(/\D/g, '');

  //   if (!numericValue) {
  //     const updatedOtp = [...otp];
  //     updatedOtp[index] = '';
  //     setOtp(updatedOtp);
  //     return;
  //   }

  //   const updatedOtp = [...otp];
  //   updatedOtp[index] = numericValue.charAt(0);
  //   setOtp(updatedOtp);

  //   if (
  //     index < 5 &&
  //     numericValue.length > 0
  //   ) {
  //     inputRefs.current[index + 1]?.focus();
  //   }
  // };

  const handleOtpChange = (value: string, index: number) => {
  if (otpError) setOtpError('');

  const numericValue = value.replace(/\D/g, '');

  if (!numericValue) {
    const updatedOtp = [...otp];
    updatedOtp[index] = '';
    setOtp(updatedOtp);
    return;
  }

  const updatedOtp = [...otp];
  updatedOtp[index] = numericValue.charAt(0);
  setOtp(updatedOtp);

  if (index < 5 && numericValue.length > 0) {
    inputRefs.current[index + 1]?.focus();
  } else if (index === 5) {
    inputRefs.current[index]?.blur(); // ← last digit entered, drop focus
  }
};

  const handleKeyPress = (
    key: string,
    index: number
  ) => {
    if (
      key === 'Backspace' &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePress = () => {
  const code = otp.join('');

  // Clear previous error
  setOtpError('');

  if (!email || code.length !== 6) {
    setOtpError('Please enter the complete 6-digit code.');
    return;
  }

  verifyOtpMutation.mutate(
    {
      email,
      code,
    },
    {
      onSuccess: async (response: any) => {
  console.log("[OTP] API response:", response);

  const res = response.data;

  console.log("[OTP] Response data:", res);
  console.log("[OTP] Token:", res.token);
  console.log("[OTP] User:", res.user);

  const session = {
    token: res.token,
    data: {
      user_id: res.user.user_id,
      email: res.user.email,
      Profile: {
        first_name: res.user.Profile.first_name,
        last_name: res.user.Profile.last_name,
      },
      Role: {
        name: res.user.role.name,
        permission: res.user.role.rolePermissions.map(
          (rp: any) => rp.Permission.name
        ),
      },
      Organization: {
        name: res.user.organization.name,
      },
    },
  };

  console.log("[OTP] Session before saving:", session);

  await setSession(session);

  console.log("[OTP] Session saved successfully");

  setModal2Visible(true);

  console.log("[OTP] Success modal opened");
},



      onError: (error) => {
        console.log(
          'Error verifying OTP:',
          error.response?.data || error.message
        );

        setOtpError('The verification code is incorrect.');
      },
    }
  );
};


const handleSuccessfulLogin = () => {
  console.log("[OTP] Sign In button tapped");

  setModal2Visible(false);

  setTimeout(() => {
    console.log("[OTP] Navigating to home...");

    router.replace("/drawer/tabs/home");
  }, 100);
};



  const handleResend = async () => {
    if (!canResend) {
      return;
    }

    try {
      // Your resend API/function here

      setResendTimer(300);
      setCanResend(false);
    } catch (error) {
      console.log("Resend error:", error);
    }
  };

  const emailChange = () => {
    router.replace('/auth/login');
  };

  const isTabletLandscape =
    r.isLandscape &&
    (r.isAndroidTablet ||
      r.isIPad ||
      r.isIPadMini ||
      r.isLargeIPad);

  const isComplete = otp.every(
    (digit) => digit.length === 1
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView
          style={[
            styles.authContainer,
            isTabletLandscape &&
              styles.authContainerLandscape,
          ]}
        >
          <ThemedView
            style={[
              styles.heroSection,
              isTabletLandscape &&
                styles.heroLandscape,
            ]}
          >
            <ThemedView style={styles.iconContainer}>
              <ThemedView style={styles.glow}>
                <Image
                  style={styles.glow}
                  source={require('@/assets/images/logo-glow.png')}
                />
              </ThemedView>

              <ThemedView
                style={styles.background}
              />

              <ThemedView
                style={styles.imageContainer}
              >
                <Image
                  style={styles.image}
                  source={require('@/assets/images/splash-icon.png')}
                />
              </ThemedView>
            </ThemedView>

            {isTabletLandscape && (
              <ThemedView
                style={styles.heroTagline}
              >
                <ThemedText
                  style={styles.heroTaglineText}
                >
                  Transforming Digital Conversations
                  into HIV Intelligence: Geospatial AI
                  for Public Health Surveillance
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>

          {isTabletLandscape && (
            <ThemedView
              style={styles.landscapeDivider}
            />
          )}

          {!isTabletLandscape && (
            <ThemedText style={styles.otpTitle}>
              ONE-TIME PASSWORD
            </ThemedText>
          )}

          <ThemedView
            style={[
              styles.card,
              isTabletLandscape &&
                styles.cardLandscape,
            ]}
          >
            {isTabletLandscape && (
              <ThemedText
                style={[
                  styles.otpTitle,
                  {
                    color: '#35408E',
                  },
                ]}
              >
                ONE-TIME PASSWORD
              </ThemedText>
            )}

            <ThemedText style={styles.default}>
              We have sent the one-time code to your
              email address. It expires in{' '}
              <ThemedText
                style={[
                  styles.default,
                  {
                    fontWeight: 'bold',
                  },
                ]}
              >
                5 minutes.
              </ThemedText>{' '}
              <ThemedText
                style={styles.changeLink}
                onPress={emailChange}
              >
                Change Email
              </ThemedText>
            </ThemedText>

            <ThemedView style={styles.otpRow}>
              {otp.map((digit, index) => (
                <ThemedView
                  key={index}
                  style={styles.OTPContainer}
                >
                  <TextInput
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(value) =>
                      handleOtpChange(value, index)
                    }
                    onKeyPress={({ nativeEvent }) =>
                      handleKeyPress(nativeEvent.key, index)
                    }
                    editable={!verifyOtpMutation.isPending}
                  />
                </ThemedView>
              ))}
            </ThemedView>

            {otpError && (
              <ThemedText
                style={{
                  marginTop: verticalScale(1),
                  color: '#E20000',
                  textAlign: 'center',
                }}
              >
                {otpError}
              </ThemedText>
            )}


            <ThemedView style={styles.otpInfoRow}>
              <ThemedText style={styles.resend}>
                EXPIRES IN:{' '}
                <ThemedText
                  style={[
                    styles.resend,
                    {
                      fontWeight: '400',
                    },
                  ]}
                >
                  {formattedTimer}
                </ThemedText>
              </ThemedText>

              <TouchableOpacity
                disabled={!canResend}
                onPress={() => {
                  handleResend();
                  setModal1Visible(true);
                }}
                activeOpacity={0.7}
              >
                <ThemedText
                  style={[
                    styles.resend,
                    {
                      opacity: canResend ? 1 : 0.4,
                    },
                  ]}
                >
                  RESEND CODE
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ThemedView
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  (!isComplete ||
                    verifyOtpMutation.isPending) && {
                    opacity: 0.5,
                  },
                ]}
                onPress={handlePress}
                disabled={
                  !isComplete ||
                  verifyOtpMutation.isPending
                }
              >
                <ThemedText type="buttonCaption">
                  {verifyOtpMutation.isPending
                    ? 'VERIFYING...'
                    : 'SUBMIT'}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ResendCode
              visible={modal1Visible}
              onClose={() =>
                setModal1Visible(false)
              }
            />

            <LoginSuccess
              visible={modal2Visible}
              onSignIn={
                handleSuccessfulLogin
              }
            />
          </ThemedView>
        </ThemedView>

        {Platform.OS === 'web' && (
          <WebBadge />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}