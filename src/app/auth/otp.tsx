// import { createAuthStyles } from "@/styles/auth-styles";
// import { useResponsive, verticalScale } from "@/styles/responsive";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { Image, Platform, TextInput, TouchableOpacity } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { LoginSuccess } from "@/components/modals/login-success";
// import { ResendCode } from "@/components/modals/resend-code";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { WebBadge } from "@/components/web-badge";
// import { AuthSession, useAuth } from "@/lib/auth/AuthProvider";
// import useFormMutation from "@/lib/hooks/useFormMutation";
// import { VerifyOTPFormFields } from "@/lib/types/auth.type";

// export default function OTP() {
//   const r = useResponsive();
//   const styles = useMemo(() => createAuthStyles(r), [r]);
//   const router = useRouter();

//   const [modal1Visible, setModal1Visible] = useState(false);
//   const [modal2Visible, setModal2Visible] = useState(false);
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [resendTimer, setResendTimer] = useState(300);
//   const [canResend, setCanResend] = useState(false);
//   const [otpError, setOtpError] = useState("");

//   const inputRefs = useRef<Array<TextInput | null>>([]);
//   const { email } = useLocalSearchParams<{ email?: string }>();
//   const { setSession } = useAuth();

//   useEffect(() => {
//     if (resendTimer <= 0) {
//       setCanResend(true);
//       return;
//     }

//     const timer = setInterval(() => {
//       setResendTimer((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [resendTimer]);

//   const verifyOtpMutation = useFormMutation<VerifyOTPFormFields>({
//     key: ["Verification", email],
//     method: "POST",
//     url: `auth/verification?email=${email}`,
//     params: {},
//   });

//   const loginActivityMutation = useFormMutation({
//     key: ["ActivityLog", "Login"],
//     method: "POST",
//     url: "maintenance/activity-logs",
//     params: {},
//   });

//   const handleOtpChange = (value: string, index: number) => {
//     if (otpError) setOtpError("");

//     const numericValue = value.replace(/\D/g, "");
//     const updatedOtp = [...otp];

//     if (!numericValue) {
//       updatedOtp[index] = "";
//       setOtp(updatedOtp);
//       return;
//     }

//     updatedOtp[index] = numericValue.charAt(0);
//     setOtp(updatedOtp);

//     if (index < 5) inputRefs.current[index + 1]?.focus();
//     else inputRefs.current[index]?.blur();
//   };

//   const handleKeyPress = (key: string, index: number) => {
//     if (key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handlePress = () => {
//     const code = otp.join("");
//     setOtpError("");

//     if (!email || code.length !== 6) {
//       setOtpError("Please enter the complete 6-digit code.");
//       return;
//     }

//     verifyOtpMutation.mutate(
//   { email, code },
//   {
//     onSuccess: async (response: any) => {
//       console.log("[OTP] API response:", response);
//       const res = response.data;

//       if (!res?.token || !res?.user) {
//         console.error("[OTP] Missing token or user:", res);
//         setOtpError("Invalid verification response.");
//         return;
//       }

//       const session: AuthSession = {
//         token: res.token,
//         data: {
//           user_id: res.user.user_id,
//           email: res.user.email,
//           Profile: {
//             first_name: res.user.Profile?.first_name ?? "",
//             last_name: res.user.Profile?.last_name ?? "",
//           },
//           Role: {
//             name: res.user.role?.name ?? "",
//             permission: res.user.role?.rolePermissions?.map(
//               (rp: any) => rp.Permission.name
//             ) ?? [],
//           },
//           Organization: {
//             name: res.user.organization?.name ?? "",
//           },
//         },
//       };

//       console.log("[OTP] Saving authenticated session...");
//       await setSession(session);
//       console.log("[OTP] Session saved successfully");

//       loginActivityMutation.mutate({
//         type: "LOGIN",
//         description: "User logged in successfully to the application.",
//         user_id: res.user.user_id,
//       });

//       setModal2Visible(true);
//     },

//     onError: (error: any) => {
//       console.log(
//         "Error verifying OTP:",
//         error.response?.data || error.message
//       );
//       setOtpError("The verification code is incorrect.");
//     },
//   }
// )};


// const handleSuccessfulLogin = () => {
//   console.log("[OTP] Sign In button tapped");

//   setModal2Visible(false);

//   requestAnimationFrame(() => {
//     console.log("[OTP] Navigating to home...");
//     router.replace("/drawer/tabs/home");
//   });
// };



//   const handleResend = async () => {
//     if (!canResend) return;

//     try {
//       setResendTimer(300);
//       setCanResend(false);
//     } catch (error) {
//       console.log("Resend error:", error);
//     }
//   };

