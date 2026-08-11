import { LoginSuccess } from '@/components/modals/login-success';
import { ResendCode } from '@/components/modals/resend-code';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { createAuthStyles } from '@/styles/auth-styles';
import { useResponsive } from '@/styles/responsive';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, Platform, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OTP() {
  const r = useResponsive();
  const styles = useMemo(() => createAuthStyles(r), [r]);

  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [number, onChangeNumber] = useState('');
  const router = useRouter();

  const handlePress = () => {
    setModal2Visible(false);
    setTimeout(() => router.replace('/drawer/tabs/home'), 100);
  };

  const EmailChange = () => router.replace('/auth/login');

  const isTabletLandscape =
    r.isLandscape && (r.isAndroidTablet || r.isIPad || r.isIPadMini || r.isLargeIPad);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={[
          styles.authContainer,
          isTabletLandscape && styles.authContainerLandscape,
        ]}>

          {/* ── Left / Hero column ── */}
          <ThemedView style={[
            styles.heroSection,
            isTabletLandscape && styles.heroLandscape,
          ]}>
            <ThemedView style={styles.iconContainer}>
              <ThemedView style={styles.glow}>
                <Image style={styles.glow} source={require('@/assets/images/logo-glow.png')} />
              </ThemedView>
              <ThemedView style={styles.background} />
              <ThemedView style={styles.imageContainer}>
                <Image style={styles.image} source={require('@/assets/images/splash-icon.png')} />
              </ThemedView>
            </ThemedView>

            {/* Tagline — landscape only */}
            {isTabletLandscape && (
              <ThemedView style={styles.heroTagline}>
                <ThemedText style={styles.heroTaglineText}>
                  Transforming Digital Conversations into HIV Intelligence: Geospatial AI for Public Health Surveillance
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>

          {/* ── Vertical divider (landscape only) ── */}
          {isTabletLandscape && (
            <ThemedView style={styles.landscapeDivider} />
          )}

          {/* Portrait-only title inside the card area */}
            {!isTabletLandscape && (
              <ThemedText style={styles.otpTitle }>
                ONE-TIME PASSWORD
              </ThemedText>
            )}

          {/* ── Right / Card column ── */}
          <ThemedView style={[
            styles.card,
            isTabletLandscape && styles.cardLandscape,
          ]}>

            {/* Landscape title sits inside the card */}
            {isTabletLandscape && (
              <ThemedText style={[styles.otpTitle, { color: "#35408E" }]}>
                ONE-TIME PASSWORD
              </ThemedText>
            )}

            <ThemedText style={styles.default}>
              We have sent the one-time code to your email address. It expires in{' '}
              <ThemedText style={[styles.default, { fontWeight: 'bold' }]}>
                10 minutes.{' '}
              </ThemedText>
              <ThemedText style={styles.changeLink} onPress={EmailChange}>
                Change Email
              </ThemedText>
            </ThemedText>

            {/* OTP inputs */}
            <ThemedView style={styles.otpRow}>
              {[...Array(6)].map((_, i) => (
                <ThemedView key={i} style={styles.OTPContainer}>
                  <TextInput
                    style={styles.otpInput}
                    placeholderTextColor="#9C9898"
                    keyboardType="numeric"
                    maxLength={1}
                    value={i === 5 ? number : undefined}
                    onChangeText={i === 5 ? onChangeNumber : undefined}
                  />
                </ThemedView>
              ))}
            </ThemedView>

            {/* Timer + resend */}
            <ThemedView style={styles.otpInfoRow}>
              <ThemedText style={styles.resend}>
                EXPIRES IN:{' '}
                <ThemedText style={[styles.resend, { fontWeight: '400' }]}>
                  10:00
                </ThemedText>
              </ThemedText>
              <ThemedText style={styles.resend} onPress={() => setModal1Visible(true)}>
                RESEND CODE
              </ThemedText>
            </ThemedView>

            <ThemedView style={{ backgroundColor: 'transparent' }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModal2Visible(true)}
              >
                <ThemedText type="buttonCaption">SUBMIT</ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ResendCode
              visible={modal1Visible}
              onClose={() => setModal1Visible(false)}
            />
            <LoginSuccess
              visible={modal2Visible}
              onSignIn={handlePress}
            />

          </ThemedView>
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}