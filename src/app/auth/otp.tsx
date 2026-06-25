import { LoginSuccess } from '@/components/modals/login-success';
import { ResendCode } from '@/components/modals/resend-code';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import * as Device from 'expo-device';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function OTP() {

  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [number, onChangeNumber] = useState('');
  const router = useRouter();

  const handlePress = () => {
    console.log("Button pressed");
    setModal2Visible(false);
    setTimeout(() => {
    router.replace('/drawer/tabs/home');
    }, 100);
  };

  const EmailChange = () => {
    console.log("Link pressed");
    router.replace('/auth/login'); 
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
           <ThemedView style={styles.iconContainer}>
                <ThemedView style={styles.glow}>
                  <Image style={styles.glow} source={require('@/assets/images/logo-glow.png')} />
                </ThemedView>
                <ThemedView style={styles.background} />
                <ThemedView style={styles.imageContainer}>
                  <Image style={styles.image} source={require('@/assets/images/splash-icon.png')} />
                </ThemedView>
              </ThemedView>
        </ThemedView>

        <ThemedText type='titleLogin'>
          ONE-TIME PASSWORD
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <ThemedText type='default'>
            We have sent the the one time code in your email address. It expires in <ThemedText type='smallBold'>10 minutes. {" "}</ThemedText>
            <ThemedText 
                  type='smallBoldColor'
                  style={styles.changeLink}
                  onPress={EmailChange}
                  >
                  Change Email
            </ThemedText>
          </ThemedText>

          <ThemedView style={{flexDirection: "row", gap: 5}}>
            <ThemedView style={styles.OTPContainer}>
              <TextInput 
              style={styles.input} 
              placeholderTextColor="#9C9898"
              keyboardType='numeric'
              maxLength={1}
              >
              </TextInput>
            </ThemedView>
            <ThemedView style={styles.OTPContainer}>
              <TextInput 
              style={styles.input} 
              placeholderTextColor="#9C9898"
              keyboardType='numeric'
              maxLength={1}
              >
              </TextInput>
            </ThemedView>
            <ThemedView style={styles.OTPContainer}>
              <TextInput 
              style={styles.input} 
              placeholderTextColor="#9C9898"
              keyboardType='numeric'
              maxLength={1}
              >
              </TextInput>
            </ThemedView>
            <ThemedView style={styles.OTPContainer}>
              <TextInput 
              style={styles.input} 
              placeholderTextColor="#9C9898"
              keyboardType='numeric'
              maxLength={1}
              >
              </TextInput>
            </ThemedView>
            <ThemedView style={styles.OTPContainer}>
              <TextInput 
              style={styles.input} 
              placeholderTextColor="#9C9898"
              keyboardType='numeric'
              maxLength={1}
              >
              </TextInput>
            </ThemedView>
            <ThemedView style={styles.OTPContainer}>
              <TextInput 
              style={styles.input} 
              placeholderTextColor="#9C9898"
              value={number}
              onChangeText={onChangeNumber}
              keyboardType='numeric'
              maxLength={1}
              >
              </TextInput>
            </ThemedView>
          </ThemedView>
          
          <ThemedView style={{flexDirection: "row", justifyContent: "space-between"}}>
            <ThemedText type='smallBold'>
              EXPIRES IN: {" "}
              <ThemedText type='default'>10:00</ThemedText>
            </ThemedText>
            <ThemedText 
                  style={styles.resend}
                  onPress={() => setModal1Visible(true)}
                  >
                  RESEND CODE
            </ThemedText>
          </ThemedView>
          
          <ThemedView>
            <TouchableOpacity style={styles.button} onPress={() => setModal2Visible(true)} >
            <ThemedText type='buttonCaption'>SUBMIT</ThemedText>
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

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: "#35408E",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
    maxWidth: MaxContentWidth,
    
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: Spacing.four,
    backgroundColor: "#35408E",
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: 201,
    height: 201,
    position: 'absolute',
    backgroundColor: "transparent"
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
    zIndex: 100,
  },
  image: {
    position: 'absolute',
    width: 277.5,
    height: 265.08,
  },
  background: {
    borderRadius: 999,
    backgroundColor: "white",
    width: 275,
    height: 275,
    position: 'absolute',
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "center",
    paddingHorizontal: 35,
    paddingVertical: Spacing.five,
    borderRadius: 10,
    backgroundColor: "white"
  },
  OTPContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 13,
    width: 45,
    height: 48,
    textAlignVertical: "center",
  },
  input: {
    fontSize: 15,
    color: '#35408E',
    fontFamily: "Poppins-Medium",
    padding: 8,
    height: "100%",
    width: "100%",
    borderColor: "#35408E",
    borderWidth: 1,
    borderRadius: 13,
    textAlign: "center"
  },
  button: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFB633", 
    width: "100%", 
    height: 50, 
    borderRadius: 13,
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
  },
  changeLink: {
    textDecorationLine: "underline"
  },
  resend: {
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#35408E",
    justifyContent: "center",
    alignItems: "center",
  },
  bgContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 25,
    maxHeight: "45%",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 20,
    zIndex: 1,
  },
  closeIcon: {
    fontSize: 17,
    color: "#E20000",
    fontWeight: "900",
    fontFamily: "Poppins-ExtraBold",
  },
  modalIcon: {
    width: 100, 
    height: 100, 
    borderRadius: 100 / 2, 
    backgroundColor: "#FFB633", 
    justifyContent: "center",
    alignItems: "center",
  }, 
  modalTitle: {
    marginBottom: 10,
    marginTop: 10,
  },
  modaldesc: {
    fontSize: 12,  
    fontFamily: "Poppins-Regular",
    color: "#35408E",
    textAlign: "center"
  },
   check: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFB633", 
    marginTop: 10,
    width: 50, 
    height: 45, 
    borderRadius: 13,
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
  },
    signin: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFB633", 
    marginTop: 10,
    width: "30%", 
    height: 40, 
    borderRadius: 13,
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
  },


});