//   const emailChange = () => {
//     router.replace("/auth/login");
//   };

//   const minutes = Math.floor(resendTimer / 60);
//   const seconds = resendTimer % 60;
//   const formattedTimer = `${minutes}:${seconds.toString().padStart(2, "0")}`;

//   const isTabletLandscape =
//     r.isLandscape &&
//     (r.isAndroidTablet || r.isIPad || r.isIPadMini || r.isLargeIPad);

//   const isComplete = otp.every((digit) => digit.length === 1);

//   return (
//     <ThemedView style={styles.container}>
//       <SafeAreaView style={styles.safeArea}>
//         <ThemedView style={[styles.authContainer, isTabletLandscape && styles.authContainerLandscape]}>
//           <ThemedView style={[styles.heroSection, isTabletLandscape && styles.heroLandscape]}>
//             <ThemedView style={styles.iconContainer}>
//               <ThemedView style={styles.glow}>
//                 <Image style={styles.glow} source={require("@/assets/images/logo-glow.png")} />
//               </ThemedView>
//               <ThemedView style={styles.background} />
//               <ThemedView style={styles.imageContainer}>
//                 <Image style={styles.image} source={require("@/assets/images/splash-icon.png")} />
//               </ThemedView>
//             </ThemedView>

//             {isTabletLandscape && (
//               <ThemedView style={styles.heroTagline}>
//                 <ThemedText style={styles.heroTaglineText}>
//                   Transforming Digital Conversations into HIV Intelligence: Geospatial AI for Public Health Surveillance
//                 </ThemedText>
//               </ThemedView>
//             )}
//           </ThemedView>

//           {isTabletLandscape && <ThemedView style={styles.landscapeDivider} />}

//           {!isTabletLandscape && (
//             <ThemedText style={styles.otpTitle}>ONE-TIME PASSWORD</ThemedText>
//           )}

//           <ThemedView style={[styles.card, isTabletLandscape && styles.cardLandscape]}>
//             {isTabletLandscape && (
//               <ThemedText style={[styles.otpTitle, { color: "#35408E" }]}>
//                 ONE-TIME PASSWORD
//               </ThemedText>
//             )}

//             <ThemedText style={styles.default}>
//               We have sent the one-time code to your email address. It expires in{" "}
//               <ThemedText style={[styles.default, { fontWeight: "bold" }]}>
//                 5 minutes.
//               </ThemedText>{" "}
//               <ThemedText style={styles.changeLink} onPress={emailChange}>
//                 Change Email
//               </ThemedText>
//             </ThemedText>

//             <ThemedView style={styles.otpRow}>
//               {otp.map((digit, index) => (
//                 <ThemedView key={index} style={styles.OTPContainer}>
//                   <TextInput
//                     ref={(ref) => {
//                       inputRefs.current[index] = ref;
//                     }}
//                     style={styles.otpInput}
//                     keyboardType="number-pad"
//                     maxLength={1}
//                     value={digit}
//                     onChangeText={(value) => handleOtpChange(value, index)}
//                     onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
//                     editable={!verifyOtpMutation.isPending}
//                   />
//                 </ThemedView>
//               ))}
//             </ThemedView>

//             {otpError && (
//               <ThemedText style={{ marginTop: verticalScale(1), color: "#E20000", textAlign: "center" }}>
//                 {otpError}
//               </ThemedText>
//             )}

//             <ThemedView style={styles.otpInfoRow}>
//               <ThemedText style={styles.resend}>
//                 EXPIRES IN:{" "}
//                 <ThemedText style={[styles.resend, { fontWeight: "400" }]}>
//                   {formattedTimer}
//                 </ThemedText>
//               </ThemedText>

//               <TouchableOpacity
//                 disabled={!canResend}
//                 onPress={() => {
//                   handleResend();
//                   setModal1Visible(true);
//                 }}
//                 activeOpacity={0.7}
//               >
//                 <ThemedText style={[styles.resend, { opacity: canResend ? 1 : 0.4 }]}>
//                   RESEND CODE
//                 </ThemedText>
//               </TouchableOpacity>
//             </ThemedView>

//             <ThemedView style={{ backgroundColor: "transparent" }}>
//               <TouchableOpacity
//                 style={[
//                   styles.button,
//                   (!isComplete || verifyOtpMutation.isPending) && { opacity: 0.5 },
//                 ]}
//                 onPress={handlePress}
//                 disabled={!isComplete || verifyOtpMutation.isPending}
//               >
//                 <ThemedText type="buttonCaption">
//                   {verifyOtpMutation.isPending ? "VERIFYING..." : "SUBMIT"}
//                 </ThemedText>
//               </TouchableOpacity>
//             </ThemedView>

