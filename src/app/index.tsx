import { AnimatedIcon } from '@/components/animated-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import Checkbox from 'expo-checkbox';
import * as Device from 'expo-device';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
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

export default function Login() {

  const [isChecked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handlePress = () => {
    console.log("Button pressed");
    router.push('/auth/otp'); 
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
        </ThemedView>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <ThemedText type='default'>
            We'll send a one-time 6-digit code to your email address. <ThemedText type='smallBold'>NO PASSWORD REQUIRED.</ThemedText>
          </ThemedText>
          <ThemedText type='subtitle'>Email Address</ThemedText>
          <ThemedView style={styles.emailContainer}>
            <TextInput 
            style={styles.input} 
            placeholder="juandelacruz@national-u.edu.ph" 
            placeholderTextColor="#9C9898"
            keyboardType="email-address"
            >
            </TextInput>
          </ThemedView>
          <ThemedView>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
            <ThemedText type='buttonCaption'>SEND VERIFICATION CODE</ThemedText>
          </TouchableOpacity>
          </ThemedView>
          <ThemedView style={styles.terms}>
            <Checkbox
              value={isChecked}
              disabled={false}
              onValueChange={setChecked}
              color={isChecked ? '#E20000' : undefined}>
            </Checkbox>
            <ThemedText type='small' style={styles.termsText}>
                I hereby acknowledge that I have read, understood, and accepted the {""}
                <ThemedText 
                  type='smallBoldColor'
                  style={styles.termsLink}
                  onPress={() => setModalVisible(true)} 
                  >
                  Terms and Conditions.
                </ThemedText>
             </ThemedText>
          </ThemedView>
        </ThemedView>
        
        <Modal
        visible={modalVisible}
        animationType="fade"
      >
        <ThemedView
          style={styles.modalContainer}>
          <ThemedView
            style={styles.bgContainer}>
            <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
            >
              <ThemedText
                style={styles.closeIcon}
              >
                ✕
              </ThemedText>
            </TouchableOpacity>

            <ThemedText type="title" style={styles.termsTitle}>
              TERMS AND CONDITIONS
            </ThemedText>

            <ScrollView>
              <ThemedText style={styles.termsInfo}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ultrices massa, eget vulputate est. Donec hendrerit commodo ex, vel faucibus libero. Proin finibus sem justo, vel luctus lorem varius eu. Etiam ac aliquet dolor, a maximus ex. Maecenas quis lectus nec nisl pulvinar interdum. Curabitur faucibus mauris id lorem gravida, eget ornare tortor porttitor. Sed nibh nibh, aliquam vitae varius sit amet, tempus nec massa. Pellentesque tempus augue massa, ut blandit lectus dignissim ut. Aliquam vel sem in leo dignissim posuere. Sed iaculis lorem arcu, sed pulvinar nunc elementum in. Nunc non nibh eget massa molestie commodo et ac nunc. Nulla aliquet ante sit amet lectus auctor, ac accumsan leo ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse vestibulum mollis dui id commodo.
                Duis dolor nibh, convallis ac nisi eu, volutpat commodo magna. Morbi convallis nisi ac enim lobortis, ut faucibus velit vestibulum. Praesent pulvinar sit amet nibh nec tincidunt. Maecenas faucibus varius ornare. Ut sodales lacus risus, eget semper lectus efficitur vel. Aliquam iaculis augue tellus, sed placerat dui gravida pretium. Praesent ac tortor eu sapien cursus lobortis ut venenatis diam.
                Quisque non mi mi. Morbi finibus iaculis arcu, ut semper lorem efficitur quis. Morbi est lectus, rhoncus vitae auctor vel, sodales eu augue. Donec blandit, neque nec feugiat rutrum, odio dolor malesuada lorem, at vestibulum lorem sem sit amet nisi. Duis at sagittis nunc. Mauris ut lorem non leo vulputate dictum non et leo. Etiam a sollicitudin mauris, eget iaculis nisl. Nam tempus venenatis lectus. Proin dui lorem, laoreet hendrerit mi et, condimentum luctus eros. Curabitur ornare dictum orci vestibulum commodo. Cras feugiat nisi et semper interdum. Curabitur sollicitudin nisi vitae ligula sagittis lacinia. Nunc eget sem arcu. Donec porta eros non velit feugiat, at lacinia tortor sagittis. Suspendisse sed molestie velit, eget tempus diam.
                Quisque non mi mi. Morbi finibus iaculis arcu, ut semper lorem efficitur quis. Morbi est lectus, rhoncus vitae auctor vel, sodales eu augue.  Morbi finibus iaculis arcu, ut semper lorem efficitur quis. 
                Donec porta eros non velit feugiat, at lacinia tortor sagittis. Suspendisse sed molestie velit, eget tempus diam.
              </ThemedText>
            </ScrollView>
          </ThemedView>
        </ThemedView>
      </Modal>

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
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "center",
    paddingHorizontal: 35,
    paddingVertical: Spacing.five,
    borderRadius: 10,
    backgroundColor: "white"
  },
  emailContainer: {
    backgroundColor: "#F0F0F0",
    borderRadius: 13,
    width: "auto",
    height: 40,
    textAlignVertical: "center",
  },
  input: {
    fontSize: 15,
    color: '#35408E',
    fontFamily: "Poppins-Medium",
    padding: 8,
    height: 40,
    width: "100%",
    borderColor: "#35408E",
    borderWidth: 1,
    borderRadius: 13,
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
  terms: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  termsText: {
    paddingHorizontal: 10,
  },
  termsLink: {
    textDecorationLine: "underline"
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
    maxHeight: "85%",
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
  termsTitle: {
    marginBottom: 15,
    marginTop: 22,
  },
  termsInfo: {
    fontSize: 11, 
    lineHeight: 20, 
    textAlign: "justify",
    fontFamily: "Poppins-Regular",
    color: "#35408E",
  }

});