//             <ResendCode
//               visible={modal1Visible}
//               onClose={() => setModal1Visible(false)}
//             />

//             <LoginSuccess
//               visible={modal2Visible}
//               onSignIn={handleSuccessfulLogin}
//             />
//           </ThemedView>
//         </ThemedView>

//         {Platform.OS === "web" && <WebBadge />}
//       </SafeAreaView>
//     </ThemedView>
//   );
// }

import { LoginSuccess } from "@/components/modals/login-success";
import { ResendCode } from "@/components/modals/resend-code";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { AuthSession, useAuth } from "@/lib/auth/AuthProvider";
import useFormMutation from "@/lib/hooks/useFormMutation";
import { VerifyOTPFormFields } from "@/lib/types/auth.type";
import { createAuthStyles } from "@/styles/auth-styles";
import { useResponsive, verticalScale } from "@/styles/responsive";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Image, Platform, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OTP() {
  const r = useResponsive();
  const styles = useMemo(() => createAuthStyles(r), [r]);
  const router = useRouter();

  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const [otpError, setOtpError] = useState("");

  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { email } = useLocalSearchParams<{ email?: string }>();
  const { setSession } = useAuth();

  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const verifyOtpMutation = useFormMutation<VerifyOTPFormFields>({
    key: ["Verification", email],
    method: "POST",
    url: `auth/verification?email=${encodeURIComponent(email ?? "")}`,
    params: {},
    headers: { "Content-Type": "application/json" },
  });

  // Backend expects email as a query parameter.
  const resendOtpMutation = useFormMutation<{}>({
    key: ["ResendOTP", email],
    method: "POST",
    url: "auth/resend-otp",
    params: { email: email ?? "" },
    headers: { "Content-Type": "application/json" },
  });

  const loginActivityMutation = useFormMutation({
    key: ["ActivityLog", "Login"],
    method: "POST",
    url: "maintenance/activity-logs",
    params: {},
    headers: {
      "x-api-key": "testing",
      "x-api-version": "2026-02-26",
      "Content-Type": "application/json",
    },
  });

  const handleOtpChange = (value: string, index: number) => {
    if (otpError) setOtpError("");

    const numericValue = value.replace(/\D/g, "");
    const updatedOtp = [...otp];

    if (!numericValue) {
      updatedOtp[index] = "";
      setOtp(updatedOtp);
      return;
    }

    updatedOtp[index] = numericValue.charAt(0);
    setOtp(updatedOtp);

    if (index < 5) inputRefs.current[index + 1]?.focus();
    else inputRefs.current[index]?.blur();
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePress = () => {
    const code = otp.join("");
    setOtpError("");

    if (!email || code.length !== 6) {
      setOtpError("Please enter the complete 6-digit code.");
      return;
    }

    verifyOtpMutation.mutate(
      { email, code },
      {
        onSuccess: async (response: any) => {
          console.log("[OTP] API response:", response);
          const res = response?.data;

          if (!res?.token || !res?.user?.user_id) {
            console.error("[OTP] Missing token or user:", res);
            setOtpError("Invalid verification response.");
            return;
          }

          const session: AuthSession = {
            token: res.token,
            data: {
              user_id: res.user.user_id,
              email: res.user.email ?? email ?? "",
              Profile: {
                first_name: res.user.Profile?.first_name ?? "",
                last_name: res.user.Profile?.last_name ?? "",
              },
              Role: {
                name: res.user.role?.name ?? "",
                permission:
                  res.user.role?.rolePermissions
                    ?.map((rp: any) => rp.Permission?.name)
                    .filter(Boolean) ?? [],
              },
              Organization: {
                name: res.user.organization?.name ?? "",
              },
            },
          };

          console.log("[OTP] Saving user:", session.data.user_id);
          console.log("[OTP] First name:", session.data.Profile.first_name);
          console.log("[OTP] Role:", session.data.Role.name);

          await setSession(session);

          loginActivityMutation.mutate({
            type: "LOGIN",
            description: "User logged in successfully to the application.",
            user_id: session.data.user_id,
          });

          setModal2Visible(true);
        },
        onError: (error: any) => {
          console.log(
            "Error verifying OTP:",
            error.response?.data || error.message
          );
          setOtpError("The verification code is incorrect.");
        },
      }
    );
  };

  const handleResend = () => {
    if (!canResend || !email || resendOtpMutation.isPending) return;

    setOtpError("");
    console.log("[OTP] Resending OTP to:", email);

    resendOtpMutation.mutate(
      {},
      {
        onSuccess: (response: any) => {
          console.log("[OTP] Resend success:", response);

          setOtp(["", "", "", "", "", ""]);
          requestAnimationFrame(() => inputRefs.current[0]?.focus());

          setResendTimer(300);
          setCanResend(false);
          setModal1Visible(true);
        },
        onError: (error: any) => {
          console.log(
            "[OTP] Resend error:",
            error.response?.data || error.message
          );

          const message =
            error.response?.data?.data?.message ||
            error.response?.data?.message ||
            "Unable to resend the verification code.";

          setOtpError(message);
          setCanResend(true);
        },
      }
    );
  };

  const handleSuccessfulLogin = () => {
    setModal2Visible(false);
    requestAnimationFrame(() => router.replace("/drawer/tabs/home"));
  };

  const emailChange = () => router.replace("/auth/login");

  const minutes = Math.floor(resendTimer / 60);
  const seconds = resendTimer % 60;
  const formattedTimer = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const isTabletLandscape =
    r.isLandscape &&
    (r.isAndroidTablet || r.isIPad || r.isIPadMini || r.isLargeIPad);

  const isComplete = otp.every((digit) => digit.length === 1);

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
            style={[styles.heroSection, isTabletLandscape && styles.heroLandscape]}
          >
            <ThemedView style={styles.iconContainer}>
              <ThemedView style={styles.glow}>
                <Image
                  style={styles.glow}
                  source={require("@/assets/images/logo-glow.png")}
                />
              </ThemedView>
              <ThemedView style={styles.background} />
              <ThemedView style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require("@/assets/images/splash-icon.png")}
                />
              </ThemedView>
            </ThemedView>

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

          {!isTabletLandscape && (
            <ThemedText style={styles.otpTitle}>ONE-TIME PASSWORD</ThemedText>
          )}

          <ThemedView
            style={[styles.card, isTabletLandscape && styles.cardLandscape]}
          >
            {isTabletLandscape && (
              <ThemedText style={[styles.otpTitle, { color: "#35408E" }]}>
                ONE-TIME PASSWORD
              </ThemedText>
            )}

            <ThemedText style={styles.default}>
              We have sent the one-time code to your email address. It expires
              in{" "}
              <ThemedText style={[styles.default, { fontWeight: "bold" }]}>
                5 minutes.
              </ThemedText>{" "}
              <ThemedText style={styles.changeLink} onPress={emailChange}>
                Change Email
              </ThemedText>
            </ThemedText>

            <ThemedView style={styles.otpRow}>
              {otp.map((digit, index) => (
                <ThemedView key={index} style={styles.OTPContainer}>
                  <TextInput
                    ref={(ref): void => {
                      inputRefs.current[index] = ref;
                    }}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={({ nativeEvent }) =>
                      handleKeyPress(nativeEvent.key, index)
                    }
                    editable={
                      !verifyOtpMutation.isPending &&
                      !resendOtpMutation.isPending
                    }
                  />
                </ThemedView>
              ))}
            </ThemedView>

            {otpError && (
              <ThemedText
                style={{
                  marginTop: verticalScale(1),
                  color: "#E20000",
                  textAlign: "center",
                }}
              >
                {otpError}
              </ThemedText>
            )}

            <ThemedView style={styles.otpInfoRow}>
              <ThemedText style={styles.resend}>
                EXPIRES IN:{" "}
                <ThemedText style={[styles.resend, { fontWeight: "400" }]}>
                  {formattedTimer}
                </ThemedText>
              </ThemedText>

              <TouchableOpacity
                disabled={!canResend || resendOtpMutation.isPending}
                onPress={handleResend}
                activeOpacity={0.7}
              >
                <ThemedText
                  style={[
                    styles.resend,
                    {
                      opacity:
                        canResend && !resendOtpMutation.isPending ? 1 : 0.4,
                    },
                  ]}
                >
                  {resendOtpMutation.isPending ? "SENDING..." : "RESEND CODE"}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ThemedView style={{ backgroundColor: "transparent" }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  (!isComplete ||
                    verifyOtpMutation.isPending ||
                    resendOtpMutation.isPending) && { opacity: 0.5 },
                ]}
                onPress={handlePress}
                disabled={
                  !isComplete ||
                  verifyOtpMutation.isPending ||
                  resendOtpMutation.isPending
                }
              >
                <ThemedText type="buttonCaption">
                  {verifyOtpMutation.isPending ? "VERIFYING..." : "SUBMIT"}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ResendCode
              visible={modal1Visible}
              onClose={() => setModal1Visible(false)}
            />
            <LoginSuccess
              visible={modal2Visible}
              onSignIn={handleSuccessfulLogin}
            />
          </ThemedView>
        </ThemedView>

        {Platform.OS === "web" && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}
